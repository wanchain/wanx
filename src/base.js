const EventEmitter = require('events');
const Web3 = require('web3');
const { find } = require('lodash');

const abis = require('./abis');

const web3 = new Web3();

class CrosschainBase extends EventEmitter {

  constructor(config) {
    super();

    this.config = config;

    this.web3wan = config.web3wan;
    this.web3eth = config.web3eth;
  }

  parseLog(abiName, eventName, log) {
    const abi = abis[abiName];
    const { inputs } = find(abi, { type: 'event', name: eventName });

    const { data } = log;
    const topics = log.topics.slice(1);

    const parsed = web3.eth.abi.decodeLog(inputs, data, topics);

    // decodeLog returns addresses with ethereum checksum; to avoid confusion
    // with ethereum vs wanchain address checksums, force lowercase on string
    // properties
    const keys = Object.keys(parsed);

    for (let i = 0, l = keys.length; i < l; i++) {
      const key = keys[i];
      if (typeof parsed[key] === 'string') {
        parsed[key] = parsed[key].toLowerCase();
      }
    }

    return parsed;
  }
}

module.exports = CrosschainBase;
