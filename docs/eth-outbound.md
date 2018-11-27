# ETH Outbound

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

__Advanced Version__: if you need to handle the steps separately, like if some
steps need to happen on the client and others on the server, you can manually
handle each step of the crosschain transaction.

```javascript

// fine grain handling
Promise.resolve([]).then(() => {

  return cctx.getOutboundFee(opts);

}).then(fee => {

  opts.outboundFee = fee;

  const lockTx = cctx.buildLockTx(opts);
  return webeth.eth.sendTransaction(lockTx);

}).then(receipt => {

  return cctx.listenLock(opts);

}).then(log => {
...


```

# API Reference

<a name="ETH_Outbound"></a>

## ETH\_Outbound
Ethereum Outbound

**Kind**: global class

* [ETH_Outbound](#ETH_Outbound)
    * [.send(opts, skipValidation)](#ETH_Outbound+send) ⇒ <code>Promise</code>
    * [.lock(opts, skipValidation)](#ETH_Outbound+lock) ⇒ <code>Promise</code>
    * [.redeem(opts, skipValidation)](#ETH_Outbound+redeem) ⇒ <code>Promise</code>
    * [.getOutboundFee(opts, skipValidation)](#ETH_Outbound+getOutboundFee) ⇒ <code>Promise</code>
    * [.sendLock(opts, skipValidation)](#ETH_Outbound+sendLock) ⇒ <code>Promise</code>
    * [.listenLock(opts, skipValidation)](#ETH_Outbound+listenLock) ⇒ <code>Promise</code>
    * [.sendRedeem(opts, skipValidation)](#ETH_Outbound+sendRedeem) ⇒ <code>Promise</code>
    * [.listenRedeem(opts, skipValidation)](#ETH_Outbound+listenRedeem) ⇒ <code>Promise</code>
    * [.sendRevoke(opts, skipValidation)](#ETH_Outbound+sendRevoke) ⇒ <code>Promise</code>
    * [.buildOutboundFeeTx(opts, skipValidation)](#ETH_Outbound+buildOutboundFeeTx) ⇒ <code>Object</code>
    * [.buildLockTx(opts, skipValidation)](#ETH_Outbound+buildLockTx) ⇒ <code>Object</code>
    * [.buildRedeemTx(opts, skipValidation)](#ETH_Outbound+buildRedeemTx) ⇒ <code>Object</code>
    * [.buildRevokeTx(opts, skipValidation)](#ETH_Outbound+buildRevokeTx) ⇒ <code>Object</code>
    * [.buildLockScanOpts(opts, skipValidation)](#ETH_Outbound+buildLockScanOpts) ⇒ <code>Object</code>
    * [.buildRedeemScanOpts(opts, skipValidation)](#ETH_Outbound+buildRedeemScanOpts) ⇒ <code>Object</code>
    * [.buildLockData(opts, skipValidation)](#ETH_Outbound+buildLockData) ⇒ <code>string</code>
    * [.buildRedeemData(opts, skipValidation)](#ETH_Outbound+buildRedeemData) ⇒ <code>string</code>
    * [.buildRevokeData(opts, skipValidation)](#ETH_Outbound+buildRevokeData) ⇒ <code>string</code>
    * [.buildOutboundFeeData(opts, skipValidation)](#ETH_Outbound+buildOutboundFeeData) ⇒ <code>string</code>

<a name="ETH_Outbound+send"></a>

### ETH_Outbound.send(opts, skipValidation) ⇒ <code>Promise</code>
Complete crosschain transaction (lock + redeem)

**Kind**: instance method of [<code>ETH\_Outbound</code>](#ETH_Outbound)
**Returns**: <code>Promise</code> - Promise object

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Tx options |
| opts.from | <code>string</code> | Sender address |
| opts.to | <code>string</code> | Destination address |
| opts.value | <code>string</code> | Tx value |
| opts.redeemKey | <code>Object</code> | Redeem key pair |
| opts.redeemKey.x | <code>string</code> | Redeem key x |
| opts.redeemKey.xHash | <code>string</code> | Redeem key xHash |
| opts.storeman | <code>Object</code> | Storeman addr pair |
| opts.storeman.wan | <code>string</code> | Storeman wan addr |
| opts.storeman.eth | <code>string</code> | Storeman eth addr |
| skipValidation | <code>boolean</code> |  |

<a name="ETH_Outbound+lock"></a>

### ETH_Outbound.lock(opts, skipValidation) ⇒ <code>Promise</code>
Lock transaction and confirmation

**Kind**: instance method of [<code>ETH\_Outbound</code>](#ETH_Outbound)
**Returns**: <code>Promise</code> - Promise object

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Tx options |
| opts.from | <code>string</code> | Sender address |
| opts.to | <code>string</code> | Destination address |
| opts.value | <code>string</code> | Tx value |
| opts.redeemKey | <code>Object</code> | Redeem key pair |
| opts.redeemKey.x | <code>string</code> | Redeem key x |
| opts.redeemKey.xHash | <code>string</code> | Redeem key xHash |
| opts.storeman | <code>Object</code> | Storeman addr pair |
| opts.storeman.wan | <code>string</code> | Storeman wan addr |
| opts.storeman.eth | <code>string</code> | Storeman eth addr |
| skipValidation | <code>boolean</code> |  |

<a name="ETH_Outbound+redeem"></a>

### ETH_Outbound.redeem(opts, skipValidation) ⇒ <code>Promise</code>
Redeem transaction and confirmation

**Kind**: instance method of [<code>ETH\_Outbound</code>](#ETH_Outbound)
**Returns**: <code>Promise</code> - Promise object

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Tx options |
| opts.to | <code>string</code> | Destination address |
| opts.redeemKey | <code>Object</code> | Redeem key pair |
| opts.redeemKey.x | <code>string</code> | Redeem key x |
| skipValidation | <code>boolean</code> |  |

<a name="ETH_Outbound+getOutboundFee"></a>

### ETH_Outbound.getOutboundFee(opts, skipValidation) ⇒ <code>Promise</code>
Get outbound fee amount

**Kind**: instance method of [<code>ETH\_Outbound</code>](#ETH_Outbound)
**Returns**: <code>Promise</code> - Promise object

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Tx options |
| opts.value | <code>string</code> | Tx value |
| opts.storeman | <code>Object</code> | Storeman addr pair |
| opts.storeman.wan | <code>string</code> | Storeman wan addr |
| skipValidation | <code>boolean</code> |  |

<a name="ETH_Outbound+sendLock"></a>

### ETH_Outbound.sendLock(opts, skipValidation) ⇒ <code>Promise</code>
Send lock tx on Wanchain

**Kind**: instance method of [<code>ETH\_Outbound</code>](#ETH_Outbound)
**Returns**: <code>Promise</code> - Promise object

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Tx options |
| opts.from | <code>string</code> | Sender address |
| opts.to | <code>string</code> | Destination address |
| opts.value | <code>string</code> | Tx value |
| opts.outboundFee | <code>string</code> | Tx outbound fee |
| opts.redeemKey | <code>Object</code> | Redeem key pair |
| opts.redeemKey.x | <code>string</code> | Redeem key x |
| opts.redeemKey.xHash | <code>string</code> | Redeem key xHash |
| opts.storeman | <code>Object</code> | Storeman addr pair |
| opts.storeman.wan | <code>string</code> | Storeman wan addr |
| opts.storeman.eth | <code>string</code> | Storeman eth addr |
| skipValidation | <code>boolean</code> |  |

<a name="ETH_Outbound+listenLock"></a>

### ETH_Outbound.listenLock(opts, skipValidation) ⇒ <code>Promise</code>
Listen for storeman lock confirmation on Ethereum

**Kind**: instance method of [<code>ETH\_Outbound</code>](#ETH_Outbound)
**Returns**: <code>Promise</code> - Promise object

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Tx options |
| opts.redeemKey | <code>Object</code> | Redeem key pair |
| opts.redeemKey.xHash | <code>string</code> | Redeem key xHash |
| skipValidation | <code>boolean</code> |  |

<a name="ETH_Outbound+sendRedeem"></a>

### ETH_Outbound.sendRedeem(opts, skipValidation) ⇒ <code>Promise</code>
Send redeem tx on Ethereum

**Kind**: instance method of [<code>ETH\_Outbound</code>](#ETH_Outbound)
**Returns**: <code>Promise</code> - Promise object

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Tx options |
| opts.to | <code>string</code> | Destination address |
| opts.redeemKey | <code>Object</code> | Redeem key pair |
| opts.redeemKey.x | <code>string</code> | Redeem key x |
| skipValidation | <code>boolean</code> |  |

<a name="ETH_Outbound+listenRedeem"></a>

### ETH_Outbound.listenRedeem(opts, skipValidation) ⇒ <code>Promise</code>
Listen for storeman redeem confirmation on Wanchain

**Kind**: instance method of [<code>ETH\_Outbound</code>](#ETH_Outbound)
**Returns**: <code>Promise</code> - Promise object

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Tx options |
| opts.redeemKey | <code>Object</code> | Redeem key pair |
| opts.redeemKey.xHash | <code>string</code> | Redeem key xHash |
| skipValidation | <code>boolean</code> |  |

<a name="ETH_Outbound+sendRevoke"></a>

### ETH_Outbound.sendRevoke(opts, skipValidation) ⇒ <code>Promise</code>
Send revoke tx on Wanchain

**Kind**: instance method of [<code>ETH\_Outbound</code>](#ETH_Outbound)
**Returns**: <code>Promise</code> - Promise object

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Tx options |
| opts.from | <code>string</code> | Sender address |
| opts.redeemKey | <code>Object</code> | Redeem key pair |
| opts.redeemKey.xHash | <code>string</code> | Redeem key xHash |
| skipValidation | <code>boolean</code> |  |

<a name="ETH_Outbound+buildOutboundFeeTx"></a>

### ETH_Outbound.buildOutboundFeeTx(opts, skipValidation) ⇒ <code>Object</code>
Build outboundFee tx

**Kind**: instance method of [<code>ETH\_Outbound</code>](#ETH_Outbound)
**Returns**: <code>Object</code> - Tx object

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Tx options |
| opts.to | <code>string</code> | Destination address |
| opts.value | <code>string</code> | Tx value |
| opts.storeman | <code>Object</code> | Storeman addr pair |
| opts.storeman.wan | <code>string</code> | Storeman wan addr |
| skipValidation | <code>boolean</code> |  |

<a name="ETH_Outbound+buildLockTx"></a>

### ETH_Outbound.buildLockTx(opts, skipValidation) ⇒ <code>Object</code>
Build lock tx

**Kind**: instance method of [<code>ETH\_Outbound</code>](#ETH_Outbound)
**Returns**: <code>Object</code> - Tx object

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Tx options |
| opts.from | <code>string</code> | Sender address |
| opts.to | <code>string</code> | Destination address |
| opts.value | <code>string</code> | Tx value |
| opts.outboundFee | <code>string</code> | Tx outbound fee |
| opts.redeemKey | <code>Object</code> | Redeem key pair |
| opts.redeemKey.x | <code>string</code> | Redeem key x |
| opts.redeemKey.xHash | <code>string</code> | Redeem key xHash |
| opts.storeman | <code>Object</code> | Storeman addr pair |
| opts.storeman.wan | <code>string</code> | Storeman wan addr |
| opts.storeman.eth | <code>string</code> | Storeman eth addr |
| skipValidation | <code>boolean</code> |  |

<a name="ETH_Outbound+buildRedeemTx"></a>

### ETH_Outbound.buildRedeemTx(opts, skipValidation) ⇒ <code>Object</code>
Build redeem tx

**Kind**: instance method of [<code>ETH\_Outbound</code>](#ETH_Outbound)
**Returns**: <code>Object</code> - Tx object

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Tx options |
| opts.to | <code>string</code> | Destination address |
| opts.redeemKey | <code>Object</code> | Redeem key pair |
| opts.redeemKey.x | <code>string</code> | Redeem key x |
| skipValidation | <code>boolean</code> |  |

<a name="ETH_Outbound+buildRevokeTx"></a>

### ETH_Outbound.buildRevokeTx(opts, skipValidation) ⇒ <code>Object</code>
Build revoke tx

**Kind**: instance method of [<code>ETH\_Outbound</code>](#ETH_Outbound)
**Returns**: <code>Object</code> - Tx object

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Tx options |
| opts.from | <code>string</code> | Sender address |
| opts.redeemKey | <code>Object</code> | Redeem key pair |
| opts.redeemKey.xHash | <code>string</code> | Redeem key xHash |
| skipValidation | <code>boolean</code> |  |

<a name="ETH_Outbound+buildLockScanOpts"></a>

### ETH_Outbound.buildLockScanOpts(opts, skipValidation) ⇒ <code>Object</code>
Build lock scan opts

**Kind**: instance method of [<code>ETH\_Outbound</code>](#ETH_Outbound)
**Returns**: <code>Object</code> - Call opts object

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Tx options |
| opts.redeemKey | <code>Object</code> | Redeem key pair |
| opts.redeemKey.xHash | <code>string</code> | Redeem key xHash |
| skipValidation | <code>boolean</code> |  |

<a name="ETH_Outbound+buildRedeemScanOpts"></a>

### ETH_Outbound.buildRedeemScanOpts(opts, skipValidation) ⇒ <code>Object</code>
Build redeem scan opts

**Kind**: instance method of [<code>ETH\_Outbound</code>](#ETH_Outbound)
**Returns**: <code>Object</code> - Call opts object

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Tx options |
| opts.redeemKey | <code>Object</code> | Redeem key pair |
| opts.redeemKey.xHash | <code>string</code> | Redeem key xHash |
| skipValidation | <code>boolean</code> |  |

<a name="ETH_Outbound+buildLockData"></a>

### ETH_Outbound.buildLockData(opts, skipValidation) ⇒ <code>string</code>
Get data hex string for lock call

**Kind**: instance method of [<code>ETH\_Outbound</code>](#ETH_Outbound)
**Returns**: <code>string</code> - Data hex string

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Tx options |
| opts.redeemKey | <code>Object</code> | Redeem key pair |
| opts.redeemKey.xHash | <code>string</code> | Redeem key xHash |
| opts.storeman | <code>Object</code> | Storeman addr pair |
| opts.storeman.wan | <code>string</code> | Storeman wan addr |
| opts.to | <code>string</code> | Destination address |
| opts.value | <code>number</code> \| <code>string</code> | Tx value |
| skipValidation | <code>boolean</code> |  |

<a name="ETH_Outbound+buildRedeemData"></a>

### ETH_Outbound.buildRedeemData(opts, skipValidation) ⇒ <code>string</code>
Get data hex string for redeem call

**Kind**: instance method of [<code>ETH\_Outbound</code>](#ETH_Outbound)
**Returns**: <code>string</code> - Data hex string

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Tx options |
| opts.redeemKey | <code>Object</code> | Redeem key pair |
| opts.redeemKey.x | <code>string</code> | Redeem key x |
| skipValidation | <code>boolean</code> |  |

<a name="ETH_Outbound+buildRevokeData"></a>

### ETH_Outbound.buildRevokeData(opts, skipValidation) ⇒ <code>string</code>
Get data hex string for revoke call

**Kind**: instance method of [<code>ETH\_Outbound</code>](#ETH_Outbound)
**Returns**: <code>string</code> - Data hex string

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Tx options |
| opts.redeemKey | <code>Object</code> | Redeem key pair |
| opts.redeemKey.xHash | <code>string</code> | Redeem key xHash |
| skipValidation | <code>boolean</code> |  |

<a name="ETH_Outbound+buildOutboundFeeData"></a>

### ETH_Outbound.buildOutboundFeeData(opts, skipValidation) ⇒ <code>string</code>
Get data hex string for outboundFee call

**Kind**: instance method of [<code>ETH\_Outbound</code>](#ETH_Outbound)
**Returns**: <code>string</code> - Data hex string

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Tx options |
| opts.storeman | <code>Object</code> | Storeman addr pair |
| opts.storeman.wan | <code>string</code> | Storeman wan addr |
| opts.value | <code>number</code> \| <code>string</code> | Tx value |
| skipValidation | <code>boolean</code> |  |
