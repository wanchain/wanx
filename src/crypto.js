const bitcoin = require('bitcoinjs-lib');
const crypto = require('crypto');
const keccak = require('keccak');
const secp256k1 = require('secp256k1');

function getXHash(x) {
  // return bitcoin.crypto.sha256(Buffer.from(x, 'hex')).toString('hex');

  const buf = Buffer.from(x, 'hex');
  return keccak('keccak256').update(buf).digest().toString('hex')
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

module.exports = {
  getXHash,
  generateXPair,
}
