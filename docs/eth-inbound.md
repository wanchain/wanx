# Ethereum - Inbound (ETH ⇒  WETH)

## Basic Steps

- Send lock tx on Ethereum
- Wait for storeman response on Wanchain
- Send redeem tx on Wanchain
- Wait for storeman response on Ethereum

## Required and optional fields

### Lock fields

- `to` - the receiving Wanchain account
- `from` - the sending Ethereum account
- `value` - the value to be transferred (in wei)
- `storeman` - the storeman (wan/eth) accounts to use
- `redeemKey` - the tx redeem key, including x and xHash

### Redeem fields

- `to` - the receiving Wanchain account
- `redeemKey` - the tx redeem key, including x and xHash

### Revoke fields

- `from` - the sending Ethereum account
- `redeemKey` - the tx redeem key, including x and xHash

## Using Wanx

__Simple Usage__: if the specified Wanchain and Ethereum accounts are open,
then you can do the whole crosschain transaction all in one call. You will want
to set up event handlers to watch for progress.

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

  const lockTx = cctx.buildLockTx(opts);
  return webeth.eth.sendTransaction(lockTx);

}).then(receipt => {

  return cctx.listenLock(opts);

}).then(log => {
...


```
