const EventEmitter = require('events');
const Web3 = require('web3');

const config = require('./config');

const CrosschainETH_Inbound = require('./crosschain/eth-inbound');
const CrosschainETH_Outbound = require('./crosschain/eth-outbound');
// const CrosschainBTC = require('./crosschain/btc');
// const CrosschainERC20 = require('./crosschain/erc20');

class WanX {

  constructor(network, conf) {

    this.config = config.get(network, conf);

    if (! this.config.web3wan) {
      const provider = new Web3.providers.HttpProvider(this.config.wanNodeUrl);
      this.config.web3wan = new Web3(provider);
    }

    if (! this.config.web3eth) {
      const provider = new Web3.providers.HttpProvider(this.config.ethNodeUrl);
      this.config.web3eth = new Web3(provider);
    }
  }

  send(type, inbound, opts) {
    const sender = this.getSender(type, inbound);
    return sender.send(opts);
  }

  revoke(type, inbound, opts) {
    const sender = this.getSender(type, inbound);
    return sender.revoke(opts);
  }

  getSender(type, inbound) {

    if (type === 'ETH') {
      if (inbound) {
        return new CrosschainETH_Inbound(this.config);
      }

      return new CrosschainETH_Outbound(this.config);
    }

    else if (type === 'BTC') {
    }

    else if (type === 'ERC20') {
    }

    else {
      throw new Error(`Unsupported crosschain type: ${type}. Types available `);
    }
  }
}

module.exports = WanX;
