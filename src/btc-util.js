const bitcoin = require('bitcoinjs-lib');
const btcAddress = require('btc-address');
const binConv = require('binstring');
// const bitcoinRpc = require('node-bitcoin-rpc');
// const settings = require('./settings');
const crypto = require('crypto');
const secp256k1 = require('secp256k1');
const wanutils = require('wanchain-util');

// const btcNode = settings.btcNode;
// const btcNetwork = settings.btcNetwork;
// const bitcoinNetwork = bitcoin.networks[btcNetwork];

// bitcoinRpc.init(btcNode.host, btcNode.port, btcNode.user, btcNode.pass);

module.exports = {
  addressToHash160,
  hash160ToAddress,

  getXHash,
  generateXPair,

  buildHashTimeLockContract,
  buildRedeemTx,
  // getTransaction,
}

function hash160ToAddress(hash160, addressType, network) {
  const opts = { in: 'hex', out: 'bytes' };
  const hash = wanutils.stripHexPrefix(hash160);
  const address = new btcAddress(binConv(hash, opts), addressType, network);

  return address.toString();
}

function addressToHash160(addr, addressType, network) {
  const address = new btcAddress(addr, addressType, network);
  return binConv(address.hash, { in: 'bytes', out: 'hex' });
}

// convert x to xHash
function getXHash(x) {
  const buff = Buffer.from(wanutils.stripHexPrefix(x), 'hex');
  return bitcoin.crypto.sha256(buff).toString('hex');
}

function generateXPair() {
  let randomBuf;
  do {
    randomBuf = crypto.randomBytes(32);
  } while (!secp256k1.privateKeyVerify(randomBuf));

  const x = randomBuf.toString('hex');
  const xHash = getXHash(x);

  return { x, xHash };
}

// generate the P2SH timelock contract
function buildHashTimeLockContract(network, xHash, lockTimestamp, destH160Addr, revokerH160Addr) {
  const bitcoinNetwork = bitcoin.networks[network];

  const redeemScript = bitcoin.script.compile([

    bitcoin.opcodes.OP_IF,
    bitcoin.opcodes.OP_SHA256,
    Buffer.from(xHash, 'hex'),
    bitcoin.opcodes.OP_EQUALVERIFY,
    bitcoin.opcodes.OP_DUP,
    bitcoin.opcodes.OP_HASH160,
    Buffer.from(wanutils.stripHexPrefix(destH160Addr), 'hex'),

    bitcoin.opcodes.OP_ELSE,
    bitcoin.script.number.encode(lockTimestamp),
    bitcoin.opcodes.OP_CHECKLOCKTIMEVERIFY,
    bitcoin.opcodes.OP_DROP,
    bitcoin.opcodes.OP_DUP,
    bitcoin.opcodes.OP_HASH160,
    Buffer.from(wanutils.stripHexPrefix(revokerH160Addr), 'hex'),
    bitcoin.opcodes.OP_ENDIF,

    bitcoin.opcodes.OP_EQUALVERIFY,
    bitcoin.opcodes.OP_CHECKSIG,
  ]);

  const addressPay = bitcoin.payments.p2sh({
    redeem: { output: redeemScript, network: bitcoinNetwork },
    network: bitcoinNetwork,
  });

  const { address } = addressPay;

  return { address, redeemScript, xHash, lockTimestamp };
}

// TODO:
// derive receiverAddr from receiverWif
function buildRedeemTx(network, x, senderH160Addr, receiverAddr, receiverWif, lockTimestamp, txid, value, fee) {
  const bitcoinNetwork = bitcoin.networks[network];

  // FIXME: we should not assume that the input is in the first vout
  const vout = 0;

  // TODO: put the default fee in the config or something
  fee = fee ? fee : 0.00005;

  const xHash = getXHash(x);

  const receiverKeyPair = bitcoin.ECPair.fromWIF(receiverWif, bitcoinNetwork);
  const receiverH160Addr = bitcoin.crypto.hash160(receiverKeyPair.publicKey).toString('hex');
  const { redeemScript } = buildHashTimeLockContract(network, xHash, lockTimestamp, receiverH160Addr, senderH160Addr);

  const txb = new bitcoin.TransactionBuilder(bitcoinNetwork);

  txb.setVersion(1);
  txb.addInput(txid, 0);
  txb.addOutput(receiverAddr, (value - fee));

  const tx = txb.buildIncomplete();
  const sigHash = tx.hashForSignature(0, redeemScript, bitcoin.Transaction.SIGHASH_ALL);

  const redeemScriptSig = bitcoin.payments.p2sh({
    redeem: {
      input: bitcoin.script.compile([
        bitcoin.script.signature.encode(receiverKeyPair.sign(sigHash), bitcoin.Transaction.SIGHASH_ALL),
        receiverKeyPair.publicKey,
        Buffer.from(x, 'hex'),
        bitcoin.opcodes.OP_TRUE,
      ]),
      output: redeemScript,
    },
    network: bitcoinNetwork,
  }).input;

  tx.setInputScript(0, redeemScriptSig);

  return tx.toHex();
}

// function getTransaction(txHash) {
//   return new Promise((resolve, reject) => {
//     bitcoinRpc.call('getrawtransaction', [txHash, 1], (err, res) => {
//       if (err !== null) {
//         return reject(err);
//       }

//       // if tx found, return it
//       if (res && res.result) {
//         return resolve(res.result);
//       }

//       // otherwise, check the mempool
//       bitcoinRpc.call('getrawmempool', [], (err, res) => {
//         if (err !== null) {
//           return reject(err);
//         } else if (res.error !== null) {
//           return reject(res.error);
//         }

//         const transactions = res.result;

//         if (! Array.isArray(transactions)) {
//           return reject(new Error('mempool transactions is not an array'));
//         }

//         const tx = transactions.filter(t => t.txid === txHash).shift();

//         // if (! tx) return reject(new Error('transaction not found'));
//         resolve(tx);
//       });
//     });
//   });
// }
