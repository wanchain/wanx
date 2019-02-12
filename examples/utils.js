const EthTx = require('ethereumjs-tx');
const WanTx = require('wanchainjs-tx');

module.exports = {
  sendBtc,
  sendRawBtcTx,
  sendRawEthTx,
  sendRawWanTx,
};

async function sendRawEthTx(web3, rawTx, fromAccount, privateKey) {

  // Get the tx count to determine next nonce
  const txCount = await web3.eth.getTransactionCount(fromAccount);

  // Add the nonce to tx
  rawTx.nonce = web3.utils.toHex(txCount);

  // Sign and serialize the tx
  const transaction = new EthTx(rawTx);
  transaction.sign(privateKey);
  const serializedTx = transaction.serialize().toString('hex');

  // Send the lock transaction on Ethereum
  const receipt = await web3.eth.sendSignedTransaction('0x' + serializedTx);

  return receipt;
}

async function sendRawWanTx(web3, rawTx, fromAccount, privateKey) {

  // Get the tx count to determine next nonce
  const txCount = await web3.eth.getTransactionCount(fromAccount);

  // Add the nonce to tx
  rawTx.nonce = web3.utils.toHex(txCount);

  // Sign and serialize the tx
  const transaction = new WanTx(rawTx);
  transaction.sign(privateKey);
  const serializedTx = transaction.serialize().toString('hex');

  // Send the lock transaction on Ethereum
  const receipt = await web3.eth.sendSignedTransaction('0x' + serializedTx);

  return receipt;
}

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
