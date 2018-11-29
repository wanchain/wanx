const TIMEOUT_INTERVAL = 3000;

module.exports = web3Util;

function web3Util(web3Obj) {

  this.web3 = web3Obj;
  this.watchLogs = watchLogs;

  // timeout method added so that tests can bypass setTimeout
  this.timeout = cb => {
    setTimeout(() => cb(), TIMEOUT_INTERVAL);
  }

  return this;
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
