const BigNumber = require('bignumber.js');

const CrosschainBase = require('../base');
const btcUtil = require('./utils');
const web3Util = require('../lib/web3');
const types = require('../lib/types');
const { stripHexPrefix } = require('../lib/utils');

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

    const revokeData = this.buildRevokeData(opts);

    const sendOpts = {
      from: opts.from,
      to: this.config.wanHtlcAddrBtc,
      gas: 4700000,
      gasPrice: 180e9,
      data: revokeData,
    };

    this.emit('info', { status: 'starting' });

    return web3Util(this.web3wan).sendTransaction(sendOpts).then(receipt => {

      // notify complete
      this.emit('complete', { status: 'revoked', receipt });

    }).catch(err => {

      // notify error
      this.emit('error', err)

    });
  }

  // send lock transaction
  sendLockTx({ to, from, value, storeman, redeemKey, fee }) {

    const lockData = this.buildLockData({
      to,
      value,
      storeman,
      redeemKey,
    });

    const sendOpts = {
      from: from,
      to: this.config.wanHtlcAddrBtc,
      gas: 4700000,
      gasPrice: 180e9,
      value: fee,
      data: lockData,
    };

    return web3Util(this.web3wan).sendTransaction(sendOpts);
  }

  // listen for storeman tx
  listenLockNoticeTx({ redeemKey }, blockNumber) {

    const lockNoticeScanOpts = {
      blockNumber,
      address: this.config.wanHtlcAddrBtc,
      topics: [
        '0x' + this.config.signatures.HTLCWBTC.WBTC2BTCLockNotice,
        null,
        null,
        '0x' + redeemKey.xHash,
      ],
    };

    return web3Util(this.web3wan).watchLogs(lockNoticeScanOpts);
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

  // listen for storeman tx
  listenRedeemTx({ redeemKey }, blockNumber) {

    const redeemScanOpts = {
      blockNumber,
      address: this.config.wanHtlcAddrBtc,
      topics: [
        '0x' + this.config.signatures.HTLCWBTC.WBTC2BTCRedeem,
        null,
        null,
        '0x' + redeemKey.xHash,
      ],
    };

    return web3Util(this.web3wan).watchLogs(redeemScanOpts);
  }

  buildLockData({ to, value, storeman, redeemKey }) {
    const sig = this.config.signatures.HTLCWBTC.wbtc2btcLock;
    const toAddr = btcUtil.addressToHash160(to, 'pubkeyhash', this.config.network);

    return '0x' + sig.substr(0, 8) + redeemKey.xHash
      + types.addr2Bytes(storeman.wan)
      + types.addr2Bytes(toAddr)
      + types.number2Bytes(value);
  }

  buildRevokeData({ redeemKey }) {
    const sig = this.config.signatures.HTLCWBTC.wbtc2btcRevoke;
    return '0x' + sig.substr(0, 8) + stripHexPrefix(redeemKey.xHash);
  }

  getStoremanFee({ storeman, value }) {
    const to = this.config.wanHtlcAddrBtc;
    const sig = this.config.signatures.HTLCWBTC.getWbtc2BtcFee;

    const data = '0x' + sig.substr(0, 8)
      + types.addr2Bytes(storeman.wan)
      + types.number2Bytes(value);

    return web3Util(this.web3wan).call({ to, data });
  }
}

module.exports = BTC_Outbound;
