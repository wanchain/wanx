const WanX = require('wanx');
const Web3 = require('web3');
const keythereum = require('keythereum');
const EthTx = require('ethereumjs-tx');

/**
 * Requirements:
 * - Wanchain account has enough to cover the gas to redeem the token
 */

const config = {
  wanchain: { url: 'http://localhost:8545' },
  ethereum: { url: 'http://localhost:18545' },
};

const web3wan = new Web3(new Web3.providers.HttpProvider(config.wanchain.url));
const web3eth = new Web3(new Web3.providers.HttpProvider(config.ethereum.url));

const wanx = new WanX('testnet', config);

// New crosschain transaction
// ethereum, outbound
const cctx = wanx.newChain('eth', false);

// Define the transaction opts
const opts = {
  from: '0x026a6301477c59ab17d11cade5fd00e5c8c6fa90',
  to: '0x017ab346a4bb19f46c99bf19b6592828435540b0',
  value: '1210000000000000000',
  storeman: {
    wan: '0x06daa9379cbe241a84a65b217a11b38fe3b4b063',
    eth: '0x41623962c5d44565de623d53eb677e0f300467d2',
  },
  redeemKey: {
    x: '4d5569480ddd42fb1a8ddd641a36f384913480e621dacd038f234131f69b9b9d',
    xHash: '2cb53e1ae99fb341bf674076f9bcc2f4e170b08354fe74eb3bb9e7c325f584f0',
  },
};

// Get Wanchain private keys
const ethDatadir = '/home/user/.ethereum/testnet/';
const ethKeyObject = keythereum.importFromFile(opts.to, ethDatadir);
const ethPrivateKey = keythereum.recover('mypassword', ethKeyObject);

// Do outbound redeem transaction
Promise.resolve([]).then(() => {

  console.log('Starting eth outbound redeem', opts);

  // Get the tx count to determine next nonce
  return web3eth.eth.getTransactionCount(opts.to);

}).then(txCount => {

  // Get the raw redeem tx
  const redeemTx = cctx.buildRedeemTx(opts);
  redeemTx.nonce = web3eth.utils.toHex(txCount);

  // Sign and send the tx
  const transaction = new EthTx(redeemTx);
  transaction.sign(ethPrivateKey);
  const serializedTx = transaction.serialize().toString('hex');

  // Send the redeem transaction on Ethereum
  return web3eth.eth.sendSignedTransaction('0x' + serializedTx);

}).then(receipt => {

  console.log('Redeem submitted and now pending on storeman');
  console.log(receipt);

  // Get the current block number on Wanchain
  return web3wan.eth.getBlockNumber();

}).then(blockNumber => {

  // Scan for the redeem confirmation from the storeman
  return cctx.listenRedeem(opts, blockNumber);

}).then(log => {

  console.log(log);
  console.log('COMPLETE!!!');

}).catch(err => {

  console.log('Error:', err);

});
