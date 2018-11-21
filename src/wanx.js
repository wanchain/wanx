const EventEmitter = require('events');
const Web3 = require('web3');

const config = require('./config');
const crypto = require('./lib/crypto');
const abis = require('./abis');

const ETH_Inbound = require('./eth/inbound');
const ETH_Outbound = require('./eth/outbound');

const ERC20_Inbound = require('./erc20/inbound');
const ERC20_Outbound = require('./erc20/outbound');

const BTC_Outbound = require('./btc/outbound');
const BTC_Inbound = require('./btc/inbound');

class WanX {

  constructor(network, conf) {

    // load configuration
    // default config + network config + user config
    this.config = config.get(network, conf);

    // initialize web3 objects if objects are not passed in config and if
    // config urls are set
    if (! this.config.wanchain.web3 && this.config.wanchain.url) {
      const provider = new Web3.providers.HttpProvider(this.config.wanchain.url);
      this.config.wanchain.web3 = new Web3(provider);
    }
    else if (this.config.wanchain.web3 && typeof this.config.wanchain.web3.version !== 'string') {
      throw new Error('Unsupported web3 version');
    }

    if (! this.config.ethereum.web3 && this.config.ethereum.url) {
      const provider = new Web3.providers.HttpProvider(this.config.ethereum.url);
      this.config.ethereum.web3 = new Web3(provider);
    }
    else if (this.config.ethereum.web3 && typeof this.config.ethereum.web3.version !== 'string') {
      throw new Error('Unsupported web3 version');
    }

    this.crypto = crypto;
    this.abis = abis;
  }

  newChain(type, inbound) {
    return getChain(type, inbound, this.config);
  }

  // btc requires sha256, everything else keccak256
  newRedeemKey(type = 'keccak256') {
    const x = crypto.generateX();

    switch(type) {
      case 'sha256':
        return { x, xHash: crypto.sha256(x) };
      case 'keccak256':
        return { x, xHash: crypto.keccak256(x) };
      default:
        throw new Error(`Invalid hash type: ${type}.`);
    }
  }
}

function getChain(type, inbound, config) {

  const direction = inbound ? 'in' : 'out';
  const senderName = `${type.toLowerCase()}_${direction}`;

  switch(senderName) {
    case 'eth_in':
      return new ETH_Inbound(config);
    case 'eth_out':
      return new ETH_Outbound(config);
    case 'erc20_in':
      return new ERC20_Inbound(config);
    case 'erc20_out':
      return new ERC20_Outbound(config);
    case 'btc_in':
      return new BTC_Inbound(config);
    case 'btc_out':
      return new BTC_Outbound(config);
    default:
      throw new Error(`Unsupported crosschain type: ${type}.`);
  }
}

module.exports = WanX;
