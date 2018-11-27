module.exports = {
  sendBtc,
  sendRawTx,
};

function callRpc(bitcoinRpc, method, args) {
  return new Promise((resolve, reject) => {
    bitcoinRpc.call(method, args, (err, res) => {
      if (err) {
        return reject(err);
      } else if (res.error) {
        return reject(res.error);
      }

      resolve(res.result);
    });
  });
}

function sendRawTx(bitcoinRpc, signedTx) {
  return callRpc(bitcoinRpc, 'sendrawtransaction', [signedTx]);
}

function sendBtc(bitcoinRpc, toAddress, toAmount, changeAddress) {
  return Promise.resolve([]).then(() => {

    return callRpc(bitcoinRpc, 'createrawtransaction', [[], { [toAddress]: toAmount }]);

  }).then(rawTx => {

    const fundArgs = { changePosition: 1 };

    if (changeAddress) {
      fundArgs.changeAddress = changeAddress;
    }

    return callRpc(bitcoinRpc, 'fundrawtransaction', [rawTx, fundArgs]);

  }).then(fundedTx => {

    return callRpc(bitcoinRpc, 'signrawtransactionwithwallet', [fundedTx.hex]);

  }).then(signedTx => {

    return callRpc(bitcoinRpc, 'sendrawtransaction', [signedTx.hex]);

  });
}
