const EventEmitter = require('events');
const Web3 = require('web3');

const config = require('./config');
const crypto = require('./crypto');

const ETH_Inbound = require('./crosschain/eth-inbound');
const ETH_Outbound = require('./crosschain/eth-outbound');
// const BTC = require('./crosschain/btc');
// const ERC20 = require('./crosschain/erc20');

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

  // complete crosschain transfer (lock and redeem)
  send(type, inbound, opts) {
    const sender = getSender(type, inbound, this.config);
    return sender.send(opts);
  }

  // lock step (1st of 2 steps)
  lock(type, inbound, opts) {
    const sender = getSender(type, inbound, this.config);
    return sender.lock(opts);
  }

  // redeem step (2nd of 2 steps, if timelock active)
  redeem(type, inbound, opts) {
    const sender = getSender(type, inbound, this.config);
    return sender.redeem(opts);
  }

  // revoke step (2nd of 2 steps, if timelock expired)
  revoke(type, inbound, opts) {
    const sender = getSender(type, inbound, this.config);
    return sender.revoke(opts);
  }

  newRedeemKey() {
    return crypto.generateXPair();
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
    default:
      throw new Error(`Unsupported crosschain type: ${type}.`);
  }
}

module.exports = WanX;
