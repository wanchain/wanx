const bitcoin = require('bitcoinjs-lib');
const btcAddress = require('btc-address');
const binConv = require('binstring');
const crypto = require('crypto');
const keccak = require('keccak');
const secp256k1 = require('secp256k1');

const hex = require('../lib/hex');

module.exports = {
  addressToHash160,
  hash160ToAddress,

  sha256,
  hash256,
  keccak256,

  generateX,
};

function hash256(x) {
  const buff = Buffer.from(hex.stripPrefix(x), 'hex');
  return bitcoin.crypto.sha256(bitcoin.crypto.sha256(buff)).toString('hex');
}

// convert x to xHash
function sha256(x) {
  const buff = Buffer.from(hex.stripPrefix(x), 'hex');
  return bitcoin.crypto.sha256(buff).toString('hex');
}

function keccak256(x) {
  const buf = Buffer.from(x, 'hex');
  return keccak('keccak256').update(buf).digest().toString('hex')
}

function generateX() {
  let randomBuf;

  do {
    randomBuf = crypto.randomBytes(32);
  } while (!secp256k1.privateKeyVerify(randomBuf));

  return randomBuf.toString('hex');
}

function hash160ToAddress(hash160, addressType, network) {
  const opts = { in: 'hex', out: 'bytes' };
  const hash = hex.stripPrefix(hash160);
  const address = new btcAddress(binConv(hash, opts), addressType, network);

  return address.toString();
}

function addressToHash160(addr, addressType, network) {
  const address = new btcAddress(addr, addressType, network);
  return binConv(address.hash, { in: 'bytes', out: 'hex' });
}
