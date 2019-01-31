const EventEmitter = require('events');
const Web3 = require('web3');
const Ajv = require('ajv');
const { find } = require('lodash');

const abis = require('./abis');
const defsSchema = require('./lib/schema/defs.json');

// FIXME: web3 now requires that a provider be passed upon initialization, but
// here we don't need to connect to any specific node
const web3 = new Web3('http://localhost:8545');

class CrosschainBase extends EventEmitter {

  constructor(config) {
    super();

    this.config = config;

    this.wanchain = config.wanchain;
    this.ethereum = config.ethereum;
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
    return forceLowerCase(parsed);
  }

  parseOutput(abiName, funcName, data) {
    const abi = abis[abiName];
    const { outputs } = find(abi, { type: 'function', name: funcName });

    const parsed = web3.eth.abi.decodeParameters(outputs, data);

    // decodeParameters returns addresses with ethereum checksum; to avoid confusion
    // with ethereum vs wanchain address checksums, force lowercase on string
    // properties
    return forceLowerCase(parsed);
  }

  validate(schema, opts) {
    const ajv = new Ajv({ allErrors: true });
    const validate = ajv.addSchema(defsSchema).compile(schema);

    if (! validate(opts)) {
      throw new Error('Invalid opts: ' + ajv.errorsText(validate.errors));
    }
  }
}

function forceLowerCase(obj) {
  const keys = Object.keys(obj);
  const newObj = {};

  for (let i = 0, l = keys.length; i < l; i++) {
    const key = keys[i];
    if (typeof obj[key] === 'string') {
      newObj[key] = obj[key].toLowerCase();
    }
    else {
      newObj[key] = obj[key];
    }
  }

  return newObj;
}

module.exports = CrosschainBase;
