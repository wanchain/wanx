const moment = require('moment');
// const validate = require('validate.js');

const CrosschainBase = require('../base');
const btcUtil = require('./utils');
const web3Util = require('../lib/web3');
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

class BTC_Inbound extends CrosschainBase {

  constructor(config) {
    super(config);
  }

  // first 1/2 of crosschain transaction
  // assumes that you have already created a new HTLC address and have sent
  // bitcoin to it
  lock(opts, skipValidation) {

    ! skipValidation && this.validate(InboundLockSchema, opts);

    return Promise.resolve([]).then(() => {

      // notify status
      this.emit('info', { status: 'starting', redeemKey: opts.redeemKey });

      return this.sendLock(opts);

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

  // second 1/2 of crosschain transaction
  // requires redeemKey to be passed in opts
  redeem(opts, skipValidation) {

    ! skipValidation && this.validate(InboundLockSchema, opts);

    return Promise.resolve([]).then(() => {

      // notify status
      this.emit('info', { status: 'starting', redeemKey: opts.redeemKey });

      return this.sendRedeem(opts, true);

    }).then(receipt => {

      // notify complete
      this.emit('complete');

    }).catch(err => {

      // notify error
      this.emit('error', err)

    });
  }

  // send lock notice transaction on wanchain
  sendLock(opts, skipValidation) {

    ! skipValidation && this.validate(InboundLockSchema, opts);

    const sendOpts = this.buildLockTx(opts, true);
    const action = this.web3wan.eth.sendTransaction(sendOpts);

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

  // listen for storeman tx on wanchain
  listenLock(opts, blockNumber, skipValidation) {

    ! skipValidation && this.validate(ScanOptsSchema, opts);

    const lockScanOpts = this.buildLockScanOpts(opts, blockNumber, true);
    const action = web3Util(this.web3wan).watchLogs(lockScanOpts);

    action.then(log => {
      const parsed = this.parseLog('HTLCWBTC', 'BTC2WBTCLock', log);
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

    const sendOpts = this.buildRedeemTx(opts);
    const action = this.web3wan.eth.sendTransaction(sendOpts);

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

  buildLockTx(opts, skipValidation) {

    ! skipValidation && this.validate(InboundLockSchema, opts);

    const lockNoticeData = this.buildLockData(opts, true);

    return {
      from: opts.to,
      to: this.config.wanHtlcAddrBtc,
      gas: 300000,
      gasPrice: 180e9,
      data: lockNoticeData,
    };
  }

  buildLockScanOpts(opts, blockNumber, skipValidation) {

    ! skipValidation && this.validate(ScanOptsSchema, opts);

    const { redeemKey } = opts;
    const { BTC2WBTCLock } = this.config.signatures.HTLCWBTC;

    return {
      blockNumber,
      address: this.config.wanHtlcAddrBtc,
      topics: [
        '0x' + BTC2WBTCLock,
        null,
        null,
        '0x' + hex.stripPrefix(redeemKey.xHash),
      ],
    };
  }

  buildRedeemTx(opts, skipValidation) {

    ! skipValidation && this.validate(InboundRedeemSchema, opts);

    const redeemData = this.buildRedeemData(opts, true);

    return {
      from: opts.to,
      to: this.config.wanHtlcAddrBtc,
      gas: 120000,
      gasPrice: 180e9,
      data: redeemData,
    };
  }

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

  buildHashTimeLockContract(opts) {

    this.validate(InboundHTLCSchema, opts);

    const { from, storeman, redeemKey } = opts;
    let { lockTime } = opts;

    // auto-calculate lockTime if not set
    // FIXME: define default locktime interval in settings,
    // or better, add a method to get it from the contracts
    if (lockTime === undefined || lockTime === null) {
      lockTime = new moment().add(8, 'h').unix();
    }

    return btcUtil.buildHashTimeLockContract(
      this.config.network,
      redeemKey.xHash,
      storeman.btc,
      crypto.addressToHash160(from, 'pubkeyhash', this.config.network),
      lockTime
    );
  }

  hashForRevokeSig(opts) {

    this.validate(HashForRevokeSchema, opts);

    return btcUtil.hashForRevokeSig(
      this.config.network,
      opts.txid,
      opts.from,
      opts.value,
      opts.lockTime,
      opts.redeemScript
    );
  }

  buildRevokeTx(opts) {

    this.validate(InboundRevokeSchema, opts);

    return btcUtil.buildRevokeTx(
      this.config.network,
      opts.txid,
      opts.value,
      opts.redeemScript,
      opts.redeemKey.x,
      opts.lockTime,
      opts.publicKey,
      opts.sigHash
    );
  }

  buildRevokeTxFromWif(opts) {

    this.validate(InboundRevokeFromWifSchema, opts);

    return btcUtil.buildRevokeTxFromWif(
      this.config.network,
      opts.txid,
      opts.value,
      opts.redeemScript,
      opts.redeemKey.x,
      opts.lockTime,
      opts.wif
    );
  }
}

module.exports = BTC_Inbound;
