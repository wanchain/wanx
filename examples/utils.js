module.exports = {
  sendBtc,
  sendRawBtcTx,
};

function callBitcoinRpc(bitcoinRpc, method, args) {
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

function sendRawBtcTx(bitcoinRpc, signedTx) {
  return callBitcoinRpc(bitcoinRpc, 'sendrawtransaction', [signedTx]);
}

function sendBtc(bitcoinRpc, toAddress, toAmount, changeAddress) {
  return Promise.resolve([]).then(() => {

    return callBitcoinRpc(bitcoinRpc, 'createrawtransaction', [[], { [toAddress]: toAmount }]);

  }).then(rawTx => {

    const fundArgs = { changePosition: 1 };

    if (changeAddress) {
      fundArgs.changeAddress = changeAddress;
    }

    return callBitcoinRpc(bitcoinRpc, 'fundrawtransaction', [rawTx, fundArgs]);

  }).then(fundedTx => {

    return callBitcoinRpc(bitcoinRpc, 'signrawtransactionwithwallet', [fundedTx.hex]);

  }).then(signedTx => {

    return callBitcoinRpc(bitcoinRpc, 'sendrawtransaction', [signedTx.hex]);

  });
}
