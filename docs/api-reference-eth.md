## Classes

<dl>
<dt><a href="#ETH_Base">ETH_Base</a></dt>
<dd><p>Ethereum Base</p>
</dd>
<dt><a href="#ETH_Inbound">ETH_Inbound</a> ⇐ <code><a href="#ETH_Base">ETH_Base</a></code></dt>
<dd><p>Ethereum Inbound</p>
</dd>
<dt><a href="#ETH_Outbound">ETH_Outbound</a> ⇐ <code><a href="#ETH_Base">ETH_Base</a></code></dt>
<dd><p>Ethereum Outbound</p>
</dd>
</dl>

<a name="ETH_Base"></a>

## ETH\_Base
Ethereum Base

**Kind**: global class

* [ETH_Base](#ETH_Base)
    * [.storemanQuota(opts, skipValidation)](#ETH_Base+storemanQuota) ⇒ <code>Promise</code>
    * [.buildStoremanQuotaTx(opts, skipValidation)](#ETH_Base+buildStoremanQuotaTx) ⇒ <code>Object</code>
    * [.buildStoremanQuotaData(opts, skipValidation)](#ETH_Base+buildStoremanQuotaData) ⇒ <code>string</code>


* * *

<a name="ETH_Base+storemanQuota"></a>

### ETH_Base.storemanQuota(opts, skipValidation) ⇒ <code>Promise</code>
Make storeman quota call on Wanchain

**Kind**: instance method of [<code>ETH\_Base</code>](#ETH_Base)
**Returns**: <code>Promise</code> - Promise returning object

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Tx options |
| opts.storeman | <code>Object</code> | Storeman address pair |
| opts.storeman.wan | <code>string</code> | Storeman Wanchain address |
| skipValidation | <code>boolean</code> |  |


* * *

<a name="ETH_Base+buildStoremanQuotaTx"></a>

### ETH_Base.buildStoremanQuotaTx(opts, skipValidation) ⇒ <code>Object</code>
Build storeman quota call

**Kind**: instance method of [<code>ETH\_Base</code>](#ETH_Base)
**Returns**: <code>Object</code> - Tx object

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Tx options |
| opts.storeman | <code>Object</code> | Storeman address pair |
| opts.storeman.wan | <code>string</code> | Storeman Wanchain address |
| skipValidation | <code>boolean</code> |  |


* * *

<a name="ETH_Base+buildStoremanQuotaData"></a>

### ETH_Base.buildStoremanQuotaData(opts, skipValidation) ⇒ <code>string</code>
Get data hex string for storeman quota call

**Kind**: instance method of [<code>ETH\_Base</code>](#ETH_Base)
**Returns**: <code>string</code> - Data hex string

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Data options |
| opts.storeman | <code>Object</code> | Storeman address pair |
| opts.storeman.wan | <code>string</code> | Storeman Wanchain address |
| skipValidation | <code>boolean</code> |  |


* * *

<a name="ETH_Inbound"></a>

## ETH\_Inbound ⇐ [<code>ETH\_Base</code>](#ETH_Base)
Ethereum Inbound

**Kind**: global class
**Extends**: [<code>ETH\_Base</code>](#ETH_Base)

* [ETH_Inbound](#ETH_Inbound) ⇐ [<code>ETH\_Base</code>](#ETH_Base)
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
    * [.storemanQuota(opts, skipValidation)](#ETH_Base+storemanQuota) ⇒ <code>Promise</code>
    * [.buildStoremanQuotaTx(opts, skipValidation)](#ETH_Base+buildStoremanQuotaTx) ⇒ <code>Object</code>
    * [.buildStoremanQuotaData(opts, skipValidation)](#ETH_Base+buildStoremanQuotaData) ⇒ <code>string</code>


* * *

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


* * *

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


* * *

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


* * *

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


* * *

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


* * *

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


* * *

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


* * *

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


* * *

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


* * *

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


* * *

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


* * *

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


* * *

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


* * *

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


* * *

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


* * *

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


* * *

<a name="ETH_Base+storemanQuota"></a>

### ETH_Inbound.storemanQuota(opts, skipValidation) ⇒ <code>Promise</code>
Make storeman quota call on Wanchain

**Kind**: instance method of [<code>ETH\_Inbound</code>](#ETH_Inbound)
**Returns**: <code>Promise</code> - Promise returning object

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Tx options |
| opts.storeman | <code>Object</code> | Storeman address pair |
| opts.storeman.wan | <code>string</code> | Storeman Wanchain address |
| skipValidation | <code>boolean</code> |  |


* * *

<a name="ETH_Base+buildStoremanQuotaTx"></a>

### ETH_Inbound.buildStoremanQuotaTx(opts, skipValidation) ⇒ <code>Object</code>
Build storeman quota call

**Kind**: instance method of [<code>ETH\_Inbound</code>](#ETH_Inbound)
**Returns**: <code>Object</code> - Tx object

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Tx options |
| opts.storeman | <code>Object</code> | Storeman address pair |
| opts.storeman.wan | <code>string</code> | Storeman Wanchain address |
| skipValidation | <code>boolean</code> |  |


* * *

<a name="ETH_Base+buildStoremanQuotaData"></a>

### ETH_Inbound.buildStoremanQuotaData(opts, skipValidation) ⇒ <code>string</code>
Get data hex string for storeman quota call

**Kind**: instance method of [<code>ETH\_Inbound</code>](#ETH_Inbound)
**Returns**: <code>string</code> - Data hex string

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Data options |
| opts.storeman | <code>Object</code> | Storeman address pair |
| opts.storeman.wan | <code>string</code> | Storeman Wanchain address |
| skipValidation | <code>boolean</code> |  |


* * *

<a name="ETH_Outbound"></a>

## ETH\_Outbound ⇐ [<code>ETH\_Base</code>](#ETH_Base)
Ethereum Outbound

**Kind**: global class
**Extends**: [<code>ETH\_Base</code>](#ETH_Base)

* [ETH_Outbound](#ETH_Outbound) ⇐ [<code>ETH\_Base</code>](#ETH_Base)
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
    * [.storemanQuota(opts, skipValidation)](#ETH_Base+storemanQuota) ⇒ <code>Promise</code>
    * [.buildStoremanQuotaTx(opts, skipValidation)](#ETH_Base+buildStoremanQuotaTx) ⇒ <code>Object</code>
    * [.buildStoremanQuotaData(opts, skipValidation)](#ETH_Base+buildStoremanQuotaData) ⇒ <code>string</code>


* * *

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


* * *

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


* * *

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


* * *

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


* * *

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


* * *

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


* * *

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


* * *

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


* * *

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


* * *

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


* * *

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


* * *

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


* * *

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


* * *

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


* * *

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


* * *

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


* * *

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


* * *

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


* * *

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


* * *

<a name="ETH_Base+storemanQuota"></a>

### ETH_Outbound.storemanQuota(opts, skipValidation) ⇒ <code>Promise</code>
Make storeman quota call on Wanchain

**Kind**: instance method of [<code>ETH\_Outbound</code>](#ETH_Outbound)
**Returns**: <code>Promise</code> - Promise returning object

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Tx options |
| opts.storeman | <code>Object</code> | Storeman address pair |
| opts.storeman.wan | <code>string</code> | Storeman Wanchain address |
| skipValidation | <code>boolean</code> |  |


* * *

<a name="ETH_Base+buildStoremanQuotaTx"></a>

### ETH_Outbound.buildStoremanQuotaTx(opts, skipValidation) ⇒ <code>Object</code>
Build storeman quota call

**Kind**: instance method of [<code>ETH\_Outbound</code>](#ETH_Outbound)
**Returns**: <code>Object</code> - Tx object

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Tx options |
| opts.storeman | <code>Object</code> | Storeman address pair |
| opts.storeman.wan | <code>string</code> | Storeman Wanchain address |
| skipValidation | <code>boolean</code> |  |


* * *

<a name="ETH_Base+buildStoremanQuotaData"></a>

### ETH_Outbound.buildStoremanQuotaData(opts, skipValidation) ⇒ <code>string</code>
Get data hex string for storeman quota call

**Kind**: instance method of [<code>ETH\_Outbound</code>](#ETH_Outbound)
**Returns**: <code>string</code> - Data hex string

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Data options |
| opts.storeman | <code>Object</code> | Storeman address pair |
| opts.storeman.wan | <code>string</code> | Storeman Wanchain address |
| skipValidation | <code>boolean</code> |  |


* * *

