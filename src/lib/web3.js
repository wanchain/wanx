const ERR_NOVERSION = 'Unable to obtain web3 version';
const TIMEOUT_INTERVAL = 3000

module.exports = web3Util;

function web3Util(web3Obj) {

  this.web3 = web3Obj;
  this.watchLogs = watchLogs;
  this.getVersion = getVersion;

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
