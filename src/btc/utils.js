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
  hashForRevokeSig

  buildRedeemTx,
  buildRedeemTxFromWif,
  buildRevokeTx,
  buildRevokeTxFromWif,

  getTransaction,
}

// generate the P2SH timelock contract
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
    contract: {
      address,
      redeemScript: redeemScript.toString('hex'),
    },
    params: {
      xHash,
      lockTime,
      redeemer: destH160Addr,
      revoker: revokerH160Addr,
    },
  };
}

function hashForRedeemSig(network, txid, address, value, redeemScript) {
  const tx = buildIncompleteRedeem(network, txid, address, value);
  const sigHash = tx.hashForSignature(
    0,
    new Buffer.from(redeemScript, 'hex'),
    bitcoin.Transaction.SIGHASH_ALL
  );

  return sigHash.toString('hex');
}

function hashForRevokeSig(network, txid, address, value, lockTime, redeemScript) {
  const tx = buildIncompleteRevoke(network, txid, address, value, lockTime);
  const sigHash = tx.hashForSignature(
    0,
    new Buffer.from(redeemScript, 'hex'),
    bitcoin.Transaction.SIGHASH_ALL
  );

  return sigHash.toString('hex');
}

function buildIncompleteRedeem(network, txid, address, value) {
  const bitcoinNetwork = bitcoin.networks[network];

  // NB: storemen address validation requires that vout is 0
  const vout = 0;

  const txb = new bitcoin.TransactionBuilder(bitcoinNetwork);

  txb.setVersion(1);
  txb.addInput(hex.stripPrefix(txid), vout);
  txb.addOutput(address, value);

  return txb.buildIncomplete();
}

function buildIncompleteRevoke(network, txid, address, value, lockTime) {
  const bitcoinNetwork = bitcoin.networks[network];

  // NB: storemen address validation requires that vout is 0
  const vout = 0;

  const txb = new bitcoin.TransactionBuilder(bitcoinNetwork);

  txb.setVersion(1);
  txb.setLockTime(lockTime);
  txb.addInput(hex.stripPrefix(txid), vout, 0);
  txb.addOutput(address, value);

  return txb.buildIncomplete();
}

// TODO: combine duplicate code in buildRedeemTx, buildRedeemTxFromWif,
// buildRevokeTx, and buildRevokeTxFromWif
//
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

  const tx = buildIncompleteRevoke(network, txid, address, value, lockTime);

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

        // if (! tx) return reject(new Error('transaction not found'));
        resolve(tx);
      });
    });
  });
}
