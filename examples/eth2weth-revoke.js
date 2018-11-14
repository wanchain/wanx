const WanX = require('wanx');

/**
 * Requirements:
 * - Ethereum accounts are unlocked
 * - Ethereum account has enough to cover the gas
 * - Redeem timelock has expired
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
  redeemKey: {
    x: '4d5569480ddd42fb1a8ddd641a36f384913480e621dacd038f234131f69b9b9d',
    xHash: '2cb53e1ae99fb341bf674076f9bcc2f4e170b08354fe74eb3bb9e7c325f584f0',
  }
};

// Revoke the transaction (after timelock has expired)
cctx.sendRevoke(opts);

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
