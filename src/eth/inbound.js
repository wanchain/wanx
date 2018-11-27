const CrosschainBase = require('../base');
const web3Util = require('../lib/web3');
const types = require('../lib/types');
const hex = require('../lib/hex');

const {
  InboundLockSchema,
  InboundRedeemSchema,
  InboundRevokeSchema,
  InboundLockDataSchema,
  RedeemDataSchema,
  RevokeDataSchema,
  ScanOptsSchema,
} = require('./schema');

/**
 * Ethereum Inbound
 */
class ETH_Inbound extends CrosschainBase {

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

    ! skipValidation && this.validate(InboundLockSchema, opts);
    ! skipValidation && this.validate(InboundRedeemSchema, opts);

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

    ! skipValidation && this.validate(InboundLockSchema, opts);

    return Promise.resolve([]).then(() => {

      // notify status
      this.emit('info', { status: 'lockStart', opts });

      return this.sendLock(opts, true);

    }).then(receipt => {

      return this.wanchain.web3.eth.getBlockNumber();

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
   * @param {Object} opts.redeemKey - Redeem key pair
   * @param {string} opts.redeemKey.x - Redeem key x
   * @param {boolean} skipValidation
   * @returns {Promise} Promise object
   */
  redeem(opts, skipValidation) {

    ! skipValidation && this.validate(InboundRedeemSchema, opts);

    return Promise.resolve([]).then(() => {

      // notify status
      this.emit('info', { status: 'redeemStart', opts });

      return this.sendRedeem(opts, true);

    }).then(receipt => {

      return this.ethereum.web3.eth.getBlockNumber();

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
   * Send lock tx on Ethereum
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
  sendLock(opts, skipValidation) {

    ! skipValidation && this.validate(InboundLockSchema, opts);

    const sendOpts = this.buildLockTx(opts, true);
    const action = this.ethereum.web3.eth.sendTransaction(sendOpts);

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
   * Send redeem tx on Wanchain
   * @param {Object} opts - Tx options
   * @param {string} opts.to - Destination address
   * @param {Object} opts.redeemKey - Redeem key pair
   * @param {string} opts.redeemKey.x - Redeem key x
   * @param {boolean} skipValidation
   * @returns {Promise} Promise object
   */
  sendRedeem(opts, skipValidation) {

    ! skipValidation && this.validate(InboundRedeemSchema, opts);

    const sendOpts = this.buildRedeemTx(opts, true);
    const action = this.wanchain.web3.eth.sendTransaction(sendOpts);

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
   * Send revoke tx on Ethereum
   * @param {Object} opts - Tx options
   * @param {string} opts.from - Sender address
   * @param {Object} opts.redeemKey - Redeem key pair
   * @param {string} opts.redeemKey.xHash - Redeem key xHash
   * @param {boolean} skipValidation
   * @returns {Promise} Promise object
   */
  sendRevoke(opts, skipValidation) {

    ! skipValidation && this.validate(InboundRevokeSchema, opts);

    const sendOpts = this.buildRevokeTx(opts, true);
    const action = this.ethereum.web3.eth.sendTransaction(sendOpts);

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
   * Listen for storeman lock confirmation on Wanchain
   * @param {Object} opts - Tx options
   * @param {Object} opts.redeemKey - Redeem key pair
   * @param {string} opts.redeemKey.xHash - Redeem key xHash
   * @param {boolean} skipValidation
   * @returns {Promise} Promise object
   */
  listenLock(opts, blockNumber, skipValidation) {

    ! skipValidation && this.validate(ScanOptsSchema, opts);

    const lockScanOpts = this.buildLockScanOpts(opts, blockNumber, true);
    const action = web3Util(this.wanchain.web3).watchLogs(lockScanOpts);

    action.then(log => {
      const values = this.parseLog('HTLCWETH', 'ETH2WETHLock', log);
      this.emit('info', { status: 'locked', log, values });
      return log;
    });

    action.catch(err => {
      this.emit('error', err);
    });

    return action;
  }

  /**
   * Listen for storeman redeem confirmation on Ethereum
   * @param {Object} opts - Tx options
   * @param {Object} opts.redeemKey - Redeem key pair
   * @param {string} opts.redeemKey.xHash - Redeem key xHash
   * @param {boolean} skipValidation
   * @returns {Promise} Promise object
   */
  listenRedeem(opts, blockNumber, skipValidation) {

    ! skipValidation && this.validate(ScanOptsSchema, opts);

    const redeemScanOpts = this.buildRedeemScanOpts(opts, blockNumber, true);
    const action = web3Util(this.ethereum.web3).watchLogs(redeemScanOpts);

    action.then(log => {
      const values = this.parseLog('HTLCETH', 'ETH2WETHRefund', log);
      this.emit('info', { status: 'redeemed', log, values });
      return log;
    });

    action.catch(err => {
      this.emit('error', err);
    });

    return action;
  }

  /**
   * Build lock tx
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
   * @returns {Object} Tx object
   */
  buildLockTx(opts, skipValidation) {

    ! skipValidation && this.validate(InboundLockSchema, opts);

    const lockData = this.buildLockData(opts, true);

    return {
      from: opts.from,
      to: this.config.ethHtlcAddr,
      value: hex.fromNumber(opts.value),
      gas: hex.fromNumber(360000),
      gasPrice: hex.fromNumber(100e9),
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

    ! skipValidation && this.validate(InboundRedeemSchema, opts);

    const { to, redeemKey } = opts;
    const redeemData = this.buildRedeemData({ redeemKey }, true);

    return {
      Txtype: '0x01',
      from: to,
      to: this.config.wanHtlcAddr,
      gas: hex.fromNumber(120000),
      gasPrice: hex.fromNumber(180e9),
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

    ! skipValidation && this.validate(InboundRevokeSchema, opts);

    const { from, redeemKey } = opts;
    const revokeData = this.buildRevokeData({ redeemKey }, true);

    return {
      from: from,
      to: this.config.ethHtlcAddr,
      gas: hex.fromNumber(120000),
      gasPrice: hex.fromNumber(100e9),
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

  /**
   * Get data hex string for lock call
   * @param {Object} opts - Tx options
   * @param {Object} opts.redeemKey - Redeem key pair
   * @param {string} opts.redeemKey.xHash - Redeem key xHash
   * @param {Object} opts.storeman - Storeman address pair
   * @param {string} opts.storeman.eth - Storeman Ethereum address
   * @param {string} opts.to - Destination address
   * @param {boolean} skipValidation
   * @returns {string} Data hex string
   */
  buildLockData(opts, skipValidation) {

    ! skipValidation && this.validate(InboundLockDataSchema, opts);

    const { storeman, to, redeemKey } = opts;
    const { eth2wethLock } = this.config.signatures.HTLCETH;

    return '0x' + eth2wethLock.substr(0, 8)
      + hex.stripPrefix(redeemKey.xHash)
      + types.hex2Bytes32(storeman.eth)
      + types.hex2Bytes32(to);
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
    const { eth2wethRefund } = this.config.signatures.HTLCWETH;

    return '0x' + eth2wethRefund.substr(0, 8)
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
    const { eth2wethRevoke } = this.config.signatures.HTLCETH;

    return '0x' + eth2wethRevoke.substr(0, 8)
      + hex.stripPrefix(redeemKey.xHash);
  }
}

module.exports = ETH_Inbound;
