# WanX
### Utility for making crosschain transactions on the Wanchain network

NB: This project is still under heavy development and currently only works with
testnet. Feel free to check it out, but please use at your own risk!

## Install
```bash
npm install --save wanx
```

## Configure

If you do not plan to have WanX connect to Wanchain or Ethereum nodes, you can
initialize WanX with just the network (mainnet or testnet).

```javascript

const WanX = require('wanx');

const wanx = new WanX('testnet');

```

If you would like WanX to connect to Wanchain and/or Ethereum nodes, to do things
like submit transactions or listen for events, you can do so by either defining
the node urls or by passing in the web3 objects directly.

(Note: currently WanX does not connect to Bitcoin nodes.)

```javascript

const WanX = require('wanx');

// configure with node urls
const config = {
  wanchain: {
    url: 'http://localhost:8545',
  },
  ethereum: {
    url: 'http://13.57.92.468:8545',
  }
};

// or configure with pre-initialized web3 objects
const config = {
  wanchain: {
    web3: wan3,
  },
  ethereum: {
    web3: web3
  },
};

const wanx = new WanX('testnet', config);

```

## Basic Usage

### Define the transaction

Start by generating a new redeem key. The redeem key contains the `x` and its
hash, `xHash`, which are used as the identifier and locking keys for the
crosschain transaction.

```javascript
const redeemKey = wanx.newRedeemKey();
```

The default hash algorithm for the redeem key is `keccak256`. If you are working
with Bitcoin, you will instead need a redeem key based on `sha256`.

```javascript
const redeemKey = wanx.newRedeemKey('sha256');
```

Then define the details of the crosschain transaction. Basically all of the WanX
crosschain methods require you to pass in this transaction object. The required
values depend on chain and direction (more documentation is coming, but for
now, check out the examples to see what is required).

```javascript

// ETH inbound
const opts = {
  // from ETH address
  from: '0x8a964f3932ba80aa1c2310a6cf3fbe5ddbabc673',

  // to WAN address
  to: '0xa6d72746a4bb19f46c99bf19b6592828435540b0',

  // amount of ETH to convert to WETH
  value: '10000000000000000',

  // storeman addresses
  storeman: {
    wan: '0x06daa9379cbe241a84a65b217a11b38fe3b4b063',
    eth: '0x41623962c5d44565de623d53eb677e0f300467d2',
  },

  // add in the redeem key
  redeemKey,
};

```

### Do the transaction

If you have web3 objects that are already able to sign (where the provider is
an unlocked account or something else that can sign, like MetaMask), then
sending is as easy as creating the new transaction object and calling `send`.
You then can use events to log or react to each step of the crosschain
transaction.

```javascript

// create a new crosschain tx (chain = 'ETH', inbound = true)
const cctx = wanx.newChain('ETH', true);

// do the inbound crosschain tx
cctx.send(opts);

// set up event handlers
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

If you need to handle the signing separately, you can get the raw transactions
to be signed. For example, use the `buildLockTx` method to get the raw lock tx.

```javascript

// get the raw lock tx
const lockTx = cctx.buildLockTx(opts);

// set the nonce on the tx
lockTx.nonce = web3eth.utils.toHex(txCount);

// sign the tx with the private key
const transaction = new EthTx(lockTx);
transaction.sign(ethPrivateKey);
const serializedTx = transaction.serialize().toString('hex');

```

There are generally several independent transactions that comprise a crosschain
transaction, and thus the downside of signing manually is that you will have to
handle the steps yourself. See examples below for a full crosschain transaction
with signing handled outside of WanX.

## Documentation

#### Reference
- [API Reference](https://github.com/wanchain/wanx/blob/master/docs/api-reference.md)

#### Ethereum
- [Inbound](https://github.com/wanchain/wanx/blob/master/docs/eth-inbound.md)
- [Outbound](https://github.com/wanchain/wanx/blob/master/docs/eth-outbound.md)

#### ERC20
- [Inbound](https://github.com/wanchain/wanx/blob/master/docs/erc20-inbound.md)
- [Outbound](https://github.com/wanchain/wanx/blob/master/docs/erc20-outbound.md)

#### Bitcoin
- [Inbound](https://github.com/wanchain/wanx/blob/master/docs/btc-inbound.md)
- [Outbound](https://github.com/wanchain/wanx/blob/master/docs/btc-outbound.md)


## Examples

#### Ethereum
- [ETH to WETH complete](https://github.com/wanchain/wanx/blob/master/examples/eth2weth-complete.js)
- [ETH to WETH revoke](https://github.com/wanchain/wanx/blob/master/examples/eth2weth-revoke.js)
- [ETH to WETH lock, manual signing](https://github.com/wanchain/wanx/blob/master/examples/eth2weth-lock-manual.js)
- [ETH to WETH redeem, manual signing](https://github.com/wanchain/wanx/blob/master/examples/eth2weth-redeem-manual.js)

#### Bitcoin
- [BTC to WBTC complete](https://github.com/wanchain/wanx/blob/master/examples/btc2wbtc-complete.js)
- [WBTC to BTC complete](https://github.com/wanchain/wanx/blob/master/examples/wbtc2btc-complete.js)

#### ERC20
- [MKR to WMKR lock](https://github.com/wanchain/wanx/blob/master/examples/mkr2wmkr-lock-manual.js)


## Next Todos
- Add support for more of the contract methods
- Add method to get available storemen
- Add method to get registered tokens
- Make gas price/limit configurable
- Add documentation for all chains and multiple use cases
- Improve and add more examples
- Add jsdoc throughout codebase
