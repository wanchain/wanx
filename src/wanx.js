const EventEmitter = require('events');
const Web3 = require('web3');

const config = require('./config');
const crypto = require('./lib/crypto');
const btcUtil = require('./btc/utils');

const ETH_Inbound = require('./eth/inbound');
const ETH_Outbound = require('./eth/outbound');

const BTC_Outbound = require('./btc/outbound');
// const BTC = require('./btc');
// const ERC20 = require('./erc20');

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

    if (! this.config.web3eth && this.config.ethNodeUrl) {
      const provider = new Web3.providers.HttpProvider(this.config.ethNodeUrl);
      this.config.web3eth = new Web3(provider);
    }

  }

  newChain(type, inbound) {
    return getSender(type, inbound, this.config);
  }

  newRedeemKey() {
    return crypto.generateXPair();
  }

  newBtcRedeemKey() {
    return btcUtil.generateXPair();
  }

}

function getSender(type, inbound, config) {

  const direction = inbound ? 'in' : 'out';
  const senderName = `${type.toLowerCase()}_${direction}`;

  switch(senderName) {
    case 'eth_in':
      return new ETH_Inbound(config);
    case 'eth_out':
      return new ETH_Outbound(config);
    case 'btc_out':
      return new BTC_Outbound(config);
    default:
      throw new Error(`Unsupported crosschain type: ${type}.`);
  }
}

module.exports = WanX;
