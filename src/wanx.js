const EventEmitter = require('events');
const Web3 = require('web3');

const config = require('./config');
const crypto = require('./lib/crypto');
const attachWanRpc = require('./lib/wan-attach-rpc.js');
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

    const { wanchain, ethereum } = this.config;

    // initialize Wanchain web3 object
    if (! wanchain.web3 && wanchain.url) {
      const provider = new Web3.providers.HttpProvider(wanchain.url);
      wanchain.web3 = new Web3(provider);
    }
    else if (wanchain.web3 && typeof wanchain.web3.version !== 'string') {
      throw new Error('Unsupported web3 version');
    }

    // attach Wanchain methods
    if (wanchain.web3 && ! wanchain.web3.wan) {
      wanchain.web3.wan = attachWanRpc(wanchain.web3);
    }

    // initialize Ethereum web3 object
    if (! ethereum.web3 && ethereum.url) {
      const provider = new Web3.providers.HttpProvider(ethereum.url);
      ethereum.web3 = new Web3(provider);
    }
    else if (ethereum.web3 && typeof ethereum.web3.version !== 'string') {
      throw new Error('Unsupported web3 version');
    }

    this.config.wanchain = wanchain;
    this.config.ethereum = ethereum;

    this.crypto = crypto;
    this.abis = abis;
    this.attachWanRpc = attachWanRpc;

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
