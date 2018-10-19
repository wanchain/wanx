const EventEmitter = require('events');
const Web3 = require('web3');

const config = require('./config');
const utils = require('./utils');

const CrosschainETH_Inbound = require('./crosschain/eth-inbound');
const CrosschainETH_Outbound = require('./crosschain/eth-outbound');
// const CrosschainBTC = require('./crosschain/btc');
// const CrosschainERC20 = require('./crosschain/erc20');

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

  send(type, inbound, opts) {
    const sender = getSender(type, inbound, this.config);
    return sender.send(opts);
  }

  lock(type, inbound, opts) {
    const sender = getSender(type, inbound, this.config);
    return sender.lock(opts);
  }

  redeem(type, inbound, opts) {
    const sender = getSender(type, inbound, this.config);
    return sender.redeem(opts);
  }

  revoke(type, inbound, opts) {
    const sender = getSender(type, inbound, this.config);
    return sender.revoke(opts);
  }

  newRedeemKey() {
    return utils.generateXPair();
  }

}

function getSender(type, inbound, config) {

  if (type === 'ETH') {
    if (inbound) {
      return new CrosschainETH_Inbound(config);
    }

    return new CrosschainETH_Outbound(config);
  }

  else if (type === 'BTC') {
  }

  else if (type === 'ERC20') {
  }

  else {
    throw new Error(`Unsupported crosschain type: ${type}. Types available `);
  }
}

module.exports = WanX;
