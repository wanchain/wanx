const WanX = require('wanx');
const Web3 = require('web3');
const keythereum = require('keythereum');
const WanTx = require('wanchainjs-tx');

/**
 * Requirements:
 * - Wanchain account has enough to cover the value defined in `opts` plus gas
 *   and outboundFee
 */

const config = {
  wanchain: { url: 'http://localhost:8545' },
  ethereum: { url: 'http://localhost:18545'},
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

// Get Wanchain private keys
const wanDatadir = '/home/user/.wanchain/testnet/';
const wanKeyObject = keythereum.importFromFile(opts.from, wanDatadir);
const wanPrivateKey = keythereum.recover('mypassword', wanKeyObject);

// Do inbound lock transaction
Promise.resolve([]).then(() => {

  console.log('Starting eth outbound lock', opts);

  // Get the outbound fee on Wanchain
  return cctx.getOutboundFee(opts);

}).then(async (fee) => {

  // Get the tx count to determine next nonce
  const txCount = await web3wan.eth.getTransactionCount(opts.from);

  return Promise.resolve([ fee, txCount ]);

}).then(res => {

  const [ fee, txCount ] = res;

  opts.outboundFee = fee;

  // Get the raw lock tx
  const lockTx = cctx.buildLockTx(opts);
  lockTx.nonce = web3wan.utils.toHex(txCount);

  // Sign and send the tx
  const transaction = new WanTx(lockTx);
  transaction.sign(wanPrivateKey);
  const serializedTx = transaction.serialize().toString('hex');

  // Send the lock transaction on Ethereum
  return web3wan.eth.sendSignedTransaction('0x' + serializedTx);

}).then(receipt => {

  console.log('Lock submitted and now pending on storeman');
  console.log(receipt);

  // Get the current block number on Wanchain
  return web3wan.eth.getBlockNumber();

}).then(blockNumber => {

  // Scan for the lock confirmation from the storeman
  return cctx.listenLock(opts, blockNumber);

}).then(log => {

  console.log(log);
  console.log('COMPLETE!!!');

}).catch(err => {

  console.log('Error:', err);

});
