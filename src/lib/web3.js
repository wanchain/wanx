const PromiEvent = require('web3-core-promievent');

const ERR_NOVERSION = 'Unable to obtain web3 version';
const TIMEOUT_INTERVAL = 3000;

module.exports = web3Shim;

function web3Shim(web3Obj) {

  this.web3 = web3Obj;
  this.version = getVersion(web3Obj);
  this.watchLogs = watchLogs;
  this.sendTransaction = sendTransaction;
  this.getBlockNumber = getBlockNumber;
  this.call = call;

  // timeout method added so that tests can bypass setTimeout
  this.timeout = cb => {
    setTimeout(() => cb(), TIMEOUT_INTERVAL);
  }

  return this;
}

function getVersion(web3) {
  if (! web3 || ! web3.version) {
    throw new Error(ERR_NOVERSION);
  }

  if (typeof web3.version === 'string') {
    return web3.version;
  }
  else if (typeof web3.version.api === 'string') {
    return web3.version.api;
  }

  throw new Error(ERR_NOVERSION);
}

function watchLogs(opts) {

  // v1.0.0 or greater
  if (this.version[0] == '1') {
    return new Promise((resolve, reject) => {
      const getLogs = () => {
        this.web3.eth.getPastLogs(opts).then(logs => {
          if (logs.length) {
            return resolve(logs[0]);
          }

          // TODO: add some sort of retry max
          this.timeout(() => getLogs());

        }).catch(err => {
          reject(err);
        });
      };

      getLogs();
    });
  }

  // below v1.0.0
  else {
    return new Promise((resolve, reject) => {
      const filter = this.web3.eth.filter(opts);
      filter.watch((err, log) => {
        if (err) {
          return reject(err);
        }

        resolve(log);
        filter.stopWatching();
      });
    });
  }
}

function sendTransaction(opts) {

  // v1.0.0 or greater
  if (this.version[0] == '1') {
    return this.web3.eth.sendTransaction(opts);
  }

  const promievent = PromiEvent();
  const { eventEmitter } = promievent;

  this.web3.eth.sendTransaction(opts, (err, hash) => {
    if (err) {
      eventEmitter.emit('error', err);
      return promievent.reject(err);
    }

    eventEmitter.emit('transactionHash', hash);

    const getReceipt = () => {
      this.web3.eth.getTransactionReceipt(hash, (err, receipt) => {
        if (err) {
          eventEmitter.emit('error', err);
          return promievent.reject(err);
        }

        if (receipt) {
          if (receipt.status == '0x1') {
            eventEmitter.emit('receipt', receipt);
            return promievent.resolve(receipt);
          }
          else {
            eventEmitter.emit('error', err);
            return promievent.reject(err);
          }
        }

        // TODO: add some sort of retry max
        this.timeout(() => getReceipt());

      });
    };

    getReceipt();
  });

  return eventEmitter;
}

function call(opts) {
  // v1.0.0 or greater
  if (this.version[0] == '1') {
    return this.web3.eth.call(opts);
  }

  return new Promise((resolve, reject) => {
    this.web3.eth.call(opts, (err, res) => {
      if (err) return reject(err);
      resolve(res);
    });
  });
}

function getBlockNumber() {
  // v1.0.0 or greater
  if (this.version[0] == '1') {
    return this.web3.eth.getBlockNumber();
  }

  return new Promise((resolve, reject) => {
    this.web3.eth.getBlockNumber((err, blockNumber) => {
      if (err) return reject(err);
      resolve(blockNumber);
    });
  });
}
