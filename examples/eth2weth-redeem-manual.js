const WanX = require('../');
const Web3 = require('web3');
const keythereum = require('keythereum');
const WanTx = require('wanchainjs-tx');

/**
 * Requirements:
 * - Wanchain account has enough to cover the gas to redeem the token
 */

const config = {
  wanchain: { url: 'http://localhost:18545' },
  ethereum: { url: 'http://localhost:28545' },
};

const web3wan = new Web3(new Web3.providers.HttpProvider(config.wanchain.url));
const web3eth = new Web3(new Web3.providers.HttpProvider(config.ethereum.url));

const wanx = new WanX('testnet', config);

// New crosschain transaction
// ethereum, inbound
const cctx = wanx.newChain('eth', true);

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
const wanDatadir = '/home/user/.wanchain/testnet/';
const wanKeyObject = keythereum.importFromFile(opts.to, wanDatadir);
const wanPrivateKey = keythereum.recover('mypassword', wanKeyObject);

// Do inbound ETH to WETH redeem transaction
Promise.resolve([])
  .then(sendRedeem)
  .then(confirmRedeem)
  .catch(err => {
    console.log('Error:', err);
  });

async function sendRedeem() {

  console.log('Starting eth inbound redeem', opts);

  // Get the tx count to determine next nonce
  const txCount = await web3wan.eth.getTransactionCount(opts.to);

  // Get the raw redeem tx
  const redeemTx = cctx.buildRedeemTx(opts);
  redeemTx.nonce = web3wan.utils.toHex(txCount);

  // Sign and serialize the tx
  const transaction = new WanTx(redeemTx);
  transaction.sign(wanPrivateKey);
  const serializedTx = transaction.serialize().toString('hex');

  // Send the redeem transaction on Wanchain
  const receipt = await web3wan.eth.sendSignedTransaction('0x' + serializedTx);

  console.log('Redeem submitted and now pending on storeman');
  console.log(receipt);
}

async function confirmRedeem() {

  // Get the current block number on Ethereum
  const blockNumber = await web3eth.eth.getBlockNumber();

  // Scan for the redeem confirmation from the storeman
  const log = await cctx.listenRedeem(opts, blockNumber);

  console.log(log);
  console.log('COMPLETE!!!');
}
