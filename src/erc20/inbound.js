const CrosschainBase = require('../base');
const web3Util = require('../lib/web3');
const types = require('../lib/types');
const hex = require('../lib/hex');

const {
  InboundApproveSchema,
  InboundLockSchema,
  InboundRedeemSchema,
  InboundRevokeSchema,
  ScanOptsSchema,
} = require('./schema');

class ERC20_Inbound extends CrosschainBase {

  constructor(config) {
    super(config);
  }

  // complete crosschain transaction
  send(opts, skipValidation) {

    ! skipValidation && this.validate(InboundLockSchema, opts);

    return Promise.resolve([]).then(() => {

      // notify status
      this.emit('info', { status: 'starting', redeemKey: opts.redeemKey });

      return this.sendApprove(opts, true);

    }).then(receipt => {

      return this.sendLock(opts, true);

    }).then(receipt => {

      return this.web3wan.eth.getBlockNumber();

    }).then(blockNumber => {

      return this.listenLock(opts, blockNumber, true);

    }).then(receipt => {

      return this.sendRedeem(opts, true);

    }).then(receipt => {

      return this.web3eth.eth.getBlockNumber();

    }).then(blockNumber => {

      return this.listenRedeem(opts, blockNumber, true);

    }).then(receipt => {

      // notify complete
      this.emit('complete');

    }).catch(err => {

      // notify error
      this.emit('error', err)

    });
  }

  // first 1/2 of crosschain transaction
  lock(opts, skipValidation) {

    ! skipValidation && this.validate(InboundLockSchema, opts);

    return Promise.resolve([]).then(() => {

      // notify status
      this.emit('info', { status: 'starting', redeemKey: opts.redeemKey });

      return this.sendApprove(opts, true);

    }).then(receipt => {

      return this.sendLock(opts, true);

    }).then(receipt => {

      return this.web3wan.eth.getBlockNumber();

    }).then(blockNumber => {

      return this.listenLock(opts, blockNumber, true);

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
  redeem(opts, skipValidation) {

    ! skipValidation && this.validate(InboundRedeemSchema, opts);

    return Promise.resolve([]).then(() => {

      // notify status
      this.emit('info', { status: 'starting', redeemKey: opts.redeemKey });

      return this.sendRedeem(opts, true);

    }).then(receipt => {

      return this.web3eth.eth.getBlockNumber();

    }).then(blockNumber => {

      return this.listenRedeem(opts, blockNumber, true);

    }).then(receipt => {

      // notify complete
      this.emit('complete');

    }).catch(err => {

      // notify error
      this.emit('error', err)

    });
  }

  // send approve transaction on ethereum
  sendApprove(opts, skipValidation) {

    ! skipValidation && this.validate(InboundApproveSchema, opts);

    const sendOpts = this.buildApproveTx(opts, true);
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
  sendLock(opts, skipValidation) {

    ! skipValidation && this.validate(InboundLockSchema, opts);

    const sendOpts = this.buildLockTx(opts, true);
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
  listenLock(opts, blockNumber, skipValidation) {

    ! skipValidation && this.validate(ScanOptsSchema, opts);

    const lockScanOpts = this.buildLockScanOpts(opts, blockNumber, true);
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
  sendRedeem(opts, skipValidation) {

    ! skipValidation && this.validate(InboundRedeemSchema, opts);

    const sendOpts = this.buildRedeemTx(opts, true);
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
  listenRedeem(opts, blockNumber, skipValidation) {

    ! skipValidation && this.validate(ScanOptsSchema, opts);

    const redeemScanOpts = this.buildRedeemScanOpts(opts, blockNumber, true);
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
  sendRevoke(opts, skipValidation) {

    ! skipValidation && this.validate(InboundRevokeSchema, opts);

    const sendOpts = this.buildRevokeTx(opts, true);
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

  buildApproveTx(opts, skipValidation) {

    ! skipValidation && this.validate(InboundApproveSchema, opts);

    const { token, from, value } = opts;
    const approveData = this.buildApproveData({ value }, true);

    return {
      from: from,
      to: token.eth,
      gas: hex.fromNumber(120000),
      gasPrice: hex.fromNumber(100e9),
      data: approveData,
    };
  }

  buildLockTx(opts, skipValidation) {

    ! skipValidation && this.validate(InboundLockSchema, opts);

    const lockData = this.buildLockData(opts, true);

    return {
      from: opts.from,
      to: this.config.ethHtlcAddrE20,
      gas: hex.fromNumber(300000),
      gasPrice: hex.fromNumber(100e9),
      data: lockData,
    };
  }

  buildRedeemTx(opts, skipValidation) {

    ! skipValidation && this.validate(InboundRedeemSchema, opts);

    const { token, to, redeemKey } = opts;
    const redeemData = this.buildRedeemData({ token, redeemKey }, true);

    return {
      Txtype: '0x01',
      from: to,
      to: this.config.wanHtlcAddrE20,
      gas: hex.fromNumber(120000),
      gasPrice: hex.fromNumber(180e9),
      data: redeemData,
    };
  }

  buildRevokeTx(opts, skipValidation) {

    ! skipValidation && this.validate(InboundRevokeSchema, opts);

    const { token, from, redeemKey } = opts;
    const revokeData = this.buildRevokeData({ token, redeemKey }, true);

    return {
      from: from,
      to: this.config.ethHtlcAddrE20,
      gas: hex.fromNumber(120000),
      gasPrice: hex.fromNumber(100e9),
      data: revokeData,
    };
  }

  buildLockScanOpts(opts, blockNumber, skipValidation) {

    ! skipValidation && this.validate(ScanOptsSchema, opts);

    const { redeemKey } = opts;
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

  buildRedeemScanOpts(opts, blockNumber, skipValidation) {

    ! skipValidation && this.validate(ScanOptsSchema, opts);

    const { redeemKey } = opts;
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

  buildApproveData(opts, skipValidation) {

    ! skipValidation && this.validate(InboundApproveSchema, opts);

    const { value } = opts;
    const { approve } = this.config.signatures.ERC20;

    return '0x' + approve.substr(0, 8)
      + types.hex2Bytes32(this.config.ethHtlcAddrE20)
      + types.num2Bytes32(value);
  }

  buildLockData(opts, skipValidation) {

    ! skipValidation && this.validate(InboundLockSchema, opts);

    const { token, to, value, storeman, redeemKey } = opts;
    const { inboundLock } = this.config.signatures.HTLCETH_ERC20;

    return '0x' + inboundLock.substr(0, 8)
      + types.hex2Bytes32(token.eth)
      + hex.stripPrefix(redeemKey.xHash)
      + types.hex2Bytes32(storeman.eth)
      + types.hex2Bytes32(to)
      + types.num2Bytes32(value);
  }

  buildRedeemData(opts, skipValidation) {

    ! skipValidation && this.validate(InboundRedeemSchema, opts);

    const { token, redeemKey } = opts;
    const { inboundRedeem } = this.config.signatures.HTLCWAN_ERC20;

    return '0x' + inboundRedeem.substr(0, 8)
      + types.hex2Bytes32(token.eth)
      + hex.stripPrefix(redeemKey.x);
  }

  buildRevokeData(opts, skipValidation) {

    ! skipValidation && this.validate(InboundRevokeSchema, opts);

    const { token, redeemKey } = opts;
    const { inboundRevoke } = this.config.signatures.HTLCETH_ERC20;

    return '0x' + inboundRevoke.substr(0, 8)
      + types.hex2Bytes32(token.eth)
      + hex.stripPrefix(redeemKey.xHash);
  }
}

module.exports = ERC20_Inbound;
