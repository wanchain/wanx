const moment = require('moment');
const BigNumber = require('bignumber.js');

const BTC_Base = require('./base');
const btcUtil = require('./utils');
const web3Shim = require('../lib/web3');
const crypto = require('../lib/crypto');
const types = require('../lib/types');
const hex = require('../lib/hex');

const {
  OutboundFeeSchema,
  OutboundLockSchema,
  OutboundLockWithFeeSchema,
  OutboundLockDataSchema,
  OutboundRevokeSchema,
  RevokeDataSchema,

  OutboundHTLCSchema,
  OutboundRedeemSchema,
  OutboundRedeemFromWifSchema,
  HashForRedeemSchema,
  ScanOptsSchema,
} = require('./schema');

/**
 * Bitcoin Outbound
 * @augments BTC_Base
 */
class BTC_Outbound extends BTC_Base {

  constructor(config) {
    super(config);
  }

  /**
   * Complete crosschain transaction (lock + redeem)
   * @param {Object} opts - Tx options
   * @param {string} opts.from - Sender wan address
   * @param {string} opts.to - Redeemer btc address
   * @param {string} opts.value - Tx value
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

    ! skipValidation && this.validate(OutboundFeeSchema, opts);
    ! skipValidation && this.validate(OutboundLockSchema, opts);

    return Promise.resolve([]).then(() => {

      return this.lock(opts, true);

    }).then(() => {

      // btc outbound requires manual btc redeem
      // return this.redeem(opts, true);

    });
  }

  /**
   * Lock transaction and confirmation
   * @param {Object} opts - Tx options
   * @param {string} opts.from - Sender wan address
   * @param {string} opts.to - Redeemer btc address
   * @param {string} opts.value - Tx value
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

    ! skipValidation && this.validate(OutboundFeeSchema, opts);
    ! skipValidation && this.validate(OutboundLockSchema, opts);

    return Promise.resolve([]).then(() => {

      // notify status
      this.emit('info', { status: 'lockStart', opts });

      return this.getOutboundFee(opts, true);

    }).then(outboundFee => {

      return this.sendLock(Object.assign({}, opts, { outboundFee }), true);

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
   * Get outbound fee amount
   * @param {Object} opts - Tx options
   * @param {string} opts.from - Sender wan address
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
      });

      action.catch(err => {
        this.emit('error', err);
        reject(err);
      });
    });
  }

  /**
   * Send lock tx
   * @param {Object} opts - Tx options
   * @param {string} opts.from - Sender wan address
   * @param {string} opts.to - Redeemer btc address
   * @param {string} opts.value - Tx value
   * @param {string} opts.outboundFee - Tx outbound fee
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
   * Send revoke tx
   * @param {Object} opts - Tx options
   * @param {string} opts.from - Sender wan address
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
   * Listen for storeman lock confirmation on Wanchain
   * @param {Object} opts - Tx options
   * @param {Object} opts.redeemKey - Redeem key pair
   * @param {string} opts.redeemKey.xHash - Redeem key xHash
   * @param {boolean} skipValidation
   * @returns {Promise} Promise object
   */
  listenLock(opts, blockNumber, skipValidation) {

    ! skipValidation && this.validate(ScanOptsSchema, opts);

    const lockNoticeScanOpts = this.buildLockScanOpts(opts, blockNumber, true);
    const action = web3Shim(this.wanchain.web3).watchLogs(lockNoticeScanOpts);

    return new Promise((resolve, reject) => {
      action.then(log => {
        const inputs = this.parseLog('HTLCWBTC', 'WBTC2BTCLockNotice', log);
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
        const inputs = this.parseLog('HTLCWBTC', 'WBTC2BTCRedeem', log);
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
   * @param {string} opts.from - Sender wan address
   * @param {string} opts.value - Tx value
   * @param {Object} opts.storeman - Storeman address pair
   * @param {string} opts.storeman.wan - Storeman Wanchain address
   * @param {boolean} skipValidation
   * @returns {Object} Tx object
   */
  buildOutboundFeeTx(opts, skipValidation) {

    ! skipValidation && this.validate(OutboundFeeSchema, opts);

    const to = this.config.addresses.HTLCWBTC;
    const data = this.buildOutboundFeeData(opts, true);

    return { to, data };
  }

  /**
   * Build lock tx
   * @param {Object} opts - Tx options
   * @param {string} opts.from - Sender wan address
   * @param {string} opts.to - Redeemer btc address
   * @param {string} opts.value - Tx value
   * @param {string} opts.outboundFee - Tx outbound fee
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

    ! skipValidation && this.validate(OutboundLockWithFeeSchema, opts);

    const { from, outboundFee } = opts;
    const lockData = this.buildLockData(opts, true);

    return {
      Txtype: '0x01',
      from: from,
      to: this.config.addresses.HTLCWBTC,
      gas: hex.fromNumber(360000),
      gasPrice: hex.fromNumber(180e9),
      value: hex.fromNumber(outboundFee),
      data: lockData,
    };
  }

  /**
   * Build revoke tx
   * @param {Object} opts - Tx options
   * @param {string} opts.from - Sender wan address
   * @param {Object} opts.redeemKey - Redeem key pair
   * @param {string} opts.redeemKey.xHash - Redeem key xHash
   * @param {boolean} skipValidation
   * @returns {Object} Tx object
   */
  buildRevokeTx(opts, skipValidation) {

    ! skipValidation && this.validate(OutboundRevokeSchema, opts);

    const { from } = opts;
    const revokeData = this.buildRevokeData(opts, true);

    return {
      Txtype: '0x01',
      from: from,
      to: this.config.addresses.HTLCWBTC,
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
    const { WBTC2BTCLockNotice } = this.config.signatures.HTLCWBTC;

    return {
      blockNumber,
      address: this.config.addresses.HTLCWBTC,
      topics: [
        '0x' + WBTC2BTCLockNotice,
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
    const { WBTC2BTCRedeem } = this.config.signatures.HTLCWBTC;

    return {
      blockNumber,
      address: this.config.addresses.HTLCWBTC,
      topics: [
        '0x' + WBTC2BTCRedeem,
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
   * @param {Object} opts.storeman - Storeman addr pair
   * @param {string} opts.storeman.wan - Storeman wan addr
   * @param {string} opts.to - Redeemer btc addr
   * @param {string} opts.value - Tx value
   * @param {boolean} skipValidation
   * @returns {string} Data hex string
   */
  buildLockData(opts, skipValidation) {

    ! skipValidation && this.validate(OutboundLockDataSchema, opts);

    const { to, value, storeman, redeemKey } = opts;
    const { wbtc2btcLock } = this.config.signatures.HTLCWBTC;
    const toAddr = crypto.addressToHash160(to, 'pubkeyhash', this.config.network);

    return '0x' + wbtc2btcLock.substr(0, 8)
      + hex.stripPrefix(redeemKey.xHash)
      + types.hex2Bytes32(storeman.wan)
      + types.hex2Bytes32(toAddr)
      + types.num2Bytes32(value);
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
    const { wbtc2btcRevoke } = this.config.signatures.HTLCWBTC;

    return '0x' + wbtc2btcRevoke.substr(0, 8)
      + hex.stripPrefix(redeemKey.xHash);
  }

  /**
   * Get data hex string for outboundFee call
   * @param {Object} opts - Tx options
   * @param {Object} opts.storeman - Storeman addr pair
   * @param {string} opts.storeman.wan - Storeman wan addr
   * @param {string} opts.value - Tx value
   * @param {boolean} skipValidation
   * @returns {string} Data hex string
   */
  buildOutboundFeeData(opts, skipValidation) {

    ! skipValidation && this.validate(OutboundFeeSchema, opts);

    const { storeman, value } = opts;
    const { getWbtc2BtcFee } = this.config.signatures.HTLCWBTC;

    return '0x' + getWbtc2BtcFee.substr(0, 8)
      + types.hex2Bytes32(storeman.wan)
      + types.num2Bytes32(value);
  }

  //
  // BTC methods
  //

  /**
   * Build P2SH lock contract address
   * @param {Object} opts - Tx options
   * @param {string} opts.to - Redeemer btc address
   * @param {number} opts.lockTime - LockTime for lock address
   * @param {Object} opts.redeemKey - Redeem key pair
   * @param {string} opts.redeemKey.xHash - Redeem key xHash
   * @param {Object} opts.storeman - Storeman address pair
   * @param {string} opts.storeman.btc - Storeman Bitcoin address
   * @returns {Object} Contract object
   */
  buildHashTimeLockContract(opts) {

    this.validate(OutboundHTLCSchema, opts);

    const { to, storeman, redeemKey, lockTime } = opts;

    return btcUtil.buildHashTimeLockContract(
      this.config.network,
      redeemKey.xHash,
      crypto.addressToHash160(to, 'pubkeyhash', this.config.network),
      storeman.btc,
      lockTime
    );
  }

  /**
   * Build the hash for signature for redeem tx
   * @param {Object} opts - Tx options
   * @param {string} opts.to - Redeemer btc address
   * @param {string} opts.value - Tx value (minus miner fee)
   * @param {string} opts.txid - Id of funding btc tx
   * @param {string} opts.redeemScript - Lock address redeemScript
   * @returns {string} Hash string
   */
  hashForRedeemSig(opts) {

    this.validate(HashForRedeemSchema, opts);

    return btcUtil.hashForRedeemSig(
      this.config.network,
      hex.stripPrefix(opts.txid),
      opts.payTo || opts.to,
      opts.value,
      opts.redeemScript
    );
  }

  /**
   * Build redeem tx from sigHash
   * @param {Object} opts - Tx options
   * @param {string} opts.value - Tx value (minus miner fee)
   * @param {string} opts.txid - Id of funding btc tx
   * @param {Object} opts.redeemKey - Redeem key pair
   * @param {string} opts.redeemKey.x - Redeem key x
   * @param {string} opts.redeemScript - Lock address redeemScript
   * @param {string} opts.publicKey - Public key of the redeemer
   * @param {string} opts.sigHash - Signed hash for signature
   * @param {string} opts.payTo - Address to redeem funds to (optional, defaults to redeemer)
   * @returns {string} Signed tx as hex string
   */
  buildRedeemTx(opts) {

    this.validate(OutboundRedeemSchema, opts);

    return btcUtil.buildRedeemTx(
      this.config.network,
      hex.stripPrefix(opts.txid),
      opts.value,
      opts.redeemScript,
      opts.redeemKey.x,
      opts.publicKey,
      opts.sigHash,
      opts.payTo
    );
  }

  /**
   * Build redeem tx from WIF
   * @param {Object} opts - Tx options
   * @param {string} opts.value - Tx value (minus miner fee)
   * @param {string} opts.txid - Id of funding btc tx
   * @param {Object} opts.redeemKey - Redeem key pair
   * @param {string} opts.redeemKey.x - Redeem key x
   * @param {string} opts.redeemScript - Lock address redeemScript
   * @param {string} opts.wif - Private key of the redeemer
   * @param {string} opts.payTo - Address to redeem funds to (optional, defaults to redeemer)
   * @returns {string} Signed tx as hex string
   */
  buildRedeemTxFromWif(opts) {

    this.validate(OutboundRedeemFromWifSchema, opts);

    return btcUtil.buildRedeemTxFromWif(
      this.config.network,
      hex.stripPrefix(opts.txid),
      opts.value,
      opts.redeemScript,
      opts.redeemKey.x,
      opts.wif,
      opts.payTo
    );
  }
}

module.exports = BTC_Outbound;
