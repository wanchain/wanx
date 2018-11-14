# WanX
### Utility for making crosschain transactions on the wanchain network

NB: This project is still under heavy development and currently only works with
testnet. Feel free to check it out, but please use at your own risk!

## Install
```
npm install wanx
```

## Configure
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

## Usage
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
const cctx = wanx.newChain('ETH', true);

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

## Examples

#### Ethereum
- [ETH to WETH complete](https://github.com/wanchain/wanx/blob/master/examples/eth2weth-complete.js)
- [ETH to WETH revoke](https://github.com/wanchain/wanx/blob/master/examples/eth2weth-revoke.js)

#### Ethereum, signing from private keys
- [ETH to WETH lock](https://github.com/wanchain/wanx/blob/master/examples/eth2weth-lock-manual.js)
- [ETH to WETH redeem](https://github.com/wanchain/wanx/blob/master/examples/eth2weth-redeem-manual.js)

#### Bitcoin
- [BTC to WBTC complete](https://github.com/wanchain/wanx/blob/master/examples/btc2wbtc-complete.js)
- [WBTC to BTC complete](https://github.com/wanchain/wanx/blob/master/examples/wbtc2btc-complete.js)

#### ERC20
- [ZRX to WZRX lock](https://github.com/wanchain/wanx/blob/master/examples/zrx2wzrx-lock-manual.js)


## Next Todos
- Use validate.js for validating call options
- Add tests for chain class methods
- Add tests for btc functions
- Add support for more of the contract methods
- Make gas price/limit configurable
- Add documentation for all chains and multiple use cases
- Add jsdoc throughout codebase
- Add syncStoremanGroups and syncErc20StoremanGroups methods
- Add getRegErc20Tokens method
