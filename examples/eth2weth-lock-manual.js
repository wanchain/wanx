const WanX = require('../');
const Web3 = require('web3');
const keythereum = require('keythereum');
const EthTx = require('ethereumjs-tx');

/**
 * Requirements:
 * - Ethereum account has enough to cover the value defined in `opts` plus gas
 */

const config = {
  wanchain: { url: 'http://localhost:18545' },
  ethereum: { url: 'http://localhost:28545'},
};

const web3wan = new Web3(new Web3.providers.HttpProvider(config.wanchain.url));
const web3eth = new Web3(new Web3.providers.HttpProvider(config.ethereum.url));

const wanx = new WanX('testnet', config);

// New crosschain transaction
// ethereum, inbound
const cctx = wanx.newChain('eth', true);

// Generate a new redeemKey
const redeemKey = wanx.newRedeemKey();

// Define the transaction opts
const opts = {
  from: '0x026a6301477c59ab17d11cade5fd00e5c8c6fa90',
  to: '0x017ab346a4bb19f46c99bf19b6592828435540b0',
  value: '1210000000000000000',
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

// Do inbound ETH to WETH lock transaction
Promise.resolve([])
  .then(sendLock)
  .then(confirmLock)
  .catch(err => {
    console.log('Error:', err);
  });

async function sendLock() {

  console.log('Starting eth inbound lock', opts);

  // Get the tx count to determine next nonce
  const txCount = await web3eth.eth.getTransactionCount(opts.from);

  // Get the raw lock tx
  const lockTx = cctx.buildLockTx(opts);
  lockTx.nonce = web3eth.utils.toHex(txCount);

  // Sign and serialize the tx
  const transaction = new EthTx(lockTx);
  transaction.sign(ethPrivateKey);
  const serializedTx = transaction.serialize().toString('hex');

  // Send the lock transaction on Ethereum
  const receipt = await web3eth.eth.sendSignedTransaction('0x' + serializedTx);

  console.log('Lock submitted and now pending on storeman');
  console.log(receipt);
}

async function confirmLock() {

  // Get the current block number on Wanchain
  const blockNumber = await web3wan.eth.getBlockNumber();

  // Scan for the lock confirmation from the storeman
  const log = await cctx.listenLock(opts, blockNumber);

  console.log(log);
  console.log('COMPLETE!!!');
}
