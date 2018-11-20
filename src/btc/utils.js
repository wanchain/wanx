const bitcoin = require('bitcoinjs-lib');
const crypto = require('crypto');
const secp256k1 = require('secp256k1');

const hex = require('../lib/hex');

// const bitcoinRpc = require('node-bitcoin-rpc');

// const btcNode = settings.btcNode;
// const btcNetwork = settings.btcNetwork;
// const bitcoinNetwork = bitcoin.networks[btcNetwork];

// bitcoinRpc.init(btcNode.host, btcNode.port, btcNode.user, btcNode.pass);

module.exports = {
  buildHashTimeLockContract,

  hashForRedeemSig,
  hashForRevokeSig,

  buildRedeemTx,
  buildRedeemTxFromWif,
  buildRevokeTx,
  buildRevokeTxFromWif,

  buildIncompleteRedeem,
  buildIncompleteRevoke,
  // getTransaction,
}

/**
 * Generate P2SH timelock contract
 * @param {string} network - Network name (mainnet, testnet)
 * @param {string} xHash - The xHash string
 * @param {string} destH160Addr - Hash160 of the receiver's bitcoin address
 * @param {string} revokerH160Addr - Hash160 of the revoker's bitcoin address
 * @param {number} lockTime - The timestamp when the revoker is allowed to spend
 * @returns {Object} Generated P2SH address and redeemScript
 */
function buildHashTimeLockContract(network, xHash, destH160Addr, revokerH160Addr, lockTime) {
  const bitcoinNetwork = bitcoin.networks[network];

  const redeemScript = bitcoin.script.compile([
    bitcoin.opcodes.OP_IF,
    bitcoin.opcodes.OP_SHA256,
    Buffer.from(xHash, 'hex'),
    bitcoin.opcodes.OP_EQUALVERIFY,
    bitcoin.opcodes.OP_DUP,
    bitcoin.opcodes.OP_HASH160,
    Buffer.from(hex.stripPrefix(destH160Addr), 'hex'),

    bitcoin.opcodes.OP_ELSE,
    bitcoin.script.number.encode(lockTime),
    bitcoin.opcodes.OP_CHECKLOCKTIMEVERIFY,
    bitcoin.opcodes.OP_DROP,
    bitcoin.opcodes.OP_DUP,
    bitcoin.opcodes.OP_HASH160,
    Buffer.from(hex.stripPrefix(revokerH160Addr), 'hex'),
    bitcoin.opcodes.OP_ENDIF,

    bitcoin.opcodes.OP_EQUALVERIFY,
    bitcoin.opcodes.OP_CHECKSIG,
  ]);

  const addressPay = bitcoin.payments.p2sh({
    redeem: { output: redeemScript, network: bitcoinNetwork },
    network: bitcoinNetwork,
  });

  const { address } = addressPay;

  return {
    // contract
    address,
    redeemScript: redeemScript.toString('hex'),

    // params
    xHash,
    lockTime,
    redeemer: hex.ensurePrefix(destH160Addr),
    revoker: hex.ensurePrefix(revokerH160Addr),
  };
}

/**
 * Get the hash to be signed for a redeem transaction
 * @param {string} network - Network name (mainnet, testnet)
 * @param {string} txid - The txid for the UTXO being spent
 * @param {string} address - The address to receive funds
 * @param {string|number} value - The amount of funds to be sent (in Satoshis)
 * @param {string} redeemScript - The redeemScript of the P2SH address
 * @returns {string} Hash to be signed
 */
function hashForRedeemSig(network, txid, address, value, redeemScript) {
  const tx = buildIncompleteRedeem(network, txid, address, value);
  const sigHash = tx.hashForSignature(
    0,
    new Buffer.from(redeemScript, 'hex'),
    bitcoin.Transaction.SIGHASH_ALL
  );

  return sigHash.toString('hex');
}

/**
 * Get the hash to be signed for a revoke transaction
 * @param {string} network - Network name (mainnet, testnet)
 * @param {string} txid - The txid for the UTXO being spent
 * @param {string} address - The address to receive funds
 * @param {string|number} value - The amount of funds to be sent (in Satoshis)
 * @param {number} lockTime - The lockTime of the P2SH address
 * @param {string} redeemScript - The redeemScript of the P2SH address
 * @returns {string} Hash to be signed
 */
function hashForRevokeSig(network, txid, address, value, lockTime, redeemScript) {
  const tx = buildIncompleteRevoke(network, txid, address, value, lockTime);
  const sigHash = tx.hashForSignature(
    0,
    new Buffer.from(redeemScript, 'hex'),
    bitcoin.Transaction.SIGHASH_ALL
  );

  return sigHash.toString('hex');
}

/**
 * Build incomplete redeem transaction
 * @param {string} network - Network name (mainnet, testnet)
 * @param {string} txid - The txid for the UTXO being spent
 * @param {string} address - The address to receive funds
 * @param {string|number} value - The amount of funds to be sent (in Satoshis)
 * @returns {Object} Incomplete redeem transaction
 */
function buildIncompleteRedeem(network, txid, address, value) {
  const bitcoinNetwork = bitcoin.networks[network];

  // NB: storemen address validation requires that vout is 0
  const vout = 0;

  const txb = new bitcoin.TransactionBuilder(bitcoinNetwork);

  txb.setVersion(1);
  txb.addInput(hex.stripPrefix(txid), vout);
  txb.addOutput(address, parseInt(value));

  return txb.buildIncomplete();
}

/**
 * Build incomplete revoke transaction
 * @param {string} network - Network name (mainnet, testnet)
 * @param {string} txid - The txid for the UTXO being spent
 * @param {string} address - The address to receive funds
 * @param {string|number} value - The amount of funds to be sent (in Satoshis)
 * @param {number} lockTime - The lockTime of the P2SH address
 * @returns {Object} Incomplete revoke transaction
 */
function buildIncompleteRevoke(network, txid, address, value, lockTime) {
  const bitcoinNetwork = bitcoin.networks[network];

  // NB: storemen address validation requires that vout is 0
  const vout = 0;

  const txb = new bitcoin.TransactionBuilder(bitcoinNetwork);

  txb.setVersion(1);
  txb.setLockTime(lockTime);
  txb.addInput(hex.stripPrefix(txid), vout, 0);
  txb.addOutput(address, parseInt(value));

  return txb.buildIncomplete();
}

/**
 * Create redeem transaction using signed sigHash
 * @param {string} network - Network name (mainnet, testnet)
 * @param {string} txid - The txid for the UTXO being spent
 * @param {string|number} value - The amount of funds to be sent (in Satoshis)
 * @param {string} redeemScript - The redeemScript of the P2SH address
 * @param {string} x - The x value for the transaction
 * @param {string} publicKey - The publicKey of the redeemer
 * @param {string} signedSigHash - The sigHash signed by the redeemer
 * @param {string} toAddress - The address where to send funds (defaults to redeemer)
 * @returns {string} Signed transaction as hex string
 */
function buildRedeemTx(network, txid, value, redeemScript, x, publicKey, signedSigHash, toAddress = '') {
  const bitcoinNetwork = bitcoin.networks[network];

  // if toAddress is not supplied, derive it from the publicKey
  if (! toAddress) {

    const { address } = bitcoin.payments.p2pkh({
      network: bitcoinNetwork,
      pubkey: Buffer.from(publicKey, 'hex'),
    });

    toAddress = address;
  }

  const tx = buildIncompleteRedeem(network, txid, toAddress, value);

  const signature = bitcoin.script.signature.encode(
    new Buffer.from(signedSigHash, 'base64'),
    bitcoin.Transaction.SIGHASH_ALL
  );

  const scriptSig = bitcoin.payments.p2sh({
    redeem: {
      input: bitcoin.script.compile([
        signature,
        Buffer.from(publicKey, 'hex'),
        Buffer.from(x, 'hex'),
        bitcoin.opcodes.OP_TRUE,
      ]),
      output: new Buffer.from(redeemScript, 'hex'),
    },
    network: bitcoinNetwork,
  }).input;

  tx.setInputScript(0, scriptSig);

  return tx.toHex();
}

/**
 * Create redeem transaction using WIF
 * @param {string} network - Network name (mainnet, testnet)
 * @param {string} txid - The txid for the UTXO being spent
 * @param {string|number} value - The amount of funds to be sent (in Satoshis)
 * @param {string} redeemScript - The redeemScript of the P2SH address
 * @param {string} x - The x value for the transaction
 * @param {string} wif - The redeemer's private key in WIF format
 * @param {string} toAddress - The address where to send funds (defaults to redeemer)
 * @returns {string} Signed transaction as hex string
 */
function buildRedeemTxFromWif(network, txid, value, redeemScript, x, wif, toAddress = '') {
  const bitcoinNetwork = bitcoin.networks[network];

  // NB: storemen address validation requires that vout is 0
  const vout = 0;

  const keyPair = bitcoin.ECPair.fromWIF(wif, bitcoinNetwork);

  // if toAddress is not supplied, derive it from the publicKey
  if (! toAddress) {

    const { address } = bitcoin.payments.p2pkh({
      network: bitcoinNetwork,
      pubkey: keyPair.publicKey,
    });

    toAddress = address;
  }

  const tx = buildIncompleteRedeem(network, txid, toAddress, value);

  const sigHash = tx.hashForSignature(
    0,
    new Buffer.from(redeemScript, 'hex'),
    bitcoin.Transaction.SIGHASH_ALL
  );

  const signedSigHash = keyPair.sign(sigHash);

  const signature = bitcoin.script.signature.encode(
    signedSigHash,
    bitcoin.Transaction.SIGHASH_ALL
  );

  const scriptSig = bitcoin.payments.p2sh({
    redeem: {
      input: bitcoin.script.compile([
        signature,
        keyPair.publicKey,
        Buffer.from(x, 'hex'),
        bitcoin.opcodes.OP_TRUE,
      ]),
      output: new Buffer.from(redeemScript, 'hex'),
    },
    network: bitcoinNetwork,
  }).input;

  tx.setInputScript(0, scriptSig);

  return tx.toHex();
}

/**
 * Create revoke transaction using signed sigHash
 * @param {string} network - Network name (mainnet, testnet)
 * @param {string} txid - The txid for the UTXO being spent
 * @param {string|number} value - The amount of funds to be sent (in Satoshis)
 * @param {string} redeemScript - The redeemScript of the P2SH address
 * @param {string} x - The x value for the transaction
 * @param {string} publicKey - The publicKey of the revoker
 * @param {string} signedSigHash - The sigHash signed by the revoker
 * @param {string} toAddress - The address where to send funds (defaults to revoker)
 * @returns {string} Signed transaction as hex string
 */
function buildRevokeTx(network, txid, value, redeemScript, x, lockTime, publicKey, signedSigHash, toAddress = '') {
  const bitcoinNetwork = bitcoin.networks[network];

  // if toAddress is not supplied, derive it from the publicKey
  if (! toAddress) {

    const { address } = bitcoin.payments.p2pkh({
      network: bitcoinNetwork,
      pubkey: Buffer.from(publicKey, 'hex'),
    });

    toAddress = address;
  }

  const tx = buildIncompleteRevoke(network, txid, toAddress, value, lockTime);

  const signature = bitcoin.script.signature.encode(
    new Buffer.from(signedSigHash, 'base64'),
    bitcoin.Transaction.SIGHASH_ALL
  );

  const scriptSig = bitcoin.payments.p2sh({
    redeem: {
      input: bitcoin.script.compile([
        signature,
        Buffer.from(publicKey, 'hex'),
        bitcoin.opcodes.OP_FALSE,
      ]),
      output: new Buffer.from(redeemScript, 'hex'),
    },
    network: bitcoinNetwork,
  }).input;

  tx.setInputScript(0, scriptSig);

  return tx.toHex();
}

/**
 * Create revoke transaction using WIF
 * @param {string} network - Network name (mainnet, testnet)
 * @param {string} txid - The txid for the UTXO being spent
 * @param {string|number} value - The amount of funds to be sent (in Satoshis)
 * @param {string} redeemScript - The redeemScript of the P2SH address
 * @param {string} x - The x value for the transaction
 * @param {string} wif - The revoker's private key in WIF format
 * @param {string} toAddress - The address where to send funds (defaults to revoker)
 * @returns {string} Signed transaction as hex string
 */
function buildRevokeTxFromWif(network, txid, value, redeemScript, x, lockTime, wif, toAddress = '') {
  const bitcoinNetwork = bitcoin.networks[network];

  const keyPair = bitcoin.ECPair.fromWIF(wif, bitcoinNetwork);

  // if toAddress is not supplied, derive it from the publicKey
  if (! toAddress) {

    const { address } = bitcoin.payments.p2pkh({
      network: bitcoinNetwork,
      pubkey: keyPair.publicKey,
    });

    toAddress = address;
  }

  const tx = buildIncompleteRevoke(network, txid, toAddress, value, lockTime);

  const sigHash = tx.hashForSignature(
    0,
    new Buffer.from(redeemScript, 'hex'),
    bitcoin.Transaction.SIGHASH_ALL
  );

  const signedSigHash = keyPair.sign(sigHash);

  const signature = bitcoin.script.signature.encode(
    signedSigHash,
    bitcoin.Transaction.SIGHASH_ALL
  );

  const scriptSig = bitcoin.payments.p2sh({
    redeem: {
      input: bitcoin.script.compile([
        signature,
        keyPair.publicKey,
        bitcoin.opcodes.OP_FALSE,
      ]),
      output: new Buffer.from(redeemScript, 'hex'),
    },
    network: bitcoinNetwork,
  }).input;

  tx.setInputScript(0, scriptSig);

  return tx.toHex();
}

/**
 * Get transaction from blockchain or mempool
 * @param {string} txHash - The hash of the transaction
 * @returns {Promise} Promise object returning tx object
 */
function getTransaction(txHash) {
  return new Promise((resolve, reject) => {
    bitcoinRpc.call('getrawtransaction', [txHash, 1], (err, res) => {
      if (err !== null) {
        return reject(err);
      }

      // if tx found, return it
      if (res && res.result) {
        return resolve(res.result);
      }

      // otherwise, check the mempool
      bitcoinRpc.call('getrawmempool', [], (err, res) => {
        if (err !== null) {
          return reject(err);
        } else if (res.error !== null) {
          return reject(res.error);
        }

        const transactions = res.result;

        if (! Array.isArray(transactions)) {
          return reject(new Error('mempool transactions is not an array'));
        }

        const tx = transactions.filter(t => t.txid === txHash).shift();

        resolve(tx);
      });
    });
  });
}
