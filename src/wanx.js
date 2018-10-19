const EventEmitter = require('events');

const config = require('./config');

const CrosschainETH_Inbound = require('./crosschain/eth-inbound');
const CrosschainETH_Outbound = require('./crosschain/eth-outbound');
// const CrosschainBTC = require('./crosschain/btc');
// const CrosschainERC20 = require('./crosschain/erc20');

class WanX {

  constructor(network, conf) {

    // load configuration
    this.config = config.get(network, conf);

  }

  send(type, inbound, opts) {
    const sender = getSender(type, inbound, this.config);
    return sender.send(opts);
  }

  revoke(type, inbound, opts) {
    const sender = getSender(type, inbound, this.config);
    return sender.revoke(opts);
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
