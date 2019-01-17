const WanX = require('../');

/**
 * Requirements:
 * - Wanchain and Ethereum accounts are unlocked
 * - Ethereum account has enough to cover the value defined in `opts` plus gas
 * - Wanchain account has enough to cover the gas to redeem the token
 */

const config = {
  wanchain: { url: 'http://localhost:18545' },
  ethereum: { url: 'http://localhost:28545' },
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

// Do a complete crosschain transaction
// send = lock + redeem:
cctx.send(opts);

// Handle events
cctx.on('info', info => {
  console.log('this is the info', info);
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
