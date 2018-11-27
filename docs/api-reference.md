## Classes

<dl>
<dt><a href="#ETH_Inbound">ETH_Inbound</a></dt>
<dd><p>Ethereum Inbound</p>
</dd>
<dt><a href="#ETH_Outbound">ETH_Outbound</a></dt>
<dd><p>Ethereum Outbound</p>
</dd>
<dt><a href="#ERC20_Inbound">ERC20_Inbound</a></dt>
<dd><p>ERC20 Inbound</p>
</dd>
<dt><a href="#ERC20_Outbound">ERC20_Outbound</a></dt>
<dd><p>ERC20 Outbound</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#buildHashTimeLockContract">buildHashTimeLockContract(network, xHash, destH160Addr, revokerH160Addr, lockTime)</a> ⇒ <code>Object</code></dt>
<dd><p>Generate P2SH timelock contract</p>
</dd>
<dt><a href="#hashForRedeemSig">hashForRedeemSig(network, txid, address, value, redeemScript)</a> ⇒ <code>string</code></dt>
<dd><p>Get the hash to be signed for a redeem transaction</p>
</dd>
<dt><a href="#hashForRevokeSig">hashForRevokeSig(network, txid, address, value, lockTime, redeemScript)</a> ⇒ <code>string</code></dt>
<dd><p>Get the hash to be signed for a revoke transaction</p>
</dd>
<dt><a href="#buildIncompleteRedeem">buildIncompleteRedeem(network, txid, address, value)</a> ⇒ <code>Object</code></dt>
<dd><p>Build incomplete redeem transaction</p>
</dd>
<dt><a href="#buildIncompleteRevoke">buildIncompleteRevoke(network, txid, address, value, lockTime)</a> ⇒ <code>Object</code></dt>
<dd><p>Build incomplete revoke transaction</p>
</dd>
<dt><a href="#buildRedeemTx">buildRedeemTx(network, txid, value, redeemScript, x, publicKey, signedSigHash, toAddress)</a> ⇒ <code>string</code></dt>
<dd><p>Create redeem transaction using signed sigHash</p>
</dd>
<dt><a href="#buildRedeemTxFromWif">buildRedeemTxFromWif(network, txid, value, redeemScript, x, wif, toAddress)</a> ⇒ <code>string</code></dt>
<dd><p>Create redeem transaction using WIF</p>
</dd>
<dt><a href="#buildRevokeTx">buildRevokeTx(network, txid, value, redeemScript, x, publicKey, signedSigHash, toAddress)</a> ⇒ <code>string</code></dt>
<dd><p>Create revoke transaction using signed sigHash</p>
</dd>
<dt><a href="#buildRevokeTxFromWif">buildRevokeTxFromWif(network, txid, value, redeemScript, x, wif, toAddress)</a> ⇒ <code>string</code></dt>
<dd><p>Create revoke transaction using WIF</p>
</dd>
<dt><a href="#getTransaction">getTransaction(txHash)</a> ⇒ <code>Promise</code></dt>
<dd><p>Get transaction from blockchain or mempool</p>
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

<a name="buildHashTimeLockContract"></a>

## buildHashTimeLockContract(network, xHash, destH160Addr, revokerH160Addr, lockTime) ⇒ <code>Object</code>
Generate P2SH timelock contract

**Kind**: global function
**Returns**: <code>Object</code> - Generated P2SH address and redeemScript

| Param | Type | Description |
| --- | --- | --- |
| network | <code>string</code> | Network name (mainnet, testnet) |
| xHash | <code>string</code> | The xHash string |
| destH160Addr | <code>string</code> | Hash160 of the receiver's bitcoin address |
| revokerH160Addr | <code>string</code> | Hash160 of the revoker's bitcoin address |
| lockTime | <code>number</code> | The timestamp when the revoker is allowed to spend |

<a name="hashForRedeemSig"></a>

## hashForRedeemSig(network, txid, address, value, redeemScript) ⇒ <code>string</code>
Get the hash to be signed for a redeem transaction

**Kind**: global function
**Returns**: <code>string</code> - Hash to be signed

| Param | Type | Description |
| --- | --- | --- |
| network | <code>string</code> | Network name (mainnet, testnet) |
| txid | <code>string</code> | The txid for the UTXO being spent |
| address | <code>string</code> | The address to receive funds |
| value | <code>string</code> \| <code>number</code> | The amount of funds to be sent (in Satoshis) |
| redeemScript | <code>string</code> | The redeemScript of the P2SH address |

<a name="hashForRevokeSig"></a>

## hashForRevokeSig(network, txid, address, value, lockTime, redeemScript) ⇒ <code>string</code>
Get the hash to be signed for a revoke transaction

**Kind**: global function
**Returns**: <code>string</code> - Hash to be signed

| Param | Type | Description |
| --- | --- | --- |
| network | <code>string</code> | Network name (mainnet, testnet) |
| txid | <code>string</code> | The txid for the UTXO being spent |
| address | <code>string</code> | The address to receive funds |
| value | <code>string</code> \| <code>number</code> | The amount of funds to be sent (in Satoshis) |
| lockTime | <code>number</code> | The lockTime of the P2SH address |
| redeemScript | <code>string</code> | The redeemScript of the P2SH address |

<a name="buildIncompleteRedeem"></a>

## buildIncompleteRedeem(network, txid, address, value) ⇒ <code>Object</code>
Build incomplete redeem transaction

**Kind**: global function
**Returns**: <code>Object</code> - Incomplete redeem transaction

| Param | Type | Description |
| --- | --- | --- |
| network | <code>string</code> | Network name (mainnet, testnet) |
| txid | <code>string</code> | The txid for the UTXO being spent |
| address | <code>string</code> | The address to receive funds |
| value | <code>string</code> \| <code>number</code> | The amount of funds to be sent (in Satoshis) |

<a name="buildIncompleteRevoke"></a>

## buildIncompleteRevoke(network, txid, address, value, lockTime) ⇒ <code>Object</code>
Build incomplete revoke transaction

**Kind**: global function
**Returns**: <code>Object</code> - Incomplete revoke transaction

| Param | Type | Description |
| --- | --- | --- |
| network | <code>string</code> | Network name (mainnet, testnet) |
| txid | <code>string</code> | The txid for the UTXO being spent |
| address | <code>string</code> | The address to receive funds |
| value | <code>string</code> \| <code>number</code> | The amount of funds to be sent (in Satoshis) |
| lockTime | <code>number</code> | The lockTime of the P2SH address |

<a name="buildRedeemTx"></a>

## buildRedeemTx(network, txid, value, redeemScript, x, publicKey, signedSigHash, toAddress) ⇒ <code>string</code>
Create redeem transaction using signed sigHash

**Kind**: global function
**Returns**: <code>string</code> - Signed transaction as hex string

| Param | Type | Description |
| --- | --- | --- |
| network | <code>string</code> | Network name (mainnet, testnet) |
| txid | <code>string</code> | The txid for the UTXO being spent |
| value | <code>string</code> \| <code>number</code> | The amount of funds to be sent (in Satoshis) |
| redeemScript | <code>string</code> | The redeemScript of the P2SH address |
| x | <code>string</code> | The x value for the transaction |
| publicKey | <code>string</code> | The publicKey of the redeemer |
| signedSigHash | <code>string</code> | The sigHash signed by the redeemer |
| toAddress | <code>string</code> | The address where to send funds (defaults to redeemer) |

<a name="buildRedeemTxFromWif"></a>

## buildRedeemTxFromWif(network, txid, value, redeemScript, x, wif, toAddress) ⇒ <code>string</code>
Create redeem transaction using WIF

**Kind**: global function
**Returns**: <code>string</code> - Signed transaction as hex string

| Param | Type | Description |
| --- | --- | --- |
| network | <code>string</code> | Network name (mainnet, testnet) |
| txid | <code>string</code> | The txid for the UTXO being spent |
| value | <code>string</code> \| <code>number</code> | The amount of funds to be sent (in Satoshis) |
| redeemScript | <code>string</code> | The redeemScript of the P2SH address |
| x | <code>string</code> | The x value for the transaction |
| wif | <code>string</code> | The redeemer's private key in WIF format |
| toAddress | <code>string</code> | The address where to send funds (defaults to redeemer) |

<a name="buildRevokeTx"></a>

## buildRevokeTx(network, txid, value, redeemScript, x, publicKey, signedSigHash, toAddress) ⇒ <code>string</code>
Create revoke transaction using signed sigHash

**Kind**: global function
**Returns**: <code>string</code> - Signed transaction as hex string

| Param | Type | Description |
| --- | --- | --- |
| network | <code>string</code> | Network name (mainnet, testnet) |
| txid | <code>string</code> | The txid for the UTXO being spent |
| value | <code>string</code> \| <code>number</code> | The amount of funds to be sent (in Satoshis) |
| redeemScript | <code>string</code> | The redeemScript of the P2SH address |
| x | <code>string</code> | The x value for the transaction |
| publicKey | <code>string</code> | The publicKey of the revoker |
| signedSigHash | <code>string</code> | The sigHash signed by the revoker |
| toAddress | <code>string</code> | The address where to send funds (defaults to revoker) |

<a name="buildRevokeTxFromWif"></a>

## buildRevokeTxFromWif(network, txid, value, redeemScript, x, wif, toAddress) ⇒ <code>string</code>
Create revoke transaction using WIF

**Kind**: global function
**Returns**: <code>string</code> - Signed transaction as hex string

| Param | Type | Description |
| --- | --- | --- |
| network | <code>string</code> | Network name (mainnet, testnet) |
| txid | <code>string</code> | The txid for the UTXO being spent |
| value | <code>string</code> \| <code>number</code> | The amount of funds to be sent (in Satoshis) |
| redeemScript | <code>string</code> | The redeemScript of the P2SH address |
| x | <code>string</code> | The x value for the transaction |
| wif | <code>string</code> | The revoker's private key in WIF format |
| toAddress | <code>string</code> | The address where to send funds (defaults to revoker) |

<a name="getTransaction"></a>

## getTransaction(txHash) ⇒ <code>Promise</code>
Get transaction from blockchain or mempool

**Kind**: global function
**Returns**: <code>Promise</code> - Promise object returning tx object

| Param | Type | Description |
| --- | --- | --- |
| txHash | <code>string</code> | The hash of the transaction |
