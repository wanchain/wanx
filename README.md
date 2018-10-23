# WanX
### Utility for making crosschain transactions on the wanchain network

NB: This project is still under heavy development. Please use at your own risk!

### Install
```
npm install wanx
```

### Configure
```
const WanX = require('wanx');

// configure with node urls
const config = {
  wanNodeUrl: 'http://localhost:8545',
  ethNodeUrl: 'http://13.57.92.468:8545',
};

// or configure with pre-initialized web3 objects
const config = {
  web3wan: wan3,
  web3eth: web3,
};

const wanx = new WanX('testnet', config);

```

### Usage

#### Make a complete ETH 2 WETH crosschain transaction
```
const opts = {
  from: '0x8a964f3932ba80aa1c2310a6cf3fbe5ddbabc673',
  to: '0xa6d72746a4bb19f46c99bf19b6592828435540b0',
  value: '10000000000000000',
  storeman: {
    wan: '0x06daa9379cbe241a84a65b217a11b38fe3b4b063',
    eth: '0x41623962c5d44565de623d53eb677e0f300467d2',
  },
};

// chain = 'ETH'
// inbound = true
const cctx = wanx.new('ETH', true);

cctx.send(opts);

cctx.on('info', info => {
  console.log('INFO:', info);
});

cctx.on('error', err => {
  console.log('ERROR:', err);
  cctx.removeAllListeners();
});

cctx.on('complete', res => {
  console.log('COMPLETE!!!', res);
  cctx.removeAllListeners();
});

```

#### Create a ETH 2 WETH lock (1st of 2 steps)
```
// get new crosschain tx
const cctx = wan.new('eth', true);

const opts = {
  from: '0x8a964f3932ba80aa1c2310a6cf3fbe5ddbabc673',
  to: '0xa6d72746a4bb19f46c99bf19b6592828435540b0',
  value: '10000000000000000',
  storeman: {
    wan: '0x06daa9379cbe241a84a65b217a11b38fe3b4b063',
    eth: '0x41623962c5d44565de623d53eb677e0f300467d2',
  },
};

cctx.lock(opts);

cctx.on('info', info => {
  console.log('INFO:', info);
});

cctx.on('error', err => {
  console.log('ERROR:', err);
  cctx.removeAllListeners();
});

cctx.on('complete', res => {
  console.log('COMPLETE!!!', res);
  cctx.removeAllListeners();
});

...
```

#### Create a ETH 2 WETH lock with pre-generated redeemKey
```
const redeemKey = wanx.newRedeemKey();

const opts = {
  from: '0x8a964f3932ba80aa1c2310a6cf3fbe5ddbabc673',
  to: '0xa6d72746a4bb19f46c99bf19b6592828435540b0',
  value: '10000000000000000',
  storeman: {
    wan: '0x06daa9379cbe241a84a65b217a11b38fe3b4b063',
    eth: '0x41623962c5d44565de623d53eb677e0f300467d2',
  },
  redeemKey: redeemKey,
};

cctx.lock(opts);

...
```

#### Redeem a locked transaction (2nd of 2 steps)
```
const opts = {
  from: '0x8a964f3932ba80aa1c2310a6cf3fbe5ddbabc673',
  to: '0xa6d72746a4bb19f46c99bf19b6592828435540b0',
  storeman: {
    wan: '0x06daa9379cbe241a84a65b217a11b38fe3b4b063',
    eth: '0x41623962c5d44565de623d53eb677e0f300467d2',
  },
  redeemKey: {
    x: '6d470cb1396a9491be3f489ec97d53076072270e56340101c09c909168b9151f',
    xHash: '98ad871fc37aed2f174770715b5f860dfb1542386b89e29bcc8a96dc854654e6',
  },
};

cctx.redeem(opts);

...
```

#### Revoke an expired transaction
```
const opts = {
  from: '0xa6d72746a4bb19f46c99bf19b6592828435540b0',
  redeemKey: {
    xHash: '4840f5ba2a32a1ce266b6779b352b984c4613e413952d3e9777a5c660b5c76a4',
  },
};

cctx.revoke(opts);

...
```

## Next Todos
- Support signing raw transactions
- Add BTC and ERC20 token support
- Remove hardcoded gas prices and make configurable and/or auto-calculated
- Add getStoremanGroups method
