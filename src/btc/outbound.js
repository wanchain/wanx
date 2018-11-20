const moment = require('moment');
const BigNumber = require('bignumber.js');

const CrosschainBase = require('../base');
const btcUtil = require('./utils');
const web3Util = require('../lib/web3');
const crypto = require('../lib/crypto');
const types = require('../lib/types');
const hex = require('../lib/hex');

const {
  OutboundLockSchema,
  OutboundLockWithFeeSchema,
  OutboundLockDataSchema,
  OutboundFeeDataSchema,
  OutboundRevokeSchema,
  RevokeDataSchema,

  OutboundHTLCSchema,
  OutboundRedeemSchema,
  OutboundRedeemFromWifSchema,
  HashForRedeemSchema,
  ScanOptsSchema,
} = require('./schema');

class BTC_Outbound extends CrosschainBase {

  constructor(config) {
    super(config);
  }

  // first 1/2 of crosschain transaction
  lock(opts, skipValidation) {

    ! skipValidation && this.validate(OutboundLockSchema, opts);

    return Promise.resolve([]).then(() => {

      // notify status
      this.emit('info', { status: 'starting', redeemKey: opts.redeemKey });

      return this.getOutboundFee(opts, true);

    }).then(outboundFee => {

      return this.sendLock(Object.assign({}, opts, { outboundFee }), true);

    }).then(receipt => {

      return this.listenLock(opts, receipt.blockNumber, true);

    }).then(receipt => {

      // notify complete
      this.emit('complete');

    }).catch(err => {

      // notify error
      this.emit('error', err)

    });
  }

  // make call to get storeman fee
  getOutboundFee(opts, skipValidation) {

    ! skipValidation && this.validate(OutboundFeeSchema, opts);

    if (opts.outboundFee) {
      return Promise.resolve(opts.outboundFee);
    }

    const callOpts = this.buildOutboundFeeTx(opts, true);
    const action = this.web3wan.eth.call(callOpts);

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

  // send lock transaction
  sendLock(opts, skipValidation) {

    ! skipValidation && this.validate(OutboundLockWithFeeSchema, opts);

    const sendOpts = this.buildLockTx(opts, true);
    const action = this.web3wan.eth.sendTransaction(sendOpts);

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

  // listen for storeman lock notice tx
  listenLock(opts, blockNumber, skipValidation) {

    ! skipValidation && this.validate(ScanOptsSchema, opts);

    const lockNoticeScanOpts = this.buildLockScanOpts(opts, blockNumber, true);
    const action = web3Util(this.web3wan).watchLogs(lockNoticeScanOpts);

    action.then(log => {
      const parsed = this.parseLog('HTLCWBTC', 'WBTC2BTCLockNotice', log);
      this.emit('info', { status: 'locked', log, parsed });
      return log;
    });

    action.catch(err => {
      this.emit('error', err);
    });

    return action;
  }

  // listen for storeman redeem tx
  // no longer used
  listenRedeem(opts, blockNumber, skipValidation) {

    ! skipValidation && this.validate(ScanOptsSchema, opts);

    const redeemScanOpts = this.buildRedeemScanOpts(opts, blockNumber, true);
    const action = web3Util(this.web3wan).watchLogs(redeemScanOpts);

    action.then(log => {
      const parsed = this.parseLog('HTLCWBTC', 'WBTC2BTCRedeem', log);
      this.emit('info', { status: 'redeemed', log, parsed });
      return log;
    });

    action.catch(err => {
      this.emit('error', err);
    });

    return action;
  }

  // send revoke transaction
  sendRevoke(opts, skipValidation) {

    ! skipValidation && this.validate(OutboundRevokeSchema, opts);

    const sendOpts = this.buildRevokeTx(opts, true);
    const action = this.web3wan.eth.sendTransaction(sendOpts);

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

    const to = this.config.wanHtlcAddrBtc;
    const data = this.buildOutboundFeeData(opts, true);

    return { to, data };
  }

  buildLockTx(opts, skipValidation) {

    ! skipValidation && this.validate(OutboundLockWithFeeSchema, opts);

    const { from, outboundFee } = opts;
    const lockData = this.buildLockData(opts, true);

    return {
      Txtype: '0x01',
      from: from,
      to: this.config.wanHtlcAddrBtc,
      gas: hex.fromNumber(360000),
      gasPrice: hex.fromNumber(180e9),
      value: hex.fromNumber(outboundFee),
      data: lockData,
    };
  }

  buildLockScanOpts(opts, blockNumber, skipValidation) {

    ! skipValidation && this.validate(ScanOptsSchema, opts);

    const { redeemKey } = opts;
    const { WBTC2BTCLockNotice } = this.config.signatures.HTLCWBTC;

    return {
      blockNumber,
      address: this.config.wanHtlcAddrBtc,
      topics: [
        '0x' + WBTC2BTCLockNotice,
        null,
        null,
        '0x' + hex.stripPrefix(redeemKey.xHash),
      ],
    };
  }

  buildRevokeTx(opts, skipValidation) {

    ! skipValidation && this.validate(OutboundRevokeSchema, opts);

    const { from } = opts;
    const revokeData = this.buildRevokeData(opts, true);

    return {
      Txtype: '0x01',
      from: from,
      to: this.config.wanHtlcAddrBtc,
      gas: hex.fromNumber(120000),
      gasPrice: hex.fromNumber(180e9),
      data: revokeData,
    };
  }

  buildRedeemScanOpts(opts, blockNumber, skipValidation) {

    ! skipValidation && this.validate(ScanOptsSchema, opts);

    const { redeemKey } = opts;
    const { WBTC2BTCRedeem } = this.config.signatures.HTLCWBTC;

    return {
      blockNumber,
      address: this.config.wanHtlcAddrBtc,
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
   * @param {string} opts.to - Destination btc addr
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

    ! skipValidation && this.validate(OutboundFeeDataSchema, opts);

    const { storeman, value } = opts;
    const { getWbtc2BtcFee } = this.config.signatures.HTLCWBTC;

    return '0x' + getWbtc2BtcFee.substr(0, 8)
      + types.hex2Bytes32(storeman.wan)
      + types.num2Bytes32(value);
  }

  //
  // BTC methods
  //

  buildHashTimeLockContract(opts) {

    this.validate(OutboundHTLCSchema, opts);

    const { to, storeman, redeemKey } = opts;
    let { lockTime } = opts;

    // auto-calculate lockTime if not set
    if (lockTime === undefined || lockTime === null) {
      lockTime = new moment().add(4, 'h').unix();
    }

    return btcUtil.buildHashTimeLockContract(
      this.config.network,
      redeemKey.xHash,
      crypto.addressToHash160(to, 'pubkeyhash', this.config.network),
      storeman.btc,
      lockTime
    );
  }

  hashForRedeemSig(opts) {

    this.validate(HashForRedeemSchema, opts);

    return btcUtil.hashForRedeemSig(
      this.config.network,
      opts.txid,
      opts.to,
      opts.value,
      opts.redeemScript
    );
  }

  buildRedeemTx(opts) {

    this.validate(OutboundRedeemSchema, opts);

    return btcUtil.buildRedeemTx(
      this.config.network,
      opts.txid,
      opts.value,
      opts.redeemScript,
      opts.redeemKey.x,
      opts.publicKey,
      opts.sigHash
    );
  }

  buildRedeemTxFromWif(opts) {

    this.validate(OutboundRedeemFromWifSchema, opts);

    return btcUtil.buildRedeemTxFromWif(
      this.config.network,
      opts.txid,
      opts.value,
      opts.redeemScript,
      opts.redeemKey.x,
      opts.wif
    );
  }
}

module.exports = BTC_Outbound;
