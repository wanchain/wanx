const BigNumber = require('bignumber.js');
const wanutils = require('wanchain-util');

const CrosschainBase = require('../base');
const btcUtil = require('../../btc-util');
const web3Util = require('../../web3-util');
const types = require('../../types');

const {
  validateSendOpts,
  validateRedeemOpts,
  validateRevokeOpts,
} = require('./validate');

class BTC_Outbound extends CrosschainBase {

  constructor(config) {
    super(config);
  }

  // complete crosschain transaction
  send(opts) {

    // validate inputs
    opts = validateSendOpts(opts);

    Promise.resolve([]).then(() => {

      // notify status
      this.emit('info', { status: 'starting', redeemKey: opts.redeemKey });

      return this.getStoremanFee(opts);

    }).then(res => {

      const fee = new BigNumber(res).toString();

      // notify status
      this.emit('info', { status: 'fee', fee });

      return this.sendLockTx(Object.assign({}, opts, { fee }));

    }).then(receipt => {

      // notify status
      this.emit('info', { status: 'locking', receipt });

      return this.listenLockTx(opts, receipt.blockNumber);

    }).then(receipt => {

      // notify locked status
      this.emit('info', { status: 'locked', receipt });

      return this.sendRedeemTx(opts);

    }).then(receipt => {

      // notify redeem result
      this.emit('info', { status: 'confirming', receipt });

      return this.listenRedeemTx(opts, receipt.blockNumber);

    }).then(receipt => {

      // notify complete
      this.emit('complete', { status: 'confirmed', receipt });

    }).catch(err => {

      // notify error
      this.emit('error', err)

    });

    return this;
  }

  // first 1/2 of crosschain transaction
  lock(opts) {

    // validate inputs
    opts = validateSendOpts(opts);

    Promise.resolve([]).then(() => {

      // notify status
      this.emit('info', { status: 'starting', redeemKey: opts.redeemKey });

      return this.getStoremanFee(opts);

    }).then(res => {

      const fee = new BigNumber(res).toString();

      // notify status
      this.emit('info', { status: 'fee', fee });

      return this.sendLockTx(Object.assign({}, opts, { fee }));

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

    return this;
  }

  // second 1/2 of crosschain transaction
  // requires redeemKey to be passed in opts
  redeem(opts) {

    // validate inputs
    opts = validateRedeemOpts(opts);

    Promise.resolve([]).then(() => {

      // notify status
      this.emit('info', { status: 'starting', redeemKey: opts.redeemKey });

      return this.sendRedeemTx(opts);

    }).then(receipt => {

      // notify redeem result
      this.emit('info', { status: 'confirming', receipt });

      return this.listenRedeemTx(opts, receipt.blockNumber);

    }).then(receipt => {

      // notify complete
      this.emit('complete', { status: 'confirmed', receipt });

    }).catch(err => {

      // notify error
      this.emit('error', err)

    });

    return this;
  }

  // send revoke transaction
  revoke(opts) {

    // validate inputs
    opts = validateRevokeOpts(opts);

    const revokeData = this.buildRevokeData(opts);

    const sendOpts = {
      from: from,
      to: this.config.wanHtlcAddrBtc,
      gas: 4700000,
      gasPrice: 180e9,
      data: revokeData,
    };

    this.emit('info', { status: 'starting' });

    web3Util(this.web3wan).sendTransaction(sendOpts).then(receipt => {

      // notify complete
      this.emit('complete', { status: 'revoked', receipt });

    }).catch(err => {

      // notify error
      this.emit('error', err)

    });

    return this;
  }

  // send lock transaction
  sendLockTx({ to, from, value, storeman, redeemKey, fee }) {

    const lockData = this.buildLockData({
      to,
      value,
      storeman,
      redeemKey,
    });

    const sendOpts = {
      from: from,
      to: this.config.wanHtlcAddrBtc,
      gas: 4700000,
      gasPrice: 180e9,
      value: fee,
      data: lockData,
    };

    return web3Util(this.web3wan).sendTransaction(sendOpts);
  }

  // listen for storeman tx
  listenLockTx({ redeemKey }, blockNumber) {

    const lockScanOpts = {
      blockNumber,
      address: this.config.wanHtlcAddrBtc,
      topics: [
        '0x' + this.config.signatures.HTLCWBTC.WBTC2BTCLockNotice,
        null,
        null,
        '0x' + redeemKey.xHash,
      ],
    };

    return web3Util(this.web3wan).watchLogs(lockScanOpts);
  }

  // send redeem transaction
  sendRedeemTx({ from, redeemKey }) {

    const redeemData = this.buildRedeemData({ redeemKey });

    const sendOpts = {
      from: from,
      to: this.config.wanHtlcAddrBtc,
      gas: 4700000,
      gasPrice: 180e9,
      data: redeemData,
    };

    return web3Util(this.web3wan).sendTransaction(sendOpts);
  }

  // listen for storeman tx
  listenRedeemTx({ redeemKey }, blockNumber) {

    const redeemScanOpts = {
      blockNumber,
      address: this.config.wanHtlcAddrBtc,
      topics: [
        '0x' + this.config.signatures.HTLCWBTC.WBTC2BTCRefund,
        null,
        null,
        '0x' + redeemKey.xHash,
      ],
    };

    return web3Util(this.web3wan).watchLogs(redeemScanOpts);
  }

  buildLockData({ to, value, storeman, redeemKey }) {
    const sig = this.config.signatures.HTLCWBTC.wbtc2btcLock;
    const toAddr = btcUtil.addressToHash160(to, 'pubkeyhash', this.config.network);

    return '0x' + sig.substr(0, 8) + redeemKey.xHash
      + types.addr2Bytes(storeman.wan)
      + types.addr2Bytes(toAddr)
      + types.number2Bytes(value);
  }

  buildRedeemData({ redeemKey }) {
    const sig = this.config.signatures.HTLCWBTC.wbtc2btcRefund;
    return '0x' + sig.substr(0, 8) + redeemKey.x;
  }

  buildRevokeData({ redeemKey }) {
    const sig = this.config.signatures.HTLCWBTC.wbtc2btcRevoke;
    return '0x' + sig.substr(0, 8) + wanutils.stripHexPrefix(redeemKey.xHash);
  }

  getStoremanFee({ storeman, value }) {
    const to = this.config.wanHtlcAddrBtc;
    const sig = this.config.signatures.HTLCWBTC.getWbtc2BtcFee;

    const data = '0x' + sig.substr(0, 8)
      + types.addr2Bytes(storeman.wan)
      + types.number2Bytes(value);

    return web3Util(this.web3wan).call({ to, data });
  }
}

module.exports = BTC_Outbound;
