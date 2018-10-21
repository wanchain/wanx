const wanutils = require('wanchain-util');

const CrosschainBase = require('../base');
const web3Util = require('../../web3-util');
const types = require('../../types');

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
    this.opts = validateSendOpts(opts);

    Promise.resolve([]).then(() => {

      // notify status
      this.emit('info', { status: 'starting', redeemKey: this.opts.redeemKey });

      return this.sendLockTx();

    }).then(receipt => {

      // notify status
      this.emit('info', { status: 'locking', receipt });

      return this.listenLockTx(receipt.blockNumber);

    }).then(receipt => {

      // notify locked status
      this.emit('info', { status: 'locked', receipt });

      return this.sendRefundTx();

    }).then(receipt => {

      // notify refund result
      this.emit('info', { status: 'confirming', receipt });

      return this.listenRefundTx(receipt.blockNumber);

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
    this.opts = validateSendOpts(opts);

    Promise.resolve([]).then(() => {

      // notify status
      this.emit('info', { status: 'starting', redeemKey: this.opts.redeemKey });

      return this.sendLockTx();

    }).then(receipt => {

      // notify status
      this.emit('info', { status: 'locking', receipt });

      return this.listenLockTx(receipt.blockNumber);

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
    this.opts = validateRedeemOpts(opts);

    Promise.resolve([]).then(() => {

      // notify status
      this.emit('info', { status: 'starting', redeemKey: this.opts.redeemKey });

      return this.sendRefundTx();

    }).then(receipt => {

      // notify refund result
      this.emit('info', { status: 'confirming', receipt });

      return this.listenRefundTx(receipt.blockNumber);

    }).then(receipt => {

      // notify complete
      this.emit('complete', { status: 'confirmed', receipt });

    }).catch(err => {

      // notify error
      this.emit('error', err)

    });

    return this;
  }

  // send revoke transaction on ethereum
  revoke(opts) {

    // validate inputs
    this.opts = validateRevokeOpts(opts);

    const revokeData = this.buildRevokeData(this.opts.xHash);

    const sendOpts = {
      from: this.opts.source,
      to: this.config.ethHtlcAddr,
      gas: 4910000,
      gasPrice: 100e9,
      data: revokeData,
    };

    this.emit('info', { status: 'starting' });

    web3Util(this.web3eth).sendTransaction(sendOpts).then(receipt => {

      // notify complete
      this.emit('complete', { status: 'revoked', receipt });

    }).catch(err => {

      // notify error
      this.emit('error', err)

    });

    return this;
  }

  // send lock transaction on ethereum
  sendLockTx() {

    const lockData = this.buildLockData(
      this.opts.storeman.eth,
      this.opts.destination,
    );

    const sendOpts = {
      from: this.opts.source,
      to: this.config.ethHtlcAddr,
      value: this.opts.value,
      gas: 4910000,
      gasPrice: 100e9,
      data: lockData,
    };

    return web3Util(this.web3eth).sendTransaction(sendOpts);
  }

  // listen for storeman tx on wanchain
  listenLockTx(blockNumber) {

    const lockScanOpts = {
      blockNumber,
      address: this.config.wanHtlcAddr,
      topics: [
        '0x' + this.config.signatures.HTLCWETH.ETH2WETHLock,
        null,
        null,
        '0x' + this.opts.redeemKey.xHash,
      ],
    };

    return web3Util(this.web3wan).watchLogs(lockScanOpts);
  }

  // send refund transaction on wanchain
  sendRefundTx() {
    const refundData = this.buildRefundData();

    const sendOpts = {
      from: this.opts.destination,
      to: this.config.wanHtlcAddr,
      gas: 4700000,
      gasPrice: 180e9,
      data: refundData,
    };

    return web3Util(this.web3wan).sendTransaction(sendOpts);
  }

  // listen for storeman tx on ethereum
  listenRefundTx(blockNumber) {

    const refundScanOpts = {
      blockNumber,
      address: this.config.ethHtlcAddr,
      topics: [
        '0x' + this.config.signatures.HTLCETH.ETH2WETHRefund,
        null,
        null,
        '0x' + this.opts.redeemKey.xHash,
      ],
    };

    return web3Util(this.web3eth).watchLogs(refundScanOpts);
  }

  buildLockData(storeman, destination) {
    const sig = this.config.signatures.HTLCETH.eth2wethLock;

    return '0x' + sig.substr(0, 8) + this.opts.redeemKey.xHash
      + types.addr2Bytes(storeman)
      + types.addr2Bytes(destination);
  }

  buildRefundData() {
    const sig = this.config.signatures.HTLCWETH.eth2wethRefund;
    return '0x' + sig.substr(0, 8) + this.opts.redeemKey.x;
  }

  buildRevokeData(xHash) {
    const sig = this.config.signatures.HTLCETH.eth2wethRevoke;
    return '0x' + sig.substr(0, 8) + wanutils.stripHexPrefix(xHash);
  }
}

module.exports = ETH_Inbound;
