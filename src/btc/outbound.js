const BigNumber = require('bignumber.js');

const CrosschainBase = require('../base');
const btcUtil = require('./utils');
const web3Util = require('../lib/web3');
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

      return this.getStoremanFee(opts);

    }).then(res => {

      const fee = new BigNumber(res).toString();

      // notify status
      this.emit('info', { status: 'fee', fee });

      return this.sendLock(Object.assign({}, opts, { fee }));

    }).then(receipt => {

      return this.listenLock(opts, receipt.blockNumber);

    }).catch(err => {

      // notify error
      this.emit('error', err)

    });
  }

  // make call to get storeman fee
  getStoremanFee(opts) {
    const callOpts = this.buildStoremanFeeTx(opts);
    return this.web3wan.eth.call(callOpts);
  }

  // send lock transaction
  sendLock(opts) {
    const sendOpts = this.buildLockTx(opts);

    return this.web3wan.eth.sendTransaction(sendOpts)
      .on('transactionHash', hash => {
        this.emit('info', { status: 'lockHash', hash });
      })
      .on('receipt', receipt => {
        this.emit('info', { status: 'locked', receipt });
      })
      .on('error', err => {
        this.emit('error', err);
      });
  }

  // listen for storeman lock notice tx
  listenLock(opts, blockNumber) {
    const lockNoticeScanOpts = this.buildLockScanOpts(opts, blockNumber);
    return web3Util(this.web3wan).watchLogs(lockNoticeScanOpts);
  }

  // listen for storeman redeem tx
  listenRedeem(opts, blockNumber) {
    const redeemScanOpts = this.buildRedeemScanOpts(opts, blockNumber);
    return web3Util(this.web3wan).watchLogs(redeemScanOpts);
  }

  // send revoke transaction
  sendRevoke(opts) {
    const sendOpts = this.buildRevokeTx(opts);

    return this.web3wan.eth.sendTransaction(sendOpts)
      .on('transactionHash', hash => {
        this.emit('info', { status: 'revokeHash', hash });
      })
      .on('receipt', receipt => {
        this.emit('info', { status: 'revoked', receipt });
      })
      .on('error', err => {
        this.emit('error', err);
      });
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
      gas: 4700000,
      gasPrice: 180e9,
      value: fee,
      data: lockData,
    };
  }

  buildLockScanOpts({ redeemKey }, blockNumber) {
    return {
      blockNumber,
      address: this.config.wanHtlcAddrBtc,
      topics: [
        '0x' + this.config.signatures.HTLCWBTC.WBTC2BTCLockNotice,
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
      gas: 4700000,
      gasPrice: 180e9,
      data: revokeData,
    };
  }

  buildRedeemScanOpts({ redeemKey }, blockNumber) {
    return {
      blockNumber,
      address: this.config.wanHtlcAddrBtc,
      topics: [
        '0x' + this.config.signatures.HTLCWBTC.WBTC2BTCRedeem,
        null,
        null,
        '0x' + hex.stripPrefix(redeemKey.xHash),
      ],
    };
  }

  buildLockData({ to, value, storeman, redeemKey }) {
    const sig = this.config.signatures.HTLCWBTC.wbtc2btcLock;
    const toAddr = crypto.addressToHash160(to, 'pubkeyhash', this.config.network);

    return '0x' + sig.substr(0, 8) + hex.stripPrefix(redeemKey.xHash)
      + types.hex2Bytes32(storeman.wan)
      + types.hex2Bytes32(toAddr)
      + types.num2Bytes32(value);
  }

  buildRevokeData({ redeemKey }) {
    const sig = this.config.signatures.HTLCWBTC.wbtc2btcRevoke;
    return '0x' + sig.substr(0, 8) + hex.stripPrefix(redeemKey.xHash);
  }

  buildStoremanFeeTx(opts) {
    const to = this.config.wanHtlcAddrBtc;
    const data = this.buildStoremanFeeData(opts);

    return { to, data };
  }

  buildStoremanFeeData({ storeman, value }) {
    const sig = this.config.signatures.HTLCWBTC.getWbtc2BtcFee;

    return '0x' + sig.substr(0, 8)
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
    return btcUtil.buildRedeemTx(
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
