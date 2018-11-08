const BigNumber = require('bignumber.js');

const CrosschainBase = require('../base');
const btcUtil = require('./utils');
const web3Util = require('../lib/web3');
const types = require('../lib/types');
const hex = require('../lib/hex');

const {
  validateSendOpts,
  validateRedeemOpts,
  validateRevokeOpts,
} = require('./validate');

class BTC_Outbound extends CrosschainBase {

  constructor(config) {
    super(config);
  }

  // first 1/2 of crosschain transaction
  lock(opts) {

    // validate inputs
    opts = validateSendOpts(opts);

    return Promise.resolve([]).then(() => {

      // notify status
      this.emit('info', { status: 'starting', redeemKey: opts.redeemKey });

      return this.getStoremanFee(opts);

    }).then(res => {

      const fee = new BigNumber(res).toString();

      // notify status
      this.emit('info', { status: 'fee', fee });

      return this.sendLockTx(Object.assign({}, opts, { fee }));

    }).then(receipt => {

      // notify status
      this.emit('info', { status: 'locking', receipt });

      return this.listenLockNoticeTx(opts, receipt.blockNumber);

    }).then(receipt => {

      // notify complete
      this.emit('complete', { status: 'locked', receipt });

    }).catch(err => {

      // notify error
      this.emit('error', err)

    });
  }

  // send revoke transaction
  revoke(opts) {

    // validate inputs
    opts = validateRevokeOpts(opts);

    const sendOpts = this.buildRevokeTx(opts);

    this.emit('info', { status: 'starting' });

    return this.web3wan.eth.sendTransaction(sendOpts).then(receipt => {

      // notify complete
      this.emit('complete', { status: 'revoked', receipt });

    }).catch(err => {

      // notify error
      this.emit('error', err)

    });
  }

  // send lock transaction
  sendLockTx(opts) {
    const sendOpts = this.buildLockTx(opts);
    return this.web3wan.eth.sendTransaction(sendOpts);
  }

  buildLockTx({ to, from, value, storeman, redeemKey, fee }) {
    const lockData = this.buildLockData({
      to,
      value,
      storeman,
      redeemKey,
    });

    return {
      from: from,
      to: this.config.wanHtlcAddrBtc,
      gas: 4700000,
      gasPrice: 180e9,
      value: fee,
      data: lockData,
    };
  }

  buildRevokeTx({ from, redeemKey }) {
    const revokeData = this.buildRevokeData({ redeemKey });

    return {
      from: from,
      to: this.config.wanHtlcAddrBtc,
      gas: 4700000,
      gasPrice: 180e9,
      data: revokeData,
    };
  }

  // listen for storeman tx
  listenLockNoticeTx(opts, blockNumber) {
    const lockNoticeScanOpts = this.buildLockNoticeScanOpts(opts, blockNumber);
    return web3Util(this.web3wan).watchLogs(lockNoticeScanOpts);
  }

  buildLockNoticeScanOpts({ redeemKey }, blockNumber) {
    return {
      blockNumber,
      address: this.config.wanHtlcAddrBtc,
      topics: [
        '0x' + this.config.signatures.HTLCWBTC.WBTC2BTCLockNotice,
        null,
        null,
        '0x' + hex.stripPrefix(redeemKey.xHash),
      ],
    };
  }

  // listen for storeman tx
  listenRedeemTx(opts, blockNumber) {
    const redeemScanOpts = this.buildRedeemScanOpts(opts, blockNumber);
    return web3Util(this.web3wan).watchLogs(redeemScanOpts);
  }

  buildRedeemScanOpts({ redeemKey }, blockNumber) {
    return {
      blockNumber,
      address: this.config.wanHtlcAddrBtc,
      topics: [
        '0x' + this.config.signatures.HTLCWBTC.WBTC2BTCRedeem,
        null,
        null,
        '0x' + hex.stripPrefix(redeemKey.xHash),
      ],
    };
  }

  buildHashTimeLockContract(xHash, lockTimestamp, destH160Addr, revokerH160Addr) {
    return btcUtil.buildHashTimeLockContract(
      this.config.network,
      xHash,
      lockTimestamp,
      destH160Addr,
      revokerH160Addr
    );
  }

  hashForSignature(opts) {
    return btcUtil.hashForSignature(
      this.config.network,
      opts.redeemScript,
      opts.publicKey,
      opts.txid,
      opts.value,
    );
  }

  buildRedeemTx(opts) {
    return btcUtil.buildRedeemTx(
      this.config.network,
      opts.redeemScript,
      opts.signedRedeemScript,
      opts.publicKey,
      opts.redeemKey.x,
      opts.txid,
      opts.value,
    );
  }

  buildRedeemTxFromWif(opts) {
    return btcUtil.buildRedeemTx(
      this.config.network,
      opts.redeemScript,
      opts.wif,
      opts.redeemKey.x,
      opts.txid,
      opts.value,
    );
  }

  buildLockData({ to, value, storeman, redeemKey }) {
    const sig = this.config.signatures.HTLCWBTC.wbtc2btcLock;
    const toAddr = crypto.addressToHash160(to, 'pubkeyhash', this.config.network);

    return '0x' + sig.substr(0, 8) + hex.stripPrefix(redeemKey.xHash)
      + types.hex2Bytes32(storeman.wan)
      + types.hex2Bytes32(toAddr)
      + types.num2Bytes32(value);
  }

  buildRevokeData({ redeemKey }) {
    const sig = this.config.signatures.HTLCWBTC.wbtc2btcRevoke;
    return '0x' + sig.substr(0, 8) + hex.stripPrefix(redeemKey.xHash);
  }

  getStoremanFee({ storeman, value }) {
    const callOpts = this.buildStoremanFeeTx(opts);
    return this.web3wan.eth.call(callOpts);
  }

  buildStoremanFeeTx(opts) {
    const to = this.config.wanHtlcAddrBtc;
    const data = this.buildStoremanFeeData(opts);

    return { to, data };
  }

  buildStoremanFeeData({ storeman, value }) {
    const sig = this.config.signatures.HTLCWBTC.getWbtc2BtcFee;

    return '0x' + sig.substr(0, 8)
      + types.hex2Bytes32(storeman.wan)
      + types.num2Bytes32(value);
  }
}

module.exports = BTC_Outbound;
