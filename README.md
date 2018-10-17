# WanX
### Utility for making crosschain transactions on the wanchain network


### Configure
```
// Initialize the WanX object and pass in configuration object.

const WanX = require('wanx');

const config = {
  wanNodeUrl: 'http://localhost:8545',
  ethNodeUrl: 'http://13.57.92.468:8545',
  rpcWsUrl: '12.345.678.901',
};

const wanx = new WanX('testnet', config)

```

### Usage
#### Make ETH 2 WETH crosschain transaction
```
// chain = 'ETH'
// inbound = true
const handler = wanx.send('ETH', true, {
  from: '0x8a964f3932ba80aa1c2310a6cf3fbe5ddbabc673',
  to: '0xa6d72746a4bb19f46c99bf19b6592828435540b0',
  value: '10000000000000000',
  storeman: {
    wan: '0x06daa9379cbe241a84a65b217a11b38fe3b4b063',
    eth: '0x41623962c5d44565de623d53eb677e0f300467d2',
  },
});

handler.on('info', info => {
  console.log('INFO:', info);
});

handler.on('error', err => {
  console.log('ERROR:', err);
});

handler.on('complete', res => {
  console.log('COMPLETE!!!', res);
});

```

#### Make WETH 2 ETH crosschain transaction
```
// chain = 'ETH'
// inbound = false
const handler = wanx.send('ETH', false, {
  from: '0xa6d72746a4bb19f46c99bf19b6592828435540b0',
  to: '0x8a964f3932ba80aa1c2310a6cf3fbe5ddbabc673',
  value: '10000000000000000',
  storeman: {
    wan: '0x06daa9379cbe241a84a65b217a11b38fe3b4b063',
    eth: '0x41623962c5d44565de623d53eb677e0f300467d2',
  },
});

handler.on('info', info => {
  console.log('INFO:', info);
});

handler.on('error', err => {
  console.log('ERROR:', err);
});

handler.on('complete', res => {
  console.log('COMPLETE!!!', res);
});

```
