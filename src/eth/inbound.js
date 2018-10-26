const wanutils = require('wanchain-util');

const CrosschainBase = require('../base');
const web3Util = require('../lib/web3');
const types = require('../lib/types');

const {
  validateSendOpts,
  validateRedeemOpts,
  validateRevokeOpts,
} = require('./validate');

class ETH_Inbound extends CrosschainBase {

  constructor(config) {
    super(config);
  }

  // complete crosschain transaction
  send(opts) {

    // validate inputs
    opts = validateSendOpts(opts);

    return Promise.resolve([]).then(() => {

      // notify status
      this.emit('info', { status: 'starting', redeemKey: opts.redeemKey });

      return this.sendLockTx(opts);

    }).then(receipt => {

      // notify status
      this.emit('info', { status: 'locking', receipt });

      return web3Util(this.web3wan).getBlockNumber();

    }).then(blockNumber => {

      return this.listenLockTx(opts, blockNumber);

    }).then(receipt => {

      // notify locked status
      this.emit('info', { status: 'locked', receipt });

      return this.sendRedeemTx(opts);

    }).then(receipt => {

      // notify refund result
      this.emit('info', { status: 'confirming', receipt });

      return web3Util(this.web3eth).getBlockNumber();

    }).then(blockNumber => {

      return this.listenRedeemTx(opts, blockNumber);

    }).then(receipt => {

      // notify complete
      this.emit('complete', { status: 'confirmed', receipt });

    }).catch(err => {

      // notify error
      this.emit('error', err)

    });
  }

  // first 1/2 of crosschain transaction
  lock(opts) {

    // validate inputs
    opts = validateSendOpts(opts);

    return Promise.resolve([]).then(() => {

      // notify status
      this.emit('info', { status: 'starting', redeemKey: opts.redeemKey });

      return this.sendLockTx(opts);

    }).then(receipt => {

      // notify status
      this.emit('info', { status: 'locking', receipt });

      return web3Util(this.web3wan).getBlockNumber();

    }).then(blockNumber => {

      return this.listenLockTx(opts, blockNumber);

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

      return web3Util(this.web3eth).getBlockNumber();

    }).then(blockNumber => {

      return this.listenRedeemTx(opts, blockNumber);

    }).then(receipt => {

      // notify complete
      this.emit('complete', { status: 'confirmed', receipt });

    }).catch(err => {

      // notify error
      this.emit('error', err)

    });
  }

  // send revoke transaction on ethereum
  revoke(opts) {

    // validate inputs
    const { from, redeemKey } = validateRevokeOpts(opts);

    const revokeData = this.buildRevokeData({ redeemKey });

    const sendOpts = {
      from: from,
      to: this.config.ethHtlcAddr,
      gas: 4910000,
      gasPrice: 100e9,
      data: revokeData,
    };

    this.emit('info', { status: 'starting' });

    return web3Util(this.web3eth).sendTransaction(sendOpts).then(receipt => {

      // notify complete
      this.emit('complete', { status: 'revoked', receipt });

    }).catch(err => {

      // notify error
      this.emit('error', err)

    });
  }

  // send lock transaction on ethereum
  sendLockTx({ to, from, value, storeman, redeemKey }) {

    const lockData = this.buildLockData({
      to,
      storeman,
      redeemKey,
    });

    const sendOpts = {
      from: from,
      to: this.config.ethHtlcAddr,
      value: value,
      gas: 4910000,
      gasPrice: 100e9,
      data: lockData,
    };

    return web3Util(this.web3eth).sendTransaction(sendOpts);
  }

  // listen for storeman tx on wanchain
  listenLockTx({ redeemKey }, blockNumber) {

    const lockScanOpts = {
      blockNumber,
      address: this.config.wanHtlcAddr,
      topics: [
        '0x' + this.config.signatures.HTLCWETH.ETH2WETHLock,
        null,
        null,
        '0x' + redeemKey.xHash,
      ],
    };

    return web3Util(this.web3wan).watchLogs(lockScanOpts);
  }

  // send refund transaction on wanchain
  sendRedeemTx({ to, redeemKey }) {
    const refundData = this.buildRedeemData({ redeemKey });

    const sendOpts = {
      from: to,
      to: this.config.wanHtlcAddr,
      gas: 4700000,
      gasPrice: 180e9,
      data: refundData,
    };

    return web3Util(this.web3wan).sendTransaction(sendOpts);
  }

  // listen for storeman tx on ethereum
  listenRedeemTx({ redeemKey }, blockNumber) {

    const refundScanOpts = {
      blockNumber,
      address: this.config.ethHtlcAddr,
      topics: [
        '0x' + this.config.signatures.HTLCETH.ETH2WETHRefund,
        null,
        null,
        '0x' + redeemKey.xHash,
      ],
    };

    return web3Util(this.web3eth).watchLogs(refundScanOpts);
  }

  buildLockData({ storeman, to, redeemKey }) {
    const sig = this.config.signatures.HTLCETH.eth2wethLock;

    return '0x' + sig.substr(0, 8) + redeemKey.xHash
      + types.addr2Bytes(storeman.eth)
      + types.addr2Bytes(to);
  }

  buildRedeemData({ redeemKey }) {
    const sig = this.config.signatures.HTLCWETH.eth2wethRefund;
    return '0x' + sig.substr(0, 8) + redeemKey.x;
  }

  buildRevokeData({ redeemKey }) {
    const sig = this.config.signatures.HTLCETH.eth2wethRevoke;
    return '0x' + sig.substr(0, 8) + wanutils.stripHexPrefix(redeemKey.xHash);
  }
}

module.exports = ETH_Inbound;
