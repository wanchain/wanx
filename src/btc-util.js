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
  buildHashTimeLockContract,
  getXHash,
  generateXPair,
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
function buildHashTimeLockContract(network, hashx, redeemLockTimeStamp, destHash160Addr, revokerHash160Addr) {
  const bitcoinNetwork = bitcoin.networks[network];

  const redeemScript = bitcoin.script.compile([

    bitcoin.opcodes.OP_IF,
    bitcoin.opcodes.OP_SHA256,
    Buffer.from(hashx, 'hex'),
    bitcoin.opcodes.OP_EQUALVERIFY,
    bitcoin.opcodes.OP_DUP,
    bitcoin.opcodes.OP_HASH160,
    Buffer.from(wanutils.stripHexPrefix(destHash160Addr), 'hex'),

    bitcoin.opcodes.OP_ELSE,
    bitcoin.script.number.encode(redeemLockTimeStamp),
    bitcoin.opcodes.OP_CHECKLOCKTIMEVERIFY,
    bitcoin.opcodes.OP_DROP,
    bitcoin.opcodes.OP_DUP,
    bitcoin.opcodes.OP_HASH160,
    Buffer.from(wanutils.stripHexPrefix(revokerHash160Addr), 'hex'),
    bitcoin.opcodes.OP_ENDIF,

    bitcoin.opcodes.OP_EQUALVERIFY,
    bitcoin.opcodes.OP_CHECKSIG,
  ]);

  const addressPay = bitcoin.payments.p2sh({
    redeem: { output: redeemScript, network: bitcoinNetwork },
    network: bitcoinNetwork,
  });

  const { address } = addressPay;

  return { address, redeemScript, hashx, redeemLockTimeStamp };
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
