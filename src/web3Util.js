module.exports = web3Util;

const ERR_NOVERSION = 'Unable to obtain web3 version';

function web3Util(web3Obj) {

  this.web3 = web3Obj;
  this.version = getVersion(web3Obj);

  this.sendTransaction = sendTransaction;
  this.watchLogs = watchLogs;
  this.call = call;

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

function sendTransaction(opts) {

  // v1.0.0 or greater
  if (this.version[0] == '1') {
    console.log('sendTransaction v1.x');

    return this.web3.eth.sendTransaction(opts);
  }

  // below v1.0.0
  else {
    console.log('sendTransaction v0.x');

    return new Promise((resolve, reject) => {
      this.web3.eth.sendTransaction(opts, (err, hash) => {
        if (err) {
          return reject(err);
        }

        const getReceipt = () => {
          this.web3eth.eth.getTransactionReceipt(hash, (err, receipt) => {
            if (err) {
              return reject(err);
            }

            if (receipt) {
              if (receipt.status == '0x1') {
                return resolve(receipt);
              }
              else {
                return reject(receipt);
              }
            }

            // TODO: add some sort of timeout
            setTimeout(() => {
              getReceipt();
            }, 2000);
          });
        };

        getReceipt();
      });
    });
  }
}

function watchLogs(opts) {

  // v1.0.0 or greater
  if (this.version[0] == '1') {
    console.log('watchLogs v1.x');

    return new Promise((resolve, reject) => {
      const getLogs = () => {
        console.log('getLogs');
        this.web3.eth.getPastLogs(opts).then(res => {
          if (res.length) {
            return resolve(res);
          }

          // TODO: add some sort of timeout
          setTimeout(() => {
            getLogs();
          }, 2000);
        }).catch(err => {
          reject(err);
        });
      };

      getLogs();
    });
  }

  // below v1.0.0
  else {
    console.log('watchLogs v0.x');

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

function call(opts) {

  // v1.0.0 or greater
  if (this.version[0] == '1') {
    return this.web3.call(opts);
  }

  // below v1.0.0
  else {
    return new Promise((resolve, reject) => {
      this.web3.call(opts, (err, res) => {
        if (err) {
          return reject(err);
        }

        resolve(res);
      });
    });
  }
}
