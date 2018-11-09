const EventEmitter = require('events');
const Web3 = require('web3');

const config = require('./config');
const crypto = require('./lib/crypto');

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
    if (! this.config.web3wan && this.config.wanNodeUrl) {
      const provider = new Web3.providers.HttpProvider(this.config.wanNodeUrl);
      this.config.web3wan = new Web3(provider);
    }
    else if (this.config.web3wan && typeof this.config.web3wan.version !== 'string') {
      throw new Error('Unsupported web3 version');
    }

    if (! this.config.web3eth && this.config.ethNodeUrl) {
      const provider = new Web3.providers.HttpProvider(this.config.ethNodeUrl);
      this.config.web3eth = new Web3(provider);
    }
    else if (this.config.web3eth && typeof this.config.web3eth.version !== 'string') {
      throw new Error('Unsupported web3 version');
    }

    this.crypto = crypto;
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
