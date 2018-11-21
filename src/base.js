const EventEmitter = require('events');
const Web3 = require('web3');
const Ajv = require('ajv');
const { find } = require('lodash');

const abis = require('./abis');
const defsSchema = require('./lib/schema/defs.json');

const web3 = new Web3();

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
    const keys = Object.keys(parsed);

    for (let i = 0, l = keys.length; i < l; i++) {
      const key = keys[i];
      if (typeof parsed[key] === 'string') {
        parsed[key] = parsed[key].toLowerCase();
      }
    }

    return parsed;
  }

  validate(schema, opts) {
    const ajv = new Ajv({ allErrors: true });
    const validate = ajv.addSchema(defsSchema).compile(schema);

    if (! validate(opts)) {
      throw new Error('Invalid opts: ' + ajv.errorsText(validate.errors));
    }
  }
}

module.exports = CrosschainBase;
