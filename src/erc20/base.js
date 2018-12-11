const web3Shim = require('../lib/web3');
const types = require('../lib/types');
const CrosschainBase = require('../base');

const {
  StoremanQuotaSchema,
  TokenInfoSchema,
  TokenKeySchema,
} = require('./schema');

/**
 * ERC20 Base
 */
class ERC20_Base extends CrosschainBase {
  constructor(config) {
    super(config);
  }

  /**
   * Make storeman quota call on Wanchain
   * @param {Object} opts - Tx options
   * @param {Object} opts.storeman - Storeman address pair
   * @param {string} opts.storeman.wan - Storeman Wanchain address
   * @param {Object} opts.token - Token pair
   * @param {string} opts.token.eth - Token address on Ethereum
   * @param {boolean} skipValidation
   * @returns {Promise} Promise returning object
   */
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
   * Make token info call on Wanchain
   * @param {Object} opts - Tx options
   * @param {Object} opts.token - Token pair
   * @param {string} opts.token.eth - Token address on Ethereum
   * @param {boolean} skipValidation
   * @returns {Promise} Promise returning object
   */
  tokenInfo(opts, skipValidation) {

    ! skipValidation && this.validate(TokenKeySchema, opts);

    const keyOpts = this.buildTokenKeyTx(opts, true);
    const keyCall = web3Shim(this.wanchain.web3).call(keyOpts);

    return new Promise((resolve, reject) => {

      keyCall.then(key => {

        const infoOpts = this.buildTokenInfoTx(Object.assign({}, opts, { token: { key }}, true));
        const infoCall = web3Shim(this.wanchain.web3).call(infoOpts);

        infoCall.then(res => {
          const tokenInfo = this.parseOutput('TokenManager', 'mapTokenInfo', res);
          this.emit('info', { status: 'tokenInfo', tokenInfo });

          resolve(tokenInfo);
        });

        infoCall.catch(err => {
          this.emit('error', err);
          reject(err);
        });
      });

      keyCall.catch(err => {
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
   * Build token manager mapKey call
   * @param {Object} opts - Tx options
   * @param {Object} opts.token - Token pair
   * @param {string} opts.token.eth - Token address on Ethereum
   * @param {boolean} skipValidation
   * @returns {Object} Tx object
   */
  buildTokenKeyTx(opts, skipValidation) {

    ! skipValidation && this.validate(TokenKeySchema, opts);

    const to = this.config.addresses.TokenManager;
    const data = this.buildTokenKeyData(opts, true);

    return { to, data };
  }

  /**
   * Build token manager mapTokenInfo call
   * @param {Object} opts - Tx options
   * @param {Object} opts.token - Token info
   * @param {string} opts.token.key - Token key
   * @param {boolean} skipValidation
   * @returns {Object} Tx object
   */
  buildTokenInfoTx(opts, skipValidation) {

    ! skipValidation && this.validate(TokenInfoSchema, opts);

    const to = this.config.addresses.TokenManager;
    const data = this.buildTokenInfoData(opts, true);

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

  /**
   * Get data hex string for token mapTokenInfo call
   * @param {Object} opts - Data options
   * @param {Object} opts.token - Token info
   * @param {string} opts.token.key - Token key
   * @param {boolean} skipValidation
   * @returns {Object} Storeman quota info
   */
  buildTokenInfoData(opts, skipValidation) {

    ! skipValidation && this.validate(TokenInfoSchema, opts);

    const { token } = opts;
    const { mapTokenInfo } = this.config.signatures.TokenManager;

    return '0x' + mapTokenInfo.substr(0, 8)
      + types.hex2Bytes32(token.key);
  }

  /**
   * Get data hex string for token mapKey call
   * @param {Object} opts - Data options
   * @param {Object} opts.token - Token pair
   * @param {string} opts.token.eth - Token address on Ethereum
   * @param {boolean} skipValidation
   * @returns {Object} Storeman quota info
   */
  buildTokenKeyData(opts, skipValidation) {

    ! skipValidation && this.validate(TokenKeySchema, opts);

    const { token } = opts;
    const { mapKey } = this.config.signatures.TokenManager;

    return '0x' + mapKey.substr(0, 8)
      + types.hex2Bytes32(token.eth);
  }
}

module.exports = ERC20_Base;
