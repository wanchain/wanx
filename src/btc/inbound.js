const moment = require('moment');

const BTC_Base = require('./base');
const btcUtil = require('./utils');
const web3Shim = require('../lib/web3');
const crypto = require('../lib/crypto');
const types = require('../lib/types');
const hex = require('../lib/hex');

const {
  InboundLockSchema,
  InboundRedeemSchema,
  InboundLockDataSchema,
  RedeemDataSchema,

  InboundHTLCSchema,
  InboundRevokeSchema,
  InboundRevokeFromWifSchema,
  HashForRevokeSchema,

  ScanOptsSchema,
} = require('./schema');

/**
 * Bitcoin Inbound
 * @augments BTC_Base
 */
class BTC_Inbound extends BTC_Base {

  constructor(config) {
    super(config);
  }

  /**
   * Complete crosschain transaction (lock + redeem); Assumes you have already
   * generated a new HTLC lock address with `buildHashTimeLockContract` and
   * have funded the address
   * @param {Object} opts - Tx options
   * @param {string} opts.from - Revoker btc address
   * @param {string} opts.to - Destination wan address
   * @param {string} opts.value - Tx value
   * @param {string} opts.txid - Id of funding btc tx
   * @param {string} opts.lockTime - LockTime used to generate lock address
   * @param {Object} opts.redeemKey - Redeem key pair
   * @param {string} opts.redeemKey.x - Redeem key x
   * @param {string} opts.redeemKey.xHash - Redeem key xHash
   * @param {Object} opts.storeman - Storeman address pair
   * @param {string} opts.storeman.wan - Storeman Wanchain address
   * @param {string} opts.storeman.btc - Storeman Bitcoin address
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
   * Lock transaction and confirmation; Assumes you have already generated a
   * new HTLC lock address with `buildHashTimeLockContract` and have funded the
   * address
   * @param {Object} opts - Tx options
   * @param {string} opts.from - Revoker btc address
   * @param {string} opts.to - Destination wan address
   * @param {string} opts.value - Tx value
   * @param {string} opts.txid - Id of funding btc tx
   * @param {string} opts.lockTime - LockTime used to generate lock address
   * @param {Object} opts.redeemKey - Redeem key pair
   * @param {string} opts.redeemKey.x - Redeem key x
   * @param {string} opts.redeemKey.xHash - Redeem key xHash
   * @param {Object} opts.storeman - Storeman address pair
   * @param {string} opts.storeman.wan - Storeman Wanchain address
   * @param {string} opts.storeman.btc - Storeman Bitcoin address
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

      return this.listenLock(opts, receipt.blockNumber, true);

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
   * @param {string} opts.to - Destination wan address
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

      return this.listenRedeem(opts, receipt.blockNumber, true);

    }).then(res => {

      // notify complete
      this.emit('complete', { status: 'redeemed' });

    }).catch(err => {

      // notify error
      this.emit('error', err)

    });
  }

  /**
   * Send lock tx on Wanchain
   * @param {Object} opts - Tx options
   * @param {string} opts.from - Revoker btc address
   * @param {string} opts.to - Destination wan address
   * @param {string} opts.value - Tx value
   * @param {string} opts.txid - Id of funding btc tx
   * @param {string} opts.lockTime - LockTime used to generate lock address
   * @param {Object} opts.redeemKey - Redeem key pair
   * @param {string} opts.redeemKey.x - Redeem key x
   * @param {string} opts.redeemKey.xHash - Redeem key xHash
   * @param {Object} opts.storeman - Storeman address pair
   * @param {string} opts.storeman.wan - Storeman Wanchain address
   * @param {string} opts.storeman.btc - Storeman Bitcoin address
   * @param {boolean} skipValidation
   * @returns {Promise} Promise object
   */
  sendLock(opts, skipValidation) {

    ! skipValidation && this.validate(InboundLockSchema, opts);

    const sendOpts = this.buildLockTx(opts, true);
    const action = web3Shim(this.wanchain.web3).sendTransaction(sendOpts);

    action.on('transactionHash', hash => {
      this.emit('info', { status: 'lockHash', hash });
    });

    action.on('receipt', receipt => {
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
   * @param {string} opts.to - Destination wan address
   * @param {Object} opts.redeemKey - Redeem key pair
   * @param {string} opts.redeemKey.x - Redeem key x
   * @param {boolean} skipValidation
   * @returns {Promise} Promise object
   */
  sendRedeem(opts, skipValidation) {

    ! skipValidation && this.validate(InboundRedeemSchema, opts);

    const sendOpts = this.buildRedeemTx(opts);
    const action = web3Shim(this.wanchain.web3).sendTransaction(sendOpts);

    action.on('transactionHash', hash => {
      this.emit('info', { status: 'redeemHash', hash });
    });

    action.on('receipt', receipt => {
      this.emit('info', { status: 'redeemed', receipt });
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
    const action = web3Shim(this.wanchain.web3).watchLogs(lockScanOpts);

    return new Promise((resolve, reject) => {
      action.then(log => {
        const inputs = this.parseLog('HTLCWBTC', 'BTC2WBTCLock', log);
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
        const inputs = this.parseLog('HTLCWBTC', 'BTC2WBTCRedeem', log);
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
   * Build lock tx
   * @param {Object} opts - Tx options
   * @param {string} opts.from - Revoker btc address
   * @param {string} opts.to - Destination wan address
   * @param {string} opts.value - Tx value
   * @param {string} opts.txid - Id of funding btc tx
   * @param {string} opts.lockTime - LockTime used to generate lock address
   * @param {Object} opts.redeemKey - Redeem key pair
   * @param {string} opts.redeemKey.x - Redeem key x
   * @param {string} opts.redeemKey.xHash - Redeem key xHash
   * @param {Object} opts.storeman - Storeman address pair
   * @param {string} opts.storeman.wan - Storeman Wanchain address
   * @param {string} opts.storeman.btc - Storeman Bitcoin address
   * @param {boolean} skipValidation
   * @returns {Object} Tx object
   */
  buildLockTx(opts, skipValidation) {

    ! skipValidation && this.validate(InboundLockSchema, opts);

    const { to } = opts;
    const lockNoticeData = this.buildLockData(opts, true);

    return {
      Txtype: '0x01',
      from: to,
      to: this.config.addresses.HTLCWBTC,
      gas: hex.fromNumber(360000),
      gasPrice: hex.fromNumber(180e9),
      data: lockNoticeData,
    };
  }

  /**
   * Build redeem tx
   * @param {Object} opts - Tx options
   * @param {string} opts.to - Destination wan address
   * @param {Object} opts.redeemKey - Redeem key pair
   * @param {string} opts.redeemKey.x - Redeem key x
   * @param {boolean} skipValidation
   * @returns {Object} Tx object
   */
  buildRedeemTx(opts, skipValidation) {

    ! skipValidation && this.validate(InboundRedeemSchema, opts);

    const { to } = opts;
    const redeemData = this.buildRedeemData(opts, true);

    return {
      Txtype: '0x01',
      from: to,
      to: this.config.addresses.HTLCWBTC,
      gas: hex.fromNumber(120000),
      gasPrice: hex.fromNumber(180e9),
      data: redeemData,
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
    const { BTC2WBTCLock } = this.config.signatures.HTLCWBTC;

    return {
      blockNumber,
      address: this.config.addresses.HTLCWBTC,
      topics: [
        '0x' + BTC2WBTCLock,
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
    const { BTC2WBTCRedeem } = this.config.signatures.HTLCWBTC;

    return {
      blockNumber,
      address: this.config.addresses.HTLCWBTC,
      topics: [
        '0x' + BTC2WBTCRedeem,
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
   * @param {string} opts.storeman.wan - Storeman wan address
   * @param {string} opts.from - Address that funded the P2SH address
   * @param {string} opts.txid - ID of tx that funded the P2SH address
   * @param {number} opts.lockTime - Locktime used to generate P2SH address
   * @param {boolean} skipValidation
   * @returns {string} Data hex string
   */
  buildLockData(opts, skipValidation) {

    ! skipValidation && this.validate(InboundLockDataSchema, opts);

    const { storeman, from, redeemKey, txid, lockTime } = opts;
    const { btc2wbtcLockNotice } = this.config.signatures.HTLCWBTC;
    const fromHash160 = crypto.addressToHash160(from, 'pubkeyhash', this.config.network);

    return '0x' + btc2wbtcLockNotice.substr(0, 8)
      + types.hex2Bytes32(storeman.wan)
      + types.hex2Bytes32(fromHash160)
      + hex.stripPrefix(redeemKey.xHash)
      + hex.stripPrefix(txid)
      + types.num2Bytes32(lockTime);
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
    const { btc2wbtcRedeem } = this.config.signatures.HTLCWBTC;

    return '0x' + btc2wbtcRedeem.substr(0, 8)
      + hex.stripPrefix(redeemKey.x);
  }

  //
  // BTC methods
  //

  /**
   * Build new P2SH lock contract address
   * @param {Object} opts - Tx options
   * @param {string} opts.from - Revoker btc address
   * @param {number} opts.lockTime - LockTime for lock address
   * @param {Object} opts.redeemKey - Redeem key pair
   * @param {string} opts.redeemKey.xHash - Redeem key xHash
   * @param {Object} opts.storeman - Storeman address pair
   * @param {string} opts.storeman.btc - Storeman Bitcoin address
   * @returns {Object} Contract object
   */
  buildHashTimeLockContract(opts) {

    this.validate(InboundHTLCSchema, opts);

    const { from, storeman, redeemKey } = opts;
    let { lockTime } = opts;

    // auto-calculate lockTime if not set
    if (lockTime === undefined || lockTime === null) {
      lockTime = new moment().add(this.config.bitcoin.lockTime, 'h').unix();
    }

    return btcUtil.buildHashTimeLockContract(
      this.config.network,
      redeemKey.xHash,
      storeman.btc,
      crypto.addressToHash160(from, 'pubkeyhash', this.config.network),
      lockTime
    );
  }

  /**
   * Build the hash for signature for revoke tx
   * @param {Object} opts - Tx options
   * @param {string} opts.from - Revoker btc address
   * @param {string} opts.payTo - Address to revoke funds to (optional, defaults to revoker)
   * @param {string} opts.value - Tx value (minus miner fee)
   * @param {string} opts.txid - Id of funding btc tx
   * @param {number} opts.lockTime - LockTime for lock address
   * @param {string} opts.redeemScript - Lock address redeemScript
   * @returns {string} Hash string
   */
  hashForRevokeSig(opts) {

    this.validate(HashForRevokeSchema, opts);

    return btcUtil.hashForRevokeSig(
      this.config.network,
      hex.stripPrefix(opts.txid),
      opts.payTo || opts.from,
      opts.value,
      opts.lockTime,
      opts.redeemScript
    );
  }

  /**
   * Build revoke tx from sigHash
   * @param {Object} opts - Tx options
   * @param {string} opts.value - Tx value (minus miner fee)
   * @param {string} opts.txid - Id of funding btc tx
   * @param {Object} opts.redeemKey - Redeem key pair
   * @param {string} opts.redeemKey.x - Redeem key x
   * @param {number} opts.lockTime - LockTime for lock address
   * @param {string} opts.redeemScript - Lock address redeemScript
   * @param {string} opts.publicKey - Public key of the revoker
   * @param {string} opts.sigHash - Signed hash for signature
   * @param {string} opts.payTo - Address to revoke funds to (optional, defaults to revoker)
   * @returns {string} Signed tx as hex string
   */
  buildRevokeTx(opts) {

    this.validate(InboundRevokeSchema, opts);

    return btcUtil.buildRevokeTx(
      this.config.network,
      hex.stripPrefix(opts.txid),
      opts.value,
      opts.redeemScript,
      opts.redeemKey.x,
      opts.lockTime,
      opts.publicKey,
      opts.sigHash,
      opts.payTo
    );
  }

  /**
   * Build revoke tx from WIF
   * @param {Object} opts - Tx options
   * @param {string} opts.value - Tx value (minus miner fee)
   * @param {string} opts.txid - Id of funding btc tx
   * @param {Object} opts.redeemKey - Redeem key pair
   * @param {string} opts.redeemKey.x - Redeem key x
   * @param {number} opts.lockTime - LockTime for lock address
   * @param {string} opts.redeemScript - Lock address redeemScript
   * @param {string} opts.wif - Private key of the revoker
   * @param {string} opts.payTo - Address to revoke funds to (optional, defaults to revoker)
   * @returns {string} Signed tx as hex string
   */
  buildRevokeTxFromWif(opts) {

    this.validate(InboundRevokeFromWifSchema, opts);

    return btcUtil.buildRevokeTxFromWif(
      this.config.network,
      hex.stripPrefix(opts.txid),
      opts.value,
      opts.redeemScript,
      opts.redeemKey.x,
      opts.lockTime,
      opts.wif,
      opts.payTo
    );
  }
}

module.exports = BTC_Inbound;
