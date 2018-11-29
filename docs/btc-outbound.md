# Bitcoin - Outbound (WBTC ⇒  BTC)

## Basic Steps

- Get outbound fee
- Send lock tx on Wanchain with outbound fee
- Wait for storeman response on Wanchain
- Get txid and lockTime from response
- Send redeem tx on Bitcoin

## Required and optional fields

### Lock fields

- `to` - the redeeming Bitcoin address
- `from` - the sending Wanchain address
- `value` - the value to be transferred (in satoshis)
- `storeman` - the storeman (wan/btc) accounts to use
- `redeemKey` - the tx redeem key, including x and xHash

### Redeem fields

- `to` - the redeeming Bitcoin address (legacy type only)
- `payTo` - the Bitcoin address where to send funds (optional, defaults to `to`; legacy or P2SH)
- `value` - the value to be transferred (in satoshis, excluding the mining fee)
- `storeman` - the storeman btc account
- `redeemKey` - the tx redeem key, including x and xHash
- `txid` - the txid of the tx that funds the P2SH lock address, as reported by the storeman lock confirmation
- `lockTime` - the lockTime of the P2SH lock address, as reported by the storeman lock confirmation
- `redeemScript` - the redeemScript of the P2SH lock address
- `publicKey` - the public key of the redeeming `to` address
- `sigHash` - the signature hash of the redeeming tx, signed externally with redeeming private key
- `wif` - use in place of `publicKey` and `sigHash`; the private key of the `to` address, in WIF format

### Revoke fields

- `from` - the sending Wanchain address
- `redeemKey` - the tx redeem key, including x and xHash

## Using Wanx

For outbound bitcoin transactions, the lock process is all on Wanchain, and the
redeem process is just on Bitcoin.

### Lock on Wanchain

__Simple Usage__: if the specified Wanchain account is open, then you can do
the whole crosschain transaction all in one call. You will want to set up event
handlers to watch for progress.

```javascript

cctx.lock(opts);

cctx.on('info', info => {
...
cctx.on('error', err => {
...
cctx.on('complete', res => {
...

```

__Advanced Usage__: if you need to handle each step separately, like if some
steps need to happen on the client and others on the server, or if you need to
sign the transactions manually, you can use WanX to handle each step of the
crosschain transaction.

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

### Redeem bitcoin

Once the storeman responds with the lock confirmation, you can then redeem the
bitcoin from the lock address. First, you will need to get the lockTime from
the storeman lock confirmation event. Then with the lockTime, rebuild the P2SH
lock address to derive its redeemScript.

__Rebuild P2SH lock address__

```javascript

opts.lockTime = lockTime;

// reconstruct P2SH
const contract = cctx.buildHashTimeLockContract(opts);

opts.redeemScript = contract.redeemScript;

```

With the lockTime and redeemScript added to `opts`, build the redeem
transaction either by passing in the private key to the `buildRedeemTxFromWif`
method, or by using `hashForRedeemSig` to get the hash for signature, then
signing it and passing it along with the public key of the redeeming address to
the `buildRedeemTx` method.

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

Both the `buildRedeemTx` and `buildRedeemTxFromWif` methods return the signed
transaction in hex format, ready to be sent on to the network through a Bitcoin
node.
