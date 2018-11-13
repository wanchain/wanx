const CrosschainBase = require('../base');
const web3Util = require('../lib/web3');
const types = require('../lib/types');
const hex = require('../lib/hex');

const {
  validateSendOpts,
  validateRedeemOpts,
  validateRevokeOpts,
} = require('./validate');

class ERC20_Inbound extends CrosschainBase {

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

      return this.sendApprove(opts);

    }).then(receipt => {

      return this.sendLock(opts);

    }).then(receipt => {

      return this.web3wan.eth.getBlockNumber();

    }).then(blockNumber => {

      return this.listenLock(opts, blockNumber);

    }).then(receipt => {

      return this.sendRedeem(opts);

    }).then(receipt => {

      return this.web3eth.eth.getBlockNumber();

    }).then(blockNumber => {

      return this.listenRedeem(opts, blockNumber);

    }).then(receipt => {

      // notify complete
      this.emit('complete');

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

      return this.sendApprove(opts);

    }).then(receipt => {

      return this.sendLock(opts);

    }).then(receipt => {

      return this.web3wan.eth.getBlockNumber();

    }).then(blockNumber => {

      return this.listenLock(opts, blockNumber);

    }).then(receipt => {

      // notify complete
      this.emit('complete');

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
      this.emit('complete');

    }).catch(err => {

      // notify error
      this.emit('error', err)

    });
  }

  // send approve transaction on ethereum
  sendApprove(opts) {
    const sendOpts = this.buildApproveTx(opts);

    const action = this.web3eth.eth.sendTransaction(sendOpts);

    action.once('transactionHash', hash => {
      this.emit('info', { status: 'approveHash', hash });
    });

    action.once('receipt', receipt => {
      this.emit('info', { status: 'approved', receipt });
    });

    action.on('error', err => {
      this.emit('error', err);
    });

    return action;
  }

  // send lock transaction on ethereum
  sendLock(opts) {
    const sendOpts = this.buildLockTx(opts);

    const action = this.web3eth.eth.sendTransaction(sendOpts);

    action.once('transactionHash', hash => {
      this.emit('info', { status: 'lockHash', hash });
    });

    action.once('receipt', receipt => {
      this.emit('info', { status: 'locking', receipt });
    });

    action.on('error', err => {
      this.emit('error', err);
    });

    return action;
  }

  // listen for storeman tx on wanchain
  listenLock(opts, blockNumber) {
    const lockScanOpts = this.buildLockScanOpts(opts, blockNumber);

    const action = web3Util(this.web3wan).watchLogs(lockScanOpts);

    action.then(log => {
      const parsed = this.parseLog('HTLCWAN_ERC20', 'InboundLockLogger', log);
      this.emit('info', { status: 'locked', log, parsed });
      return log;
    });

    action.catch(err => {
      this.emit('error', err);
    });

    return action;
  }

  // send redeem transaction on wanchain
  sendRedeem(opts) {
    const sendOpts = this.buildRedeemTx(opts);

    const action = this.web3wan.eth.sendTransaction(sendOpts);

    action.once('transactionHash', hash => {
      this.emit('info', { status: 'redeemHash', hash });
    });

    action.once('receipt', receipt => {
      this.emit('info', { status: 'redeeming', receipt });
    });

    action.on('error', err => {
      this.emit('error', err);
    });

    return action;
  }

  // listen for storeman tx on ethereum
  listenRedeem(opts, blockNumber) {
    const redeemScanOpts = this.buildRedeemScanOpts(opts, blockNumber);

    const action = web3Util(this.web3eth).watchLogs(redeemScanOpts);

    action.then(log => {
      const parsed = this.parseLog('HTLCETH_ERC20', 'InboundRedeemLogger', log);
      this.emit('info', { status: 'redeemed', log, parsed });
      return log;
    });

    action.catch(err => {
      this.emit('error', err);
    });

    return action;
  }

  // send revoke transaction on ethereum
  sendRevoke(opts) {
    const sendOpts = this.buildRevokeTx(opts);

    const action = this.web3eth.eth.sendTransaction(sendOpts);

    action.once('transactionHash', hash => {
      this.emit('info', { status: 'revokeHash', hash });
    });

    action.once('receipt', receipt => {
      this.emit('info', { status: 'revoked', receipt });
    });

    action.on('error', err => {
      this.emit('error', err);
    });

    return action;
  }

  buildApproveTx({ token, from, value }) {
    const approveData = this.buildApproveData({ value });

    return {
      from: from,
      to: token.eth,
      gas: hex.fromNumber(120000),
      gasPrice: hex.fromNumber(100e9),
      data: approveData,
    };
  }

  buildLockTx({ token, to, from, value, storeman, redeemKey }) {
    const lockData = this.buildLockData({
      token,
      to,
      storeman,
      redeemKey,
      value,
    });

    return {
      from: from,
      to: this.config.ethHtlcAddrE20,
      gas: hex.fromNumber(300000),
      gasPrice: hex.fromNumber(100e9),
      data: lockData,
    };
  }

  buildRedeemTx({ token, to, redeemKey }) {
    const redeemData = this.buildRedeemData({ token, redeemKey });

    return {
      Txtype: '0x01',
      from: to,
      to: this.config.wanHtlcAddrE20,
      gas: hex.fromNumber(120000),
      gasPrice: hex.fromNumber(180e9),
      data: redeemData,
    };
  }

  buildRevokeTx({ token, from, redeemKey }) {
    const revokeData = this.buildRevokeData({ token, redeemKey });

    return {
      from: from,
      to: this.config.ethHtlcAddrE20,
      gas: hex.fromNumber(120000),
      gasPrice: hex.fromNumber(100e9),
      data: revokeData,
    };
  }

  buildLockScanOpts({ redeemKey }, blockNumber) {
    const { InboundLockLogger } = this.config.signatures.HTLCWAN_ERC20;

    return {
      blockNumber,
      address: this.config.wanHtlcAddrE20,
      topics: [
        '0x' + InboundLockLogger,
        null,
        null,
        '0x' + hex.stripPrefix(redeemKey.xHash),
      ],
    };
  }

  buildRedeemScanOpts({ redeemKey }, blockNumber) {
    const { InboundRedeemLogger } = this.config.signatures.HTLCWAN_ERC20;

    return {
      blockNumber,
      address: this.config.ethHtlcAddrE20,
      topics: [
        '0x' + InboundRedeemLogger,
        null,
        null,
        '0x' + hex.stripPrefix(redeemKey.xHash),
      ],
    };
  }

  buildApproveData({ value }) {
    const { approve } = this.config.signatures.ERC20;

    return '0x' + approve.substr(0, 8)
      + types.hex2Bytes32(this.config.ethHtlcAddrE20)
      + types.num2Bytes32(value);
  }

  buildLockData({ token, to, value, storeman, redeemKey }) {
    const { inboundLock } = this.config.signatures.HTLCETH_ERC20;

    return '0x' + inboundLock.substr(0, 8)
      + types.hex2Bytes32(token.eth)
      + hex.stripPrefix(redeemKey.xHash)
      + types.hex2Bytes32(storeman.eth)
      + types.hex2Bytes32(to)
      + types.num2Bytes32(value);
  }

  buildRedeemData({ token, redeemKey }) {
    const { inboundRedeem } = this.config.signatures.HTLCWAN_ERC20;

    return '0x' + inboundRedeem.substr(0, 8)
      + types.hex2Bytes32(token.eth)
      + hex.stripPrefix(redeemKey.x);
  }

  buildRevokeData({ token, redeemKey }) {
    const { inboundRevoke } = this.config.signatures.HTLCETH_ERC20;

    return '0x' + inboundRevoke.substr(0, 8)
      + types.hex2Bytes32(token.eth)
      + hex.stripPrefix(redeemKey.xHash);
  }
}

module.exports = ERC20_Inbound;
