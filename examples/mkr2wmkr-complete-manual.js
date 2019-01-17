const WanX = require('../');
const Web3 = require('web3');
const keythereum = require('keythereum');
const EthTx = require('ethereumjs-tx');
const WanTx = require('wanchainjs-tx');

/**
 * Requirements:
 * - Ethereum account has enough token to cover the value defined in `opts`
 * - Ethereum account has enough to cover gas for lock
 * - Wanchain account has enough to cover gas for redeem
 */

const config = {
  wanchain: { url: 'http://localhost:8545' },
  ethereum: { url: 'http://localhost:18545'},
};

const web3wan = new Web3(new Web3.providers.HttpProvider(config.wanchain.url));
const web3eth = new Web3(new Web3.providers.HttpProvider(config.ethereum.url));

const wanx = new WanX('testnet', config);

// New crosschain transaction
// ethereum, inbound
const cctx = wanx.newChain('erc20', true);

// Generate a new redeemKey
const redeemKey = wanx.newRedeemKey();

// Define the transaction opts
const opts = {
  token: {
    eth: '0x54950025d1854808b09277fe082b54682b11a50b', // MKR
    wan: '0x67f3de547c7f3bc77095686a9e7fe49397e59cdf', // WMKR
  },
  from: '0x026a6301477c59ab17d11cade5fd00e5c8c6fa90',
  to: '0x017ab346a4bb19f46c99bf19b6592828435540b0',
  value: '2242000000000000',
  storeman: {
    wan: '0x06daa9379cbe241a84a65b217a11b38fe3b4b063',
    eth: '0x41623962c5d44565de623d53eb677e0f300467d2',
  },
  redeemKey,
};

// Get Ethereum private keys
const ethDatadir = '/home/user/.ethereum/testnet/';
const ethKeyObject = keythereum.importFromFile(opts.from, ethDatadir);
const ethPrivateKey = keythereum.recover('mypassword', ethKeyObject);

// Get Wanchain private keys
const wanDatadir = '/home/user/.wanchain/testnet/';
const wanKeyObject = keythereum.importFromFile(opts.to, wanDatadir);
const wanPrivateKey = keythereum.recover('mypassword', wanKeyObject);

// Do inbound lock transaction
Promise.resolve([]).then(() => {

  console.log('Starting eth inbound lock', opts);

  // Get the tx count to determine next nonce
  return web3eth.eth.getTransactionCount(opts.from);

}).then(txCount => {

  // Get the raw approve tx
  const approveTx = cctx.buildApproveTx(opts);
  approveTx.nonce = web3eth.utils.toHex(txCount);

  // Sign and send the tx
  const transaction = new EthTx(approveTx);
  transaction.sign(ethPrivateKey);
  const serializedTx = transaction.serialize().toString('hex');

  // Send the approve transaction on Ethereum
  return web3eth.eth.sendSignedTransaction('0x' + serializedTx);

}).then(receipt => {

  console.log('Token approved for transfer');
  console.log(receipt);

  // Get the tx count to determine next nonce
  return web3eth.eth.getTransactionCount(opts.from);

}).then(txCount => {

  // Get the raw lock tx
  const lockTx = cctx.buildLockTx(opts);
  lockTx.nonce = web3eth.utils.toHex(txCount);

  // Sign and send the tx
  const transaction = new EthTx(lockTx);
  transaction.sign(ethPrivateKey);
  const serializedTx = transaction.serialize().toString('hex');

  // Send the lock transaction on Ethereum
  return web3eth.eth.sendSignedTransaction('0x' + serializedTx);

}).then(receipt => {

  console.log('Lock submitted and now pending on storeman');
  console.log(receipt);

  // Get the current block number on Wanchain
  return web3wan.eth.getBlockNumber();

}).then(blockNumber => {

  // Scan for the lock confirmation from the storeman
  return cctx.listenLock(opts, blockNumber);

}).then(log => {

  console.log('Lock confirmed by storeman');
  console.log(log);

  // Get the tx count to determine next nonce
  return web3wan.eth.getTransactionCount(opts.to);

}).then(txCount => {

  // Get the raw redeem tx
  const redeemTx = cctx.buildRedeemTx(opts);
  redeemTx.nonce = web3wan.utils.toHex(txCount);

  // Sign and send the tx
  const transaction = new WanTx(redeemTx);
  transaction.sign(wanPrivateKey);
  const serializedTx = transaction.serialize().toString('hex');

  // Send the redeem transaction on Wanchain
  return web3wan.eth.sendSignedTransaction('0x' + serializedTx);

}).then(receipt => {

  console.log('Redeem confirmed and is now pending on storeman');
  console.log(receipt);

  // Get the current block number on Ethereum
  return web3eth.eth.getBlockNumber();

}).then(blockNumber => {

  // Scan for the redeem confirmation from the storeman
  return cctx.listenRedeem(opts, blockNumber);

}).then(log => {

  console.log('Redeem confirmed by storeman');
  console.log(log);
  console.log('COMPLETE!!!');

}).catch(err => {

  console.log('Error:', err);

});
