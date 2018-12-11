const BigNumber = require('bignumber.js');

const ETH_Base = require('./base');
const web3Shim = require('../lib/web3');
const types = require('../lib/types');
const hex = require('../lib/hex');

const {
  OutboundLockSchema,
  OutboundLockWithFeeSchema,
  OutboundRedeemSchema,
  OutboundRevokeSchema,
  OutboundFeeSchema,
  OutboundLockDataSchema,
  RedeemDataSchema,
  RevokeDataSchema,
  OutboundFeeDataSchema,
  ScanOptsSchema,
} = require('./schema');

/**
 * Ethereum Outbound
 * @augments ETH_Base
 */
class ETH_Outbound extends ETH_Base {

  constructor(config) {
    super(config);
  }

  /**
   * Complete crosschain transaction (lock + redeem)
   * @param {Object} opts - Tx options
   * @param {string} opts.from - Sender address
   * @param {string} opts.to - Destination address
   * @param {string} opts.value - Tx value
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

    ! skipValidation && this.validate(OutboundLockSchema, opts);

    return Promise.resolve([]).then(() => {

      // notify status
      this.emit('info', { status: 'lockStart', opts });

      return this.getOutboundFee(opts, true);

    }).then(outboundFee => {

      return this.sendLock(Object.assign({}, opts, { outboundFee }), true);

    }).then(receipt => {

      return web3Shim(this.ethereum.web3).getBlockNumber();

    }).then(blockNumber => {

      return this.listenLock(opts, blockNumber, true);

    }).then(res => {

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

    }).then(res => {

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
   * @param {string} opts.value - Tx value
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

    const callOpts = this.buildOutboundFeeTx(opts, true);
    const action = web3Shim(this.wanchain.web3).call(callOpts);

    return new Promise((resolve, reject) => {
      action.then(res => {
        res = res === '0x' ? '0x0' : res;

        const outboundFee = new BigNumber(res).toString();
        this.emit('info', { status: 'outboundFee', outboundFee });
        resolve(outboundFee);
      })

      action.catch(err => {
        this.emit('error', err);
        reject(err);
      });
    });
  }

  /**
   * Send lock tx on Wanchain
   * @param {Object} opts - Tx options
   * @param {string} opts.from - Sender address
   * @param {string} opts.to - Destination address
   * @param {string} opts.value - Tx value
   * @param {string} opts.outboundFee - Tx outbound fee
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
   * @param {boolean} skipValidation
   * @returns {Promise} Promise object
   */
  sendRedeem(opts, skipValidation) {

    ! skipValidation && this.validate(OutboundRedeemSchema, opts);

    const sendOpts = this.buildRedeemTx(opts, true);
    const action = web3Shim(this.ethereum.web3).sendTransaction(sendOpts);

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

  /**
   * Send revoke tx on Wanchain
   * @param {Object} opts - Tx options
   * @param {string} opts.from - Sender address
   * @param {Object} opts.redeemKey - Redeem key pair
   * @param {string} opts.redeemKey.xHash - Redeem key xHash
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

    return new Promise((resolve, reject) => {
      action.then(log => {
        const inputs = this.parseLog('HTLCETH', 'WETH2ETHLock', log);
        this.emit('info', { status: 'locked', log, inputs });
        resolve({ log, inputs });
      });

      action.catch(err => {
        this.emit('error', err);
        reject(err);
      });
    });
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

    return new Promise((resolve, reject) => {
      action.then(log => {
        const inputs = this.parseLog('HTLCWETH', 'WETH2ETHRefund', log);
        this.emit('info', { status: 'redeemed', log, inputs });
        resolve({ log, inputs });
      });

      action.catch(err => {
        this.emit('error', err);
        reject(err);
      });
    });
  }

  /**
   * Build outboundFee tx
   * @param {Object} opts - Tx options
   * @param {string} opts.to - Destination address
   * @param {string} opts.value - Tx value
   * @param {Object} opts.storeman - Storeman address pair
   * @param {string} opts.storeman.wan - Storeman Wanchain address
   * @param {boolean} skipValidation
   * @returns {Object} Tx object
   */
  buildOutboundFeeTx(opts, skipValidation) {

    ! skipValidation && this.validate(OutboundFeeSchema, opts);

    const to = this.config.addresses.HTLCWETH;
    const data = this.buildOutboundFeeData(opts, true);

    return { to, data };
  }

  /**
   * Build lock tx
   * @param {Object} opts - Tx options
   * @param {string} opts.from - Sender address
   * @param {string} opts.to - Destination address
   * @param {string} opts.value - Tx value
   * @param {string} opts.outboundFee - Tx outbound fee
   * @param {Object} opts.redeemKey - Redeem key pair
   * @param {string} opts.redeemKey.x - Redeem key x
   * @param {string} opts.redeemKey.xHash - Redeem key xHash
   * @param {Object} opts.storeman - Storeman address pair
   * @param {string} opts.storeman.wan - Storeman Wanchain address
   * @param {string} opts.storeman.eth - Storeman Ethereum address
   * @param {boolean} skipValidation
   * @returns {Object} Tx object
   */
  buildLockTx(opts, skipValidation) {

    ! skipValidation && this.validate(OutboundLockWithFeeSchema, opts);

    const { from, outboundFee } = opts;
    const lockData = this.buildLockData(opts, true);

    return {
      Txtype: '0x01',
      from: from,
      to: this.config.addresses.HTLCWETH,
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
   * @param {Object} opts.redeemKey - Redeem key pair
   * @param {string} opts.redeemKey.x - Redeem key x
   * @param {boolean} skipValidation
   * @returns {Object} Tx object
   */
  buildRedeemTx(opts, skipValidation) {

    ! skipValidation && this.validate(OutboundRedeemSchema, opts);

    const { to, redeemKey } = opts;
    const redeemData = this.buildRedeemData({ redeemKey }, true);

    return {
      from: to,
      to: this.config.addresses.HTLCETH,
      gas: hex.fromNumber(120000),
      gasPrice: hex.fromNumber(100e9),
      data: redeemData,
    };
  }

  /**
   * Build revoke tx
   * @param {Object} opts - Tx options
   * @param {string} opts.from - Sender address
   * @param {Object} opts.redeemKey - Redeem key pair
   * @param {string} opts.redeemKey.xHash - Redeem key xHash
   * @param {boolean} skipValidation
   * @returns {Object} Tx object
   */
  buildRevokeTx(opts, skipValidation) {

    ! skipValidation && this.validate(OutboundRevokeSchema, opts);

    const { from, redeemKey } = opts;
    const revokeData = this.buildRevokeData({ redeemKey }, true);

    return {
      Txtype: '0x01',
      from: from,
      to: this.config.addresses.HTLCWETH,
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
    const { WETH2ETHLock } = this.config.signatures.HTLCETH;

    return {
      blockNumber,
      address: this.config.addresses.HTLCETH,
      topics: [
        '0x' + WETH2ETHLock,
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

    ! skipValidation && this.validate(OutboundRedeemSchema, opts);

    const { redeemKey } = opts;
    const { WETH2ETHRefund } = this.config.signatures.HTLCWETH;

    return {
      blockNumber,
      address: this.config.addresses.HTLCWETH,
      topics: [
        '0x' + WETH2ETHRefund,
        null,
        null,
        '0x' + hex.stripPrefix(redeemKey.xHash),
      ],
    };
  }

  /**
   * Get data hex string for lock call
   * @param {Object} opts - Tx options
   * @param {Object} opts.redeemKey - Redeem key pair
   * @param {string} opts.redeemKey.xHash - Redeem key xHash
   * @param {Object} opts.storeman - Storeman address pair
   * @param {string} opts.storeman.wan - Storeman Wanchain address
   * @param {string} opts.to - Destination address
   * @param {number|string} opts.value - Tx value
   * @param {boolean} skipValidation
   * @returns {string} Data hex string
   */
  buildLockData(opts, skipValidation) {

    ! skipValidation && this.validate(OutboundLockDataSchema, opts);

    const { to, value, storeman, redeemKey } = opts;
    const { weth2ethLock } = this.config.signatures.HTLCWETH;

    return '0x' + weth2ethLock.substr(0, 8)
      + hex.stripPrefix(redeemKey.xHash)
      + types.hex2Bytes32(storeman.wan)
      + types.hex2Bytes32(to)
      + types.num2Bytes32(value);
  }

  /**
   * Get data hex string for redeem call
   * @param {Object} opts - Tx options
   * @param {Object} opts.redeemKey - Redeem key pair
   * @param {string} opts.redeemKey.x - Redeem key x
   * @param {boolean} skipValidation
   * @returns {string} Data hex string
   */
  buildRedeemData(opts, skipValidation) {

    ! skipValidation && this.validate(RedeemDataSchema, opts);

    const { redeemKey } = opts;
    const { weth2ethRefund } = this.config.signatures.HTLCETH;

    return '0x' + weth2ethRefund.substr(0, 8)
      + hex.stripPrefix(redeemKey.x);
  }

  /**
   * Get data hex string for revoke call
   * @param {Object} opts - Tx options
   * @param {Object} opts.redeemKey - Redeem key pair
   * @param {string} opts.redeemKey.xHash - Redeem key xHash
   * @param {boolean} skipValidation
   * @returns {string} Data hex string
   */
  buildRevokeData(opts, skipValidation) {

    ! skipValidation && this.validate(RevokeDataSchema, opts);

    const { redeemKey } = opts;
    const { weth2ethRevoke } = this.config.signatures.HTLCWETH;

    return '0x' + weth2ethRevoke.substr(0, 8)
      + hex.stripPrefix(redeemKey.xHash);
  }

  /**
   * Get data hex string for outboundFee call
   * @param {Object} opts - Tx options
   * @param {Object} opts.storeman - Storeman address pair
   * @param {string} opts.storeman.wan - Storeman Wanchain address
   * @param {number|string} opts.value - Tx value
   * @param {boolean} skipValidation
   * @returns {string} Data hex string
   */
  buildOutboundFeeData(opts, skipValidation) {

    ! skipValidation && this.validate(OutboundFeeDataSchema, opts);

    const { storeman, value } = opts;
    const { getWeth2EthFee } = this.config.signatures.HTLCWETH;

    return '0x' + getWeth2EthFee.substr(0, 8)
      + types.hex2Bytes32(storeman.wan)
      + types.num2Bytes32(value);
  }
}

module.exports = ETH_Outbound;
