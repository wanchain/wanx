const BigNumber = require('bignumber.js');
const wanutils = require('wanchain-util');

const CrosschainBase = require('../base');
const web3Util = require('../../web3-util');
const { generateXPair } = require('../../crypto');
const types = require('../../types');

const {
  validateSendOpts,
  validateRedeemOpts,
  validateRevokeOpts,
} = require('./validate');

class ETH_Outbound extends CrosschainBase {

  constructor(config) {
    super(config);

    this.type = 'ETH';
  }

  // complete crosschain transaction
  send(opts) {

    // validate inputs
    this.opts = validateSendOpts(this.type, opts);

    let {
      value,
      storeman,
    } = this.opts;

    this.redeemKey = this.opts.redeemKey || generateXPair();

    Promise.resolve([]).then(() => {

      // notify status
      this.emit('info', { status: 'starting', redeemKey: this.redeemKey });

      return this.getStoremanFee(storeman.wan, value);

    }).then(res => {

      const fee = new BigNumber(res).toString();

      // notify status
      this.emit('info', { status: 'fee', fee });

      return this.sendLockTx(fee);

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
    this.opts = validateSendOpts(this.type, opts);

    let {
      value,
      storeman,
    } = this.opts;

    this.redeemKey = this.opts.redeemKey || generateXPair();

    Promise.resolve([]).then(() => {

      // notify status
      this.emit('info', { status: 'starting', redeemKey: this.redeemKey });

      return this.getStoremanFee(storeman.wan, value);

    }).then(res => {

      const fee = new BigNumber(res).toString();

      // notify status
      this.emit('info', { status: 'fee', fee });

      return this.sendLockTx(fee);

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
    this.opts = validateRedeemOpts(this.type, opts);

    this.redeemKey = this.opts.redeemKey;

    Promise.resolve([]).then(() => {

      // notify status
      this.emit('info', { status: 'starting', redeemKey: this.redeemKey });

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

  // send revoke transaction on wanchain
  revoke(opts) {

    // validate inputs
    this.opts = validateRevokeOpts(this.type, opts);

    const revokeData = this.buildRevokeData(this.opts.xHash);

    const sendOpts = {
      from: this.opts.source,
      to: this.config.wanHtlcAddr,
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

    return web3Util(this.web3wan).sendTransaction(sendOpts);
  }

  // listen for storeman tx on ethereum
  listenLockTx(blockNumber) {

    const lockScanOpts = {
      blockNumber,
      address: this.config.ethHtlcAddr,
      topics: [
        '0x' + this.config.signatures.HTLCETH.WETH2ETHLock,
        null,
        null,
        '0x' + this.redeemKey.xHash,
      ],
    };

    return web3Util(this.web3eth).watchLogs(lockScanOpts);
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

    return web3Util(this.web3eth).sendTransaction(sendOpts);
  }

  // listen for storeman tx on wanchain
  listenRefundTx(blockNumber) {

    const refundScanOpts = {
      blockNumber,
      address: this.config.wanHtlcAddr,
      topics: [
        '0x' + this.config.signatures.HTLCWETH.WETH2ETHRefund,
        null,
        null,
        '0x' + this.redeemKey.xHash,
      ],
    };

    return web3Util(this.web3wan).watchLogs(refundScanOpts);
  }

  buildLockData(storeman, destination, value) {
    const sig = this.config.signatures.HTLCWETH.weth2ethLock;

    return '0x' + sig.substr(0, 8) + this.redeemKey.xHash
      + types.addr2Bytes(storeman)
      + types.addr2Bytes(destination)
      + types.number2Bytes(value)
  }

  buildRefundData() {
    const sig = this.config.signatures.HTLCETH.weth2ethRefund;
    return '0x' + sig.substr(0, 8) + this.redeemKey.x;
  }

  buildRevokeData(xHash) {
    const sig = this.config.signatures.HTLCWETH.weth2ethRevoke;
    return '0x' + sig.substr(0, 8) + wanutils.stripHexPrefix(xHash);
  }

  getStoremanFee(storeman, value) {
    const to = this.config.wanHtlcAddr;
    const sig = this.config.signatures.HTLCWETH.getWeth2EthFee;

    const data = '0x' + sig.substr(0, 8)
      + types.addr2Bytes(storeman)
      + types.number2Bytes(value)

    return web3Util(this.web3wan).call({ to, data });
  }
}

module.exports = ETH_Outbound;
