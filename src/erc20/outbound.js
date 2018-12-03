const BigNumber = require('bignumber.js');

const CrosschainBase = require('../base');
const web3Shim = require('../lib/web3');
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

/**
 * ERC20 Outbound
 */
class ERC20_Outbound extends CrosschainBase {

  constructor(config) {
    super(config);
  }

  /**
   * Complete crosschain transaction (lock + redeem)
   * @param {Object} opts - Tx options
   * @param {string} opts.from - Sender address
   * @param {string} opts.to - Destination address
   * @param {string} opts.value - Tx value
   * @param {Object} opts.token - Token pair
   * @param {string} opts.token.wan - Token address on Wanchain
   * @param {string} opts.token.eth - Token address on Ethereum
   * @param {Object} opts.redeemKey - Redeem key pair
   * @param {string} opts.redeemKey.x - Redeem key x
   * @param {string} opts.redeemKey.xHash - Redeem key xHash
   * @param {Object} opts.storeman - Storeman address pair
   * @param {string} opts.storeman.wan - Storeman Wanchain address
   * @param {string} opts.storeman.eth - Storeman Ethereum address
   * @param {boolean} skipValidation
   * @returns {Promise} Promise object
   */
  send(opts, skipValidation) {

    ! skipValidation && this.validate(OutboundApproveSchema, opts);
    ! skipValidation && this.validate(OutboundFeeSchema, opts);
    ! skipValidation && this.validate(OutboundLockSchema, opts);
    ! skipValidation && this.validate(OutboundRedeemSchema, opts);

    return Promise.resolve([]).then(() => {

      return this.lock(opts, true);

    }).then(() => {

      return this.redeem(opts, true);

    });
  }

  /**
   * Lock transaction and confirmation
   * @param {Object} opts - Tx options
   * @param {string} opts.from - Sender address
   * @param {string} opts.to - Destination address
   * @param {string} opts.value - Tx value
   * @param {Object} opts.token - Token pair
   * @param {string} opts.token.wan - Token address on Wanchain
   * @param {string} opts.token.eth - Token address on Ethereum
   * @param {Object} opts.redeemKey - Redeem key pair
   * @param {string} opts.redeemKey.x - Redeem key x
   * @param {string} opts.redeemKey.xHash - Redeem key xHash
   * @param {Object} opts.storeman - Storeman address pair
   * @param {string} opts.storeman.wan - Storeman Wanchain address
   * @param {string} opts.storeman.eth - Storeman Ethereum address
   * @param {boolean} skipValidation
   * @returns {Promise} Promise object
   */
  lock(opts, skipValidation) {

    ! skipValidation && this.validate(OutboundApproveSchema, opts);
    ! skipValidation && this.validate(OutboundFeeSchema, opts);
    ! skipValidation && this.validate(OutboundLockSchema, opts);

    return Promise.resolve([]).then(() => {

      // notify status
      this.emit('info', { status: 'lockStart', opts });

      return this.sendApprove(opts, true);

    }).then(receipt => {

      return this.getOutboundFee(opts, true);

    }).then(outboundFee => {

      return this.sendLock(Object.assign({}, opts, { outboundFee }), true);

    }).then(receipt => {

      return web3Shim(this.ethereum.web3).getBlockNumber();

    }).then(blockNumber => {

      return this.listenLock(opts, blockNumber, true);

    }).then(log => {

      // notify complete
      this.emit('complete', { status: 'locked' });

    }).catch(err => {

      // notify error
      this.emit('error', err)

    });
  }

  /**
   * Redeem transaction and confirmation
   * @param {Object} opts - Tx options
   * @param {string} opts.to - Destination address
   * @param {Object} opts.token - Token pair
   * @param {string} opts.token.eth - Token address on Ethereum
   * @param {Object} opts.redeemKey - Redeem key pair
   * @param {string} opts.redeemKey.x - Redeem key x
   * @param {boolean} skipValidation
   * @returns {Promise} Promise object
   */
  redeem(opts, skipValidation) {

    ! skipValidation && this.validate(OutboundRedeemSchema, opts);

    return Promise.resolve([]).then(() => {

      // notify status
      this.emit('info', { status: 'redeemStart', opts });

      return this.sendRedeem(opts, true);

    }).then(receipt => {

      return web3Shim(this.wanchain.web3).getBlockNumber();

    }).then(blockNumber => {

      return this.listenRedeem(opts, blockNumber, true);

    }).then(log => {

      // notify complete
      this.emit('complete', { status: 'redeemed' });

    }).catch(err => {

      // notify error
      this.emit('error', err)

    });
  }

  /**
   * Get outbound fee amount
   * @param {Object} opts - Tx options
   * @param {string} opts.to - Destination address
   * @param {string} opts.value - Tx value
   * @param {Object} opts.token - Token pair
   * @param {string} opts.token.wan - Token address on Wanchain
   * @param {string} opts.token.eth - Token address on Ethereum
   * @param {Object} opts.storeman - Storeman address pair
   * @param {string} opts.storeman.wan - Storeman Wanchain address
   * @param {boolean} skipValidation
   * @returns {Promise} Promise object
   */
  getOutboundFee(opts, skipValidation) {

    ! skipValidation && this.validate(OutboundFeeSchema, opts);

    if (opts.outboundFee) {
      return Promise.resolve(opts.outboundFee);
    }

    const callOpts = this.buildOutboundFeeTx(opts, true)
    const action = web3Shim(this.wanchain.web3).call(callOpts);

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

  /**
   * Send approve tx on Ethereum
   * @param {Object} opts - Tx options
   * @param {string} opts.from - Sender address
   * @param {string} opts.value - Tx value
   * @param {Object} opts.token - Token pair
   * @param {string} opts.token.wan - Token address on Wanchain
   * @param {boolean} skipValidation
   * @returns {Promise} Promise object
   */
  sendApprove(opts, skipValidation) {

    ! skipValidation && this.validate(OutboundApproveSchema, opts);

    const sendOpts = this.buildApproveTx(opts, true);
    const action = web3Shim(this.wanchain.web3).sendTransaction(sendOpts);

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

  /**
   * Send lock tx on Wanchain
   * @param {Object} opts - Tx options
   * @param {string} opts.from - Sender address
   * @param {string} opts.to - Destination address
   * @param {string} opts.value - Tx value
   * @param {string} opts.outboundFee - Tx outbound fee
   * @param {Object} opts.token - Token pair
   * @param {string} opts.token.wan - Token address on Wanchain
   * @param {string} opts.token.eth - Token address on Ethereum
   * @param {Object} opts.redeemKey - Redeem key pair
   * @param {string} opts.redeemKey.x - Redeem key x
   * @param {string} opts.redeemKey.xHash - Redeem key xHash
   * @param {Object} opts.storeman - Storeman address pair
   * @param {string} opts.storeman.wan - Storeman Wanchain address
   * @param {string} opts.storeman.eth - Storeman Ethereum address
   * @param {boolean} skipValidation
   * @returns {Promise} Promise object
   */
  sendLock(opts, skipValidation) {

    ! skipValidation && this.validate(OutboundLockWithFeeSchema, opts);

    const sendOpts = this.buildLockTx(opts, true);
    const action = web3Shim(this.wanchain.web3).sendTransaction(sendOpts);

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

  /**
   * Send redeem tx on Ethereum
   * @param {Object} opts - Tx options
   * @param {string} opts.to - Destination address
   * @param {Object} opts.redeemKey - Redeem key pair
   * @param {string} opts.redeemKey.x - Redeem key x
   * @param {Object} opts.token - Token pair
   * @param {string} opts.token.eth - Token address on Ethereum
   * @param {boolean} skipValidation
   * @returns {Promise} Promise object
   */
  sendRedeem(opts, skipValidation) {

    ! skipValidation && this.validate(OutboundRedeemSchema, opts);

    const sendOpts = this.buildRedeemTx(opts, true);
    const action = web3Shim(this.ethereum.web3).sendTransaction(sendOpts);

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

  /**
   * Send revoke tx on Wanchain
   * @param {Object} opts - Tx options
   * @param {string} opts.from - Sender address
   * @param {Object} opts.redeemKey - Redeem key pair
   * @param {string} opts.redeemKey.xHash - Redeem key xHash
   * @param {Object} opts.token - Token pair
   * @param {string} opts.token.eth - Token address on Ethereum
   * @param {boolean} skipValidation
   * @returns {Promise} Promise object
   */
  sendRevoke(opts, skipValidation) {

    ! skipValidation && this.validate(OutboundRevokeSchema, opts);

    const sendOpts = this.buildRevokeTx(opts, true);
    const action = web3Shim(this.wanchain.web3).sendTransaction(sendOpts);

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

  /**
   * Listen for storeman lock confirmation on Ethereum
   * @param {Object} opts - Tx options
   * @param {Object} opts.redeemKey - Redeem key pair
   * @param {string} opts.redeemKey.xHash - Redeem key xHash
   * @param {boolean} skipValidation
   * @returns {Promise} Promise object
   */
  listenLock(opts, blockNumber, skipValidation) {

    ! skipValidation && this.validate(ScanOptsSchema, opts);

    const lockScanOpts = this.buildLockScanOpts(opts, blockNumber, true);
    const action = web3Shim(this.ethereum.web3).watchLogs(lockScanOpts);

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

  /**
   * Listen for storeman redeem confirmation on Wanchain
   * @param {Object} opts - Tx options
   * @param {Object} opts.redeemKey - Redeem key pair
   * @param {string} opts.redeemKey.xHash - Redeem key xHash
   * @param {boolean} skipValidation
   * @returns {Promise} Promise object
   */
  listenRedeem(opts, blockNumber, skipValidation) {

    ! skipValidation && this.validate(ScanOptsSchema, opts);

    const redeemScanOpts = this.buildRedeemScanOpts(opts, blockNumber, true);
    const action = web3Shim(this.wanchain.web3).watchLogs(redeemScanOpts);

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

  /**
   * Build outbound fee tx
   * @param {Object} opts - Tx options
   * @param {string} opts.to - Destination address
   * @param {string} opts.value - Tx value
   * @param {Object} opts.token - Token pair
   * @param {string} opts.token.wan - Token address on Wanchain
   * @param {string} opts.token.eth - Token address on Ethereum
   * @param {Object} opts.storeman - Storeman address pair
   * @param {string} opts.storeman.wan - Storeman Wanchain address
   * @param {boolean} skipValidation
   * @returns {Promise} Promise object
   */
  buildOutboundFeeTx(opts, skipValidation) {

    ! skipValidation && this.validate(OutboundFeeSchema, opts);

    const to = this.config.addresses.HTLCWAN_ERC20;
    const data = this.buildOutboundFeeData(opts, true);

    return { to, data };
  }

  /**
   * Build approve tx
   * @param {Object} opts - Tx options
   * @param {string} opts.from - Sender address
   * @param {string} opts.value - Tx value
   * @param {Object} opts.token - Token pair
   * @param {string} opts.token.wan - Token address on Wanchain
   * @param {boolean} skipValidation
   * @returns {Object} Tx object
   */
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

  /**
   * Build lock tx
   * @param {Object} opts - Tx options
   * @param {string} opts.from - Sender address
   * @param {string} opts.to - Destination address
   * @param {string} opts.value - Tx value
   * @param {string} opts.outboundFee - Tx outbound fee
   * @param {Object} opts.token - Token pair
   * @param {string} opts.token.wan - Token address on Wanchain
   * @param {string} opts.token.eth - Token address on Ethereum
   * @param {Object} opts.redeemKey - Redeem key pair
   * @param {string} opts.redeemKey.x - Redeem key x
   * @param {string} opts.redeemKey.xHash - Redeem key xHash
   * @param {Object} opts.storeman - Storeman address pair
   * @param {string} opts.storeman.wan - Storeman Wanchain address
   * @param {string} opts.storeman.eth - Storeman Ethereum address
   * @param {boolean} skipValidation
   * @returns {Promise} Promise object
   */
  buildLockTx(opts, skipValidation) {

    ! skipValidation && this.validate(OutboundLockWithFeeSchema, opts);

    const { from, outboundFee } = opts;
    const lockData = this.buildLockData(opts, true);

    return {
      Txtype: '0x01',
      from: from,
      to: this.config.addresses.HTLCWAN_ERC20,
      gas: hex.fromNumber(360000),
      gasPrice: hex.fromNumber(180e9),
      value: hex.fromNumber(outboundFee),
      data: lockData,
    };
  }

  /**
   * Build redeem tx
   * @param {Object} opts - Tx options
   * @param {string} opts.to - Destination address
   * @param {Object} opts.token - Token pair
   * @param {string} opts.token.eth - Token address on Ethereum
   * @param {Object} opts.redeemKey - Redeem key pair
   * @param {string} opts.redeemKey.x - Redeem key x
   * @param {boolean} skipValidation
   * @returns {Object} Tx object
   */
  buildRedeemTx(opts, skipValidation) {

    ! skipValidation && this.validate(OutboundRedeemSchema, opts);

    const redeemData = this.buildRedeemData(opts, true);

    return {
      from: opts.to,
      to: this.config.addresses.HTLCETH_ERC20,
      gas: hex.fromNumber(120000),
      gasPrice: hex.fromNumber(100e9),
      data: redeemData,
    };
  }

  /**
   * Build redeem tx
   * @param {Object} opts - Tx options
   * @param {string} opts.from - Sender address
   * @param {Object} opts.token - Token pair
   * @param {string} opts.token.eth - Token address on Ethereum
   * @param {Object} opts.redeemKey - Redeem key pair
   * @param {string} opts.redeemKey.xHash - Redeem key xHash
   * @param {boolean} skipValidation
   * @returns {Object} Tx object
   */
  buildRevokeTx(opts, skipValidation) {

    ! skipValidation && this.validate(OutboundRevokeSchema, opts);

    const revokeData = this.buildRevokeData(opts, true);

    return {
      Txtype: '0x01',
      from: opts.from,
      to: this.config.addresses.HTLCWAN_ERC20,
      gas: hex.fromNumber(120000),
      gasPrice: hex.fromNumber(180e9),
      data: revokeData,
    };
  }

  /**
   * Build lock scan opts
   * @param {Object} opts - Tx options
   * @param {Object} opts.redeemKey - Redeem key pair
   * @param {string} opts.redeemKey.xHash - Redeem key xHash
   * @param {boolean} skipValidation
   * @returns {Object} Call opts object
   */
  buildLockScanOpts(opts, blockNumber, skipValidation) {

    ! skipValidation && this.validate(ScanOptsSchema, opts);

    const { redeemKey } = opts;
    const { OutboundLockLogger } = this.config.signatures.HTLCETH_ERC20;

    return {
      blockNumber,
      address: this.config.addresses.HTLCETH_ERC20,
      topics: [
        '0x' + OutboundLockLogger,
        null,
        null,
        '0x' + hex.stripPrefix(redeemKey.xHash),
      ],
    };
  }

  /**
   * Build redeem scan opts
   * @param {Object} opts - Tx options
   * @param {Object} opts.redeemKey - Redeem key pair
   * @param {string} opts.redeemKey.xHash - Redeem key xHash
   * @param {boolean} skipValidation
   * @returns {Object} Call opts object
   */
  buildRedeemScanOpts(opts, blockNumber, skipValidation) {

    ! skipValidation && this.validate(ScanOptsSchema, opts);

    const { redeemKey } = opts;
    const { OutboundRedeemLogger } = this.config.signatures.HTLCWAN_ERC20;

    return {
      blockNumber,
      address: this.config.addresses.HTLCWAN_ERC20,
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
      + types.hex2Bytes32(this.config.addresses.HTLCWAN_ERC20)
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

module.exports = ERC20_Outbound;
