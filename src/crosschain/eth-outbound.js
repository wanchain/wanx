const BigNumber = require('bignumber.js');

const CrosschainBase = require('./base');
const utils = require('../utils');

class CrosschainETH_Outbound extends CrosschainBase {

  constructor(config) {
    super(config);

    this.type = 'ETH';
  }

  send(opts) {

    // validate inputs
    this.opts = utils.validateCrosschainOpts(this.type, opts);

    let {
      value,
      storeman,
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

      return this.getStoremanFee(storeman.wan, value);

    }).then(res => {

      const fee = new BigNumber(res).toString();

      // notify status
      this.emit('info', { status: 'fee', fee });

      return this.sendLockTx(fee);

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

  // send lock transaction on wanchain
  sendLockTx(fee) {

    const lockData = this.buildLockData(
      this.opts.storeman.wan,
      this.opts.destination,
      this.opts.value,
    );

    // TODO: calculate eth2WethFee (passed as value)
    const sendOpts = {
      from: this.opts.source,
      to: this.config.wanHtlcAddr,
      gas: 4700000,
      gasPrice: 180e9,
      value: fee,
      data: lockData,
    };

    return this.web3wan.eth.sendTransaction(sendOpts);
  }

  // listen for storeman tx on ethereum
  listenLockTx() {

    const lockScanOpts = {
      chainType: 'ETH',
      address: this.config.ethHtlcAddr,
      topics: [
        '0x' + this.config.signatures.HTLCETH.WETH2ETHLock,
        null,
        null,
        '0x' + this.x.hashX,
      ],
    };

    return this.rpcRequest('monitorLog', lockScanOpts);
  }

  // send refund transaction on ethereum
  sendRefundTx() {

    const refundData = this.buildRefundData();

    const sendOpts = {
      from: this.opts.destination,
      to: this.config.ethHtlcAddr,
      gas: 4910000,
      gasPrice: 100e9,
      data: refundData,
    };

    return this.web3eth.eth.sendTransaction(sendOpts);
  }

  // listen for storeman tx on wanchain
  listenRefundTx() {

    const refundScanOpts = {
      chainType: 'WAN',
      address: this.config.wanHtlcAddr,
      topics: [
        '0x' + this.config.signatures.HTLCWETH.WETH2ETHRefund,
        null,
        null,
        '0x' + this.x.hashX,
      ],
    };

    return this.rpcRequest('monitorLog', refundScanOpts);
  }

  buildLockData(storeman, destination, value) {
    const sig = this.config.signatures.HTLCWETH.weth2ethLock;

    return '0x' + sig.substr(0, 8) + this.x.hashX
      + utils.addr2Bytes(storeman)
      + utils.addr2Bytes(destination)
      + utils.number2Bytes(value)
  }

  buildRefundData() {
    const sig = this.config.signatures.HTLCETH.weth2ethRefund;
    return '0x' + sig.substr(0, 8) + this.x.x;
  }

  buildRevokeData() {
    const sig = this.config.signatures.HTLCWETH.weth2ethRevoke;
    return '0x' + sig.substr(0, 8) + this.x.x;
  }

  getStoremanFee(storeman, value) {
    const to = this.config.wanHtlcAddr;
    const sig = this.config.signatures.HTLCWETH.getWeth2EthFee;

    const data = '0x' + sig.substr(0, 8)
      + utils.addr2Bytes(storeman)
      + utils.number2Bytes(value)

    return this.web3wan.eth.call({ to, data });
  }
}

module.exports = CrosschainETH_Outbound;
