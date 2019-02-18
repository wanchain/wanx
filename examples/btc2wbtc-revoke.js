const WanX = require('../');
const Web3 = require('web3');
const bitcoinRpc = require('node-bitcoin-rpc');
const BigNumber = require('bignumber.js');

const utils = require('./utils');

/**
 * Requirements:
 * - Bitcoin P2SH lock address is funded and timelock has expired
 */

const config = {
  wanchain: { url: 'http://localhost:18545' },
};

const wanx = new WanX('testnet', config);

const btcNode = [ 'localhost', 18332, 'btcuser', 'btcpassword' ];

bitcoinRpc.init(...btcNode);
bitcoinRpc.setTimeout(2000);

// bitcoin, inbound
const cctx = wanx.newChain('btc', true);

// Define the transaction opts
const opts = {
  from: 'mvTfNujpcQwHaefMxfJRix4vhfNBxSFbBe',
  payTo: 'tb1qpmzdsd28kglp8thz04hp0xpg97wg9x5sm5rl9f',
  to: '0x017ab346a4bb19f46c99bf19b6592828435540b0',
  value: '210000',
  storeman: {
    wan: '0x9ebf2acd509e0d5f9653e755f26d9a3ddce3977c',
    btc: '0x83e5ca256c9ffd0ae019f98e4371e67ef5026d2d',
  },

  // Add the redeemKey
  redeemKey: {
    x: '1327484f41d1990247f5b7e180d0fe4f77e10e1fd414b4e871155b0aa30e44bc',
    xHash: 'd577db3fb3d8718648b4809938f72452c3b7f6613ac1f9159b06b7535b0197b8'
  },

  // Add lockTime used for P2SH address, and txid that funded it
  lockTime: 1542322930,
  txid: '34cbc29ec4edde4415260800561cb318b883b98629881a7d75ed85aa6eb41b03',

  // private key of from address
  wif: 'cNggJXP2mMNSHA1r9CRd1sv65uykZNyeH8wkH3ZPZVUL1nLfTxRM',
};

// Total miner fee for revoke (in satoshis)
const minerFee = '600';

// Do inbound BTC to WBTC transaction
Promise.resolve([]).then(() => {

  console.log('Starting btc inbound revoke', opts);

  // Build the contract to get the redeemScript
  const contract = cctx.buildHashTimeLockContract(opts);

  console.log('P2SH contract', contract);

  opts.redeemScript = contract.redeemScript;

  // Subtract miner fee
  const redeemValue = (new BigNumber(opts.value)).minus(minerFee).toString();

  // Get signed revoke tx
  const signedTx = cctx.buildRevokeTxFromWif(
    Object.assign({}, opts, {
      value: redeemValue,
    }),
  );

  console.log('Signed revoke tx:', signedTx);

  // Send the revoke tx to the network
  return utils.sendRawBtcTx(bitcoinRpc, signedTx);

}).then(txid => {

  console.log('Revoke sent to network');
  console.log('TXID:', txid);
  console.log('COMPLETE!!!');

}).catch(err => {

  console.log('Error:', err);

});
