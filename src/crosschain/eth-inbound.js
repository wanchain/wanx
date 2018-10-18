const wanutils = require('wanchain-util');

const CrosschainBase = require('./base');
const utils = require('../utils');

class CrosschainETH_Inbound extends CrosschainBase {

  constructor(config) {
    super(config);

    this.type = 'ETH';
  }

  send(opts) {

    // validate inputs
    this.opts = utils.validateSendOpts(this.type, opts);

    let {
      storeman
    } = this.opts;

    // TODO: add storeman auto-select if not passed in opts
    if (! storeman) {
      //
    }

    this.x = utils.generateXHash();

    // TODO: add handling for failed transactions
    Promise.resolve([]).then(() => {

      // notify status
      this.emit('info', Object.assign({ status: 'starting' }, this.x));

      return this.sendLockTx();

    }).then(receipt => {

      // notify status
      this.emit('info', { status: 'lockPending', receipt });

      return this.listenLockTx();

    }).then(receipt => {

      // notify locked status
      this.emit('info', { status: 'locked', receipt });

      return this.sendRefundTx();

    }).then(receipt => {

      // notify refund result
      this.emit('info', { status: 'confirming', receipt });

      return this.listenRefundTx();

    }).then(receipt => {

      // notify complete
      this.emit('complete', { receipt });

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

    this.web3eth.eth.sendTransaction(sendOpts).then(receipt => {

      // notify complete
      this.emit('complete', { receipt });

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

    return this.web3eth.eth.sendTransaction(sendOpts);
  }

  // listen for storeman tx on wanchain
  listenLockTx() {

    const lockScanOpts = {
      chainType: 'WAN',
      address: this.config.wanHtlcAddr,
      topics: [
        '0x' + this.config.signatures.HTLCWETH.ETH2WETHLock,
        null,
        null,
        '0x' + this.x.hashX,
      ],
    };

    return this.rpcRequest('monitorLog', lockScanOpts);
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

    return this.web3wan.eth.sendTransaction(sendOpts);
  }

  // listen for storeman tx on ethereum
  listenRefundTx() {

    const refundScanOpts = {
      chainType: 'ETH',
      address: this.config.ethHtlcAddr,
      topics: [
        '0x' + this.config.signatures.HTLCETH.ETH2WETHRefund,
        null,
        null,
        '0x' + this.x.hashX,
      ],
    };

    return this.rpcRequest('monitorLog', refundScanOpts);
  }

  buildLockData(storeman, destination) {
    const sig = this.config.signatures.HTLCETH.eth2wethLock;

    return '0x' + sig.substr(0, 8) + this.x.hashX
      + utils.addr2Bytes(storeman)
      + utils.addr2Bytes(destination);
  }

  buildRefundData() {
    const sig = this.config.signatures.HTLCWETH.eth2wethRefund;
    return '0x' + sig.substr(0, 8) + this.x.x;
  }

  buildRevokeData(xHash) {
    const sig = this.config.signatures.HTLCETH.eth2wethRevoke;
    return '0x' + sig.substr(0, 8) + wanutils.stripHexPrefix(xHash);
  }
}

module.exports = CrosschainETH_Inbound;
