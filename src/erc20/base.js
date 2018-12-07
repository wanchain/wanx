const web3Shim = require('../lib/web3');
const types = require('../lib/types');
const CrosschainBase = require('../base');

const {
  StoremanQuotaSchema,
} = require('./schema');

/**
 * ERC20 Base
 */
class ERC20_Base extends CrosschainBase {
  constructor(config) {
    super(config);
  }

  storemanQuota(opts, skipValidation) {

    ! skipValidation && this.validate(StoremanQuotaSchema, opts);

    const callOpts = this.buildStoremanQuotaTx(opts, true);
    const action = web3Shim(this.wanchain.web3).call(callOpts);

    return new Promise((resolve, reject) => {
      action.then(res => {
        const storemanQuota = this.parseOutput('QuotaLedger', 'mapQuota', res);
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
   * Build storeman quota call
   * @param {Object} opts - Tx options
   * @param {Object} opts.storeman - Storeman address pair
   * @param {string} opts.storeman.wan - Storeman Wanchain address
   * @param {Object} opts.token - Token pair
   * @param {string} opts.token.eth - Token address on Ethereum
   * @param {boolean} skipValidation
   * @returns {Object} Tx object
   */
  buildStoremanQuotaTx(opts, skipValidation) {

    ! skipValidation && this.validate(StoremanQuotaSchema, opts);

    const to = this.config.addresses.QuotaLedger;
    const data = this.buildStoremanQuotaData(opts, true);

    return { to, data };
  }

  /**
   * Get data hex string for storeman quota call
   * @param {Object} opts - Data options
   * @param {Object} opts.storeman - Storeman address pair
   * @param {string} opts.storeman.wan - Storeman Wanchain address
   * @param {Object} opts.token - Token pair
   * @param {string} opts.token.eth - Token address on Ethereum
   * @param {boolean} skipValidation
   * @returns {Object} Storeman quota info
   */
  buildStoremanQuotaData(opts, skipValidation) {

    ! skipValidation && this.validate(StoremanQuotaSchema, opts);

    const { storeman, token } = opts;
    const { mapQuota } = this.config.signatures.QuotaLedger;

    return '0x' + mapQuota.substr(0, 8)
      + types.hex2Bytes32(token.eth)
      + types.hex2Bytes32(storeman.wan)
  }
}

module.exports = ERC20_Base;
