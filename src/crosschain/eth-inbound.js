const wanutils = require('wanchain-util');

const CrosschainBase = require('./base');
const web3Util = require('../web3Util');
const utils = require('../utils');

class CrosschainETH_Inbound extends CrosschainBase {

  constructor(config) {
    super(config);

    this.type = 'ETH';
  }

  // send complete crosschain transaction
  send(opts) {

    // validate inputs
    this.opts = utils.validateSendOpts(this.type, opts);

    this.redeemKey = this.opts.redeemKey || utils.generateXPair();

    Promise.resolve([]).then(() => {

      // notify status
      this.emit('info', Object.assign({ status: 'starting' }, this.redeemKey));

      return this.sendLockTx();

    }).then(receipt => {

      // notify status
      this.emit('info', { status: 'lockPending', receipt });

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
    this.opts = utils.validateSendOpts(this.type, opts);

    this.redeemKey = this.opts.redeemKey || utils.generateXPair();

    Promise.resolve([]).then(() => {

      // notify status
      this.emit('info', Object.assign({ status: 'starting' }, this.redeemKey));

      return this.sendLockTx();

    }).then(receipt => {

      // notify status
      this.emit('info', { status: 'lockPending', receipt });

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
  redeem(opts) {

    // validate inputs
    this.opts = utils.validateRedeemOpts(this.type, opts);

    this.redeemKey = this.opts.redeemKey;

    Promise.resolve([]).then(() => {

      // notify status
      this.emit('info', { status: 'starting' });

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
    this.opts = utils.validateRevokeOpts(this.type, opts);

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
        '0x' + this.redeemKey.xHash,
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
        '0x' + this.redeemKey.xHash,
      ],
    };

    return web3Util(this.web3eth).watchLogs(refundScanOpts);
  }

  buildLockData(storeman, destination) {
    const sig = this.config.signatures.HTLCETH.eth2wethLock;

    return '0x' + sig.substr(0, 8) + this.redeemKey.xHash
      + utils.addr2Bytes(storeman)
      + utils.addr2Bytes(destination);
  }

  buildRefundData() {
    const sig = this.config.signatures.HTLCWETH.eth2wethRefund;
    return '0x' + sig.substr(0, 8) + this.redeemKey.x;
  }

  buildRevokeData(xHash) {
    const sig = this.config.signatures.HTLCETH.eth2wethRevoke;
    return '0x' + sig.substr(0, 8) + wanutils.stripHexPrefix(xHash);
  }
}

module.exports = CrosschainETH_Inbound;
