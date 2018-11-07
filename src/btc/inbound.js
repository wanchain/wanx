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

class BTC_Inbound extends CrosschainBase {

  constructor(config) {
    super(config);
  }

  // first 1/2 of crosschain transaction
  // assumes that you have already created a new HTLC address and have sent
  // bitcoin to it
  lock(opts) {

    // validate inputs
    opts = validateSendOpts(opts);

    return Promise.resolve([]).then(() => {

      // notify status
      this.emit('info', { status: 'starting', redeemKey: opts.redeemKey });

      return this.sendLockNoticeTx(opts);

    }).then(receipt => {

      // notify status
      this.emit('info', { status: 'locking', receipt });

      return this.listenLockTx(opts, receipt.blockNumber);

    }).then(receipt => {

      // notify complete
      this.emit('complete', { status: 'locked', receipt });

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

      return this.sendRedeemTx(opts);

    }).then(receipt => {

      // notify refund result
      this.emit('info', { status: 'confirming', receipt });

      return this.listenRedeemTx(opts, receipt.blockNumber);

    }).then(receipt => {

      // notify complete
      this.emit('complete', { status: 'confirmed', receipt });

    }).catch(err => {

      // notify error
      this.emit('error', err)

    });
  }

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
      opts.signedRedeemScript,
      opts.publicKey,
      opts.redeemKey.x,
      opts.txid,
      opts.value,
    );
  }

  buildRevokeTxFromWif(opts) {
    return btcUtil.buildRevokeTx(
      this.config.network,
      opts.redeemScript,
      opts.wif,
      opts.redeemKey.x,
      opts.txid,
      opts.value,
    );
  }

  // send lock transaction on ethereum
  sendLockNoticeTx({ to, from, value, storeman, redeemKey, txHash, lockTimestamp }) {

    const lockNoticeData = this.buildLockNoticeData({
      from,
      storeman,
      redeemKey,
      txHash,
      lockTimestamp,
    });

    const sendOpts = {
      from: to,
      to: this.config.wanHtlcAddrBtc,
      value: value,
      gas: 4710000,
      gasPrice: 180e9,
      data: lockNoticeData,
    };

    return web3Util(this.web3wan).sendTransaction(sendOpts);
  }

  // listen for storeman tx on wanchain
  listenLockTx({ redeemKey }, blockNumber) {

    const lockScanOpts = {
      blockNumber,
      address: this.config.wanHtlcAddrBtc,
      topics: [
        '0x' + this.config.signatures.HTLCWBTC.BTC2WBTCLock,
        null,
        null,
        '0x' + redeemKey.xHash,
      ],
    };

    return web3Util(this.web3wan).watchLogs(lockScanOpts);
  }

  // send refund transaction on wanchain
  sendRedeemTx({ to, redeemKey }) {
    const redeemData = this.buildRedeemData({ redeemKey });

    const sendOpts = {
      from: to,
      to: this.config.wanHtlcAddrBtc,
      gas: 4700000,
      gasPrice: 180e9,
      data: redeemData,
    };

    return web3Util(this.web3wan).sendTransaction(sendOpts);
  }

  // listen for storeman tx on ethereum
  listenRedeemTx({ redeemKey }, blockNumber) {

    const redeemScanOpts = {
      blockNumber,
      address: this.config.wanHtlcAddrBtc,
      topics: [
        '0x' + this.config.signatures.HTLCWBTC.BTC2WBTCRefund,
        null,
        null,
        '0x' + redeemKey.xHash,
      ],
    };

    return web3Util(this.web3eth).watchLogs(redeemScanOpts);
  }

  buildLockNoticeData({ storeman, from, redeemKey, txHash, lockTimestamp }) {
    const sig = this.config.signatures.HTLCWBTC.btc2wbtcLockNotice;
    const fromHash160 = btcUtil.addressToHash160(from, 'pubkeyhash', this.config.network);

    return '0x' + sig.substr(0, 8)
      + types.hex2Bytes32(storeman.wan)
      + types.hex2Bytes32(fromHash160)
      + hex.stripPrefix(redeemKey.xHash)
      + hex.stripPrefix(txHash)
      + types.num2Bytes32(lockTimestamp);
  }

  buildRedeemData({ redeemKey }) {
    const sig = this.config.signatures.HTLCWBTC.btc2wbtcRefund;
    return '0x' + sig.substr(0, 8) + redeemKey.x;
  }
}

module.exports = BTC_Inbound;
