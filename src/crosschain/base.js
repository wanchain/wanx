const EventEmitter = require('events');
const utils = require('../utils');

class CrosschainBase extends EventEmitter {

  constructor(config) {
    super();

    this.config = config;

    this.web3wan = config.web3wan;
    this.web3eth = config.web3eth;

    this.x = {};
  }

  rpcRequest(method, opts) {
    return new Promise((resolve, reject) => {
      utils.websocketsRequest(this.config.rpcWsUrl, method, opts, (err, res) => {
        if (err) {
          return reject(err);
        }

        const data = JSON.parse(res.data);
        resolve(data);
      });
    });
  }
}

module.exports = CrosschainBase;
