# Bitcoin - Outbound (WBTC ⇒  BTC)

## Basic Steps

- Get outbound fee
- Send lock tx on Wanchain with outbound fee
- Wait for storeman response on Wanchain
- Get txid and lockTime from response
- Send redeem tx on Bitcoin

## Required values for lock

- `to` - the receiving Bitcoin address
- `from` - the sending Wanchain address
- `value` - the value to be transferred (in satoshis)
- `storeman` - the storeman (wan/btc) accounts to use
- `redeemKey` - the tx redeem key, including x and xHash

## Using Wanx

For outbound bitcoin transactions, the lock process is all on Wanchain, and the
redeem process is just on Bitcoin.


__Simple Usage__: if the specified Wanchain account is open, then you can do
the whole crosschain transaction all in one call. You will want to set up event
handlers to watch for progress.

```javascript

cctx.lock(opts);

cctx.on('info', info => {
...

```


__Advanced Usage__: if you need to handle each step separately, like if some
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

Once the storeman responds with the lock confirmation, you can redeem the
bitcoin from the lock address. First, you will need to get the lockTime from
the storeman lock response event. Then with the lockTime, rebuild the P2SH lock
address to derive its redeemScript.

__Rebuild P2SH lock address__

```javascript

opts.lockTime = lockTime;

// reconstruct P2SH
const contract = cctx.buildHashTimeLockContract(opts);

opts.redeemScript = contract.redeemScript;

```

With the lockTime and redeemScript added, build the redeem transaction either
by passing in the private key to the method that builds the bitcoin tx, or by
getting the hashForSignature, signing it and passing the signed sigHash to the
build tx method.

__Build redeem using WIF__

```javascript

opts.wif = 'cNggJXP2mMNSHA1r9CRd1sv65uykZNyeH8wkH3ZPZVUL1nLfTxRM';

// build redeem tx
const signedTx = cctx.buildRedeemTxFromWif(opts);

```

__Build redeem using sigHash__

```javascript

const publicKey = '03e55a948b017ad25994cbe3e10842bffc8835054f56528fe2ed32b9e6ec853e4c';

// build redeem tx
const hashForSignature = cctx.hashForRedeemSig(opts);

const keyPair = bitcoin.ECPair.fromWIF(wif, bitcoin.networks.testnet);
const sigHash = keyPair.sign(new Buffer.from(sigHash, 'hex'));

const tx = cctx.buildRedeemTx(Object.assign({}, opts, { sigHash, publicKey }));

```
