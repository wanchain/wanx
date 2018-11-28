# Bitcoin - Outbound (WBTC ⇒  BTC)

## Basic Steps

- Get outbound fee
- Send lock tx on Wanchain with outbound fee
- Wait for storeman response on Wanchain
- Get txid and lockTime from response
- Send redeem tx on Bitcoin

## Required fields

- `to` - the receiving Bitcoin address
- `from` - the sending Wanchain address
- `value` - the value to be transferred (in satoshis)
- `storeman` - the storeman (wan/btc) accounts to use
- `redeemKey` - the tx redeem key, including x and xHash

## Using Wanx

Outbound bitcoin transactions do the lock process on Wanchain, but the redeem
process is just on Bitcoin.


__Simple Usage__: if the specified Wanchain is open, then you can do the
whole crosschain transaction all in one call. You would want to set up event
handlers to watch for progress.

```javascript

cctx.lock(opts);

cctx.on('info', info => {
...

```


__Advanced Usage__: if you need to handle the steps separately, like if some
steps need to happen on the client and others on the server, you can manually
handle each step of the crosschain transaction.

```javascript

// fine grain handling
Promise.resolve([]).then(() => {

  return cctx.getOutboundFee(opts);

}).then(fee => {

  opts.outboundFee = fee;

  const lockTx = cctx.buildLockTx(opts);
  return webwan.eth.sendTransaction(lockTx);

}).then(receipt => {

  return cctx.listenLock(opts);

}).then(log => {
...


```

#### Redeem bitcoin

Once the storeman responds with the lock confirmation, you can redeem the bitcoin from the lock address. This can be done either by passing in the private key to the function that builds the bitcoin redeem tx, or by getting the hashForSignature, signing it and passing the signed sigHash to the build tx function.

__Build redeem using WIF__

```javascript

opts.wif = 'cNggJXP2mMNSHA1r9CRd1sv65uykZNyeH8wkH3ZPZVUL1nLfTxRM';

// build redeem tx
const signedTx = cctx.buildRedeemTxFromWif(opts);

```

__Build redeem using sigHash__

```javascript

// build redeem tx
const hashForSignature = cctx.hashForRedeemSig(opts);

const keyPair = bitcoin.ECPair.fromWIF(wif, bitcoin.networks.testnet);
const sigHash = keyPair.sign(new Buffer.from(sigHash, 'hex'));

const tx = cctx.buildRedeemTx(Object.assign({}, opts, { sigHash }));

```
