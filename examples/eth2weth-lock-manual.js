const WanX = require('wanx');
const Web3 = require('web3');
const keythereum = require('keythereum');
const EthTx = require('ethereumjs-tx');

/**
 * Requirements:
 * - Ethereum account is unlocked
 * - Ethereum account has enough to cover the value defined in `opts` plus gas
 */

const config = {
  wanNodeUrl: 'http://localhost:8545',
  ethNodeUrl: 'http://localhost:18545',
};

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

// Get the nonce for Ethereum
web3eth.eth.getTransactionCount(opts.from).then(txCount => {

  // Get the raw lock tx
  const lockTx = cctx.buildLockTx(opts);
  lockTx.nonce = web3eth.utils.toHex(txCount);

  // Sign the tx
  const transaction = new EthTx(lockTx);
  transaction.sign(ethPrivateKey);
  const serializedTx = transaction.serialize().toString('hex');

  // Send the lock transaction on Ethereum
  web3eth.eth.sendSignedTransaction('0x' + serializedTx).on('receipt', receipt => {

    console.log('Lock confirmed and is now pending on storeman');
    console.log(receipt);

    // Get the current Wanchain blockNumber for scanning
    web3wan.eth.getBlockNumber().then(blockNumber => {

      // Scan for the lock confirmation from the storeman
      console.log('Scanning from blockNumber:', blockNumber);
      cctx.listenLock(opts, blockNumber);
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
