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
 * - Wanchain WBTC balance is enough to cover specified value
 * - Wanchain WAN balance covers the gas to lock
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
// bitcoin, outbound
const cctx = wanx.newChain('btc', false);

// Define the transaction opts
const opts = {
  from: '0x017ab346a4bb19f46c99bf19b6592828435540b0',
  to: 'mvTfNujpcQwHaefMxfJRix4vhfNBxSFbBe',
  payTo: 'tb1q6krpca6w7trcez3y466stp636rzh6wct0tzyyw',
  value: '210000',
  storeman: {
    wan: '0x9ebf2acd509e0d5f9653e755f26d9a3ddce3977c',
    btc: '0x83e5ca256c9ffd0ae019f98e4371e67ef5026d2d',
  },

  // Generate a new redeemKey
  redeemKey: wanx.newRedeemKey('sha256'),

  // private key of from address
  wif: 'cNggJXP2mMNSHA1r9CRd1sv65uykZNyeH8wkH3ZPZVUL1nLfTxRM',
};

// Total miner fee for redeem (in satoshis)
const minerFee = '2000';

// Get Wanchain private keys
const wanDatadir = '/home/user/.wanchain/testnet/';
const wanKeyObject = keythereum.importFromFile(opts.from, wanDatadir);
const wanPrivateKey = keythereum.recover('mypassword', wanKeyObject);

// Do outbound WBTC to BTC transaction
Promise.resolve([])
  .then(sendLock)
  .then(confirmLock)
  .then(redeemBitcoin)
  .catch(err => {
    console.log('Error:', err);
  });

async function sendLock() {

  console.log('Starting btc outbound lock', opts);

  // Get the outbound fee
  const fee = await cctx.getOutboundFee(opts);

  // Attach outboundFee to opts
  opts.outboundFee = fee;

  // Get the raw lock tx
  const lockTx = cctx.buildLockTx(opts);

  // Send the lock transaction on Wanchain
  const receipt = await utils.sendRawWanTx(web3wan, lockTx, opts.from, wanPrivateKey);

  console.log('Lock submitted and now pending on storeman');
  console.log(receipt);

  return receipt;
}

async function confirmLock(receipt) {

  // Scan for the lock confirmation from the storeman
  const res = await cctx.listenLock(opts, receipt.blockNumber);
  const { log, inputs } = res;

  console.log('Lock confirmed by storeman');
  console.log(log, inputs);

  // Add lockTime and txid to opts
  opts.lockTime = Number(inputs.lockedTimestamp);
  opts.txid = inputs.txHash;
}

async function redeemBitcoin() {

  // Build the contract to get the redeemScript
  const contract = cctx.buildHashTimeLockContract(opts);

  console.log('P2SH contract', contract);

  opts.redeemScript = contract.redeemScript;

  // Subtract miner fee
  const redeemValue = (new BigNumber(opts.value)).minus(minerFee).toString();

  // Get signed redeem tx
  const signedTx = cctx.buildRedeemTxFromWif(
    Object.assign({}, opts, {
      value: redeemValue,
    }),
  );

  console.log('Signed redeem tx:', signedTx);

  // Send the redeem tx to the network
  const txid = await utils.sendRawBtcTx(bitcoinRpc, signedTx);

  console.log('Redeem sent to network');
  console.log('TXID:', txid);
  console.log('COMPLETE!!!');
}
