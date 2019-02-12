const WanX = require('../');
const Web3 = require('web3');
const keythereum = require('keythereum');
const utils = require('./utils');

/**
 * Requirements:
 * - Wnachain account has enough token to cover the value defined in `opts`
 * - Wanchain account has enough to cover gas for lock
 * - Ethereum account has enough to cover gas for redeem
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
const cctx = wanx.newChain('erc20', false);

// Generate a new redeemKey
const redeemKey = wanx.newRedeemKey();

// Define the transaction opts
const opts = {
  token: {
    eth: '0x54950025d1854808b09277fe082b54682b11a50b', // MKR
    wan: '0x67f3de547c7f3bc77095686a9e7fe49397e59cdf', // WMKR
  },
  from: '0x017ab346a4bb19f46c99bf19b6592828435540b0',
  to: '0x026a6301477c59ab17d11cade5fd00e5c8c6fa90',
  value: '2200000000000000',
  outboundFee: '3300000000000000',
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

// Do outbound WMKR to MKR transaction
Promise.resolve([])
  // .then(sendApproveZero)
  .then(sendApprove)
  .then(sendLock)
  .then(confirmLock)
  .then(sendRedeem)
  .then(confirmRedeem)
  .catch(err => {
    console.log(err);
  });

// Note: An approval will fail if a non-zero amount is already approved for
// that account, in which case it is necessary to first zero out the approval.
async function sendApproveZero() {

  console.log('Starting erc20 outbound', opts);

  // Get the raw approve tx with 0 value
  const approveTx = cctx.buildApproveTx(Object.assign({}, opts, { value: '0' }));

  // Send the approve transaction on Wanchain
  const receipt = await utils.sendRawWanTx(web3wan, approveTx, opts.from, wanPrivateKey);

  console.log('Token approval removed');
  console.log(receipt);
}

async function sendApprove() {

  // Get the raw approve tx
  const approveTx = cctx.buildApproveTx(opts);

  // Send the approve transaction on Wanchain
  const receipt = await utils.sendRawWanTx(web3wan, approveTx, opts.from, wanPrivateKey);

  console.log('Token approved for transfer');
  console.log(receipt);
}

async function sendLock() {

  // Get the raw lock tx
  const lockTx = cctx.buildLockTx(opts);

  // Send the lock transaction on Wanchain
  const receipt = await utils.sendRawWanTx(web3wan, lockTx, opts.from, wanPrivateKey);

  console.log('Lock submitted and now pending on storeman');
  console.log(receipt);
}

async function confirmLock() {

  // Get the current block number on Ethereum
  const blockNumber = await web3eth.eth.getBlockNumber();

  // Scan for the lock confirmation from the storeman
  const log = await cctx.listenLock(opts, blockNumber);

  console.log('Lock confirmed by storeman');
  console.log(log);
}

async function sendRedeem() {

  // Get the raw redeem tx
  const redeemTx = cctx.buildRedeemTx(opts);

  // Send the redeem transaction on Ethereum
  const receipt = await utils.sendRawEthTx(eth3wan, redeemTx, opts.to, wanPrivateKey);

  console.log('Redeem confirmed and is now pending on storeman');
  console.log(receipt);
}

async function confirmRedeem() {

  // Get the current block number on Wanchain
  const blockNumber = await web3wan.eth.getBlockNumber();

  // Scan for the redeem confirmation from the storeman
  const log = await cctx.listenRedeem(opts, blockNumber);

  console.log('Redeem confirmed by storeman');
  console.log(log);
  console.log('COMPLETE!!!');
}
