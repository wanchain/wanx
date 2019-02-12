const WanX = require('../');
const Web3 = require('web3');
const keythereum = require('keythereum');
const WanTx = require('wanchainjs-tx');
const moment = require('moment');
const bitcoinRpc = require('node-bitcoin-rpc');
const BigNumber = require('bignumber.js');

const utils = require('./utils');

/**
 * Requirements:
 * - Bitcoin from address has enough to cover specified amount
 * - Wanchain WAN balance covers the gas to redeem
 */

const config = {
  wanchain: { url: 'http://localhost:18545' },
};

const wanx = new WanX('testnet', config);

const btcNode = [ 'localhost', 18332, 'btcuser', 'btcpassword' ];

bitcoinRpc.init(...btcNode);
bitcoinRpc.setTimeout(2000);

const web3wan = new Web3(new Web3.providers.HttpProvider(config.wanchain.url));

// New crosschain transaction
// bitcoin, inbound
const cctx = wanx.newChain('btc', true);

// Define the transaction opts
const opts = {
  from: 'mvTfNujpcQwHaefMxfJRix4vhfNBxSFbBe',
  to: '0x017ab346a4bb19f46c99bf19b6592828435540b0',
  value: '210000',
  storeman: {
    wan: '0x9ebf2acd509e0d5f9653e755f26d9a3ddce3977c',
    btc: '0x83e5ca256c9ffd0ae019f98e4371e67ef5026d2d',
  },

  // Generate a new redeemKey
  redeemKey: wanx.newRedeemKey('sha256'),

  // lockTime is optional
  // lockTime: moment().add(8, 'h').unix(),
};

// Get Wanchain private keys
const wanDatadir = '/home/user/.wanchain/testnet/';
const wanKeyObject = keythereum.importFromFile(opts.to, wanDatadir);
const wanPrivateKey = keythereum.recover('mypassword', wanKeyObject);

// Do inbound BTC to WBTC transaction
Promise.resolve([])
  .then(lockBitcoin)
  .then(sendLock)
  .then(confirmLock)
  .then(sendRedeem)
  .then(confirmRedeem);
  .catch(err => {
    console.log('Error:', err);
  });

async function lockBitcoin() {
  console.log('Starting btc inbound lock', opts);

  // Create new P2SH lock address
  const contract = cctx.buildHashTimeLockContract(opts);

  console.log('Created new BTC contract', contract);

  // Add the lockTime to opts
  opts.lockTime = contract.lockTime;

  // Convert BTC amount from satoshis to bitcoin
  const sendAmount = (new BigNumber(opts.value)).div(100000000).toString();

  console.log('Send amount', sendAmount);

  // Send BTC to P2SH lock address
  const txid = await utils.sendBtc(bitcoinRpc, contract.address, sendAmount, opts.from);

  // Add txid to opts
  opts.txid = txid;

  console.log('BTC tx sent', txid);
}

async function sendLock() {

  // Get the tx count to determine next nonce
  const txCount = await web3wan.eth.getTransactionCount(opts.to);

  // Get the raw lock tx
  const lockTx = cctx.buildLockTx(opts);
  lockTx.nonce = web3wan.utils.toHex(txCount);

  // Sign and serialize the tx
  const transaction = new WanTx(lockTx);
  transaction.sign(wanPrivateKey);
  const serializedTx = transaction.serialize().toString('hex');

  // Send the lock transaction on Wanchain
  const receipt = await web3wan.eth.sendSignedTransaction('0x' + serializedTx);

  console.log('Lock submitted and now pending on storeman');
  console.log(receipt);

  return receipt;
}

async function listenLock(receipt) {

  // Scan for the lock confirmation from the storeman
  const log = await cctx.listenLock(opts, receipt.blockNumber);

  console.log('Lock confirmed by storeman');
  console.log(log);
}

async function sendRedeem() {

  // Get the tx count to determine next nonce
  const txCount = await web3wan.eth.getTransactionCount(opts.to);

  // Get the raw redeem tx
  const redeemTx = cctx.buildRedeemTx(opts);
  redeemTx.nonce = web3wan.utils.toHex(txCount);

  // Sign and serialize the tx
  const transaction = new WanTx(redeemTx);
  transaction.sign(wanPrivateKey);
  const serializedTx = transaction.serialize().toString('hex');

  // Send the lock transaction on Wanchain
  const receipt = await web3wan.eth.sendSignedTransaction('0x' + serializedTx);

  console.log('Redeem submitted and now pending on storeman');
  console.log(receipt);
}

async function listenRedeem() {

  // Scan for the lock confirmation from the storeman
  const log = await cctx.listenRedeem(opts, receipt.blockNumber);

  console.log('Redeem confirmed by storeman');
  console.log(log);
  console.log('COMPLETE!!!');

}
