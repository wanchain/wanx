# Ethereum - Outbound (WETH ⇒  ETH)

## Basic Steps

- Get outbound fee
- Send lock tx on Wanchain with outbound fee
- Wait for storeman response on Ethereum
- Send redeem tx on Ethereum
- Wait for storeman response on Wanchain

## Required fields

- `to` - the receiving Wanchain account
- `from` - the sending Ethereum account
- `value` - the value to be transferred (in wei)
- `storeman` - the storeman (wan/eth) accounts to use
- `redeemKey` - the tx redeem key, including x and xHash
- `outboundFee` - the value of fee (in wei)

## Using Wanx

__Simple Usage__: if the specified Wanchain and Ethereum are open, then you
can do the whole crosschain transaction all in one call. You would want to set
up event handlers to watch for progress.

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
