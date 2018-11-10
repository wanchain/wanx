const CrosschainBase = require('../base');
const web3Util = require('../lib/web3');
const types = require('../lib/types');
const hex = require('../lib/hex');

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

      return this.sendLock(opts);

    }).then(receipt => {

      return this.web3wan.eth.getBlockNumber();

    }).then(blockNumber => {

      return this.listenLock(opts, blockNumber);

    }).then(receipt => {

      this.emit('info', { status: 'locked', receipt });

      return this.sendRedeem(opts);

    }).then(receipt => {

      return this.web3eth.eth.getBlockNumber();

    }).then(blockNumber => {

      return this.listenRedeem(opts, blockNumber);

    }).then(receipt => {

      // notify complete
      this.emit('complete', { status: 'redeemed', receipt });

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

      return this.sendLock(opts);

    }).then(receipt => {

      return this.web3wan.eth.getBlockNumber();

    }).then(blockNumber => {

      return this.listenLock(opts, blockNumber);

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

      return this.sendRedeem(opts);

    }).then(receipt => {

      return this.web3eth.eth.getBlockNumber();

    }).then(blockNumber => {

      return this.listenRedeem(opts, blockNumber);

    }).then(receipt => {

      // notify complete
      this.emit('complete', { status: 'redeemed', receipt });

    }).catch(err => {

      // notify error
      this.emit('error', err)

    });
  }

  // send lock transaction on ethereum
  sendLock(opts) {
    const sendOpts = this.buildLockTx(opts);

    return this.web3eth.eth.sendTransaction(sendOpts)
      .on('transactionHash', hash => {
        this.emit('info', { status: 'lockHash', hash });
      })
      .on('receipt', receipt => {
        this.emit('info', { status: 'locked', receipt });
      })
      .on('error', err => {
        this.emit('error', err);
      });
  }

  // listen for storeman tx on wanchain
  listenLock(opts, blockNumber) {
    const lockScanOpts = this.buildLockScanOpts(opts, blockNumber);
    return web3Util(this.web3wan).watchLogs(lockScanOpts);
  }

  // send refund transaction on wanchain
  sendRedeem(opts) {
    const sendOpts = this.buildRedeemTx(opts);

    return this.web3wan.eth.sendTransaction(sendOpts)
      .on('transactionHash', hash => {
        this.emit('info', { status: 'redeemHash', hash });
      })
      .on('receipt', receipt => {
        this.emit('info', { status: 'redeemed', receipt });
      })
      .on('error', err => {
        this.emit('error', err);
      });
  }

  // listen for storeman tx on ethereum
  listenRedeem(opts, blockNumber) {
    const redeemScanOpts = this.buildRedeemScanOpts(opts, blockNumber);
    return web3Util(this.web3eth).watchLogs(redeemScanOpts);
  }

  // send revoke transaction on ethereum
  sendRevoke(opts) {
    const sendOpts = this.buildRevokeTx(opts);

    return this.web3eth.eth.sendTransaction(sendOpts)
      .on('transactionHash', hash => {
        this.emit('info', { status: 'revokeHash', hash });
      })
      .on('receipt', receipt => {
        this.emit('info', { status: 'revoked', receipt });
      })
      .on('error', err => {
        this.emit('error', err);
      });
  }

  buildLockTx({ to, from, value, storeman, redeemKey }) {
    const lockData = this.buildLockData({
      to,
      storeman,
      redeemKey,
    });

    return {
      from: from,
      to: this.config.ethHtlcAddr,
      value: hex.fromNumber(value),
      gas: hex.fromNumber(4910000),
      gasPrice: hex.fromNumber(100e9),
      data: lockData,
    };
  }

  buildRedeemTx({ to, redeemKey }) {
    const redeemData = this.buildRedeemData({ redeemKey });

    return {
      Txtype: '0x01',
      from: to,
      to: this.config.wanHtlcAddr,
      gas: hex.fromNumber(4700000),
      gasPrice: hex.fromNumber(180e9),
      data: redeemData,
    };
  }

  buildRevokeTx({ from, redeemKey }) {
    const revokeData = this.buildRevokeData({ redeemKey });

    return {
      from: from,
      to: this.config.ethHtlcAddr,
      gas: hex.fromNumber(4910000),
      gasPrice: hex.fromNumber(100e9),
      data: revokeData,
    };
  }

  buildLockScanOpts({ redeemKey }, blockNumber) {
    const { ETH2WETHLock } = this.config.signatures.HTLCWETH;

    return {
      blockNumber,
      address: this.config.wanHtlcAddr,
      topics: [
        '0x' + ETH2WETHLock,
        null,
        null,
        '0x' + hex.stripPrefix(redeemKey.xHash),
      ],
    };
  }

  buildRedeemScanOpts({ redeemKey }, blockNumber) {
    const { ETH2WETHRefund } = this.config.signatures.HTLCETH;

    return {
      blockNumber,
      address: this.config.ethHtlcAddr,
      topics: [
        '0x' + ETH2WETHRefund,
        null,
        null,
        '0x' + hex.stripPrefix(redeemKey.xHash),
      ],
    };
  }

  buildLockData({ storeman, to, redeemKey }) {
    const { eth2wethLock } = this.config.signatures.HTLCETH;

    return '0x' + eth2wethLock.substr(0, 8)
      + hex.stripPrefix(redeemKey.xHash)
      + types.hex2Bytes32(storeman.eth)
      + types.hex2Bytes32(to);
  }

  buildRedeemData({ redeemKey }) {
    const { eth2wethRefund } = this.config.signatures.HTLCWETH;

    return '0x' + eth2wethRefund.substr(0, 8)
      + hex.stripPrefix(redeemKey.x);
  }

  buildRevokeData({ redeemKey }) {
    const { eth2wethRevoke } = this.config.signatures.HTLCETH;

    return '0x' + eth2wethRevoke.substr(0, 8)
      + hex.stripPrefix(redeemKey.xHash);
  }
}

module.exports = ETH_Inbound;
