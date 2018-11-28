# Bitcoin - Inbound (BTC ⇒  WBTC)

## Basic Steps

- Generate new Bitcoin P2SH lock address
- Send bitcoin to the lock address
- Send lock tx on Wanchain with lockTime and txid of funding tx
- Wait for storeman response on Wanchain
- Send redeem tx on Wanchain
- Wait for storeman response on Wanchain

## Required values for lock

- `to` - the receiving Wanchain account
- `from` - the sending Bitcoin address
- `value` - the value to be transferred (in satoshis)
- `storeman` - the storeman (wan/btc) accounts to use
- `redeemKey` - the tx redeem key, including x and xHash
- `txid` - the id of the BTC tx funding the P2SH lock address
- `lockTime` - the lockTime of the P2SH lock address

## Using Wanx

### Lock Bitcoin and redeem on Wanchain

All inbound transactions must start by generating a new P2SH lock address and
sending funds to it.

```javascript

// create lock address
const contract = cctx.buildHashTimeLockContract(opts);

// send btc to it
sendBtc(contract.address, opts.value);

```

Once the bitcoin transaction is sent and the txid and lockTime are added to the
opts, you can continue with either the simple version or advance version.

__Simple Usage__: if the specified Wanchain account is open, then you can do
the whole crosschain transaction all in one call. You will want to set up event
handlers to watch for progress.

```javascript

cctx.send(opts);

cctx.on('info', info => {
...

```

Alternatively, you can do the lock and redeem steps separately.

```javascript

// do lock
cctx.lock(opts);

cctx.on('info', info => {
...

// later, and even maybe elsewhere, do redeem
cctx.redeem(opts);

```

__Advanced Usage__: if you need to handle each step separately, like if some
steps need to happen on the client and others on the server, you can manually
handle each step of the crosschain transaction.

```javascript

// fine grain handling
Promise.resolve([]).then(() => {

  return cctx.sendLock(opts);

}).then(receipt => {

  return cctx.listenLock(opts);

}).then(log => {
...

```

### Revoke Bitcoin

Once the lockTime expires, you can generate a revoke transaction on Bitcoin,
either by passing in the private key to the method that builds the bitcoin
revoke tx, or by getting the hashForSignature, signing it and passing the
signed sigHash to the build tx method.

__Build revoke using WIF__

```javascript

opts.wif = 'cNggJXP2mMNSHA1r9CRd1sv65uykZNyeH8wkH3ZPZVUL1nLfTxRM';

// build revoke tx
const signedTx = cctx.buildRevokeTxFromWif(opts);

```

__Build revoke using sigHash__

```javascript

const bitcoin = require('bitcoinjs-lib');

...

// build revoke tx
const hashForSignature = cctx.hashForRevokeSig(opts);

const keyPair = bitcoin.ECPair.fromWIF(wif, bitcoin.networks.testnet);
const sigHash = keyPair.sign(new Buffer.from(sigHash, 'hex'));

const tx = cctx.buildRevokeTx(Object.assign({}, opts, { sigHash }));

```
