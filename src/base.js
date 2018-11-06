const EventEmitter = require('events');

class CrosschainBase extends EventEmitter {

  constructor(config) {
    super();

    this.config = config;

    this.web3wan = config.web3wan;
    this.web3eth = config.web3eth;
  }

}

module.exports = CrosschainBase;
