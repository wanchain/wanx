const util = require('util');

const ERR_NOVERSION = 'Unable to obtain web3 version';

module.exports = web3Util;

function web3Util(web3Obj) {

  this.web3 = web3Obj;
  this.watchLogs = watchLogs;

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
      this.web3.eth.getPastLogs(opts).then(res => {
        if (res.length) {
          return resolve(res);
        }

        // TODO: add some sort of timeout
        setTimeout(() => {
          getLogs();
        }, 3000);
      }).catch(err => {
        reject(err);
      });
    };

    getLogs();
  });
}
