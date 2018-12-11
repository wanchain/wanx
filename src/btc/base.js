const web3Shim = require('../lib/web3');
const types = require('../lib/types');
const CrosschainBase = require('../base');

const {
  StoremanInfoSchema,
  StoremanQuotaSchema,
} = require('./schema');

/**
 * Bitcoin Base
 */
class BTC_Base extends CrosschainBase {
  constructor(config) {
    super(config);
  }

  /**
   * Make storeman quota call on Wanchain
   * @param {Object} opts - Tx options
   * @param {Object} opts.storeman - Storeman address pair
   * @param {string} opts.storeman.wan - Storeman Wanchain address
   * @param {boolean} skipValidation
   * @returns {Promise} Promise returning object
   */
  storemanQuota(opts, skipValidation) {

    ! skipValidation && this.validate(StoremanQuotaSchema, opts);

    const callOpts = this.buildStoremanQuotaTx(opts, true);
    const action = web3Shim(this.wanchain.web3).call(callOpts);

    return new Promise((resolve, reject) => {
      action.then(res => {
        const storemanQuota = this.parseOutput('WBTCManager', 'mapStoremanGroup', res);
        this.emit('info', { status: 'storemanQuota', storemanQuota });

        resolve(storemanQuota);
      })

      action.catch(err => {
        this.emit('error', err);
        reject(err);
      });
    });
  }

  /**
   * Make storeman quota info on Wanchain
   * @param {Object} opts - Tx options
   * @param {Object} opts.storeman - Storeman address pair
   * @param {string} opts.storeman.wan - Storeman Wanchain address
   * @param {boolean} skipValidation
   * @returns {Promise} Promise returning object
   */
  storemanInfo(opts, skipValidation) {

    ! skipValidation && this.validate(StoremanInfoSchema, opts);

    const callOpts = this.buildStoremanInfoTx(opts, true);
    const action = web3Shim(this.wanchain.web3).call(callOpts);

    return new Promise((resolve, reject) => {
      action.then(res => {
        const storemanInfo = this.parseOutput('StoremanGroupAdmin_BTC', 'mapCoinSmgInfo', res);
        this.emit('info', { status: 'storemanInfo', storemanInfo });

        resolve(storemanInfo);
      })

      action.catch(err => {
        this.emit('error', err);
        reject(err);
      });
    });
  }

  /**
   * Build storeman quota call
   * @param {Object} opts - Tx options
   * @param {Object} opts.storeman - Storeman address pair
   * @param {string} opts.storeman.wan - Storeman Wanchain address
   * @param {boolean} skipValidation
   * @returns {Object} Tx object
   */
  buildStoremanQuotaTx(opts, skipValidation) {

    ! skipValidation && this.validate(StoremanQuotaSchema, opts);

    const to = this.config.addresses.WBTCManager;
    const data = this.buildStoremanQuotaData(opts, true);

    return { to, data };
  }

  /**
   * Build storeman info call
   * @param {Object} opts - Tx options
   * @param {Object} opts.storeman - Storeman address pair
   * @param {string} opts.storeman.wan - Storeman Wanchain address
   * @param {boolean} skipValidation
   * @returns {Object} Tx object
   */
  buildStoremanInfoTx(opts, skipValidation) {

    ! skipValidation && this.validate(StoremanInfoSchema, opts);

    const to = this.config.addresses.StoremanGroupAdmin_BTC;
    const data = this.buildStoremanInfoData(opts, true);

    return { to, data };
  }

  /**
   * Get data hex string for storeman quota call
   * @param {Object} opts - Data options
   * @param {Object} opts.storeman - Storeman address pair
   * @param {string} opts.storeman.wan - Storeman Wanchain address
   * @param {boolean} skipValidation
   * @returns {string} Data hex string
   */
  buildStoremanQuotaData(opts, skipValidation) {

    ! skipValidation && this.validate(StoremanQuotaSchema, opts);

    const { storeman } = opts;
    const { mapStoremanGroup } = this.config.signatures.WBTCManager;

    return '0x' + mapStoremanGroup.substr(0, 8)
      + types.hex2Bytes32(storeman.wan)
  }

  /**
   * Get data hex string for storeman info call
   * @param {Object} opts - Data options
   * @param {Object} opts.storeman - Storeman address pair
   * @param {string} opts.storeman.wan - Storeman Wanchain address
   * @param {boolean} skipValidation
   * @returns {string} Data hex string
   */
  buildStoremanInfoData(opts, skipValidation) {

    ! skipValidation && this.validate(StoremanInfoSchema, opts);

    const { storeman } = opts;
    const { mapCoinSmgInfo } = this.config.signatures.StoremanGroupAdmin_BTC;

    return '0x' + mapCoinSmgInfo.substr(0, 8)
      + types.num2Bytes32(1)
      + types.hex2Bytes32(storeman.wan);
  }
}

module.exports = BTC_Base;
