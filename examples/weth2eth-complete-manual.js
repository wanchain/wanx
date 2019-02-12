const WanX = require('../');
const Web3 = require('web3');
const keythereum = require('keythereum');
const WanTx = require('wanchainjs-tx');

/**
 * Requirements:
 * - Wanchain account has enough WETH token to cover the value defined in
 *   `opts`, and enough WAN to cover gas and outboundFee
 * - Ethereum account has enough to cover the gas to redeem
 */

const config = {
  wanchain: { url: 'http://localhost:18545' },
  ethereum: { url: 'http://localhost:28545'},
};

const web3wan = new Web3(new Web3.providers.HttpProvider(config.wanchain.url));
const web3eth = new Web3(new Web3.providers.HttpProvider(config.ethereum.url));

const wanx = new WanX('testnet', config);

// New crosschain transaction
// ethereum, outbound
const cctx = wanx.newChain('eth', false);

// Generate a new redeemKey
const redeemKey = wanx.newRedeemKey();

// Define the transaction opts
const opts = {
  from: '0x017ab346a4bb19f46c99bf19b6592828435540b0',
  to: '0x026a6301477c59ab17d11cade5fd00e5c8c6fa90',
  value: '1210000000000000000',
  storeman: {
    wan: '0x06daa9379cbe241a84a65b217a11b38fe3b4b063',
    eth: '0x41623962c5d44565de623d53eb677e0f300467d2',
  },
  redeemKey,
};

// Get Ethereum private keys
const ethDatadir = '/home/user/.ethereum/testnet/';
const ethKeyObject = keythereum.importFromFile(opts.to, ethDatadir);
const ethPrivateKey = keythereum.recover('mypassword', ethKeyObject);

// Get Wanchain private keys
const wanDatadir = '/home/user/.wanchain/testnet/';
const wanKeyObject = keythereum.importFromFile(opts.from, wanDatadir);
const wanPrivateKey = keythereum.recover('mypassword', wanKeyObject);

// Do outbound WETH to ETH transaction
Promise.resolve([])
  .then(sendLock)
  .then(confirmLock)
  .then(sendRedeem)
  .then(confirmRedeem)
  .catch(err => {
    console.log('Error:', err);
  });

async function sendLock() {

  console.log('Starting eth outbound lock', opts);

  // Get the outbound fee on Wanchain
  const fee = await cctx.getOutboundFee(opts);
  opts.outboundFee = fee;

  // Get the tx count to determine next nonce
  const txCount = await web3wan.eth.getTransactionCount(opts.from);

  // Get the raw lock tx
  const lockTx = cctx.buildLockTx(opts);
  lockTx.nonce = web3wan.utils.toHex(txCount);

  // Sign and serialize the tx
  const transaction = new WanTx(lockTx);
  transaction.sign(wanPrivateKey);
  const serializedTx = transaction.serialize().toString('hex');

  // Send the lock transaction on Ethereum
  const receipt = await web3wan.eth.sendSignedTransaction('0x' + serializedTx);

  console.log('Lock submitted and now pending on storeman');
  console.log(receipt);
}

async function confirmLock() {

  // Get the current block number on Wanchain
  const blockNumber = await web3wan.eth.getBlockNumber();

  // Scan for the lock confirmation from the storeman
  const log = await cctx.listenLock(opts, blockNumber);

  console.log('Lock confirmed', log);
}

async function sendRedeem() {

  console.log('Starting eth outbound redeem', opts);

  // Get the tx count to determine next nonce
  const txCount = await web3eth.eth.getTransactionCount(opts.to);

  // Get the raw redeem tx
  const redeemTx = cctx.buildRedeemTx(opts);
  redeemTx.nonce = web3eth.utils.toHex(txCount);

  // Sign and serialize the tx
  const transaction = new EthTx(redeemTx);
  transaction.sign(ethPrivateKey);
  const serializedTx = transaction.serialize().toString('hex');

  // Send the redeem transaction on Ethereum
  const receipt = await web3eth.eth.sendSignedTransaction('0x' + serializedTx);

  console.log('Redeem submitted and now pending on storeman');
  console.log(receipt);
}

async function confirmRedeem() {

  // Get the current block number on Wanchain
  const blockNumber = await web3wan.eth.getBlockNumber();

  // Scan for the redeem confirmation from the storeman
  const log = await cctx.listenRedeem(opts, blockNumber);

  console.log('Redeem confirmed', log);
  console.log('COMPLETE!!!');
}
