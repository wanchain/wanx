const BigNumber = require('bignumber.js');

const CrosschainBase = require('../base');
const web3Util = require('../lib/web3');
const types = require('../lib/types');
const hex = require('../lib/hex');

const {
  validateSendOpts,
  validateRedeemOpts,
  validateRevokeOpts,
} = require('./validate');

class ETH_Outbound extends CrosschainBase {

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

      return this.getStoremanFee(opts);

    }).then(res => {

      const fee = new BigNumber(res).toString();

      // notify status
      this.emit('info', { status: 'fee', fee });

      return this.sendLockTx(Object.assign({}, opts, { fee }));

    }).then(receipt => {

      // notify status
      this.emit('info', { status: 'locking', receipt });

      return web3Util(this.web3eth).getBlockNumber();

    }).then(blockNumber => {

      return this.listenLockTx(opts, blockNumber);

    }).then(receipt => {

      // notify locked status
      this.emit('info', { status: 'locked', receipt });

      return this.sendRedeemTx(opts);

    }).then(receipt => {

      // notify refund result
      this.emit('info', { status: 'confirming', receipt });

      return web3Util(this.web3wan).getBlockNumber();

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

      return this.getStoremanFee(opts);

    }).then(res => {

      const fee = new BigNumber(res).toString();

      // notify status
      this.emit('info', { status: 'fee', fee });

      return this.sendLockTx(Object.assign({}, opts, { fee }));

    }).then(receipt => {

      // notify status
      this.emit('info', { status: 'locking', receipt });

      return web3Util(this.web3eth).getBlockNumber();

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

      return web3Util(this.web3wan).getBlockNumber();

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

  // send revoke transaction on wanchain
  revoke(opts) {

    // validate inputs
    opts = validateRevokeOpts(opts);

    const sendOpts = this.buildRevokeTx(opts);

    this.emit('info', { status: 'starting' });

    return web3Util(this.web3wan).sendTransaction(sendOpts).then(receipt => {

      // notify complete
      this.emit('complete', { status: 'revoked', receipt });

    }).catch(err => {

      // notify error
      this.emit('error', err)

    });
  }

  // send lock transaction on wanchain
  sendLockTx(opts) {
    const sendOpts = this.buildLockTx(opts);
    return web3Util(this.web3wan).sendTransaction(sendOpts);
  }

  // listen for storeman tx on ethereum
  listenLockTx(opts, blockNumber) {
    const lockScanOpts = this.buildLockScanOpts(opts, blockNumber);
    return web3Util(this.web3eth).watchLogs(lockScanOpts);
  }

  // send refund transaction on ethereum
  sendRedeemTx(opts) {
    const sendOpts = this.buildRedeemTx(opts);
    return web3Util(this.web3eth).sendTransaction(sendOpts);
  }

  // listen for storeman tx on wanchain
  listenRedeemTx(opts, blockNumber) {
    const redeemScanOpts = this.buildRedeemScanOpts(opts, blockNumber);
    return web3Util(this.web3wan).watchLogs(redeemScanOpts);
  }

  buildLockTx({ to, from, value, storeman, redeemKey, fee }) {
    const lockData = this.buildLockData({
      to,
      value,
      storeman,
      redeemKey,
    });

    return {
      Txtype: '0x01',
      from: from,
      to: this.config.wanHtlcAddr,
      gas: hex.fromNumber(4700000),
      gasPrice: hex.fromNumber(180e9),
      value: hex.fromNumber(fee),
      data: lockData,
    };
  }

  buildRedeemTx({ to, redeemKey }) {
    const redeemData = this.buildRedeemData({ redeemKey });

    return {
      from: to,
      to: this.config.ethHtlcAddr,
      gas: hex.fromNumber(4910000),
      gasPrice: hex.fromNumber(100e9),
      data: redeemData,
    };
  }

  buildRevokeTx({ from, redeemKey }) {
    const revokeData = this.buildRevokeData({ redeemKey });

    return {
      Txtype: '0x01',
      from: from,
      to: this.config.wanHtlcAddr,
      gas: hex.fromNumber(4700000),
      gasPrice: hex.fromNumber(180e9),
      data: revokeData,
    };
  }

  buildLockScanOpts({ redeemKey }, blockNumber) {
    return {
      blockNumber,
      address: this.config.ethHtlcAddr,
      topics: [
        '0x' + this.config.signatures.HTLCETH.WETH2ETHLock,
        null,
        null,
        '0x' + hex.stripPrefix(redeemKey.xHash),
      ],
    };
  }

  buildRedeemScanOpts({ redeemKey }, blockNumber) {
    return {
      blockNumber,
      address: this.config.wanHtlcAddr,
      topics: [
        '0x' + this.config.signatures.HTLCWETH.WETH2ETHRefund,
        null,
        null,
        '0x' + hex.stripPrefix(redeemKey.xHash),
      ],
    };
  }

  buildLockData({ to, value, storeman, redeemKey }) {
    const sig = this.config.signatures.HTLCWETH.weth2ethLock;

    return '0x' + sig.substr(0, 8) + hex.stripPrefix(redeemKey.xHash)
      + types.hex2Bytes32(storeman.wan)
      + types.hex2Bytes32(to)
      + types.num2Bytes32(value);
  }

  buildRedeemData({ redeemKey }) {
    const sig = this.config.signatures.HTLCETH.weth2ethRefund;
    return '0x' + sig.substr(0, 8) + hex.stripPrefix(redeemKey.x);
  }

  buildRevokeData({ redeemKey }) {
    const sig = this.config.signatures.HTLCWETH.weth2ethRevoke;
    return '0x' + sig.substr(0, 8) + hex.stripPrefix(redeemKey.xHash);
  }

  getStoremanFee(opts) {
    const callOpts = this.buildStoremanFeeTx(opts)
    return web3Util(this.web3wan).call(callOpts);
  }

  buildStoremanFeeTx(opts) {
    const to = this.config.wanHtlcAddr;
    const data = this.buildStoremanFeeData(opts);

    return { to, data };
  }

  buildStoremanFeeData({ storeman, value }) {
    const sig = this.config.signatures.HTLCWETH.getWeth2EthFee;
    return '0x' + sig.substr(0, 8)
      + types.hex2Bytes32(storeman.wan)
      + types.num2Bytes32(value);
  }
}

module.exports = ETH_Outbound;
