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

class BTC_Inbound extends CrosschainBase {

  constructor(config) {
    super(config);
  }

  // first 1/2 of crosschain transaction
  // assumes that you have already created a new HTLC address and have sent
  // bitcoin to it
  lock(opts) {

    // validate inputs
    // opts = validateSendOpts(opts);

    return Promise.resolve([]).then(() => {

      // notify status
      this.emit('info', { status: 'starting', redeemKey: opts.redeemKey });

      return this.sendLock(opts);

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

  // second 1/2 of crosschain transaction
  // requires redeemKey to be passed in opts
  redeem(opts) {

    // validate inputs
    opts = validateRedeemOpts(opts);

    return Promise.resolve([]).then(() => {

      // notify status
      this.emit('info', { status: 'starting', redeemKey: opts.redeemKey });

      return this.sendRedeem(opts);

    }).then(receipt => {

      // notify complete
      this.emit('complete');

    }).catch(err => {

      // notify error
      this.emit('error', err)

    });
  }

  // send lock notice transaction on wanchain
  sendLock(opts) {
    const sendOpts = this.buildLockTx(opts);

    const action = this.web3wan.eth.sendTransaction(sendOpts);

    action.on('transactionHash', hash => {
      this.emit('info', { status: 'lockHash', hash });
    });

    action.on('receipt', receipt => {
      this.emit('info', { status: 'locking', receipt });
    });

    action.on('error', err => {
      this.emit('error', err);
    });

    return action;
  }

  // listen for storeman tx on wanchain
  listenLock(opts, blockNumber) {
    const lockScanOpts = this.buildLockScanOpts(opts, blockNumber);

    const action = web3Util(this.web3wan).watchLogs(lockScanOpts);

    action.then(receipt => {
      this.emit('info', { status: 'locked', receipt });
      return receipt;
    });

    action.catch(err => {
      this.emit('error', err);
    });

    return action;
  }

  // send redeem transaction on wanchain
  sendRedeem(opts) {
    const sendOpts = this.buildRedeemTx(opts);

    const action = this.web3wan.eth.sendTransaction(sendOpts);

    action.on('transactionHash', hash => {
      this.emit('info', { status: 'redeemHash', hash });
    });

    action.on('receipt', receipt => {
      this.emit('info', { status: 'redeemed', receipt });
    });

    action.on('error', err => {
      this.emit('error', err);
    });

    return action;
  }

  buildLockTx({ to, from, value, storeman, redeemKey, txid, lockTimestamp }) {
    const lockNoticeData = this.buildLockData({
      from,
      storeman,
      redeemKey,
      txid,
      lockTimestamp,
    });

    return {
      from: to,
      to: this.config.wanHtlcAddrBtc,
      gas: 300000,
      gasPrice: 180e9,
      data: lockNoticeData,
    };
  }

  buildLockScanOpts({ redeemKey }, blockNumber) {
    const { BTC2WBTCLock } = this.config.signatures.HTLCWBTC;

    return {
      blockNumber,
      address: this.config.wanHtlcAddrBtc,
      topics: [
        '0x' + BTC2WBTCLock,
        null,
        null,
        '0x' + hex.stripPrefix(redeemKey.xHash),
      ],
    };
  }

  buildRedeemTx({ to, redeemKey }) {
    const redeemData = this.buildRedeemData({ redeemKey });

    return {
      from: to,
      to: this.config.wanHtlcAddrBtc,
      gas: 120000,
      gasPrice: 180e9,
      data: redeemData,
    };
  }

  buildLockData({ storeman, from, redeemKey, txid, lockTimestamp }) {
    const { btc2wbtcLockNotice } = this.config.signatures.HTLCWBTC;
    const fromHash160 = crypto.addressToHash160(from, 'pubkeyhash', this.config.network);

    return '0x' + btc2wbtcLockNotice.substr(0, 8)
      + types.hex2Bytes32(storeman.wan)
      + types.hex2Bytes32(fromHash160)
      + hex.stripPrefix(redeemKey.xHash)
      + hex.stripPrefix(txid)
      + types.num2Bytes32(lockTimestamp);
  }

  buildRedeemData({ redeemKey }) {
    const { btc2wbtcRedeem } = this.config.signatures.HTLCWBTC;

    return '0x' + btc2wbtcRedeem.substr(0, 8)
      + hex.stripPrefix(redeemKey.x);
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

  buildRevokeTx(opts) {
    return btcUtil.buildRevokeTx(
      this.config.network,
      opts.redeemScript,
      opts.signedSigHash,
      opts.publicKey,
      opts.redeemKey.x,
      opts.txid,
      opts.value,
      opts.lockTimestamp,
    );
  }

  buildRevokeTxFromWif(opts) {
    return btcUtil.buildRevokeTxFromWif(
      this.config.network,
      opts.redeemScript,
      opts.wif,
      opts.redeemKey.x,
      opts.txid,
      opts.value,
      opts.lockTimestamp,
    );
  }
}

module.exports = BTC_Inbound;
