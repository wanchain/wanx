## Classes

<dl>
<dt><a href="#BTC_Base">BTC_Base</a></dt>
<dd><p>Bitcoin Base</p>
</dd>
<dt><a href="#BTC_Inbound">BTC_Inbound</a> ⇐ <code><a href="#BTC_Base">BTC_Base</a></code></dt>
<dd><p>Bitcoin Inbound</p>
</dd>
<dt><a href="#BTC_Outbound">BTC_Outbound</a> ⇐ <code><a href="#BTC_Base">BTC_Base</a></code></dt>
<dd><p>Bitcoin Outbound</p>
</dd>
</dl>

<a name="BTC_Base"></a>

## BTC\_Base
Bitcoin Base

**Kind**: global class

* [BTC_Base](#BTC_Base)
    * [.storemanQuota(opts, skipValidation)](#BTC_Base+storemanQuota) ⇒ <code>Promise</code>
    * [.storemanInfo(opts, skipValidation)](#BTC_Base+storemanInfo) ⇒ <code>Promise</code>
    * [.buildStoremanQuotaTx(opts, skipValidation)](#BTC_Base+buildStoremanQuotaTx) ⇒ <code>Object</code>
    * [.buildStoremanInfoTx(opts, skipValidation)](#BTC_Base+buildStoremanInfoTx) ⇒ <code>Object</code>
    * [.buildStoremanQuotaData(opts, skipValidation)](#BTC_Base+buildStoremanQuotaData) ⇒ <code>string</code>
    * [.buildStoremanInfoData(opts, skipValidation)](#BTC_Base+buildStoremanInfoData) ⇒ <code>string</code>


* * *

<a name="BTC_Base+storemanQuota"></a>

### BTC_Base.storemanQuota(opts, skipValidation) ⇒ <code>Promise</code>
Make storeman quota call on Wanchain

**Kind**: instance method of [<code>BTC\_Base</code>](#BTC_Base)
**Returns**: <code>Promise</code> - Promise returning object

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Tx options |
| opts.storeman | <code>Object</code> | Storeman address pair |
| opts.storeman.wan | <code>string</code> | Storeman Wanchain address |
| skipValidation | <code>boolean</code> |  |


* * *

<a name="BTC_Base+storemanInfo"></a>

### BTC_Base.storemanInfo(opts, skipValidation) ⇒ <code>Promise</code>
Make storeman quota info on Wanchain

**Kind**: instance method of [<code>BTC\_Base</code>](#BTC_Base)
**Returns**: <code>Promise</code> - Promise returning object

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Tx options |
| opts.storeman | <code>Object</code> | Storeman address pair |
| opts.storeman.wan | <code>string</code> | Storeman Wanchain address |
| skipValidation | <code>boolean</code> |  |


* * *

<a name="BTC_Base+buildStoremanQuotaTx"></a>

### BTC_Base.buildStoremanQuotaTx(opts, skipValidation) ⇒ <code>Object</code>
Build storeman quota call

**Kind**: instance method of [<code>BTC\_Base</code>](#BTC_Base)
**Returns**: <code>Object</code> - Tx object

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Tx options |
| opts.storeman | <code>Object</code> | Storeman address pair |
| opts.storeman.wan | <code>string</code> | Storeman Wanchain address |
| skipValidation | <code>boolean</code> |  |


* * *

<a name="BTC_Base+buildStoremanInfoTx"></a>

### BTC_Base.buildStoremanInfoTx(opts, skipValidation) ⇒ <code>Object</code>
Build storeman info call

**Kind**: instance method of [<code>BTC\_Base</code>](#BTC_Base)
**Returns**: <code>Object</code> - Tx object

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Tx options |
| opts.storeman | <code>Object</code> | Storeman address pair |
| opts.storeman.wan | <code>string</code> | Storeman Wanchain address |
| skipValidation | <code>boolean</code> |  |


* * *

<a name="BTC_Base+buildStoremanQuotaData"></a>

### BTC_Base.buildStoremanQuotaData(opts, skipValidation) ⇒ <code>string</code>
Get data hex string for storeman quota call

**Kind**: instance method of [<code>BTC\_Base</code>](#BTC_Base)
**Returns**: <code>string</code> - Data hex string

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Data options |
| opts.storeman | <code>Object</code> | Storeman address pair |
| opts.storeman.wan | <code>string</code> | Storeman Wanchain address |
| skipValidation | <code>boolean</code> |  |


* * *

<a name="BTC_Base+buildStoremanInfoData"></a>

### BTC_Base.buildStoremanInfoData(opts, skipValidation) ⇒ <code>string</code>
Get data hex string for storeman info call

**Kind**: instance method of [<code>BTC\_Base</code>](#BTC_Base)
**Returns**: <code>string</code> - Data hex string

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Data options |
| opts.storeman | <code>Object</code> | Storeman address pair |
| opts.storeman.wan | <code>string</code> | Storeman Wanchain address |
| skipValidation | <code>boolean</code> |  |


* * *

<a name="BTC_Inbound"></a>

## BTC\_Inbound ⇐ [<code>BTC\_Base</code>](#BTC_Base)
Bitcoin Inbound

**Kind**: global class
**Extends**: [<code>BTC\_Base</code>](#BTC_Base)

* [BTC_Inbound](#BTC_Inbound) ⇐ [<code>BTC\_Base</code>](#BTC_Base)
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
    * [.storemanQuota(opts, skipValidation)](#BTC_Base+storemanQuota) ⇒ <code>Promise</code>
    * [.storemanInfo(opts, skipValidation)](#BTC_Base+storemanInfo) ⇒ <code>Promise</code>
    * [.buildStoremanQuotaTx(opts, skipValidation)](#BTC_Base+buildStoremanQuotaTx) ⇒ <code>Object</code>
    * [.buildStoremanInfoTx(opts, skipValidation)](#BTC_Base+buildStoremanInfoTx) ⇒ <code>Object</code>
    * [.buildStoremanQuotaData(opts, skipValidation)](#BTC_Base+buildStoremanQuotaData) ⇒ <code>string</code>
    * [.buildStoremanInfoData(opts, skipValidation)](#BTC_Base+buildStoremanInfoData) ⇒ <code>string</code>


* * *

<a name="BTC_Inbound+send"></a>

### BTC_Inbound.send(opts, skipValidation) ⇒ <code>Promise</code>
Complete crosschain transaction (lock + redeem); Assumes you have already
generated a new HTLC lock address with `buildHashTimeLockContract` and
have funded the address

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


* * *

<a name="BTC_Inbound+lock"></a>

### BTC_Inbound.lock(opts, skipValidation) ⇒ <code>Promise</code>
Lock transaction and confirmation; Assumes you have already generated a
new HTLC lock address with `buildHashTimeLockContract` and have funded the
address

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


* * *

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


* * *

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


* * *

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


* * *

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


* * *

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


* * *

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


* * *

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


* * *

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


* * *

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


* * *

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


* * *

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


* * *

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


* * *

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


* * *

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


* * *

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


* * *

<a name="BTC_Base+storemanQuota"></a>

### BTC_Inbound.storemanQuota(opts, skipValidation) ⇒ <code>Promise</code>
Make storeman quota call on Wanchain

**Kind**: instance method of [<code>BTC\_Inbound</code>](#BTC_Inbound)
**Returns**: <code>Promise</code> - Promise returning object

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Tx options |
| opts.storeman | <code>Object</code> | Storeman address pair |
| opts.storeman.wan | <code>string</code> | Storeman Wanchain address |
| skipValidation | <code>boolean</code> |  |


* * *

<a name="BTC_Base+storemanInfo"></a>

### BTC_Inbound.storemanInfo(opts, skipValidation) ⇒ <code>Promise</code>
Make storeman quota info on Wanchain

**Kind**: instance method of [<code>BTC\_Inbound</code>](#BTC_Inbound)
**Returns**: <code>Promise</code> - Promise returning object

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Tx options |
| opts.storeman | <code>Object</code> | Storeman address pair |
| opts.storeman.wan | <code>string</code> | Storeman Wanchain address |
| skipValidation | <code>boolean</code> |  |


* * *

<a name="BTC_Base+buildStoremanQuotaTx"></a>

### BTC_Inbound.buildStoremanQuotaTx(opts, skipValidation) ⇒ <code>Object</code>
Build storeman quota call

**Kind**: instance method of [<code>BTC\_Inbound</code>](#BTC_Inbound)
**Returns**: <code>Object</code> - Tx object

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Tx options |
| opts.storeman | <code>Object</code> | Storeman address pair |
| opts.storeman.wan | <code>string</code> | Storeman Wanchain address |
| skipValidation | <code>boolean</code> |  |


* * *

<a name="BTC_Base+buildStoremanInfoTx"></a>

### BTC_Inbound.buildStoremanInfoTx(opts, skipValidation) ⇒ <code>Object</code>
Build storeman info call

**Kind**: instance method of [<code>BTC\_Inbound</code>](#BTC_Inbound)
**Returns**: <code>Object</code> - Tx object

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Tx options |
| opts.storeman | <code>Object</code> | Storeman address pair |
| opts.storeman.wan | <code>string</code> | Storeman Wanchain address |
| skipValidation | <code>boolean</code> |  |


* * *

<a name="BTC_Base+buildStoremanQuotaData"></a>

### BTC_Inbound.buildStoremanQuotaData(opts, skipValidation) ⇒ <code>string</code>
Get data hex string for storeman quota call

**Kind**: instance method of [<code>BTC\_Inbound</code>](#BTC_Inbound)
**Returns**: <code>string</code> - Data hex string

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Data options |
| opts.storeman | <code>Object</code> | Storeman address pair |
| opts.storeman.wan | <code>string</code> | Storeman Wanchain address |
| skipValidation | <code>boolean</code> |  |


* * *

<a name="BTC_Base+buildStoremanInfoData"></a>

### BTC_Inbound.buildStoremanInfoData(opts, skipValidation) ⇒ <code>string</code>
Get data hex string for storeman info call

**Kind**: instance method of [<code>BTC\_Inbound</code>](#BTC_Inbound)
**Returns**: <code>string</code> - Data hex string

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Data options |
| opts.storeman | <code>Object</code> | Storeman address pair |
| opts.storeman.wan | <code>string</code> | Storeman Wanchain address |
| skipValidation | <code>boolean</code> |  |


* * *

<a name="BTC_Outbound"></a>

## BTC\_Outbound ⇐ [<code>BTC\_Base</code>](#BTC_Base)
Bitcoin Outbound

**Kind**: global class
**Extends**: [<code>BTC\_Base</code>](#BTC_Base)

* [BTC_Outbound](#BTC_Outbound) ⇐ [<code>BTC\_Base</code>](#BTC_Base)
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
    * [.storemanQuota(opts, skipValidation)](#BTC_Base+storemanQuota) ⇒ <code>Promise</code>
    * [.storemanInfo(opts, skipValidation)](#BTC_Base+storemanInfo) ⇒ <code>Promise</code>
    * [.buildStoremanQuotaTx(opts, skipValidation)](#BTC_Base+buildStoremanQuotaTx) ⇒ <code>Object</code>
    * [.buildStoremanInfoTx(opts, skipValidation)](#BTC_Base+buildStoremanInfoTx) ⇒ <code>Object</code>
    * [.buildStoremanQuotaData(opts, skipValidation)](#BTC_Base+buildStoremanQuotaData) ⇒ <code>string</code>
    * [.buildStoremanInfoData(opts, skipValidation)](#BTC_Base+buildStoremanInfoData) ⇒ <code>string</code>


* * *

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


* * *

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


* * *

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


* * *

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


* * *

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


* * *

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


* * *

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


* * *

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


* * *

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


* * *

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


* * *

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


* * *

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


* * *

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


* * *

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


* * *

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


* * *

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


* * *

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


* * *

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


* * *

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


* * *

<a name="BTC_Base+storemanQuota"></a>

### BTC_Outbound.storemanQuota(opts, skipValidation) ⇒ <code>Promise</code>
Make storeman quota call on Wanchain

**Kind**: instance method of [<code>BTC\_Outbound</code>](#BTC_Outbound)
**Returns**: <code>Promise</code> - Promise returning object

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Tx options |
| opts.storeman | <code>Object</code> | Storeman address pair |
| opts.storeman.wan | <code>string</code> | Storeman Wanchain address |
| skipValidation | <code>boolean</code> |  |


* * *

<a name="BTC_Base+storemanInfo"></a>

### BTC_Outbound.storemanInfo(opts, skipValidation) ⇒ <code>Promise</code>
Make storeman quota info on Wanchain

**Kind**: instance method of [<code>BTC\_Outbound</code>](#BTC_Outbound)
**Returns**: <code>Promise</code> - Promise returning object

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Tx options |
| opts.storeman | <code>Object</code> | Storeman address pair |
| opts.storeman.wan | <code>string</code> | Storeman Wanchain address |
| skipValidation | <code>boolean</code> |  |


* * *

<a name="BTC_Base+buildStoremanQuotaTx"></a>

### BTC_Outbound.buildStoremanQuotaTx(opts, skipValidation) ⇒ <code>Object</code>
Build storeman quota call

**Kind**: instance method of [<code>BTC\_Outbound</code>](#BTC_Outbound)
**Returns**: <code>Object</code> - Tx object

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Tx options |
| opts.storeman | <code>Object</code> | Storeman address pair |
| opts.storeman.wan | <code>string</code> | Storeman Wanchain address |
| skipValidation | <code>boolean</code> |  |


* * *

<a name="BTC_Base+buildStoremanInfoTx"></a>

### BTC_Outbound.buildStoremanInfoTx(opts, skipValidation) ⇒ <code>Object</code>
Build storeman info call

**Kind**: instance method of [<code>BTC\_Outbound</code>](#BTC_Outbound)
**Returns**: <code>Object</code> - Tx object

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Tx options |
| opts.storeman | <code>Object</code> | Storeman address pair |
| opts.storeman.wan | <code>string</code> | Storeman Wanchain address |
| skipValidation | <code>boolean</code> |  |


* * *

<a name="BTC_Base+buildStoremanQuotaData"></a>

### BTC_Outbound.buildStoremanQuotaData(opts, skipValidation) ⇒ <code>string</code>
Get data hex string for storeman quota call

**Kind**: instance method of [<code>BTC\_Outbound</code>](#BTC_Outbound)
**Returns**: <code>string</code> - Data hex string

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Data options |
| opts.storeman | <code>Object</code> | Storeman address pair |
| opts.storeman.wan | <code>string</code> | Storeman Wanchain address |
| skipValidation | <code>boolean</code> |  |


* * *

<a name="BTC_Base+buildStoremanInfoData"></a>

### BTC_Outbound.buildStoremanInfoData(opts, skipValidation) ⇒ <code>string</code>
Get data hex string for storeman info call

**Kind**: instance method of [<code>BTC\_Outbound</code>](#BTC_Outbound)
**Returns**: <code>string</code> - Data hex string

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Data options |
| opts.storeman | <code>Object</code> | Storeman address pair |
| opts.storeman.wan | <code>string</code> | Storeman Wanchain address |
| skipValidation | <code>boolean</code> |  |


* * *

