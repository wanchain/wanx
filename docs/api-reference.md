## Classes

<dl>
<dt><a href="#ETH_Inbound">ETH_Inbound</a></dt>
<dd><p>Ethereum Inbound</p>
</dd>
<dt><a href="#ETH_Outbound">ETH_Outbound</a></dt>
<dd><p>Ethereum Outbound</p>
</dd>
<dt><a href="#BTC_Inbound">BTC_Inbound</a></dt>
<dd><p>Bitcoin Inbound</p>
</dd>
<dt><a href="#BTC_Outbound">BTC_Outbound</a></dt>
<dd><p>Bitcoin Outbound</p>
</dd>
<dt><a href="#ERC20_Inbound">ERC20_Inbound</a></dt>
<dd><p>ERC20 Inbound</p>
</dd>
<dt><a href="#ERC20_Outbound">ERC20_Outbound</a></dt>
<dd><p>ERC20 Outbound</p>
</dd>
</dl>

<a name="ETH_Inbound"></a>

## ETH\_Inbound
Ethereum Inbound

**Kind**: global class

* [ETH_Inbound](#ETH_Inbound)
    * [.send(opts, skipValidation)](#ETH_Inbound+send) ⇒ <code>Promise</code>
    * [.lock(opts, skipValidation)](#ETH_Inbound+lock) ⇒ <code>Promise</code>
    * [.redeem(opts, skipValidation)](#ETH_Inbound+redeem) ⇒ <code>Promise</code>
    * [.sendLock(opts, skipValidation)](#ETH_Inbound+sendLock) ⇒ <code>Promise</code>
    * [.sendRedeem(opts, skipValidation)](#ETH_Inbound+sendRedeem) ⇒ <code>Promise</code>
    * [.sendRevoke(opts, skipValidation)](#ETH_Inbound+sendRevoke) ⇒ <code>Promise</code>
    * [.listenLock(opts, skipValidation)](#ETH_Inbound+listenLock) ⇒ <code>Promise</code>
    * [.listenRedeem(opts, skipValidation)](#ETH_Inbound+listenRedeem) ⇒ <code>Promise</code>
    * [.buildLockTx(opts, skipValidation)](#ETH_Inbound+buildLockTx) ⇒ <code>Object</code>
    * [.buildRedeemTx(opts, skipValidation)](#ETH_Inbound+buildRedeemTx) ⇒ <code>Object</code>
    * [.buildRevokeTx(opts, skipValidation)](#ETH_Inbound+buildRevokeTx) ⇒ <code>Object</code>
    * [.buildLockScanOpts(opts, skipValidation)](#ETH_Inbound+buildLockScanOpts) ⇒ <code>Object</code>
    * [.buildRedeemScanOpts(opts, skipValidation)](#ETH_Inbound+buildRedeemScanOpts) ⇒ <code>Object</code>
    * [.buildLockData(opts, skipValidation)](#ETH_Inbound+buildLockData) ⇒ <code>string</code>
    * [.buildRedeemData(opts, skipValidation)](#ETH_Inbound+buildRedeemData) ⇒ <code>string</code>
    * [.buildRevokeData(opts, skipValidation)](#ETH_Inbound+buildRevokeData) ⇒ <code>string</code>

<a name="ETH_Inbound+send"></a>

### ETH_Inbound.send(opts, skipValidation) ⇒ <code>Promise</code>
Complete crosschain transaction (lock + redeem)

**Kind**: instance method of [<code>ETH\_Inbound</code>](#ETH_Inbound)
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
| opts.storeman | <code>Object</code> | Storeman address pair |
| opts.storeman.wan | <code>string</code> | Storeman Wanchain address |
| opts.storeman.eth | <code>string</code> | Storeman Ethereum address |
| skipValidation | <code>boolean</code> |  |

<a name="ETH_Inbound+lock"></a>

### ETH_Inbound.lock(opts, skipValidation) ⇒ <code>Promise</code>
Lock transaction and confirmation

**Kind**: instance method of [<code>ETH\_Inbound</code>](#ETH_Inbound)
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
| opts.storeman | <code>Object</code> | Storeman address pair |
| opts.storeman.wan | <code>string</code> | Storeman Wanchain address |
| opts.storeman.eth | <code>string</code> | Storeman Ethereum address |
| skipValidation | <code>boolean</code> |  |

<a name="ETH_Inbound+redeem"></a>

### ETH_Inbound.redeem(opts, skipValidation) ⇒ <code>Promise</code>
Redeem transaction and confirmation

**Kind**: instance method of [<code>ETH\_Inbound</code>](#ETH_Inbound)
**Returns**: <code>Promise</code> - Promise object

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Tx options |
| opts.to | <code>string</code> | Destination address |
| opts.redeemKey | <code>Object</code> | Redeem key pair |
| opts.redeemKey.x | <code>string</code> | Redeem key x |
| skipValidation | <code>boolean</code> |  |

<a name="ETH_Inbound+sendLock"></a>

### ETH_Inbound.sendLock(opts, skipValidation) ⇒ <code>Promise</code>
Send lock tx on Ethereum

**Kind**: instance method of [<code>ETH\_Inbound</code>](#ETH_Inbound)
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
| opts.storeman | <code>Object</code> | Storeman address pair |
| opts.storeman.wan | <code>string</code> | Storeman Wanchain address |
| opts.storeman.eth | <code>string</code> | Storeman Ethereum address |
| skipValidation | <code>boolean</code> |  |

<a name="ETH_Inbound+sendRedeem"></a>

### ETH_Inbound.sendRedeem(opts, skipValidation) ⇒ <code>Promise</code>
Send redeem tx on Wanchain

**Kind**: instance method of [<code>ETH\_Inbound</code>](#ETH_Inbound)
**Returns**: <code>Promise</code> - Promise object

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Tx options |
| opts.to | <code>string</code> | Destination address |
| opts.redeemKey | <code>Object</code> | Redeem key pair |
| opts.redeemKey.x | <code>string</code> | Redeem key x |
| skipValidation | <code>boolean</code> |  |

<a name="ETH_Inbound+sendRevoke"></a>

### ETH_Inbound.sendRevoke(opts, skipValidation) ⇒ <code>Promise</code>
Send revoke tx on Ethereum

**Kind**: instance method of [<code>ETH\_Inbound</code>](#ETH_Inbound)
**Returns**: <code>Promise</code> - Promise object

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Tx options |
| opts.from | <code>string</code> | Sender address |
| opts.redeemKey | <code>Object</code> | Redeem key pair |
| opts.redeemKey.xHash | <code>string</code> | Redeem key xHash |
| skipValidation | <code>boolean</code> |  |

<a name="ETH_Inbound+listenLock"></a>

### ETH_Inbound.listenLock(opts, skipValidation) ⇒ <code>Promise</code>
Listen for storeman lock confirmation on Wanchain

**Kind**: instance method of [<code>ETH\_Inbound</code>](#ETH_Inbound)
**Returns**: <code>Promise</code> - Promise object

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Tx options |
| opts.redeemKey | <code>Object</code> | Redeem key pair |
| opts.redeemKey.xHash | <code>string</code> | Redeem key xHash |
| skipValidation | <code>boolean</code> |  |

<a name="ETH_Inbound+listenRedeem"></a>

### ETH_Inbound.listenRedeem(opts, skipValidation) ⇒ <code>Promise</code>
Listen for storeman redeem confirmation on Ethereum

**Kind**: instance method of [<code>ETH\_Inbound</code>](#ETH_Inbound)
**Returns**: <code>Promise</code> - Promise object

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Tx options |
| opts.redeemKey | <code>Object</code> | Redeem key pair |
| opts.redeemKey.xHash | <code>string</code> | Redeem key xHash |
| skipValidation | <code>boolean</code> |  |

<a name="ETH_Inbound+buildLockTx"></a>

### ETH_Inbound.buildLockTx(opts, skipValidation) ⇒ <code>Object</code>
Build lock tx

**Kind**: instance method of [<code>ETH\_Inbound</code>](#ETH_Inbound)
**Returns**: <code>Object</code> - Tx object

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Tx options |
| opts.from | <code>string</code> | Sender address |
| opts.to | <code>string</code> | Destination address |
| opts.value | <code>string</code> | Tx value |
| opts.redeemKey | <code>Object</code> | Redeem key pair |
| opts.redeemKey.x | <code>string</code> | Redeem key x |
| opts.redeemKey.xHash | <code>string</code> | Redeem key xHash |
| opts.storeman | <code>Object</code> | Storeman address pair |
| opts.storeman.wan | <code>string</code> | Storeman Wanchain address |
| opts.storeman.eth | <code>string</code> | Storeman Ethereum address |
| skipValidation | <code>boolean</code> |  |

<a name="ETH_Inbound+buildRedeemTx"></a>

### ETH_Inbound.buildRedeemTx(opts, skipValidation) ⇒ <code>Object</code>
Build redeem tx

**Kind**: instance method of [<code>ETH\_Inbound</code>](#ETH_Inbound)
**Returns**: <code>Object</code> - Tx object

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Tx options |
| opts.to | <code>string</code> | Destination address |
| opts.redeemKey | <code>Object</code> | Redeem key pair |
| opts.redeemKey.x | <code>string</code> | Redeem key x |
| skipValidation | <code>boolean</code> |  |

<a name="ETH_Inbound+buildRevokeTx"></a>

### ETH_Inbound.buildRevokeTx(opts, skipValidation) ⇒ <code>Object</code>
Build revoke tx

**Kind**: instance method of [<code>ETH\_Inbound</code>](#ETH_Inbound)
**Returns**: <code>Object</code> - Tx object

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Tx options |
| opts.from | <code>string</code> | Sender address |
| opts.redeemKey | <code>Object</code> | Redeem key pair |
| opts.redeemKey.xHash | <code>string</code> | Redeem key xHash |
| skipValidation | <code>boolean</code> |  |

<a name="ETH_Inbound+buildLockScanOpts"></a>

### ETH_Inbound.buildLockScanOpts(opts, skipValidation) ⇒ <code>Object</code>
Build lock scan opts

**Kind**: instance method of [<code>ETH\_Inbound</code>](#ETH_Inbound)
**Returns**: <code>Object</code> - Call opts object

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Tx options |
| opts.redeemKey | <code>Object</code> | Redeem key pair |
| opts.redeemKey.xHash | <code>string</code> | Redeem key xHash |
| skipValidation | <code>boolean</code> |  |

<a name="ETH_Inbound+buildRedeemScanOpts"></a>

### ETH_Inbound.buildRedeemScanOpts(opts, skipValidation) ⇒ <code>Object</code>
Build redeem scan opts

**Kind**: instance method of [<code>ETH\_Inbound</code>](#ETH_Inbound)
**Returns**: <code>Object</code> - Call opts object

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Tx options |
| opts.redeemKey | <code>Object</code> | Redeem key pair |
| opts.redeemKey.xHash | <code>string</code> | Redeem key xHash |
| skipValidation | <code>boolean</code> |  |

<a name="ETH_Inbound+buildLockData"></a>

### ETH_Inbound.buildLockData(opts, skipValidation) ⇒ <code>string</code>
Get data hex string for lock call

**Kind**: instance method of [<code>ETH\_Inbound</code>](#ETH_Inbound)
**Returns**: <code>string</code> - Data hex string

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Tx options |
| opts.redeemKey | <code>Object</code> | Redeem key pair |
| opts.redeemKey.xHash | <code>string</code> | Redeem key xHash |
| opts.storeman | <code>Object</code> | Storeman address pair |
| opts.storeman.eth | <code>string</code> | Storeman Ethereum address |
| opts.to | <code>string</code> | Destination address |
| skipValidation | <code>boolean</code> |  |

<a name="ETH_Inbound+buildRedeemData"></a>

### ETH_Inbound.buildRedeemData(opts, skipValidation) ⇒ <code>string</code>
Get data hex string for redeem call

**Kind**: instance method of [<code>ETH\_Inbound</code>](#ETH_Inbound)
**Returns**: <code>string</code> - Data hex string

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Tx options |
| opts.redeemKey | <code>Object</code> | Redeem key pair |
| opts.redeemKey.x | <code>string</code> | Redeem key x |
| skipValidation | <code>boolean</code> |  |

<a name="ETH_Inbound+buildRevokeData"></a>

### ETH_Inbound.buildRevokeData(opts, skipValidation) ⇒ <code>string</code>
Get data hex string for revoke call

**Kind**: instance method of [<code>ETH\_Inbound</code>](#ETH_Inbound)
**Returns**: <code>string</code> - Data hex string

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Tx options |
| opts.redeemKey | <code>Object</code> | Redeem key pair |
| opts.redeemKey.xHash | <code>string</code> | Redeem key xHash |
| skipValidation | <code>boolean</code> |  |

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
    * [.sendRedeem(opts, skipValidation)](#ETH_Outbound+sendRedeem) ⇒ <code>Promise</code>
    * [.sendRevoke(opts, skipValidation)](#ETH_Outbound+sendRevoke) ⇒ <code>Promise</code>
    * [.listenLock(opts, skipValidation)](#ETH_Outbound+listenLock) ⇒ <code>Promise</code>
    * [.listenRedeem(opts, skipValidation)](#ETH_Outbound+listenRedeem) ⇒ <code>Promise</code>
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
| opts.storeman | <code>Object</code> | Storeman address pair |
| opts.storeman.wan | <code>string</code> | Storeman Wanchain address |
| opts.storeman.eth | <code>string</code> | Storeman Ethereum address |
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
| opts.storeman | <code>Object</code> | Storeman address pair |
| opts.storeman.wan | <code>string</code> | Storeman Wanchain address |
| opts.storeman.eth | <code>string</code> | Storeman Ethereum address |
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
| opts.storeman | <code>Object</code> | Storeman address pair |
| opts.storeman.wan | <code>string</code> | Storeman Wanchain address |
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
| opts.storeman | <code>Object</code> | Storeman address pair |
| opts.storeman.wan | <code>string</code> | Storeman Wanchain address |
| opts.storeman.eth | <code>string</code> | Storeman Ethereum address |
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
| opts.storeman | <code>Object</code> | Storeman address pair |
| opts.storeman.wan | <code>string</code> | Storeman Wanchain address |
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
| opts.storeman | <code>Object</code> | Storeman address pair |
| opts.storeman.wan | <code>string</code> | Storeman Wanchain address |
| opts.storeman.eth | <code>string</code> | Storeman Ethereum address |
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
| opts.storeman | <code>Object</code> | Storeman address pair |
| opts.storeman.wan | <code>string</code> | Storeman Wanchain address |
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
| opts.storeman | <code>Object</code> | Storeman address pair |
| opts.storeman.wan | <code>string</code> | Storeman Wanchain address |
| opts.value | <code>number</code> \| <code>string</code> | Tx value |
| skipValidation | <code>boolean</code> |  |

<a name="BTC_Inbound"></a>

## BTC\_Inbound
Bitcoin Inbound

**Kind**: global class

* [BTC_Inbound](#BTC_Inbound)
    * [.send(opts, skipValidation)](#BTC_Inbound+send) ⇒ <code>Promise</code>
    * [.lock(opts, skipValidation)](#BTC_Inbound+lock) ⇒ <code>Promise</code>
    * [.redeem(opts, skipValidation)](#BTC_Inbound+redeem) ⇒ <code>Promise</code>
    * [.sendLock(opts, skipValidation)](#BTC_Inbound+sendLock) ⇒ <code>Promise</code>
    * [.sendRedeem(opts, skipValidation)](#BTC_Inbound+sendRedeem) ⇒ <code>Promise</code>
    * [.listenLock(opts, skipValidation)](#BTC_Inbound+listenLock) ⇒ <code>Promise</code>
    * [.listenRedeem(opts, skipValidation)](#BTC_Inbound+listenRedeem) ⇒ <code>Promise</code>
    * [.buildLockTx(opts, skipValidation)](#BTC_Inbound+buildLockTx) ⇒ <code>Object</code>
    * [.buildRedeemTx(opts, skipValidation)](#BTC_Inbound+buildRedeemTx) ⇒ <code>Object</code>
    * [.buildLockScanOpts(opts, skipValidation)](#BTC_Inbound+buildLockScanOpts) ⇒ <code>Object</code>
    * [.buildRedeemScanOpts(opts, skipValidation)](#BTC_Inbound+buildRedeemScanOpts) ⇒ <code>Object</code>
    * [.buildLockData(opts, skipValidation)](#BTC_Inbound+buildLockData) ⇒ <code>string</code>
    * [.buildRedeemData(opts, skipValidation)](#BTC_Inbound+buildRedeemData) ⇒ <code>string</code>
    * [.buildHashTimeLockContract(opts)](#BTC_Inbound+buildHashTimeLockContract) ⇒ <code>Object</code>
    * [.hashForRevokeSig(opts)](#BTC_Inbound+hashForRevokeSig) ⇒ <code>string</code>
    * [.buildRevokeTx(opts)](#BTC_Inbound+buildRevokeTx) ⇒ <code>string</code>
    * [.buildRevokeTxFromWif(opts)](#BTC_Inbound+buildRevokeTxFromWif) ⇒ <code>string</code>

<a name="BTC_Inbound+send"></a>

### BTC_Inbound.send(opts, skipValidation) ⇒ <code>Promise</code>
Complete crosschain transaction (lock + redeem); Assumes you have already
generated and sent funds to an HTLC lock address

**Kind**: instance method of [<code>BTC\_Inbound</code>](#BTC_Inbound)
**Returns**: <code>Promise</code> - Promise object

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Tx options |
| opts.from | <code>string</code> | Revoker btc address |
| opts.to | <code>string</code> | Destination wan address |
| opts.value | <code>string</code> | Tx value |
| opts.txid | <code>string</code> | Id of funding btc tx |
| opts.lockTime | <code>string</code> | LockTime used to generate lock address |
| opts.redeemKey | <code>Object</code> | Redeem key pair |
| opts.redeemKey.x | <code>string</code> | Redeem key x |
| opts.redeemKey.xHash | <code>string</code> | Redeem key xHash |
| opts.storeman | <code>Object</code> | Storeman address pair |
| opts.storeman.wan | <code>string</code> | Storeman Wanchain address |
| opts.storeman.btc | <code>string</code> | Storeman Bitcoin address |
| skipValidation | <code>boolean</code> |  |

<a name="BTC_Inbound+lock"></a>

### BTC_Inbound.lock(opts, skipValidation) ⇒ <code>Promise</code>
Lock transaction and confirmation; Assumes you have already
generated and sent funds to an HTLC lock address

**Kind**: instance method of [<code>BTC\_Inbound</code>](#BTC_Inbound)
**Returns**: <code>Promise</code> - Promise object

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Tx options |
| opts.from | <code>string</code> | Revoker btc address |
| opts.to | <code>string</code> | Destination wan address |
| opts.value | <code>string</code> | Tx value |
| opts.txid | <code>string</code> | Id of funding btc tx |
| opts.lockTime | <code>string</code> | LockTime used to generate lock address |
| opts.redeemKey | <code>Object</code> | Redeem key pair |
| opts.redeemKey.x | <code>string</code> | Redeem key x |
| opts.redeemKey.xHash | <code>string</code> | Redeem key xHash |
| opts.storeman | <code>Object</code> | Storeman address pair |
| opts.storeman.wan | <code>string</code> | Storeman Wanchain address |
| opts.storeman.btc | <code>string</code> | Storeman Bitcoin address |
| skipValidation | <code>boolean</code> |  |

<a name="BTC_Inbound+redeem"></a>

### BTC_Inbound.redeem(opts, skipValidation) ⇒ <code>Promise</code>
Redeem transaction and confirmation

**Kind**: instance method of [<code>BTC\_Inbound</code>](#BTC_Inbound)
**Returns**: <code>Promise</code> - Promise object

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Tx options |
| opts.to | <code>string</code> | Destination wan address |
| opts.redeemKey | <code>Object</code> | Redeem key pair |
| opts.redeemKey.x | <code>string</code> | Redeem key x |
| skipValidation | <code>boolean</code> |  |

<a name="BTC_Inbound+sendLock"></a>

### BTC_Inbound.sendLock(opts, skipValidation) ⇒ <code>Promise</code>
Send lock tx on Wanchain

**Kind**: instance method of [<code>BTC\_Inbound</code>](#BTC_Inbound)
**Returns**: <code>Promise</code> - Promise object

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Tx options |
| opts.from | <code>string</code> | Revoker btc address |
| opts.to | <code>string</code> | Destination wan address |
| opts.value | <code>string</code> | Tx value |
| opts.txid | <code>string</code> | Id of funding btc tx |
| opts.lockTime | <code>string</code> | LockTime used to generate lock address |
| opts.redeemKey | <code>Object</code> | Redeem key pair |
| opts.redeemKey.x | <code>string</code> | Redeem key x |
| opts.redeemKey.xHash | <code>string</code> | Redeem key xHash |
| opts.storeman | <code>Object</code> | Storeman address pair |
| opts.storeman.wan | <code>string</code> | Storeman Wanchain address |
| opts.storeman.btc | <code>string</code> | Storeman Bitcoin address |
| skipValidation | <code>boolean</code> |  |

<a name="BTC_Inbound+sendRedeem"></a>

### BTC_Inbound.sendRedeem(opts, skipValidation) ⇒ <code>Promise</code>
Send redeem tx on Wanchain

**Kind**: instance method of [<code>BTC\_Inbound</code>](#BTC_Inbound)
**Returns**: <code>Promise</code> - Promise object

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Tx options |
| opts.to | <code>string</code> | Destination wan address |
| opts.redeemKey | <code>Object</code> | Redeem key pair |
| opts.redeemKey.x | <code>string</code> | Redeem key x |
| skipValidation | <code>boolean</code> |  |

<a name="BTC_Inbound+listenLock"></a>

### BTC_Inbound.listenLock(opts, skipValidation) ⇒ <code>Promise</code>
Listen for storeman lock confirmation on Wanchain

**Kind**: instance method of [<code>BTC\_Inbound</code>](#BTC_Inbound)
**Returns**: <code>Promise</code> - Promise object

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Tx options |
| opts.redeemKey | <code>Object</code> | Redeem key pair |
| opts.redeemKey.xHash | <code>string</code> | Redeem key xHash |
| skipValidation | <code>boolean</code> |  |

<a name="BTC_Inbound+listenRedeem"></a>

### BTC_Inbound.listenRedeem(opts, skipValidation) ⇒ <code>Promise</code>
Listen for storeman redeem confirmation on Wanchain

**Kind**: instance method of [<code>BTC\_Inbound</code>](#BTC_Inbound)
**Returns**: <code>Promise</code> - Promise object

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Tx options |
| opts.redeemKey | <code>Object</code> | Redeem key pair |
| opts.redeemKey.xHash | <code>string</code> | Redeem key xHash |
| skipValidation | <code>boolean</code> |  |

<a name="BTC_Inbound+buildLockTx"></a>

### BTC_Inbound.buildLockTx(opts, skipValidation) ⇒ <code>Object</code>
Build lock tx

**Kind**: instance method of [<code>BTC\_Inbound</code>](#BTC_Inbound)
**Returns**: <code>Object</code> - Tx object

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Tx options |
| opts.from | <code>string</code> | Revoker btc address |
| opts.to | <code>string</code> | Destination wan address |
| opts.value | <code>string</code> | Tx value |
| opts.txid | <code>string</code> | Id of funding btc tx |
| opts.lockTime | <code>string</code> | LockTime used to generate lock address |
| opts.redeemKey | <code>Object</code> | Redeem key pair |
| opts.redeemKey.x | <code>string</code> | Redeem key x |
| opts.redeemKey.xHash | <code>string</code> | Redeem key xHash |
| opts.storeman | <code>Object</code> | Storeman address pair |
| opts.storeman.wan | <code>string</code> | Storeman Wanchain address |
| opts.storeman.btc | <code>string</code> | Storeman Bitcoin address |
| skipValidation | <code>boolean</code> |  |

<a name="BTC_Inbound+buildRedeemTx"></a>

### BTC_Inbound.buildRedeemTx(opts, skipValidation) ⇒ <code>Object</code>
Build redeem tx

**Kind**: instance method of [<code>BTC\_Inbound</code>](#BTC_Inbound)
**Returns**: <code>Object</code> - Tx object

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Tx options |
| opts.to | <code>string</code> | Destination wan address |
| opts.redeemKey | <code>Object</code> | Redeem key pair |
| opts.redeemKey.x | <code>string</code> | Redeem key x |
| skipValidation | <code>boolean</code> |  |

<a name="BTC_Inbound+buildLockScanOpts"></a>

### BTC_Inbound.buildLockScanOpts(opts, skipValidation) ⇒ <code>Object</code>
Build lock scan opts

**Kind**: instance method of [<code>BTC\_Inbound</code>](#BTC_Inbound)
**Returns**: <code>Object</code> - Call opts object

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Tx options |
| opts.redeemKey | <code>Object</code> | Redeem key pair |
| opts.redeemKey.xHash | <code>string</code> | Redeem key xHash |
| skipValidation | <code>boolean</code> |  |

<a name="BTC_Inbound+buildRedeemScanOpts"></a>

### BTC_Inbound.buildRedeemScanOpts(opts, skipValidation) ⇒ <code>Object</code>
Build redeem scan opts

**Kind**: instance method of [<code>BTC\_Inbound</code>](#BTC_Inbound)
**Returns**: <code>Object</code> - Call opts object

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Tx options |
| opts.redeemKey | <code>Object</code> | Redeem key pair |
| opts.redeemKey.xHash | <code>string</code> | Redeem key xHash |
| skipValidation | <code>boolean</code> |  |

<a name="BTC_Inbound+buildLockData"></a>

### BTC_Inbound.buildLockData(opts, skipValidation) ⇒ <code>string</code>
Get data hex string for lock call

**Kind**: instance method of [<code>BTC\_Inbound</code>](#BTC_Inbound)
**Returns**: <code>string</code> - Data hex string

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Tx options |
| opts.redeemKey | <code>Object</code> | Redeem key pair |
| opts.redeemKey.xHash | <code>string</code> | Redeem key xHash |
| opts.storeman | <code>Object</code> | Storeman address pair |
| opts.storeman.wan | <code>string</code> | Storeman wan address |
| opts.from | <code>string</code> | Address that funded the P2SH address |
| opts.txid | <code>string</code> | ID of tx that funded the P2SH address |
| opts.lockTime | <code>number</code> | Locktime used to generate P2SH address |
| skipValidation | <code>boolean</code> |  |

<a name="BTC_Inbound+buildRedeemData"></a>

### BTC_Inbound.buildRedeemData(opts, skipValidation) ⇒ <code>string</code>
Get data hex string for redeem call

**Kind**: instance method of [<code>BTC\_Inbound</code>](#BTC_Inbound)
**Returns**: <code>string</code> - Data hex string

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Tx options |
| opts.redeemKey | <code>Object</code> | Redeem key pair |
| opts.redeemKey.x | <code>string</code> | Redeem key x |
| skipValidation | <code>boolean</code> |  |

<a name="BTC_Inbound+buildHashTimeLockContract"></a>

### BTC_Inbound.buildHashTimeLockContract(opts) ⇒ <code>Object</code>
Build new P2SH lock contract address

**Kind**: instance method of [<code>BTC\_Inbound</code>](#BTC_Inbound)
**Returns**: <code>Object</code> - Contract object

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Tx options |
| opts.from | <code>string</code> | Revoker btc address |
| opts.lockTime | <code>number</code> | LockTime for lock address |
| opts.redeemKey | <code>Object</code> | Redeem key pair |
| opts.redeemKey.xHash | <code>string</code> | Redeem key xHash |
| opts.storeman | <code>Object</code> | Storeman address pair |
| opts.storeman.btc | <code>string</code> | Storeman Bitcoin address |

<a name="BTC_Inbound+hashForRevokeSig"></a>

### BTC_Inbound.hashForRevokeSig(opts) ⇒ <code>string</code>
Build the hash for signature for revoke tx

**Kind**: instance method of [<code>BTC\_Inbound</code>](#BTC_Inbound)
**Returns**: <code>string</code> - Hash string

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Tx options |
| opts.from | <code>string</code> | Revoker btc address |
| opts.payTo | <code>string</code> | Address to revoke funds to (optional, defaults to revoker) |
| opts.value | <code>string</code> | Tx value (minus miner fee) |
| opts.txid | <code>string</code> | Id of funding btc tx |
| opts.lockTime | <code>number</code> | LockTime for lock address |
| opts.redeemScript | <code>string</code> | Lock address redeemScript |

<a name="BTC_Inbound+buildRevokeTx"></a>

### BTC_Inbound.buildRevokeTx(opts) ⇒ <code>string</code>
Build revoke tx from sigHash

**Kind**: instance method of [<code>BTC\_Inbound</code>](#BTC_Inbound)
**Returns**: <code>string</code> - Signed tx as hex string

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Tx options |
| opts.value | <code>string</code> | Tx value (minus miner fee) |
| opts.txid | <code>string</code> | Id of funding btc tx |
| opts.redeemKey | <code>Object</code> | Redeem key pair |
| opts.redeemKey.x | <code>string</code> | Redeem key x |
| opts.lockTime | <code>number</code> | LockTime for lock address |
| opts.redeemScript | <code>string</code> | Lock address redeemScript |
| opts.publicKey | <code>string</code> | Public key of the revoker |
| opts.sigHash | <code>string</code> | Signed hash for signature |
| opts.payTo | <code>string</code> | Address to revoke funds to (optional, defaults to revoker) |

<a name="BTC_Inbound+buildRevokeTxFromWif"></a>

### BTC_Inbound.buildRevokeTxFromWif(opts) ⇒ <code>string</code>
Build revoke tx from WIF

**Kind**: instance method of [<code>BTC\_Inbound</code>](#BTC_Inbound)
**Returns**: <code>string</code> - Signed tx as hex string

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Tx options |
| opts.value | <code>string</code> | Tx value (minus miner fee) |
| opts.txid | <code>string</code> | Id of funding btc tx |
| opts.redeemKey | <code>Object</code> | Redeem key pair |
| opts.redeemKey.x | <code>string</code> | Redeem key x |
| opts.lockTime | <code>number</code> | LockTime for lock address |
| opts.redeemScript | <code>string</code> | Lock address redeemScript |
| opts.wif | <code>string</code> | Private key of the revoker |
| opts.payTo | <code>string</code> | Address to revoke funds to (optional, defaults to revoker) |

<a name="BTC_Outbound"></a>

## BTC\_Outbound
Bitcoin Outbound

**Kind**: global class

* [BTC_Outbound](#BTC_Outbound)
    * [.send(opts, skipValidation)](#BTC_Outbound+send) ⇒ <code>Promise</code>
    * [.lock(opts, skipValidation)](#BTC_Outbound+lock) ⇒ <code>Promise</code>
    * [.getOutboundFee(opts, skipValidation)](#BTC_Outbound+getOutboundFee) ⇒ <code>Promise</code>
    * [.sendLock(opts, skipValidation)](#BTC_Outbound+sendLock) ⇒ <code>Promise</code>
    * [.sendRevoke(opts, skipValidation)](#BTC_Outbound+sendRevoke) ⇒ <code>Promise</code>
    * [.listenLock(opts, skipValidation)](#BTC_Outbound+listenLock) ⇒ <code>Promise</code>
    * [.listenRedeem(opts, skipValidation)](#BTC_Outbound+listenRedeem) ⇒ <code>Promise</code>
    * [.buildOutboundFeeTx(opts, skipValidation)](#BTC_Outbound+buildOutboundFeeTx) ⇒ <code>Object</code>
    * [.buildLockTx(opts, skipValidation)](#BTC_Outbound+buildLockTx) ⇒ <code>Object</code>
    * [.buildRevokeTx(opts, skipValidation)](#BTC_Outbound+buildRevokeTx) ⇒ <code>Object</code>
    * [.buildLockScanOpts(opts, skipValidation)](#BTC_Outbound+buildLockScanOpts) ⇒ <code>Object</code>
    * [.buildRedeemScanOpts(opts, skipValidation)](#BTC_Outbound+buildRedeemScanOpts) ⇒ <code>Object</code>
    * [.buildLockData(opts, skipValidation)](#BTC_Outbound+buildLockData) ⇒ <code>string</code>
    * [.buildRevokeData(opts, skipValidation)](#BTC_Outbound+buildRevokeData) ⇒ <code>string</code>
    * [.buildOutboundFeeData(opts, skipValidation)](#BTC_Outbound+buildOutboundFeeData) ⇒ <code>string</code>
    * [.buildHashTimeLockContract(opts)](#BTC_Outbound+buildHashTimeLockContract) ⇒ <code>Object</code>
    * [.hashForRedeemSig(opts)](#BTC_Outbound+hashForRedeemSig) ⇒ <code>string</code>
    * [.buildRedeemTx(opts)](#BTC_Outbound+buildRedeemTx) ⇒ <code>string</code>
    * [.buildRedeemTxFromWif(opts)](#BTC_Outbound+buildRedeemTxFromWif) ⇒ <code>string</code>

<a name="BTC_Outbound+send"></a>

### BTC_Outbound.send(opts, skipValidation) ⇒ <code>Promise</code>
Complete crosschain transaction (lock + redeem)

**Kind**: instance method of [<code>BTC\_Outbound</code>](#BTC_Outbound)
**Returns**: <code>Promise</code> - Promise object

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Tx options |
| opts.from | <code>string</code> | Sender wan address |
| opts.to | <code>string</code> | Redeemer btc address |
| opts.value | <code>string</code> | Tx value |
| opts.redeemKey | <code>Object</code> | Redeem key pair |
| opts.redeemKey.x | <code>string</code> | Redeem key x |
| opts.redeemKey.xHash | <code>string</code> | Redeem key xHash |
| opts.storeman | <code>Object</code> | Storeman address pair |
| opts.storeman.wan | <code>string</code> | Storeman Wanchain address |
| opts.storeman.btc | <code>string</code> | Storeman Bitcoin address |
| skipValidation | <code>boolean</code> |  |

<a name="BTC_Outbound+lock"></a>

### BTC_Outbound.lock(opts, skipValidation) ⇒ <code>Promise</code>
Lock transaction and confirmation

**Kind**: instance method of [<code>BTC\_Outbound</code>](#BTC_Outbound)
**Returns**: <code>Promise</code> - Promise object

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Tx options |
| opts.from | <code>string</code> | Sender wan address |
| opts.to | <code>string</code> | Redeemer btc address |
| opts.value | <code>string</code> | Tx value |
| opts.redeemKey | <code>Object</code> | Redeem key pair |
| opts.redeemKey.x | <code>string</code> | Redeem key x |
| opts.redeemKey.xHash | <code>string</code> | Redeem key xHash |
| opts.storeman | <code>Object</code> | Storeman address pair |
| opts.storeman.wan | <code>string</code> | Storeman Wanchain address |
| opts.storeman.btc | <code>string</code> | Storeman Bitcoin address |
| skipValidation | <code>boolean</code> |  |

<a name="BTC_Outbound+getOutboundFee"></a>

### BTC_Outbound.getOutboundFee(opts, skipValidation) ⇒ <code>Promise</code>
Get outbound fee amount

**Kind**: instance method of [<code>BTC\_Outbound</code>](#BTC_Outbound)
**Returns**: <code>Promise</code> - Promise object

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Tx options |
| opts.from | <code>string</code> | Sender wan address |
| opts.value | <code>string</code> | Tx value |
| opts.storeman | <code>Object</code> | Storeman address pair |
| opts.storeman.wan | <code>string</code> | Storeman Wanchain address |
| skipValidation | <code>boolean</code> |  |

<a name="BTC_Outbound+sendLock"></a>

### BTC_Outbound.sendLock(opts, skipValidation) ⇒ <code>Promise</code>
Send lock tx

**Kind**: instance method of [<code>BTC\_Outbound</code>](#BTC_Outbound)
**Returns**: <code>Promise</code> - Promise object

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Tx options |
| opts.from | <code>string</code> | Sender wan address |
| opts.to | <code>string</code> | Redeemer btc address |
| opts.value | <code>string</code> | Tx value |
| opts.outboundFee | <code>string</code> | Tx outbound fee |
| opts.redeemKey | <code>Object</code> | Redeem key pair |
| opts.redeemKey.x | <code>string</code> | Redeem key x |
| opts.redeemKey.xHash | <code>string</code> | Redeem key xHash |
| opts.storeman | <code>Object</code> | Storeman address pair |
| opts.storeman.wan | <code>string</code> | Storeman Wanchain address |
| opts.storeman.btc | <code>string</code> | Storeman Bitcoin address |
| skipValidation | <code>boolean</code> |  |

<a name="BTC_Outbound+sendRevoke"></a>

### BTC_Outbound.sendRevoke(opts, skipValidation) ⇒ <code>Promise</code>
Send revoke tx

**Kind**: instance method of [<code>BTC\_Outbound</code>](#BTC_Outbound)
**Returns**: <code>Promise</code> - Promise object

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Tx options |
| opts.from | <code>string</code> | Sender wan address |
| opts.redeemKey | <code>Object</code> | Redeem key pair |
| opts.redeemKey.xHash | <code>string</code> | Redeem key xHash |
| skipValidation | <code>boolean</code> |  |

<a name="BTC_Outbound+listenLock"></a>

### BTC_Outbound.listenLock(opts, skipValidation) ⇒ <code>Promise</code>
Listen for storeman lock confirmation on Wanchain

**Kind**: instance method of [<code>BTC\_Outbound</code>](#BTC_Outbound)
**Returns**: <code>Promise</code> - Promise object

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Tx options |
| opts.redeemKey | <code>Object</code> | Redeem key pair |
| opts.redeemKey.xHash | <code>string</code> | Redeem key xHash |
| skipValidation | <code>boolean</code> |  |

<a name="BTC_Outbound+listenRedeem"></a>

### BTC_Outbound.listenRedeem(opts, skipValidation) ⇒ <code>Promise</code>
Listen for storeman redeem confirmation on Wanchain

**Kind**: instance method of [<code>BTC\_Outbound</code>](#BTC_Outbound)
**Returns**: <code>Promise</code> - Promise object

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Tx options |
| opts.redeemKey | <code>Object</code> | Redeem key pair |
| opts.redeemKey.xHash | <code>string</code> | Redeem key xHash |
| skipValidation | <code>boolean</code> |  |

<a name="BTC_Outbound+buildOutboundFeeTx"></a>

### BTC_Outbound.buildOutboundFeeTx(opts, skipValidation) ⇒ <code>Object</code>
Build outboundFee tx

**Kind**: instance method of [<code>BTC\_Outbound</code>](#BTC_Outbound)
**Returns**: <code>Object</code> - Tx object

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Tx options |
| opts.from | <code>string</code> | Sender wan address |
| opts.value | <code>string</code> | Tx value |
| opts.storeman | <code>Object</code> | Storeman address pair |
| opts.storeman.wan | <code>string</code> | Storeman Wanchain address |
| skipValidation | <code>boolean</code> |  |

<a name="BTC_Outbound+buildLockTx"></a>

### BTC_Outbound.buildLockTx(opts, skipValidation) ⇒ <code>Object</code>
Build lock tx

**Kind**: instance method of [<code>BTC\_Outbound</code>](#BTC_Outbound)
**Returns**: <code>Object</code> - Tx object

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Tx options |
| opts.from | <code>string</code> | Sender wan address |
| opts.to | <code>string</code> | Redeemer btc address |
| opts.value | <code>string</code> | Tx value |
| opts.outboundFee | <code>string</code> | Tx outbound fee |
| opts.redeemKey | <code>Object</code> | Redeem key pair |
| opts.redeemKey.x | <code>string</code> | Redeem key x |
| opts.redeemKey.xHash | <code>string</code> | Redeem key xHash |
| opts.storeman | <code>Object</code> | Storeman address pair |
| opts.storeman.wan | <code>string</code> | Storeman Wanchain address |
| opts.storeman.btc | <code>string</code> | Storeman Bitcoin address |
| skipValidation | <code>boolean</code> |  |

<a name="BTC_Outbound+buildRevokeTx"></a>

### BTC_Outbound.buildRevokeTx(opts, skipValidation) ⇒ <code>Object</code>
Build revoke tx

**Kind**: instance method of [<code>BTC\_Outbound</code>](#BTC_Outbound)
**Returns**: <code>Object</code> - Tx object

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Tx options |
| opts.from | <code>string</code> | Sender wan address |
| opts.redeemKey | <code>Object</code> | Redeem key pair |
| opts.redeemKey.xHash | <code>string</code> | Redeem key xHash |
| skipValidation | <code>boolean</code> |  |

<a name="BTC_Outbound+buildLockScanOpts"></a>

### BTC_Outbound.buildLockScanOpts(opts, skipValidation) ⇒ <code>Object</code>
Build lock scan opts

**Kind**: instance method of [<code>BTC\_Outbound</code>](#BTC_Outbound)
**Returns**: <code>Object</code> - Call opts object

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Tx options |
| opts.redeemKey | <code>Object</code> | Redeem key pair |
| opts.redeemKey.xHash | <code>string</code> | Redeem key xHash |
| skipValidation | <code>boolean</code> |  |

<a name="BTC_Outbound+buildRedeemScanOpts"></a>

### BTC_Outbound.buildRedeemScanOpts(opts, skipValidation) ⇒ <code>Object</code>
Build redeem scan opts

**Kind**: instance method of [<code>BTC\_Outbound</code>](#BTC_Outbound)
**Returns**: <code>Object</code> - Call opts object

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Tx options |
| opts.redeemKey | <code>Object</code> | Redeem key pair |
| opts.redeemKey.xHash | <code>string</code> | Redeem key xHash |
| skipValidation | <code>boolean</code> |  |

<a name="BTC_Outbound+buildLockData"></a>

### BTC_Outbound.buildLockData(opts, skipValidation) ⇒ <code>string</code>
Get data hex string for lock call

**Kind**: instance method of [<code>BTC\_Outbound</code>](#BTC_Outbound)
**Returns**: <code>string</code> - Data hex string

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Tx options |
| opts.redeemKey | <code>Object</code> | Redeem key pair |
| opts.redeemKey.xHash | <code>string</code> | Redeem key xHash |
| opts.storeman | <code>Object</code> | Storeman addr pair |
| opts.storeman.wan | <code>string</code> | Storeman wan addr |
| opts.to | <code>string</code> | Redeemer btc addr |
| opts.value | <code>string</code> | Tx value |
| skipValidation | <code>boolean</code> |  |

<a name="BTC_Outbound+buildRevokeData"></a>

### BTC_Outbound.buildRevokeData(opts, skipValidation) ⇒ <code>string</code>
Get data hex string for revoke call

**Kind**: instance method of [<code>BTC\_Outbound</code>](#BTC_Outbound)
**Returns**: <code>string</code> - Data hex string

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Tx options |
| opts.redeemKey | <code>Object</code> | Redeem key pair |
| opts.redeemKey.xHash | <code>string</code> | Redeem key xHash |
| skipValidation | <code>boolean</code> |  |

<a name="BTC_Outbound+buildOutboundFeeData"></a>

### BTC_Outbound.buildOutboundFeeData(opts, skipValidation) ⇒ <code>string</code>
Get data hex string for outboundFee call

**Kind**: instance method of [<code>BTC\_Outbound</code>](#BTC_Outbound)
**Returns**: <code>string</code> - Data hex string

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Tx options |
| opts.storeman | <code>Object</code> | Storeman addr pair |
| opts.storeman.wan | <code>string</code> | Storeman wan addr |
| opts.value | <code>string</code> | Tx value |
| skipValidation | <code>boolean</code> |  |

<a name="BTC_Outbound+buildHashTimeLockContract"></a>

### BTC_Outbound.buildHashTimeLockContract(opts) ⇒ <code>Object</code>
Build P2SH lock contract address

**Kind**: instance method of [<code>BTC\_Outbound</code>](#BTC_Outbound)
**Returns**: <code>Object</code> - Contract object

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Tx options |
| opts.to | <code>string</code> | Redeemer btc address |
| opts.lockTime | <code>number</code> | LockTime for lock address |
| opts.redeemKey | <code>Object</code> | Redeem key pair |
| opts.redeemKey.xHash | <code>string</code> | Redeem key xHash |
| opts.storeman | <code>Object</code> | Storeman address pair |
| opts.storeman.btc | <code>string</code> | Storeman Bitcoin address |

<a name="BTC_Outbound+hashForRedeemSig"></a>

### BTC_Outbound.hashForRedeemSig(opts) ⇒ <code>string</code>
Build the hash for signature for redeem tx

**Kind**: instance method of [<code>BTC\_Outbound</code>](#BTC_Outbound)
**Returns**: <code>string</code> - Hash string

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Tx options |
| opts.to | <code>string</code> | Redeemer btc address |
| opts.value | <code>string</code> | Tx value (minus miner fee) |
| opts.txid | <code>string</code> | Id of funding btc tx |
| opts.redeemScript | <code>string</code> | Lock address redeemScript |

<a name="BTC_Outbound+buildRedeemTx"></a>

### BTC_Outbound.buildRedeemTx(opts) ⇒ <code>string</code>
Build redeem tx from sigHash

**Kind**: instance method of [<code>BTC\_Outbound</code>](#BTC_Outbound)
**Returns**: <code>string</code> - Signed tx as hex string

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Tx options |
| opts.value | <code>string</code> | Tx value (minus miner fee) |
| opts.txid | <code>string</code> | Id of funding btc tx |
| opts.redeemKey | <code>Object</code> | Redeem key pair |
| opts.redeemKey.x | <code>string</code> | Redeem key x |
| opts.redeemScript | <code>string</code> | Lock address redeemScript |
| opts.publicKey | <code>string</code> | Public key of the redeemer |
| opts.sigHash | <code>string</code> | Signed hash for signature |
| opts.payTo | <code>string</code> | Address to redeem funds to (optional, defaults to redeemer) |

<a name="BTC_Outbound+buildRedeemTxFromWif"></a>

### BTC_Outbound.buildRedeemTxFromWif(opts) ⇒ <code>string</code>
Build redeem tx from WIF

**Kind**: instance method of [<code>BTC\_Outbound</code>](#BTC_Outbound)
**Returns**: <code>string</code> - Signed tx as hex string

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Tx options |
| opts.value | <code>string</code> | Tx value (minus miner fee) |
| opts.txid | <code>string</code> | Id of funding btc tx |
| opts.redeemKey | <code>Object</code> | Redeem key pair |
| opts.redeemKey.x | <code>string</code> | Redeem key x |
| opts.redeemScript | <code>string</code> | Lock address redeemScript |
| opts.wif | <code>string</code> | Private key of the redeemer |
| opts.payTo | <code>string</code> | Address to redeem funds to (optional, defaults to redeemer) |

<a name="ERC20_Inbound"></a>

## ERC20\_Inbound
ERC20 Inbound

**Kind**: global class

* [ERC20_Inbound](#ERC20_Inbound)
    * [.send(opts, skipValidation)](#ERC20_Inbound+send) ⇒ <code>Promise</code>
    * [.lock(opts, skipValidation)](#ERC20_Inbound+lock) ⇒ <code>Promise</code>
    * [.redeem(opts, skipValidation)](#ERC20_Inbound+redeem) ⇒ <code>Promise</code>
    * [.sendApprove(opts, skipValidation)](#ERC20_Inbound+sendApprove) ⇒ <code>Promise</code>
    * [.sendLock(opts, skipValidation)](#ERC20_Inbound+sendLock) ⇒ <code>Promise</code>
    * [.sendRedeem(opts, skipValidation)](#ERC20_Inbound+sendRedeem) ⇒ <code>Promise</code>
    * [.sendRevoke(opts, skipValidation)](#ERC20_Inbound+sendRevoke) ⇒ <code>Promise</code>
    * [.listenLock(opts, skipValidation)](#ERC20_Inbound+listenLock) ⇒ <code>Promise</code>
    * [.listenRedeem(opts, skipValidation)](#ERC20_Inbound+listenRedeem) ⇒ <code>Promise</code>
    * [.buildApproveTx(opts, skipValidation)](#ERC20_Inbound+buildApproveTx) ⇒ <code>Object</code>
    * [.buildLockTx(opts, skipValidation)](#ERC20_Inbound+buildLockTx) ⇒ <code>Object</code>
    * [.buildRedeemTx(opts, skipValidation)](#ERC20_Inbound+buildRedeemTx) ⇒ <code>Object</code>
    * [.buildRevokeTx(opts, skipValidation)](#ERC20_Inbound+buildRevokeTx) ⇒ <code>Object</code>
    * [.buildLockScanOpts(opts, skipValidation)](#ERC20_Inbound+buildLockScanOpts) ⇒ <code>Object</code>
    * [.buildRedeemScanOpts(opts, skipValidation)](#ERC20_Inbound+buildRedeemScanOpts) ⇒ <code>Object</code>
    * [.buildApproveData(opts, skipValidation)](#ERC20_Inbound+buildApproveData) ⇒ <code>string</code>
    * [.buildLockData(opts, skipValidation)](#ERC20_Inbound+buildLockData) ⇒ <code>string</code>
    * [.buildRedeemData(opts, skipValidation)](#ERC20_Inbound+buildRedeemData) ⇒ <code>string</code>
    * [.buildRevokeData(opts, skipValidation)](#ERC20_Inbound+buildRevokeData) ⇒ <code>string</code>

<a name="ERC20_Inbound+send"></a>

### ERC20_Inbound.send(opts, skipValidation) ⇒ <code>Promise</code>
Complete crosschain transaction (lock + redeem)

**Kind**: instance method of [<code>ERC20\_Inbound</code>](#ERC20_Inbound)
**Returns**: <code>Promise</code> - Promise object

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Tx options |
| opts.from | <code>string</code> | Sender address |
| opts.to | <code>string</code> | Destination address |
| opts.value | <code>string</code> | Tx value |
| opts.token | <code>Object</code> | Token pair |
| opts.token.wan | <code>string</code> | Token address on Wanchain |
| opts.token.eth | <code>string</code> | Token address on Ethereum |
| opts.redeemKey | <code>Object</code> | Redeem key pair |
| opts.redeemKey.x | <code>string</code> | Redeem key x |
| opts.redeemKey.xHash | <code>string</code> | Redeem key xHash |
| opts.storeman | <code>Object</code> | Storeman address pair |
| opts.storeman.wan | <code>string</code> | Storeman Wanchain address |
| opts.storeman.eth | <code>string</code> | Storeman Ethereum address |
| skipValidation | <code>boolean</code> |  |

<a name="ERC20_Inbound+lock"></a>

### ERC20_Inbound.lock(opts, skipValidation) ⇒ <code>Promise</code>
Lock transaction and confirmation

**Kind**: instance method of [<code>ERC20\_Inbound</code>](#ERC20_Inbound)
**Returns**: <code>Promise</code> - Promise object

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Tx options |
| opts.from | <code>string</code> | Sender address |
| opts.to | <code>string</code> | Destination address |
| opts.value | <code>string</code> | Tx value |
| opts.token | <code>Object</code> | Token pair |
| opts.token.wan | <code>string</code> | Token address on Wanchain |
| opts.token.eth | <code>string</code> | Token address on Ethereum |
| opts.redeemKey | <code>Object</code> | Redeem key pair |
| opts.redeemKey.x | <code>string</code> | Redeem key x |
| opts.redeemKey.xHash | <code>string</code> | Redeem key xHash |
| opts.storeman | <code>Object</code> | Storeman address pair |
| opts.storeman.wan | <code>string</code> | Storeman Wanchain address |
| opts.storeman.eth | <code>string</code> | Storeman Ethereum address |
| skipValidation | <code>boolean</code> |  |

<a name="ERC20_Inbound+redeem"></a>

### ERC20_Inbound.redeem(opts, skipValidation) ⇒ <code>Promise</code>
Redeem transaction and confirmation

**Kind**: instance method of [<code>ERC20\_Inbound</code>](#ERC20_Inbound)
**Returns**: <code>Promise</code> - Promise object

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Tx options |
| opts.to | <code>string</code> | Destination address |
| opts.token | <code>Object</code> | Token pair |
| opts.token.eth | <code>string</code> | Token address on Ethereum |
| opts.redeemKey | <code>Object</code> | Redeem key pair |
| opts.redeemKey.x | <code>string</code> | Redeem key x |
| skipValidation | <code>boolean</code> |  |

<a name="ERC20_Inbound+sendApprove"></a>

### ERC20_Inbound.sendApprove(opts, skipValidation) ⇒ <code>Promise</code>
Send approve tx on Ethereum

**Kind**: instance method of [<code>ERC20\_Inbound</code>](#ERC20_Inbound)
**Returns**: <code>Promise</code> - Promise object

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Tx options |
| opts.from | <code>string</code> | Sender address |
| opts.value | <code>string</code> | Tx value |
| opts.token | <code>Object</code> | Token pair |
| opts.token.eth | <code>string</code> | Token address on Ethereum |
| skipValidation | <code>boolean</code> |  |

<a name="ERC20_Inbound+sendLock"></a>

### ERC20_Inbound.sendLock(opts, skipValidation) ⇒ <code>Promise</code>
Send lock tx on Ethereum

**Kind**: instance method of [<code>ERC20\_Inbound</code>](#ERC20_Inbound)
**Returns**: <code>Promise</code> - Promise object

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Tx options |
| opts.from | <code>string</code> | Sender address |
| opts.to | <code>string</code> | Destination address |
| opts.value | <code>string</code> | Tx value |
| opts.token | <code>Object</code> | Token pair |
| opts.token.wan | <code>string</code> | Token address on Wanchain |
| opts.token.eth | <code>string</code> | Token address on Ethereum |
| opts.redeemKey | <code>Object</code> | Redeem key pair |
| opts.redeemKey.x | <code>string</code> | Redeem key x |
| opts.redeemKey.xHash | <code>string</code> | Redeem key xHash |
| opts.storeman | <code>Object</code> | Storeman address pair |
| opts.storeman.wan | <code>string</code> | Storeman Wanchain address |
| opts.storeman.eth | <code>string</code> | Storeman Ethereum address |
| skipValidation | <code>boolean</code> |  |

<a name="ERC20_Inbound+sendRedeem"></a>

### ERC20_Inbound.sendRedeem(opts, skipValidation) ⇒ <code>Promise</code>
Send redeem tx on Wanchain

**Kind**: instance method of [<code>ERC20\_Inbound</code>](#ERC20_Inbound)
**Returns**: <code>Promise</code> - Promise object

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Tx options |
| opts.to | <code>string</code> | Destination address |
| opts.redeemKey | <code>Object</code> | Redeem key pair |
| opts.redeemKey.x | <code>string</code> | Redeem key x |
| opts.token | <code>Object</code> | Token pair |
| opts.token.eth | <code>string</code> | Token address on Ethereum |
| skipValidation | <code>boolean</code> |  |

<a name="ERC20_Inbound+sendRevoke"></a>

### ERC20_Inbound.sendRevoke(opts, skipValidation) ⇒ <code>Promise</code>
Send revoke tx on Ethereum

**Kind**: instance method of [<code>ERC20\_Inbound</code>](#ERC20_Inbound)
**Returns**: <code>Promise</code> - Promise object

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Tx options |
| opts.from | <code>string</code> | Sender address |
| opts.redeemKey | <code>Object</code> | Redeem key pair |
| opts.redeemKey.xHash | <code>string</code> | Redeem key xHash |
| opts.token | <code>Object</code> | Token pair |
| opts.token.eth | <code>string</code> | Token address on Ethereum |
| skipValidation | <code>boolean</code> |  |

<a name="ERC20_Inbound+listenLock"></a>

### ERC20_Inbound.listenLock(opts, skipValidation) ⇒ <code>Promise</code>
Listen for storeman lock confirmation on Wanchain

**Kind**: instance method of [<code>ERC20\_Inbound</code>](#ERC20_Inbound)
**Returns**: <code>Promise</code> - Promise object

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Tx options |
| opts.redeemKey | <code>Object</code> | Redeem key pair |
| opts.redeemKey.xHash | <code>string</code> | Redeem key xHash |
| skipValidation | <code>boolean</code> |  |

<a name="ERC20_Inbound+listenRedeem"></a>

### ERC20_Inbound.listenRedeem(opts, skipValidation) ⇒ <code>Promise</code>
Listen for storeman redeem confirmation on Ethereum

**Kind**: instance method of [<code>ERC20\_Inbound</code>](#ERC20_Inbound)
**Returns**: <code>Promise</code> - Promise object

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Tx options |
| opts.redeemKey | <code>Object</code> | Redeem key pair |
| opts.redeemKey.xHash | <code>string</code> | Redeem key xHash |
| skipValidation | <code>boolean</code> |  |

<a name="ERC20_Inbound+buildApproveTx"></a>

### ERC20_Inbound.buildApproveTx(opts, skipValidation) ⇒ <code>Object</code>
Build approve tx

**Kind**: instance method of [<code>ERC20\_Inbound</code>](#ERC20_Inbound)
**Returns**: <code>Object</code> - Tx object

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Tx options |
| opts.from | <code>string</code> | Sender address |
| opts.value | <code>string</code> | Tx value |
| opts.token | <code>Object</code> | Token pair |
| opts.token.eth | <code>string</code> | Token address on Ethereum |
| skipValidation | <code>boolean</code> |  |

<a name="ERC20_Inbound+buildLockTx"></a>

### ERC20_Inbound.buildLockTx(opts, skipValidation) ⇒ <code>Object</code>
Build lock tx

**Kind**: instance method of [<code>ERC20\_Inbound</code>](#ERC20_Inbound)
**Returns**: <code>Object</code> - Tx object

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Tx options |
| opts.from | <code>string</code> | Sender address |
| opts.to | <code>string</code> | Destination address |
| opts.value | <code>string</code> | Tx value |
| opts.token | <code>Object</code> | Token pair |
| opts.token.wan | <code>string</code> | Token address on Wanchain |
| opts.token.eth | <code>string</code> | Token address on Ethereum |
| opts.redeemKey | <code>Object</code> | Redeem key pair |
| opts.redeemKey.x | <code>string</code> | Redeem key x |
| opts.redeemKey.xHash | <code>string</code> | Redeem key xHash |
| opts.storeman | <code>Object</code> | Storeman address pair |
| opts.storeman.wan | <code>string</code> | Storeman Wanchain address |
| opts.storeman.eth | <code>string</code> | Storeman Ethereum address |
| skipValidation | <code>boolean</code> |  |

<a name="ERC20_Inbound+buildRedeemTx"></a>

### ERC20_Inbound.buildRedeemTx(opts, skipValidation) ⇒ <code>Object</code>
Build redeem tx

**Kind**: instance method of [<code>ERC20\_Inbound</code>](#ERC20_Inbound)
**Returns**: <code>Object</code> - Tx object

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Tx options |
| opts.to | <code>string</code> | Destination address |
| opts.token | <code>Object</code> | Token pair |
| opts.token.eth | <code>string</code> | Token address on Ethereum |
| opts.redeemKey | <code>Object</code> | Redeem key pair |
| opts.redeemKey.x | <code>string</code> | Redeem key x |
| skipValidation | <code>boolean</code> |  |

<a name="ERC20_Inbound+buildRevokeTx"></a>

### ERC20_Inbound.buildRevokeTx(opts, skipValidation) ⇒ <code>Object</code>
Build redeem tx

**Kind**: instance method of [<code>ERC20\_Inbound</code>](#ERC20_Inbound)
**Returns**: <code>Object</code> - Tx object

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Tx options |
| opts.from | <code>string</code> | Sender address |
| opts.token | <code>Object</code> | Token pair |
| opts.token.eth | <code>string</code> | Token address on Ethereum |
| opts.redeemKey | <code>Object</code> | Redeem key pair |
| opts.redeemKey.xHash | <code>string</code> | Redeem key xHash |
| skipValidation | <code>boolean</code> |  |

<a name="ERC20_Inbound+buildLockScanOpts"></a>

### ERC20_Inbound.buildLockScanOpts(opts, skipValidation) ⇒ <code>Object</code>
Build lock scan opts

**Kind**: instance method of [<code>ERC20\_Inbound</code>](#ERC20_Inbound)
**Returns**: <code>Object</code> - Call opts object

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Tx options |
| opts.redeemKey | <code>Object</code> | Redeem key pair |
| opts.redeemKey.xHash | <code>string</code> | Redeem key xHash |
| skipValidation | <code>boolean</code> |  |

<a name="ERC20_Inbound+buildRedeemScanOpts"></a>

### ERC20_Inbound.buildRedeemScanOpts(opts, skipValidation) ⇒ <code>Object</code>
Build redeem scan opts

**Kind**: instance method of [<code>ERC20\_Inbound</code>](#ERC20_Inbound)
**Returns**: <code>Object</code> - Call opts object

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Tx options |
| opts.redeemKey | <code>Object</code> | Redeem key pair |
| opts.redeemKey.xHash | <code>string</code> | Redeem key xHash |
| skipValidation | <code>boolean</code> |  |

<a name="ERC20_Inbound+buildApproveData"></a>

### ERC20_Inbound.buildApproveData(opts, skipValidation) ⇒ <code>string</code>
Get data hex string for approve call

**Kind**: instance method of [<code>ERC20\_Inbound</code>](#ERC20_Inbound)
**Returns**: <code>string</code> - Data hex string

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Tx options |
| opts.value | <code>string</code> \| <code>number</code> | Tx value |
| skipValidation | <code>boolean</code> |  |

<a name="ERC20_Inbound+buildLockData"></a>

### ERC20_Inbound.buildLockData(opts, skipValidation) ⇒ <code>string</code>
Get data hex string for lock call

**Kind**: instance method of [<code>ERC20\_Inbound</code>](#ERC20_Inbound)
**Returns**: <code>string</code> - Data hex string

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Tx options |
| opts.token | <code>Object</code> | Token address pair |
| opts.token.eth | <code>string</code> | Token eth address |
| opts.redeemKey | <code>Object</code> | Redeem key pair |
| opts.redeemKey.xHash | <code>string</code> | Redeem key xHash |
| opts.storeman | <code>Object</code> | Storeman address pair |
| opts.storeman.eth | <code>string</code> | Storeman eth address |
| opts.to | <code>string</code> | Destination address |
| opts.value | <code>string</code> \| <code>number</code> | Tx value |
| skipValidation | <code>boolean</code> |  |

<a name="ERC20_Inbound+buildRedeemData"></a>

### ERC20_Inbound.buildRedeemData(opts, skipValidation) ⇒ <code>string</code>
Get data hex string for redeem call

**Kind**: instance method of [<code>ERC20\_Inbound</code>](#ERC20_Inbound)
**Returns**: <code>string</code> - Data hex string

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Tx options |
| opts.token | <code>Object</code> | Token address pair |
| opts.token.eth | <code>string</code> | Token eth address |
| opts.redeemKey | <code>Object</code> | Redeem key pair |
| opts.redeemKey.x | <code>string</code> | Redeem key x |
| skipValidation | <code>boolean</code> |  |

<a name="ERC20_Inbound+buildRevokeData"></a>

### ERC20_Inbound.buildRevokeData(opts, skipValidation) ⇒ <code>string</code>
Get data hex string for revoke call

**Kind**: instance method of [<code>ERC20\_Inbound</code>](#ERC20_Inbound)
**Returns**: <code>string</code> - Data hex string

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Tx options |
| opts.token | <code>Object</code> | Token address pair |
| opts.token.eth | <code>string</code> | Token eth address |
| opts.redeemKey | <code>Object</code> | Redeem key pair |
| opts.redeemKey.xHash | <code>string</code> | Redeem key xHash |
| skipValidation | <code>boolean</code> |  |

<a name="ERC20_Outbound"></a>

## ERC20\_Outbound
ERC20 Outbound

**Kind**: global class

* [ERC20_Outbound](#ERC20_Outbound)
    * [.send(opts, skipValidation)](#ERC20_Outbound+send) ⇒ <code>Promise</code>
    * [.lock(opts, skipValidation)](#ERC20_Outbound+lock) ⇒ <code>Promise</code>
    * [.redeem(opts, skipValidation)](#ERC20_Outbound+redeem) ⇒ <code>Promise</code>
    * [.getOutboundFee(opts, skipValidation)](#ERC20_Outbound+getOutboundFee) ⇒ <code>Promise</code>
    * [.sendApprove(opts, skipValidation)](#ERC20_Outbound+sendApprove) ⇒ <code>Promise</code>
    * [.sendLock(opts, skipValidation)](#ERC20_Outbound+sendLock) ⇒ <code>Promise</code>
    * [.sendRedeem(opts, skipValidation)](#ERC20_Outbound+sendRedeem) ⇒ <code>Promise</code>
    * [.sendRevoke(opts, skipValidation)](#ERC20_Outbound+sendRevoke) ⇒ <code>Promise</code>
    * [.listenLock(opts, skipValidation)](#ERC20_Outbound+listenLock) ⇒ <code>Promise</code>
    * [.listenRedeem(opts, skipValidation)](#ERC20_Outbound+listenRedeem) ⇒ <code>Promise</code>
    * [.buildOutboundFeeTx(opts, skipValidation)](#ERC20_Outbound+buildOutboundFeeTx) ⇒ <code>Promise</code>
    * [.buildApproveTx(opts, skipValidation)](#ERC20_Outbound+buildApproveTx) ⇒ <code>Object</code>
    * [.buildLockTx(opts, skipValidation)](#ERC20_Outbound+buildLockTx) ⇒ <code>Promise</code>
    * [.buildRedeemTx(opts, skipValidation)](#ERC20_Outbound+buildRedeemTx) ⇒ <code>Object</code>
    * [.buildRevokeTx(opts, skipValidation)](#ERC20_Outbound+buildRevokeTx) ⇒ <code>Object</code>
    * [.buildLockScanOpts(opts, skipValidation)](#ERC20_Outbound+buildLockScanOpts) ⇒ <code>Object</code>
    * [.buildRedeemScanOpts(opts, skipValidation)](#ERC20_Outbound+buildRedeemScanOpts) ⇒ <code>Object</code>
    * [.buildApproveData(opts, skipValidation)](#ERC20_Outbound+buildApproveData) ⇒ <code>string</code>
    * [.buildLockData(opts, skipValidation)](#ERC20_Outbound+buildLockData) ⇒ <code>string</code>
    * [.buildRedeemData(opts, skipValidation)](#ERC20_Outbound+buildRedeemData) ⇒ <code>string</code>
    * [.buildRevokeData(opts, skipValidation)](#ERC20_Outbound+buildRevokeData) ⇒ <code>string</code>
    * [.buildOutboundFeeData(opts, skipValidation)](#ERC20_Outbound+buildOutboundFeeData) ⇒ <code>string</code>

<a name="ERC20_Outbound+send"></a>

### ERC20_Outbound.send(opts, skipValidation) ⇒ <code>Promise</code>
Complete crosschain transaction (lock + redeem)

**Kind**: instance method of [<code>ERC20\_Outbound</code>](#ERC20_Outbound)
**Returns**: <code>Promise</code> - Promise object

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Tx options |
| opts.from | <code>string</code> | Sender address |
| opts.to | <code>string</code> | Destination address |
| opts.value | <code>string</code> | Tx value |
| opts.token | <code>Object</code> | Token pair |
| opts.token.wan | <code>string</code> | Token address on Wanchain |
| opts.token.eth | <code>string</code> | Token address on Ethereum |
| opts.redeemKey | <code>Object</code> | Redeem key pair |
| opts.redeemKey.x | <code>string</code> | Redeem key x |
| opts.redeemKey.xHash | <code>string</code> | Redeem key xHash |
| opts.storeman | <code>Object</code> | Storeman address pair |
| opts.storeman.wan | <code>string</code> | Storeman Wanchain address |
| opts.storeman.eth | <code>string</code> | Storeman Ethereum address |
| skipValidation | <code>boolean</code> |  |

<a name="ERC20_Outbound+lock"></a>

### ERC20_Outbound.lock(opts, skipValidation) ⇒ <code>Promise</code>
Lock transaction and confirmation

**Kind**: instance method of [<code>ERC20\_Outbound</code>](#ERC20_Outbound)
**Returns**: <code>Promise</code> - Promise object

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Tx options |
| opts.from | <code>string</code> | Sender address |
| opts.to | <code>string</code> | Destination address |
| opts.value | <code>string</code> | Tx value |
| opts.token | <code>Object</code> | Token pair |
| opts.token.wan | <code>string</code> | Token address on Wanchain |
| opts.token.eth | <code>string</code> | Token address on Ethereum |
| opts.redeemKey | <code>Object</code> | Redeem key pair |
| opts.redeemKey.x | <code>string</code> | Redeem key x |
| opts.redeemKey.xHash | <code>string</code> | Redeem key xHash |
| opts.storeman | <code>Object</code> | Storeman address pair |
| opts.storeman.wan | <code>string</code> | Storeman Wanchain address |
| opts.storeman.eth | <code>string</code> | Storeman Ethereum address |
| skipValidation | <code>boolean</code> |  |

<a name="ERC20_Outbound+redeem"></a>

### ERC20_Outbound.redeem(opts, skipValidation) ⇒ <code>Promise</code>
Redeem transaction and confirmation

**Kind**: instance method of [<code>ERC20\_Outbound</code>](#ERC20_Outbound)
**Returns**: <code>Promise</code> - Promise object

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Tx options |
| opts.to | <code>string</code> | Destination address |
| opts.token | <code>Object</code> | Token pair |
| opts.token.eth | <code>string</code> | Token address on Ethereum |
| opts.redeemKey | <code>Object</code> | Redeem key pair |
| opts.redeemKey.x | <code>string</code> | Redeem key x |
| skipValidation | <code>boolean</code> |  |

<a name="ERC20_Outbound+getOutboundFee"></a>

### ERC20_Outbound.getOutboundFee(opts, skipValidation) ⇒ <code>Promise</code>
Get outbound fee amount

**Kind**: instance method of [<code>ERC20\_Outbound</code>](#ERC20_Outbound)
**Returns**: <code>Promise</code> - Promise object

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Tx options |
| opts.to | <code>string</code> | Destination address |
| opts.value | <code>string</code> | Tx value |
| opts.token | <code>Object</code> | Token pair |
| opts.token.wan | <code>string</code> | Token address on Wanchain |
| opts.token.eth | <code>string</code> | Token address on Ethereum |
| opts.storeman | <code>Object</code> | Storeman address pair |
| opts.storeman.wan | <code>string</code> | Storeman Wanchain address |
| skipValidation | <code>boolean</code> |  |

<a name="ERC20_Outbound+sendApprove"></a>

### ERC20_Outbound.sendApprove(opts, skipValidation) ⇒ <code>Promise</code>
Send approve tx on Ethereum

**Kind**: instance method of [<code>ERC20\_Outbound</code>](#ERC20_Outbound)
**Returns**: <code>Promise</code> - Promise object

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Tx options |
| opts.from | <code>string</code> | Sender address |
| opts.value | <code>string</code> | Tx value |
| opts.token | <code>Object</code> | Token pair |
| opts.token.wan | <code>string</code> | Token address on Wanchain |
| skipValidation | <code>boolean</code> |  |

<a name="ERC20_Outbound+sendLock"></a>

### ERC20_Outbound.sendLock(opts, skipValidation) ⇒ <code>Promise</code>
Send lock tx on Wanchain

**Kind**: instance method of [<code>ERC20\_Outbound</code>](#ERC20_Outbound)
**Returns**: <code>Promise</code> - Promise object

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Tx options |
| opts.from | <code>string</code> | Sender address |
| opts.to | <code>string</code> | Destination address |
| opts.value | <code>string</code> | Tx value |
| opts.outboundFee | <code>string</code> | Tx outbound fee |
| opts.token | <code>Object</code> | Token pair |
| opts.token.wan | <code>string</code> | Token address on Wanchain |
| opts.token.eth | <code>string</code> | Token address on Ethereum |
| opts.redeemKey | <code>Object</code> | Redeem key pair |
| opts.redeemKey.x | <code>string</code> | Redeem key x |
| opts.redeemKey.xHash | <code>string</code> | Redeem key xHash |
| opts.storeman | <code>Object</code> | Storeman address pair |
| opts.storeman.wan | <code>string</code> | Storeman Wanchain address |
| opts.storeman.eth | <code>string</code> | Storeman Ethereum address |
| skipValidation | <code>boolean</code> |  |

<a name="ERC20_Outbound+sendRedeem"></a>

### ERC20_Outbound.sendRedeem(opts, skipValidation) ⇒ <code>Promise</code>
Send redeem tx on Ethereum

**Kind**: instance method of [<code>ERC20\_Outbound</code>](#ERC20_Outbound)
**Returns**: <code>Promise</code> - Promise object

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Tx options |
| opts.to | <code>string</code> | Destination address |
| opts.redeemKey | <code>Object</code> | Redeem key pair |
| opts.redeemKey.x | <code>string</code> | Redeem key x |
| opts.token | <code>Object</code> | Token pair |
| opts.token.eth | <code>string</code> | Token address on Ethereum |
| skipValidation | <code>boolean</code> |  |

<a name="ERC20_Outbound+sendRevoke"></a>

### ERC20_Outbound.sendRevoke(opts, skipValidation) ⇒ <code>Promise</code>
Send revoke tx on Wanchain

**Kind**: instance method of [<code>ERC20\_Outbound</code>](#ERC20_Outbound)
**Returns**: <code>Promise</code> - Promise object

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Tx options |
| opts.from | <code>string</code> | Sender address |
| opts.redeemKey | <code>Object</code> | Redeem key pair |
| opts.redeemKey.xHash | <code>string</code> | Redeem key xHash |
| opts.token | <code>Object</code> | Token pair |
| opts.token.eth | <code>string</code> | Token address on Ethereum |
| skipValidation | <code>boolean</code> |  |

<a name="ERC20_Outbound+listenLock"></a>

### ERC20_Outbound.listenLock(opts, skipValidation) ⇒ <code>Promise</code>
Listen for storeman lock confirmation on Ethereum

**Kind**: instance method of [<code>ERC20\_Outbound</code>](#ERC20_Outbound)
**Returns**: <code>Promise</code> - Promise object

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Tx options |
| opts.redeemKey | <code>Object</code> | Redeem key pair |
| opts.redeemKey.xHash | <code>string</code> | Redeem key xHash |
| skipValidation | <code>boolean</code> |  |

<a name="ERC20_Outbound+listenRedeem"></a>

### ERC20_Outbound.listenRedeem(opts, skipValidation) ⇒ <code>Promise</code>
Listen for storeman redeem confirmation on Wanchain

**Kind**: instance method of [<code>ERC20\_Outbound</code>](#ERC20_Outbound)
**Returns**: <code>Promise</code> - Promise object

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Tx options |
| opts.redeemKey | <code>Object</code> | Redeem key pair |
| opts.redeemKey.xHash | <code>string</code> | Redeem key xHash |
| skipValidation | <code>boolean</code> |  |

<a name="ERC20_Outbound+buildOutboundFeeTx"></a>

### ERC20_Outbound.buildOutboundFeeTx(opts, skipValidation) ⇒ <code>Promise</code>
Build outbound fee tx

**Kind**: instance method of [<code>ERC20\_Outbound</code>](#ERC20_Outbound)
**Returns**: <code>Promise</code> - Promise object

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Tx options |
| opts.to | <code>string</code> | Destination address |
| opts.value | <code>string</code> | Tx value |
| opts.token | <code>Object</code> | Token pair |
| opts.token.wan | <code>string</code> | Token address on Wanchain |
| opts.token.eth | <code>string</code> | Token address on Ethereum |
| opts.storeman | <code>Object</code> | Storeman address pair |
| opts.storeman.wan | <code>string</code> | Storeman Wanchain address |
| skipValidation | <code>boolean</code> |  |

<a name="ERC20_Outbound+buildApproveTx"></a>

### ERC20_Outbound.buildApproveTx(opts, skipValidation) ⇒ <code>Object</code>
Build approve tx

**Kind**: instance method of [<code>ERC20\_Outbound</code>](#ERC20_Outbound)
**Returns**: <code>Object</code> - Tx object

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Tx options |
| opts.from | <code>string</code> | Sender address |
| opts.value | <code>string</code> | Tx value |
| opts.token | <code>Object</code> | Token pair |
| opts.token.wan | <code>string</code> | Token address on Wanchain |
| skipValidation | <code>boolean</code> |  |

<a name="ERC20_Outbound+buildLockTx"></a>

### ERC20_Outbound.buildLockTx(opts, skipValidation) ⇒ <code>Promise</code>
Build lock tx

**Kind**: instance method of [<code>ERC20\_Outbound</code>](#ERC20_Outbound)
**Returns**: <code>Promise</code> - Promise object

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Tx options |
| opts.from | <code>string</code> | Sender address |
| opts.to | <code>string</code> | Destination address |
| opts.value | <code>string</code> | Tx value |
| opts.outboundFee | <code>string</code> | Tx outbound fee |
| opts.token | <code>Object</code> | Token pair |
| opts.token.wan | <code>string</code> | Token address on Wanchain |
| opts.token.eth | <code>string</code> | Token address on Ethereum |
| opts.redeemKey | <code>Object</code> | Redeem key pair |
| opts.redeemKey.x | <code>string</code> | Redeem key x |
| opts.redeemKey.xHash | <code>string</code> | Redeem key xHash |
| opts.storeman | <code>Object</code> | Storeman address pair |
| opts.storeman.wan | <code>string</code> | Storeman Wanchain address |
| opts.storeman.eth | <code>string</code> | Storeman Ethereum address |
| skipValidation | <code>boolean</code> |  |

<a name="ERC20_Outbound+buildRedeemTx"></a>

### ERC20_Outbound.buildRedeemTx(opts, skipValidation) ⇒ <code>Object</code>
Build redeem tx

**Kind**: instance method of [<code>ERC20\_Outbound</code>](#ERC20_Outbound)
**Returns**: <code>Object</code> - Tx object

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Tx options |
| opts.to | <code>string</code> | Destination address |
| opts.token | <code>Object</code> | Token pair |
| opts.token.eth | <code>string</code> | Token address on Ethereum |
| opts.redeemKey | <code>Object</code> | Redeem key pair |
| opts.redeemKey.x | <code>string</code> | Redeem key x |
| skipValidation | <code>boolean</code> |  |

<a name="ERC20_Outbound+buildRevokeTx"></a>

### ERC20_Outbound.buildRevokeTx(opts, skipValidation) ⇒ <code>Object</code>
Build redeem tx

**Kind**: instance method of [<code>ERC20\_Outbound</code>](#ERC20_Outbound)
**Returns**: <code>Object</code> - Tx object

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Tx options |
| opts.from | <code>string</code> | Sender address |
| opts.token | <code>Object</code> | Token pair |
| opts.token.eth | <code>string</code> | Token address on Ethereum |
| opts.redeemKey | <code>Object</code> | Redeem key pair |
| opts.redeemKey.xHash | <code>string</code> | Redeem key xHash |
| skipValidation | <code>boolean</code> |  |

<a name="ERC20_Outbound+buildLockScanOpts"></a>

### ERC20_Outbound.buildLockScanOpts(opts, skipValidation) ⇒ <code>Object</code>
Build lock scan opts

**Kind**: instance method of [<code>ERC20\_Outbound</code>](#ERC20_Outbound)
**Returns**: <code>Object</code> - Call opts object

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Tx options |
| opts.redeemKey | <code>Object</code> | Redeem key pair |
| opts.redeemKey.xHash | <code>string</code> | Redeem key xHash |
| skipValidation | <code>boolean</code> |  |

<a name="ERC20_Outbound+buildRedeemScanOpts"></a>

### ERC20_Outbound.buildRedeemScanOpts(opts, skipValidation) ⇒ <code>Object</code>
Build redeem scan opts

**Kind**: instance method of [<code>ERC20\_Outbound</code>](#ERC20_Outbound)
**Returns**: <code>Object</code> - Call opts object

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Tx options |
| opts.redeemKey | <code>Object</code> | Redeem key pair |
| opts.redeemKey.xHash | <code>string</code> | Redeem key xHash |
| skipValidation | <code>boolean</code> |  |

<a name="ERC20_Outbound+buildApproveData"></a>

### ERC20_Outbound.buildApproveData(opts, skipValidation) ⇒ <code>string</code>
Get data hex string for approve call

**Kind**: instance method of [<code>ERC20\_Outbound</code>](#ERC20_Outbound)
**Returns**: <code>string</code> - Data hex string

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Tx options |
| opts.value | <code>string</code> \| <code>number</code> | Tx value |
| skipValidation | <code>boolean</code> |  |

<a name="ERC20_Outbound+buildLockData"></a>

### ERC20_Outbound.buildLockData(opts, skipValidation) ⇒ <code>string</code>
Get data hex string for lock call

**Kind**: instance method of [<code>ERC20\_Outbound</code>](#ERC20_Outbound)
**Returns**: <code>string</code> - Data hex string

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Tx options |
| opts.token | <code>Object</code> | Token addr pair |
| opts.token.eth | <code>string</code> | Token eth addr |
| opts.redeemKey | <code>Object</code> | Redeem key pair |
| opts.redeemKey.xHash | <code>string</code> | Redeem key xHash |
| opts.storeman | <code>Object</code> | Storeman addr pair |
| opts.storeman.wan | <code>string</code> | Storeman wan addr |
| opts.to | <code>string</code> | Destination address |
| opts.value | <code>string</code> \| <code>number</code> | Tx value |
| skipValidation | <code>boolean</code> |  |

<a name="ERC20_Outbound+buildRedeemData"></a>

### ERC20_Outbound.buildRedeemData(opts, skipValidation) ⇒ <code>string</code>
Get data hex string for redeem call

**Kind**: instance method of [<code>ERC20\_Outbound</code>](#ERC20_Outbound)
**Returns**: <code>string</code> - Data hex string

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Tx options |
| opts.token | <code>Object</code> | Token addr pair |
| opts.token.eth | <code>string</code> | Token eth addr |
| opts.redeemKey | <code>Object</code> | Redeem key pair |
| opts.redeemKey.x | <code>string</code> | Redeem key x |
| skipValidation | <code>boolean</code> |  |

<a name="ERC20_Outbound+buildRevokeData"></a>

### ERC20_Outbound.buildRevokeData(opts, skipValidation) ⇒ <code>string</code>
Get data hex string for revoke call

**Kind**: instance method of [<code>ERC20\_Outbound</code>](#ERC20_Outbound)
**Returns**: <code>string</code> - Data hex string

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Tx options |
| opts.token | <code>Object</code> | Token addr pair |
| opts.token.eth | <code>string</code> | Token eth addr |
| opts.redeemKey | <code>Object</code> | Redeem key pair |
| opts.redeemKey.xHash | <code>string</code> | Redeem key xHash |
| skipValidation | <code>boolean</code> |  |

<a name="ERC20_Outbound+buildOutboundFeeData"></a>

### ERC20_Outbound.buildOutboundFeeData(opts, skipValidation) ⇒ <code>string</code>
Get data hex string for outboundFee call

**Kind**: instance method of [<code>ERC20\_Outbound</code>](#ERC20_Outbound)
**Returns**: <code>string</code> - Data hex string

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Tx options |
| opts.token | <code>Object</code> | Token addr pair |
| opts.token.eth | <code>string</code> | Token eth addr |
| opts.storeman | <code>Object</code> | Storeman addr pair |
| opts.storeman.wan | <code>string</code> | Storeman wan addr |
| opts.value | <code>number</code> \| <code>string</code> | Tx value |
| skipValidation | <code>boolean</code> |  |
