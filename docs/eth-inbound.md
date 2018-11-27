# ETH Inbound

## Basic Steps

- Send lock tx on Ethereum
- Wait for storeman response on Wanchain
- Send redeem tx on Wanchain
- Wait for storeman response on Ethereum

## Required fields

`to` - the receiving Wanchain account
`from` - the sending Ethereum account
`value` - the value to be transferred (in wei)
`storeman` - the storeman (wan/eth) accounts to use
`redeemKey` - the tx redeem key, including x and xHash

## Using Wanx

__Simple Version__: if the specified Wanchain and Ethereum are open, then you
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

__Advanced Version__: if the Wanchain or Ethereum accounts are not open and you
need to sign with the private key, you can manually handle each step of the
crosschain transaction.

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

## Example

- [Complete Inbound](https://github.com/wanchain/wanx/blob/master/docs/eth-inbound.md)
