const BigNumber = require('bignumber.js');

const CrosschainBase = require('../base');
const btcUtil = require('./utils');
const web3Util = require('../lib/web3');
const crypto = require('../lib/crypto');
const types = require('../lib/types');
const hex = require('../lib/hex');

const {
  validateSendOpts,
  validateRedeemOpts,
  validateRevokeOpts,
} = require('./validate');

class BTC_Outbound extends CrosschainBase {

  constructor(config) {
    super(config);
  }

  // first 1/2 of crosschain transaction
  lock(opts) {

    // validate inputs
    opts = validateSendOpts(opts);

    return Promise.resolve([]).then(() => {

      // notify status
      this.emit('info', { status: 'starting', redeemKey: opts.redeemKey });

      return this.getOutboundFee(opts);

    }).then(fee => {

      return this.sendLock(Object.assign({}, opts, { fee }));

    }).then(receipt => {

      return this.listenLock(opts, receipt.blockNumber);

    }).then(receipt => {

      // notify complete
      this.emit('complete');

    }).catch(err => {

      // notify error
      this.emit('error', err)

    });
  }

  // make call to get storeman fee
  getOutboundFee(opts) {
    const callOpts = this.buildOutboundFeeTx(opts);

    const action = this.web3wan.eth.call(callOpts);

    action.then(res => {
      const fee = new BigNumber(res).toString();

      this.emit('info', { status: 'outboundFee', fee });
      return fee;
    });

    action.catch(err => {
      this.emit('error', err);
    });

    return action;
  }

  // send lock transaction
  sendLock(opts) {
    const sendOpts = this.buildLockTx(opts);

    const action = this.web3wan.eth.sendTransaction(sendOpts);

    action.once('transactionHash', hash => {
      this.emit('info', { status: 'lockHash', hash });
    });

    action.once('receipt', receipt => {
      this.emit('info', { status: 'locking', receipt });
    });

    action.on('error', err => {
      this.emit('error', err);
    });

    return action;
  }

  // listen for storeman lock notice tx
  listenLock(opts, blockNumber) {
    const lockNoticeScanOpts = this.buildLockScanOpts(opts, blockNumber);

    const action = web3Util(this.web3wan).watchLogs(lockNoticeScanOpts);

    action.then(receipt => {
      this.emit('info', { status: 'locked', receipt });
      return receipt;
    });

    action.catch(err => {
      this.emit('error', err);
    });

    return action;
  }

  // listen for storeman redeem tx
  // no longer used
  listenRedeem(opts, blockNumber) {
    const redeemScanOpts = this.buildRedeemScanOpts(opts, blockNumber);

    const action = web3Util(this.web3wan).watchLogs(redeemScanOpts);

    action.then(receipt => {
      this.emit('info', { status: 'redeemed', receipt });
      return receipt;
    });

    action.catch(err => {
      this.emit('error', err);
    });

    return action;
  }

  // send revoke transaction
  sendRevoke(opts) {
    const sendOpts = this.buildRevokeTx(opts);

    const action = this.web3wan.eth.sendTransaction(sendOpts);

    action.once('transactionHash', hash => {
      this.emit('info', { status: 'revokeHash', hash });
    });

    action.once('receipt', receipt => {
      this.emit('info', { status: 'revoked', receipt });
    });

    action.on('error', err => {
      this.emit('error', err);
    });

    return action;
  }

  buildLockTx({ to, from, value, storeman, redeemKey, fee }) {
    const lockData = this.buildLockData({
      to,
      value,
      storeman,
      redeemKey,
    });

    return {
      from: from,
      to: this.config.wanHtlcAddrBtc,
      gas: 300000,
      gasPrice: 180e9,
      value: fee,
      data: lockData,
    };
  }

  buildLockScanOpts({ redeemKey }, blockNumber) {
    const { WBTC2BTCLockNotice } = this.config.signatures.HTLCWBTC;

    return {
      blockNumber,
      address: this.config.wanHtlcAddrBtc,
      topics: [
        '0x' + WBTC2BTCLockNotice,
        null,
        null,
        '0x' + hex.stripPrefix(redeemKey.xHash),
      ],
    };
  }

  buildRevokeTx({ from, redeemKey }) {
    const revokeData = this.buildRevokeData({ redeemKey });

    return {
      from: from,
      to: this.config.wanHtlcAddrBtc,
      gas: 120000,
      gasPrice: 180e9,
      data: revokeData,
    };
  }

  buildRedeemScanOpts({ redeemKey }, blockNumber) {
    const { WBTC2BTCRedeem } = this.config.signatures.HTLCWBTC;

    return {
      blockNumber,
      address: this.config.wanHtlcAddrBtc,
      topics: [
        '0x' + WBTC2BTCRedeem,
        null,
        null,
        '0x' + hex.stripPrefix(redeemKey.xHash),
      ],
    };
  }

  buildLockData({ to, value, storeman, redeemKey }) {
    const { wbtc2btcLock } = this.config.signatures.HTLCWBTC;
    const toAddr = crypto.addressToHash160(to, 'pubkeyhash', this.config.network);

    return '0x' + wbtc2btcLock.substr(0, 8)
      + hex.stripPrefix(redeemKey.xHash)
      + types.hex2Bytes32(storeman.wan)
      + types.hex2Bytes32(toAddr)
      + types.num2Bytes32(value);
  }

  buildRevokeData({ redeemKey }) {
    const { wbtc2btcRevoke } = this.config.signatures.HTLCWBTC;

    return '0x' + wbtc2btcRevoke.substr(0, 8)
      + hex.stripPrefix(redeemKey.xHash);
  }

  buildOutboundFeeTx(opts) {
    const to = this.config.wanHtlcAddrBtc;
    const data = this.buildOutboundFeeData(opts);

    return { to, data };
  }

  buildOutboundFeeData({ storeman, value }) {
    const { getWbtc2BtcFee } = this.config.signatures.HTLCWBTC;

    return '0x' + getWbtc2BtcFee.substr(0, 8)
      + types.hex2Bytes32(storeman.wan)
      + types.num2Bytes32(value);
  }

  //
  // BTC methods
  //

  buildHashTimeLockContract(xHash, lockTimestamp, destH160Addr, revokerH160Addr) {
    return btcUtil.buildHashTimeLockContract(
      this.config.network,
      xHash,
      lockTimestamp,
      destH160Addr,
      revokerH160Addr
    );
  }

  hashForSignature(opts) {
    return btcUtil.hashForSignature(
      this.config.network,
      opts.redeemScript,
      opts.publicKey,
      opts.txid,
      opts.value,
    );
  }

  buildRedeemTx(opts) {
    return btcUtil.buildRedeemTx(
      this.config.network,
      opts.redeemScript,
      opts.signedSigHash,
      opts.publicKey,
      opts.redeemKey.x,
      opts.txid,
      opts.value,
    );
  }

  buildRedeemTxFromWif(opts) {
    return btcUtil.buildRedeemTxFromWif(
      this.config.network,
      opts.redeemScript,
      opts.wif,
      opts.redeemKey.x,
      opts.txid,
      opts.value,
    );
  }

}

module.exports = BTC_Outbound;
