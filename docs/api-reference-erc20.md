## Classes

<dl>
<dt><a href="#ERC20_Base">ERC20_Base</a></dt>
<dd><p>ERC20 Base</p>
</dd>
<dt><a href="#ERC20_Inbound">ERC20_Inbound</a> ⇐ <code><a href="#ERC20_Base">ERC20_Base</a></code></dt>
<dd><p>ERC20 Inbound</p>
</dd>
<dt><a href="#ERC20_Outbound">ERC20_Outbound</a> ⇐ <code><a href="#ERC20_Base">ERC20_Base</a></code></dt>
<dd><p>ERC20 Outbound</p>
</dd>
</dl>

<a name="ERC20_Base"></a>

## ERC20\_Base
ERC20 Base

**Kind**: global class

* [ERC20_Base](#ERC20_Base)
    * [.storemanQuota(opts, skipValidation)](#ERC20_Base+storemanQuota) ⇒ <code>Promise</code>
    * [.storemanInfo(opts, skipValidation)](#ERC20_Base+storemanInfo) ⇒ <code>Promise</code>
    * [.tokenInfo(opts, skipValidation)](#ERC20_Base+tokenInfo) ⇒ <code>Promise</code>
    * [.buildStoremanQuotaTx(opts, skipValidation)](#ERC20_Base+buildStoremanQuotaTx) ⇒ <code>Object</code>
    * [.buildTokenKeyTx(opts, skipValidation)](#ERC20_Base+buildTokenKeyTx) ⇒ <code>Object</code>
    * [.buildTokenInfoTx(opts, skipValidation)](#ERC20_Base+buildTokenInfoTx) ⇒ <code>Object</code>
    * [.buildStoremanInfoTx(opts, skipValidation)](#ERC20_Base+buildStoremanInfoTx) ⇒ <code>Object</code>
    * [.buildStoremanQuotaData(opts, skipValidation)](#ERC20_Base+buildStoremanQuotaData) ⇒ <code>string</code>
    * [.buildTokenInfoData(opts, skipValidation)](#ERC20_Base+buildTokenInfoData) ⇒ <code>string</code>
    * [.buildTokenKeyData(opts, skipValidation)](#ERC20_Base+buildTokenKeyData) ⇒ <code>string</code>
    * [.buildStoremanInfoData(opts, skipValidation)](#ERC20_Base+buildStoremanInfoData) ⇒ <code>string</code>


* * *

<a name="ERC20_Base+storemanQuota"></a>

### ERC20_Base.storemanQuota(opts, skipValidation) ⇒ <code>Promise</code>
Make storeman quota call on Wanchain

**Kind**: instance method of [<code>ERC20\_Base</code>](#ERC20_Base)
**Returns**: <code>Promise</code> - Promise returning object

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Tx options |
| opts.storeman | <code>Object</code> | Storeman address pair |
| opts.storeman.wan | <code>string</code> | Storeman Wanchain address |
| opts.token | <code>Object</code> | Token pair |
| opts.token.eth | <code>string</code> | Token address on Ethereum |
| skipValidation | <code>boolean</code> |  |


* * *

<a name="ERC20_Base+storemanInfo"></a>

### ERC20_Base.storemanInfo(opts, skipValidation) ⇒ <code>Promise</code>
Make storeman info call on Wanchain

**Kind**: instance method of [<code>ERC20\_Base</code>](#ERC20_Base)
**Returns**: <code>Promise</code> - Promise returning object

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Tx options |
| opts.storeman | <code>Object</code> | Storeman address pair |
| opts.storeman.wan | <code>string</code> | Storeman Wanchain address |
| opts.token | <code>Object</code> | Token pair |
| opts.token.eth | <code>string</code> | Token address on Ethereum |
| skipValidation | <code>boolean</code> |  |


* * *

<a name="ERC20_Base+tokenInfo"></a>

### ERC20_Base.tokenInfo(opts, skipValidation) ⇒ <code>Promise</code>
Make token info call on Wanchain

**Kind**: instance method of [<code>ERC20\_Base</code>](#ERC20_Base)
**Returns**: <code>Promise</code> - Promise returning object

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Tx options |
| opts.token | <code>Object</code> | Token pair |
| opts.token.eth | <code>string</code> | Token address on Ethereum |
| skipValidation | <code>boolean</code> |  |


* * *

<a name="ERC20_Base+buildStoremanQuotaTx"></a>

### ERC20_Base.buildStoremanQuotaTx(opts, skipValidation) ⇒ <code>Object</code>
Build storeman quota call

**Kind**: instance method of [<code>ERC20\_Base</code>](#ERC20_Base)
**Returns**: <code>Object</code> - Tx object

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Tx options |
| opts.storeman | <code>Object</code> | Storeman address pair |
| opts.storeman.wan | <code>string</code> | Storeman Wanchain address |
| opts.token | <code>Object</code> | Token pair |
| opts.token.eth | <code>string</code> | Token address on Ethereum |
| skipValidation | <code>boolean</code> |  |


* * *

<a name="ERC20_Base+buildTokenKeyTx"></a>

### ERC20_Base.buildTokenKeyTx(opts, skipValidation) ⇒ <code>Object</code>
Build token manager mapKey call

**Kind**: instance method of [<code>ERC20\_Base</code>](#ERC20_Base)
**Returns**: <code>Object</code> - Tx object

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Tx options |
| opts.token | <code>Object</code> | Token pair |
| opts.token.eth | <code>string</code> | Token address on Ethereum |
| skipValidation | <code>boolean</code> |  |


* * *

<a name="ERC20_Base+buildTokenInfoTx"></a>

### ERC20_Base.buildTokenInfoTx(opts, skipValidation) ⇒ <code>Object</code>
Build token manager mapTokenInfo call

**Kind**: instance method of [<code>ERC20\_Base</code>](#ERC20_Base)
**Returns**: <code>Object</code> - Tx object

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Tx options |
| opts.token | <code>Object</code> | Token info |
| opts.token.key | <code>string</code> | Token key |
| skipValidation | <code>boolean</code> |  |


* * *

<a name="ERC20_Base+buildStoremanInfoTx"></a>

### ERC20_Base.buildStoremanInfoTx(opts, skipValidation) ⇒ <code>Object</code>
Build storeman group admin mapStoremanGroup call

**Kind**: instance method of [<code>ERC20\_Base</code>](#ERC20_Base)
**Returns**: <code>Object</code> - Tx object

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Tx options |
| opts.storeman | <code>Object</code> | Storeman address pair |
| opts.storeman.wan | <code>string</code> | Storeman Wanchain address |
| opts.token | <code>Object</code> | Token info |
| opts.token.eth | <code>string</code> | Token address on Ethereum |
| skipValidation | <code>boolean</code> |  |


* * *

<a name="ERC20_Base+buildStoremanQuotaData"></a>

### ERC20_Base.buildStoremanQuotaData(opts, skipValidation) ⇒ <code>string</code>
Get data hex string for storeman quota call

**Kind**: instance method of [<code>ERC20\_Base</code>](#ERC20_Base)
**Returns**: <code>string</code> - Data hex string

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Data options |
| opts.storeman | <code>Object</code> | Storeman address pair |
| opts.storeman.wan | <code>string</code> | Storeman Wanchain address |
| opts.token | <code>Object</code> | Token pair |
| opts.token.eth | <code>string</code> | Token address on Ethereum |
| skipValidation | <code>boolean</code> |  |


* * *

<a name="ERC20_Base+buildTokenInfoData"></a>

### ERC20_Base.buildTokenInfoData(opts, skipValidation) ⇒ <code>string</code>
Get data hex string for token mapTokenInfo call

**Kind**: instance method of [<code>ERC20\_Base</code>](#ERC20_Base)
**Returns**: <code>string</code> - Data hex string

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Data options |
| opts.token | <code>Object</code> | Token info |
| opts.token.key | <code>string</code> | Token key |
| skipValidation | <code>boolean</code> |  |


* * *

<a name="ERC20_Base+buildTokenKeyData"></a>

### ERC20_Base.buildTokenKeyData(opts, skipValidation) ⇒ <code>string</code>
Get data hex string for token mapKey call

**Kind**: instance method of [<code>ERC20\_Base</code>](#ERC20_Base)
**Returns**: <code>string</code> - Data hex string

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Data options |
| opts.token | <code>Object</code> | Token pair |
| opts.token.eth | <code>string</code> | Token address on Ethereum |
| skipValidation | <code>boolean</code> |  |


* * *

<a name="ERC20_Base+buildStoremanInfoData"></a>

### ERC20_Base.buildStoremanInfoData(opts, skipValidation) ⇒ <code>string</code>
Get data hex string for storeman mapStoremanGroup call

**Kind**: instance method of [<code>ERC20\_Base</code>](#ERC20_Base)
**Returns**: <code>string</code> - Data hex string

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Data options |
| opts.storeman | <code>Object</code> | Storeman address pair |
| opts.storeman.wan | <code>string</code> | Storeman Wanchain address |
| opts.token | <code>Object</code> | Token pair |
| opts.token.eth | <code>string</code> | Token address on Ethereum |
| skipValidation | <code>boolean</code> |  |


* * *

<a name="ERC20_Inbound"></a>

## ERC20\_Inbound ⇐ [<code>ERC20\_Base</code>](#ERC20_Base)
ERC20 Inbound

**Kind**: global class
**Extends**: [<code>ERC20\_Base</code>](#ERC20_Base)

* [ERC20_Inbound](#ERC20_Inbound) ⇐ [<code>ERC20\_Base</code>](#ERC20_Base)
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
    * [.storemanQuota(opts, skipValidation)](#ERC20_Base+storemanQuota) ⇒ <code>Promise</code>
    * [.storemanInfo(opts, skipValidation)](#ERC20_Base+storemanInfo) ⇒ <code>Promise</code>
    * [.tokenInfo(opts, skipValidation)](#ERC20_Base+tokenInfo) ⇒ <code>Promise</code>
    * [.buildStoremanQuotaTx(opts, skipValidation)](#ERC20_Base+buildStoremanQuotaTx) ⇒ <code>Object</code>
    * [.buildTokenKeyTx(opts, skipValidation)](#ERC20_Base+buildTokenKeyTx) ⇒ <code>Object</code>
    * [.buildTokenInfoTx(opts, skipValidation)](#ERC20_Base+buildTokenInfoTx) ⇒ <code>Object</code>
    * [.buildStoremanInfoTx(opts, skipValidation)](#ERC20_Base+buildStoremanInfoTx) ⇒ <code>Object</code>
    * [.buildStoremanQuotaData(opts, skipValidation)](#ERC20_Base+buildStoremanQuotaData) ⇒ <code>string</code>
    * [.buildTokenInfoData(opts, skipValidation)](#ERC20_Base+buildTokenInfoData) ⇒ <code>string</code>
    * [.buildTokenKeyData(opts, skipValidation)](#ERC20_Base+buildTokenKeyData) ⇒ <code>string</code>
    * [.buildStoremanInfoData(opts, skipValidation)](#ERC20_Base+buildStoremanInfoData) ⇒ <code>string</code>


* * *

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


* * *

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


* * *

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


* * *

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


* * *

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


* * *

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


* * *

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


* * *

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


* * *

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


* * *

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


* * *

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


* * *

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


* * *

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


* * *

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


* * *

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


* * *

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


* * *

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


* * *

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


* * *

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


* * *

<a name="ERC20_Base+storemanQuota"></a>

### ERC20_Inbound.storemanQuota(opts, skipValidation) ⇒ <code>Promise</code>
Make storeman quota call on Wanchain

**Kind**: instance method of [<code>ERC20\_Inbound</code>](#ERC20_Inbound)
**Returns**: <code>Promise</code> - Promise returning object

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Tx options |
| opts.storeman | <code>Object</code> | Storeman address pair |
| opts.storeman.wan | <code>string</code> | Storeman Wanchain address |
| opts.token | <code>Object</code> | Token pair |
| opts.token.eth | <code>string</code> | Token address on Ethereum |
| skipValidation | <code>boolean</code> |  |


* * *

<a name="ERC20_Base+storemanInfo"></a>

### ERC20_Inbound.storemanInfo(opts, skipValidation) ⇒ <code>Promise</code>
Make storeman info call on Wanchain

**Kind**: instance method of [<code>ERC20\_Inbound</code>](#ERC20_Inbound)
**Returns**: <code>Promise</code> - Promise returning object

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Tx options |
| opts.storeman | <code>Object</code> | Storeman address pair |
| opts.storeman.wan | <code>string</code> | Storeman Wanchain address |
| opts.token | <code>Object</code> | Token pair |
| opts.token.eth | <code>string</code> | Token address on Ethereum |
| skipValidation | <code>boolean</code> |  |


* * *

<a name="ERC20_Base+tokenInfo"></a>

### ERC20_Inbound.tokenInfo(opts, skipValidation) ⇒ <code>Promise</code>
Make token info call on Wanchain

**Kind**: instance method of [<code>ERC20\_Inbound</code>](#ERC20_Inbound)
**Returns**: <code>Promise</code> - Promise returning object

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Tx options |
| opts.token | <code>Object</code> | Token pair |
| opts.token.eth | <code>string</code> | Token address on Ethereum |
| skipValidation | <code>boolean</code> |  |


* * *

<a name="ERC20_Base+buildStoremanQuotaTx"></a>

### ERC20_Inbound.buildStoremanQuotaTx(opts, skipValidation) ⇒ <code>Object</code>
Build storeman quota call

**Kind**: instance method of [<code>ERC20\_Inbound</code>](#ERC20_Inbound)
**Returns**: <code>Object</code> - Tx object

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Tx options |
| opts.storeman | <code>Object</code> | Storeman address pair |
| opts.storeman.wan | <code>string</code> | Storeman Wanchain address |
| opts.token | <code>Object</code> | Token pair |
| opts.token.eth | <code>string</code> | Token address on Ethereum |
| skipValidation | <code>boolean</code> |  |


* * *

<a name="ERC20_Base+buildTokenKeyTx"></a>

### ERC20_Inbound.buildTokenKeyTx(opts, skipValidation) ⇒ <code>Object</code>
Build token manager mapKey call

**Kind**: instance method of [<code>ERC20\_Inbound</code>](#ERC20_Inbound)
**Returns**: <code>Object</code> - Tx object

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Tx options |
| opts.token | <code>Object</code> | Token pair |
| opts.token.eth | <code>string</code> | Token address on Ethereum |
| skipValidation | <code>boolean</code> |  |


* * *

<a name="ERC20_Base+buildTokenInfoTx"></a>

### ERC20_Inbound.buildTokenInfoTx(opts, skipValidation) ⇒ <code>Object</code>
Build token manager mapTokenInfo call

**Kind**: instance method of [<code>ERC20\_Inbound</code>](#ERC20_Inbound)
**Returns**: <code>Object</code> - Tx object

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Tx options |
| opts.token | <code>Object</code> | Token info |
| opts.token.key | <code>string</code> | Token key |
| skipValidation | <code>boolean</code> |  |


* * *

<a name="ERC20_Base+buildStoremanInfoTx"></a>

### ERC20_Inbound.buildStoremanInfoTx(opts, skipValidation) ⇒ <code>Object</code>
Build storeman group admin mapStoremanGroup call

**Kind**: instance method of [<code>ERC20\_Inbound</code>](#ERC20_Inbound)
**Returns**: <code>Object</code> - Tx object

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Tx options |
| opts.storeman | <code>Object</code> | Storeman address pair |
| opts.storeman.wan | <code>string</code> | Storeman Wanchain address |
| opts.token | <code>Object</code> | Token info |
| opts.token.eth | <code>string</code> | Token address on Ethereum |
| skipValidation | <code>boolean</code> |  |


* * *

<a name="ERC20_Base+buildStoremanQuotaData"></a>

### ERC20_Inbound.buildStoremanQuotaData(opts, skipValidation) ⇒ <code>string</code>
Get data hex string for storeman quota call

**Kind**: instance method of [<code>ERC20\_Inbound</code>](#ERC20_Inbound)
**Returns**: <code>string</code> - Data hex string

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Data options |
| opts.storeman | <code>Object</code> | Storeman address pair |
| opts.storeman.wan | <code>string</code> | Storeman Wanchain address |
| opts.token | <code>Object</code> | Token pair |
| opts.token.eth | <code>string</code> | Token address on Ethereum |
| skipValidation | <code>boolean</code> |  |


* * *

<a name="ERC20_Base+buildTokenInfoData"></a>

### ERC20_Inbound.buildTokenInfoData(opts, skipValidation) ⇒ <code>string</code>
Get data hex string for token mapTokenInfo call

**Kind**: instance method of [<code>ERC20\_Inbound</code>](#ERC20_Inbound)
**Returns**: <code>string</code> - Data hex string

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Data options |
| opts.token | <code>Object</code> | Token info |
| opts.token.key | <code>string</code> | Token key |
| skipValidation | <code>boolean</code> |  |


* * *

<a name="ERC20_Base+buildTokenKeyData"></a>

### ERC20_Inbound.buildTokenKeyData(opts, skipValidation) ⇒ <code>string</code>
Get data hex string for token mapKey call

**Kind**: instance method of [<code>ERC20\_Inbound</code>](#ERC20_Inbound)
**Returns**: <code>string</code> - Data hex string

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Data options |
| opts.token | <code>Object</code> | Token pair |
| opts.token.eth | <code>string</code> | Token address on Ethereum |
| skipValidation | <code>boolean</code> |  |


* * *

<a name="ERC20_Base+buildStoremanInfoData"></a>

### ERC20_Inbound.buildStoremanInfoData(opts, skipValidation) ⇒ <code>string</code>
Get data hex string for storeman mapStoremanGroup call

**Kind**: instance method of [<code>ERC20\_Inbound</code>](#ERC20_Inbound)
**Returns**: <code>string</code> - Data hex string

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Data options |
| opts.storeman | <code>Object</code> | Storeman address pair |
| opts.storeman.wan | <code>string</code> | Storeman Wanchain address |
| opts.token | <code>Object</code> | Token pair |
| opts.token.eth | <code>string</code> | Token address on Ethereum |
| skipValidation | <code>boolean</code> |  |


* * *

<a name="ERC20_Outbound"></a>

## ERC20\_Outbound ⇐ [<code>ERC20\_Base</code>](#ERC20_Base)
ERC20 Outbound

**Kind**: global class
**Extends**: [<code>ERC20\_Base</code>](#ERC20_Base)

* [ERC20_Outbound](#ERC20_Outbound) ⇐ [<code>ERC20\_Base</code>](#ERC20_Base)
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
    * [.storemanQuota(opts, skipValidation)](#ERC20_Base+storemanQuota) ⇒ <code>Promise</code>
    * [.storemanInfo(opts, skipValidation)](#ERC20_Base+storemanInfo) ⇒ <code>Promise</code>
    * [.tokenInfo(opts, skipValidation)](#ERC20_Base+tokenInfo) ⇒ <code>Promise</code>
    * [.buildStoremanQuotaTx(opts, skipValidation)](#ERC20_Base+buildStoremanQuotaTx) ⇒ <code>Object</code>
    * [.buildTokenKeyTx(opts, skipValidation)](#ERC20_Base+buildTokenKeyTx) ⇒ <code>Object</code>
    * [.buildTokenInfoTx(opts, skipValidation)](#ERC20_Base+buildTokenInfoTx) ⇒ <code>Object</code>
    * [.buildStoremanInfoTx(opts, skipValidation)](#ERC20_Base+buildStoremanInfoTx) ⇒ <code>Object</code>
    * [.buildStoremanQuotaData(opts, skipValidation)](#ERC20_Base+buildStoremanQuotaData) ⇒ <code>string</code>
    * [.buildTokenInfoData(opts, skipValidation)](#ERC20_Base+buildTokenInfoData) ⇒ <code>string</code>
    * [.buildTokenKeyData(opts, skipValidation)](#ERC20_Base+buildTokenKeyData) ⇒ <code>string</code>
    * [.buildStoremanInfoData(opts, skipValidation)](#ERC20_Base+buildStoremanInfoData) ⇒ <code>string</code>


* * *

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


* * *

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


* * *

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


* * *

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


* * *

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


* * *

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


* * *

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


* * *

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


* * *

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


* * *

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


* * *

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


* * *

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


* * *

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


* * *

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


* * *

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


* * *

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


* * *

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


* * *

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


* * *

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


* * *

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


* * *

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


* * *

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


* * *

<a name="ERC20_Base+storemanQuota"></a>

### ERC20_Outbound.storemanQuota(opts, skipValidation) ⇒ <code>Promise</code>
Make storeman quota call on Wanchain

**Kind**: instance method of [<code>ERC20\_Outbound</code>](#ERC20_Outbound)
**Returns**: <code>Promise</code> - Promise returning object

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Tx options |
| opts.storeman | <code>Object</code> | Storeman address pair |
| opts.storeman.wan | <code>string</code> | Storeman Wanchain address |
| opts.token | <code>Object</code> | Token pair |
| opts.token.eth | <code>string</code> | Token address on Ethereum |
| skipValidation | <code>boolean</code> |  |


* * *

<a name="ERC20_Base+storemanInfo"></a>

### ERC20_Outbound.storemanInfo(opts, skipValidation) ⇒ <code>Promise</code>
Make storeman info call on Wanchain

**Kind**: instance method of [<code>ERC20\_Outbound</code>](#ERC20_Outbound)
**Returns**: <code>Promise</code> - Promise returning object

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Tx options |
| opts.storeman | <code>Object</code> | Storeman address pair |
| opts.storeman.wan | <code>string</code> | Storeman Wanchain address |
| opts.token | <code>Object</code> | Token pair |
| opts.token.eth | <code>string</code> | Token address on Ethereum |
| skipValidation | <code>boolean</code> |  |


* * *

<a name="ERC20_Base+tokenInfo"></a>

### ERC20_Outbound.tokenInfo(opts, skipValidation) ⇒ <code>Promise</code>
Make token info call on Wanchain

**Kind**: instance method of [<code>ERC20\_Outbound</code>](#ERC20_Outbound)
**Returns**: <code>Promise</code> - Promise returning object

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Tx options |
| opts.token | <code>Object</code> | Token pair |
| opts.token.eth | <code>string</code> | Token address on Ethereum |
| skipValidation | <code>boolean</code> |  |


* * *

<a name="ERC20_Base+buildStoremanQuotaTx"></a>

### ERC20_Outbound.buildStoremanQuotaTx(opts, skipValidation) ⇒ <code>Object</code>
Build storeman quota call

**Kind**: instance method of [<code>ERC20\_Outbound</code>](#ERC20_Outbound)
**Returns**: <code>Object</code> - Tx object

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Tx options |
| opts.storeman | <code>Object</code> | Storeman address pair |
| opts.storeman.wan | <code>string</code> | Storeman Wanchain address |
| opts.token | <code>Object</code> | Token pair |
| opts.token.eth | <code>string</code> | Token address on Ethereum |
| skipValidation | <code>boolean</code> |  |


* * *

<a name="ERC20_Base+buildTokenKeyTx"></a>

### ERC20_Outbound.buildTokenKeyTx(opts, skipValidation) ⇒ <code>Object</code>
Build token manager mapKey call

**Kind**: instance method of [<code>ERC20\_Outbound</code>](#ERC20_Outbound)
**Returns**: <code>Object</code> - Tx object

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Tx options |
| opts.token | <code>Object</code> | Token pair |
| opts.token.eth | <code>string</code> | Token address on Ethereum |
| skipValidation | <code>boolean</code> |  |


* * *

<a name="ERC20_Base+buildTokenInfoTx"></a>

### ERC20_Outbound.buildTokenInfoTx(opts, skipValidation) ⇒ <code>Object</code>
Build token manager mapTokenInfo call

**Kind**: instance method of [<code>ERC20\_Outbound</code>](#ERC20_Outbound)
**Returns**: <code>Object</code> - Tx object

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Tx options |
| opts.token | <code>Object</code> | Token info |
| opts.token.key | <code>string</code> | Token key |
| skipValidation | <code>boolean</code> |  |


* * *

<a name="ERC20_Base+buildStoremanInfoTx"></a>

### ERC20_Outbound.buildStoremanInfoTx(opts, skipValidation) ⇒ <code>Object</code>
Build storeman group admin mapStoremanGroup call

**Kind**: instance method of [<code>ERC20\_Outbound</code>](#ERC20_Outbound)
**Returns**: <code>Object</code> - Tx object

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Tx options |
| opts.storeman | <code>Object</code> | Storeman address pair |
| opts.storeman.wan | <code>string</code> | Storeman Wanchain address |
| opts.token | <code>Object</code> | Token info |
| opts.token.eth | <code>string</code> | Token address on Ethereum |
| skipValidation | <code>boolean</code> |  |


* * *

<a name="ERC20_Base+buildStoremanQuotaData"></a>

### ERC20_Outbound.buildStoremanQuotaData(opts, skipValidation) ⇒ <code>string</code>
Get data hex string for storeman quota call

**Kind**: instance method of [<code>ERC20\_Outbound</code>](#ERC20_Outbound)
**Returns**: <code>string</code> - Data hex string

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Data options |
| opts.storeman | <code>Object</code> | Storeman address pair |
| opts.storeman.wan | <code>string</code> | Storeman Wanchain address |
| opts.token | <code>Object</code> | Token pair |
| opts.token.eth | <code>string</code> | Token address on Ethereum |
| skipValidation | <code>boolean</code> |  |


* * *

<a name="ERC20_Base+buildTokenInfoData"></a>

### ERC20_Outbound.buildTokenInfoData(opts, skipValidation) ⇒ <code>string</code>
Get data hex string for token mapTokenInfo call

**Kind**: instance method of [<code>ERC20\_Outbound</code>](#ERC20_Outbound)
**Returns**: <code>string</code> - Data hex string

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Data options |
| opts.token | <code>Object</code> | Token info |
| opts.token.key | <code>string</code> | Token key |
| skipValidation | <code>boolean</code> |  |


* * *

<a name="ERC20_Base+buildTokenKeyData"></a>

### ERC20_Outbound.buildTokenKeyData(opts, skipValidation) ⇒ <code>string</code>
Get data hex string for token mapKey call

**Kind**: instance method of [<code>ERC20\_Outbound</code>](#ERC20_Outbound)
**Returns**: <code>string</code> - Data hex string

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Data options |
| opts.token | <code>Object</code> | Token pair |
| opts.token.eth | <code>string</code> | Token address on Ethereum |
| skipValidation | <code>boolean</code> |  |


* * *

<a name="ERC20_Base+buildStoremanInfoData"></a>

### ERC20_Outbound.buildStoremanInfoData(opts, skipValidation) ⇒ <code>string</code>
Get data hex string for storeman mapStoremanGroup call

**Kind**: instance method of [<code>ERC20\_Outbound</code>](#ERC20_Outbound)
**Returns**: <code>string</code> - Data hex string

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Data options |
| opts.storeman | <code>Object</code> | Storeman address pair |
| opts.storeman.wan | <code>string</code> | Storeman Wanchain address |
| opts.token | <code>Object</code> | Token pair |
| opts.token.eth | <code>string</code> | Token address on Ethereum |
| skipValidation | <code>boolean</code> |  |


* * *

