# WanX
### Utility for making crosschain transactions on the wanchain network

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

// or configure with web3 objects
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
const handler = wanx.send('ETH', true, opts);

handler.on('info', info => {
  console.log('INFO:', info);
});

handler.on('error', err => {
  console.log('ERROR:', err);
  handler.removeAllListeners();
});

handler.on('complete', res => {
  console.log('COMPLETE!!!', res);
  handler.removeAllListeners();
});

```

#### Make a complete WETH 2 ETH crosschain transaction
```
const opts = {
  from: '0xa6d72746a4bb19f46c99bf19b6592828435540b0',
  to: '0x8a964f3932ba80aa1c2310a6cf3fbe5ddbabc673',
  value: '10000000000000000',
  storeman: {
    wan: '0x06daa9379cbe241a84a65b217a11b38fe3b4b063',
    eth: '0x41623962c5d44565de623d53eb677e0f300467d2',
  },
};

const handler = wanx.send('ETH', false, opts);

handler.on('info', info => {
  console.log('INFO:', info);
});

handler.on('error', err => {
  console.log('ERROR:', err);
  handler.removeAllListeners();
});

handler.on('complete', res => {
  console.log('COMPLETE!!!', res);
  handler.removeAllListeners();
});

```

#### Create a ETH 2 WETH lock
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

const handler = wanx.lock('ETH', true, opts);

handler.on('info', info => {
  console.log('INFO:', info);
});

handler.on('error', err => {
  console.log('ERROR:', err);
  handler.removeAllListeners();
});

handler.on('complete', res => {
  console.log('COMPLETE!!!', res);
  handler.removeAllListeners();
});

```

#### Redeem a locked transaction
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

const handler = wanx.redeem('ETH', true, opts);

handler.on('info', info => {
  console.log('INFO:', info);
});

handler.on('error', err => {
  console.log('ERROR:', err);
  handler.removeAllListeners();
});

handler.on('complete', res => {
  console.log('COMPLETE!!!', res);
  handler.removeAllListeners();
});

```

#### Revoke an expired transaction
```
const opts = {
  from: '0xa6d72746a4bb19f46c99bf19b6592828435540b0',
  xHash: '4840f5ba2a32a1ce266b6779b352b984c4613e413952d3e9777a5c660b5c76a4',
};

const handler = wanx.revoke('ETH', false, opts);

handler.on('error', err => {
  console.log('ERROR:', err);
  handler.removeAllListeners();
});

handler.on('complete', res => {
  console.log('COMPLETE!!!', res);
  handler.removeAllListeners();
});
```
