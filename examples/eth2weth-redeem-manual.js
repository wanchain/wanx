const WanX = require('wanx');
const Web3 = require('web3');
const keythereum = require('keythereum');
const WanTx = require('wanchainjs-tx');

/**
 * Requirements:
 * - Wanchain account is unlocked
 * - Wanchain account has enough to cover the gas to redeem the token
 */

const config = {
  wanNodeUrl: 'http://localhost:8545',
  ethNodeUrl: 'http://localhost:18545',
};

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

// Get the nonce for Wanchain
web3wan.eth.getTransactionCount(opts.from).then(txCount => {

  // Get the raw redeem tx
  const redeemTx = cctx.buildRedeemTx(opts);
  redeemTx.nonce = web3wan.utils.toHex(txCount);

  // Sign the tx
  const transaction = new WanTx(redeemTx);
  transaction.sign(wanPrivateKey);
  const serializedTx = transaction.serialize().toString('hex');

  // Send the redeem transaction on Wanchain
  web3wan.eth.sendSignedTransaction('0x' + serializedTx).on('receipt', receipt => {

    console.log('Redeem confirmed and is now pending on storeman');
    console.log(receipt);

    // Get the current Ethereum blockNumber for scanning
    web3eth.eth.getBlockNumber().then(blockNumber => {

      // Scan for the redeem confirmation from the storeman
      console.log('Scanning from blockNumber:', blockNumber);
      cctx.listenRedeem(opts, blockNumber);
    });
  });
});

// Handle events
cctx.on('info', info => {
  console.log('this is the info', info);
  if (info.receipt && info.receipt.logs) {
    info.receipt.logs.forEach(log => {
      console.log('LOG:', log);
    });
  }
});

cctx.on('error', err => {
  console.log('this is the error', err);
  cctx.removeAllListeners();
  clearInterval(loop);
});

cctx.on('complete', () => {
  console.log('COMPLETE!!!');
  cctx.removeAllListeners();
  clearInterval(loop);
});

// Loop to keep script alive
let loop = setInterval(() => {
  console.log('tick');
}, 5000);
