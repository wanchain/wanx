const BigNumber = require('bignumber.js');

const CrosschainBase = require('../base');
const web3Util = require('../lib/web3');
const types = require('../lib/types');
const hex = require('../lib/hex');

const {
  OutboundApproveSchema,
  OutboundLockSchema,
  OutboundLockWithFeeSchema,
  OutboundRedeemSchema,
  OutboundRevokeSchema,
  OutboundFeeSchema,
  OutboundFeeDataSchema,
  OutboundLockDataSchema,
  ApproveDataSchema,
  RedeemDataSchema,
  RevokeDataSchema,
  ScanOptsSchema,
} = require('./schema');


class ETH_Outbound extends CrosschainBase {

  constructor(config) {
    super(config);
  }

  // complete crosschain transaction
  send(opts, skipValidation) {

    ! skipValidation && this.validate(OutboundLockSchema, opts);

    return Promise.resolve([]).then(() => {

      // notify status
      this.emit('info', { status: 'start', redeemKey: opts.redeemKey });

      return this.sendApprove(opts, true);

    }).then(receipt => {

      return this.getOutboundFee(opts, true);

    }).then(outboundFee => {

      return this.sendLock(Object.assign({}, opts, { outboundFee }), true);

    }).then(receipt => {

      return this.ethereum.web3.eth.getBlockNumber();

    }).then(blockNumber => {

      return this.listenLock(opts, blockNumber, true);

    }).then(receipt => {

      return this.sendRedeem(opts, true);

    }).then(receipt => {

      return this.wanchain.web3.eth.getBlockNumber();

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

    ! skipValidation && this.validate(OutboundLockSchema, opts);

    return Promise.resolve([]).then(() => {

      // notify status
      this.emit('info', { status: 'start', redeemKey: opts.redeemKey });

      return this.sendApprove(opts, true);

    }).then(receipt => {

      return this.getOutboundFee(opts, true);

    }).then(outboundFee => {

      return this.sendLock(Object.assign({}, opts, { outboundFee }), true);

    }).then(receipt => {

      return this.ethereum.web3.eth.getBlockNumber();

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

    ! skipValidation && this.validate(OutboundRedeemSchema, opts);

    return Promise.resolve([]).then(() => {

      // notify status
      this.emit('info', { status: 'start', redeemKey: opts.redeemKey });

      return this.sendRedeem(opts, true);

    }).then(receipt => {

      return this.wanchain.web3.eth.getBlockNumber();

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

  getOutboundFee(opts, skipValidation) {

    ! skipValidation && this.validate(OutboundFeeSchema, opts);

    if (opts.outboundFee) {
      return Promise.resolve(opts.outboundFee);
    }

    const callOpts = this.buildOutboundFeeTx(opts, true)
    const action = this.wanchain.web3.eth.call(callOpts);

    action.then(res => {
      res = res === '0x' ? '0x0' : res;

      const outboundFee = new BigNumber(res).toString();
      this.emit('info', { status: 'outboundFee', outboundFee });

      return outboundFee;
    });

    action.catch(err => {
      this.emit('error', err);
    });

    return action;
  }

  // send approve transaction on wanchain
  sendApprove(opts, skipValidation) {

    ! skipValidation && this.validate(OutboundApproveSchema, opts);

    const sendOpts = this.buildApproveTx(opts, true);
    const action = this.wanchain.web3.eth.sendTransaction(sendOpts);

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

  // send lock transaction on wanchain
  sendLock(opts, skipValidation) {

    ! skipValidation && this.validate(OutboundLockWithFeeSchema, opts);

    const sendOpts = this.buildLockTx(opts, true);
    const action = this.wanchain.web3.eth.sendTransaction(sendOpts);

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

  // listen for storeman tx on ethereum
  listenLock(opts, blockNumber, skipValidation) {

    ! skipValidation && this.validate(ScanOptsSchema, opts);

    const lockScanOpts = this.buildLockScanOpts(opts, blockNumber, true);
    const action = web3Util(this.ethereum.web3).watchLogs(lockScanOpts);

    action.then(log => {
      const values = this.parseLog('HTLCETH_ERC20', 'OutboundLockLogger', log);
      this.emit('info', { status: 'locked', log, values });
      return log;
    });

    action.catch('error', err => {
      this.emit('error', err);
    });

    return action;
  }

  // send refund transaction on ethereum
  sendRedeem(opts, skipValidation) {

    ! skipValidation && this.validate(OutboundRedeemSchema, opts);

    const sendOpts = this.buildRedeemTx(opts, true);
    const action = this.ethereum.web3.eth.sendTransaction(sendOpts);

    action.once('transactionHash', hash => {
      this.emit('info', { status: 'redeemHash', hash });
    })

    action.once('receipt', receipt => {
      this.emit('info', { status: 'redeeming', receipt });
    })

    action.on('error', err => {
      this.emit('error', err);
    });

    return action;
  }

  // listen for storeman tx on wanchain
  listenRedeem(opts, blockNumber, skipValidation) {

    ! skipValidation && this.validate(ScanOptsSchema, opts);

    const redeemScanOpts = this.buildRedeemScanOpts(opts, blockNumber, true);
    const action = web3Util(this.wanchain.web3).watchLogs(redeemScanOpts);

    action.then(log => {
      const values = this.parseLog('HTLCWAN_ERC20', 'OutboundRedeemLogger', log);
      this.emit('info', { status: 'redeemed', log, values });
      return log;
    });

    action.catch('error', err => {
      this.emit('error', err);
    });

    return action;
  }

  // send revoke transaction on wanchain
  sendRevoke(opts, skipValidation) {

    ! skipValidation && this.validate(OutboundRevokeSchema, opts);

    const sendOpts = this.buildRevokeTx(opts, true);
    const action = this.wanchain.web3.eth.sendTransaction(sendOpts);

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

  buildOutboundFeeTx(opts, skipValidation) {

    ! skipValidation && this.validate(OutboundFeeSchema, opts);

    const to = this.config.wanHtlcAddrE20;
    const data = this.buildOutboundFeeData(opts, true);

    return { to, data };
  }

  buildApproveTx(opts, skipValidation) {

    ! skipValidation && this.validate(OutboundApproveSchema, opts);

    const { token, from } = opts;
    const approveData = this.buildApproveData(opts, true);

    return {
      Txtype: '0x01',
      from: from,
      to: token.wan,
      gas: hex.fromNumber(120000),
      gasPrice: hex.fromNumber(180e9),
      data: approveData,
    };
  }

  buildLockTx(opts, skipValidation) {

    ! skipValidation && this.validate(OutboundLockSchema, opts);

    const { from, outboundFee } = opts;
    const lockData = this.buildLockData(opts, true);

    return {
      Txtype: '0x01',
      from: from,
      to: this.config.wanHtlcAddrE20,
      gas: hex.fromNumber(360000),
      gasPrice: hex.fromNumber(180e9),
      value: hex.fromNumber(outboundFee),
      data: lockData,
    };
  }

  buildRedeemTx(opts, skipValidation) {

    ! skipValidation && this.validate(OutboundRedeemSchema, opts);

    const redeemData = this.buildRedeemData(opts, true);

    return {
      from: opts.to,
      to: this.config.ethHtlcAddrE20,
      gas: hex.fromNumber(120000),
      gasPrice: hex.fromNumber(100e9),
      data: redeemData,
    };
  }

  buildRevokeTx(opts, skipValidation) {

    ! skipValidation && this.validate(OutboundRevokeSchema, opts);

    const revokeData = this.buildRevokeData(opts, true);

    return {
      Txtype: '0x01',
      from: opts.from,
      to: this.config.wanHtlcAddrE20,
      gas: hex.fromNumber(120000),
      gasPrice: hex.fromNumber(180e9),
      data: revokeData,
    };
  }

  buildLockScanOpts(opts, blockNumber, skipValidation) {

    ! skipValidation && this.validate(ScanOptsSchema, opts);

    const { redeemKey } = opts;
    const { OutboundLockLogger } = this.config.signatures.HTLCETH_ERC20;

    return {
      blockNumber,
      address: this.config.ethHtlcAddrE20,
      topics: [
        '0x' + OutboundLockLogger,
        null,
        null,
        '0x' + hex.stripPrefix(redeemKey.xHash),
      ],
    };
  }

  buildRedeemScanOpts(opts, blockNumber, skipValidation) {

    ! skipValidation && this.validate(ScanOptsSchema, opts);

    const { redeemKey } = opts;
    const { OutboundRedeemLogger } = this.config.signatures.HTLCWAN_ERC20;

    return {
      blockNumber,
      address: this.config.wanHtlcAddrE20,
      topics: [
        '0x' + OutboundRedeemLogger,
        null,
        null,
        '0x' + hex.stripPrefix(redeemKey.xHash),
      ],
    };
  }

  /**
   * Get data hex string for approve call
   * @param {Object} opts - Tx options
   * @param {string|number} opts.value - Tx value
   * @param {boolean} skipValidation
   * @returns {string} Data hex string
   */
  buildApproveData(opts, skipValidation) {

    ! skipValidation && this.validate(ApproveDataSchema, opts);

    const { value } = opts;
    const { approve } = this.config.signatures.ERC20;

    return '0x' + approve.substr(0, 8)
      + types.hex2Bytes32(this.config.wanHtlcAddrE20)
      + types.num2Bytes32(value);
  }

  /**
   * Get data hex string for lock call
   * @param {Object} opts - Tx options
   * @param {Object} opts.token - Token addr pair
   * @param {string} opts.token.eth - Token eth addr
   * @param {Object} opts.redeemKey - Redeem key pair
   * @param {string} opts.redeemKey.xHash - Redeem key xHash
   * @param {Object} opts.storeman - Storeman addr pair
   * @param {string} opts.storeman.wan - Storeman wan addr
   * @param {string} opts.to - Destination address
   * @param {string|number} opts.value - Tx value
   * @param {boolean} skipValidation
   * @returns {string} Data hex string
   */
  buildLockData(opts, skipValidation) {

    ! skipValidation && this.validate(OutboundLockDataSchema, opts);

    const { token, to, value, storeman, redeemKey } = opts;
    const { outboundLock } = this.config.signatures.HTLCWAN_ERC20;

    return '0x' + outboundLock.substr(0, 8)
      + types.hex2Bytes32(token.eth)
      + hex.stripPrefix(redeemKey.xHash)
      + types.hex2Bytes32(storeman.wan)
      + types.hex2Bytes32(to)
      + types.num2Bytes32(value);
  }

  /**
   * Get data hex string for redeem call
   * @param {Object} opts - Tx options
   * @param {Object} opts.token - Token addr pair
   * @param {string} opts.token.eth - Token eth addr
   * @param {Object} opts.redeemKey - Redeem key pair
   * @param {string} opts.redeemKey.x - Redeem key x
   * @param {boolean} skipValidation
   * @returns {string} Data hex string
   */
  buildRedeemData(opts, skipValidation) {

    ! skipValidation && this.validate(RedeemDataSchema, opts);

    const { token, redeemKey } = opts;
    const { outboundRedeem } = this.config.signatures.HTLCETH_ERC20;

    return '0x' + outboundRedeem.substr(0, 8)
      + types.hex2Bytes32(token.eth)
      + hex.stripPrefix(redeemKey.x);
  }

  /**
   * Get data hex string for revoke call
   * @param {Object} opts - Tx options
   * @param {Object} opts.token - Token addr pair
   * @param {string} opts.token.eth - Token eth addr
   * @param {Object} opts.redeemKey - Redeem key pair
   * @param {string} opts.redeemKey.xHash - Redeem key xHash
   * @param {boolean} skipValidation
   * @returns {string} Data hex string
   */
  buildRevokeData(opts, skipValidation) {

    ! skipValidation && this.validate(RevokeDataSchema, opts);

    const { token, redeemKey } = opts;
    const { outboundRevoke } = this.config.signatures.HTLCWAN_ERC20;

    return '0x' + outboundRevoke.substr(0, 8)
      + types.hex2Bytes32(token.eth)
      + hex.stripPrefix(redeemKey.xHash);
  }

  /**
   * Get data hex string for outboundFee call
   * @param {Object} opts - Tx options
   * @param {Object} opts.token - Token addr pair
   * @param {string} opts.token.eth - Token eth addr
   * @param {Object} opts.storeman - Storeman addr pair
   * @param {string} opts.storeman.wan - Storeman wan addr
   * @param {number|string} opts.value - Tx value
   * @param {boolean} skipValidation
   * @returns {string} Data hex string
   */
  buildOutboundFeeData(opts, skipValidation) {

    ! skipValidation && this.validate(OutboundFeeDataSchema, opts);

    const { token, storeman, value } = opts;
    const { getOutboundFee } = this.config.signatures.HTLCWAN_ERC20;

    return '0x' + getOutboundFee.substr(0, 8)
      + types.hex2Bytes32(token.eth)
      + types.hex2Bytes32(storeman.wan)
      + types.num2Bytes32(value);
  }
}

module.exports = ETH_Outbound;
