const bitcoin = require('bitcoinjs-lib');
const BigNumber = require('bignumber.js');
const crypto = require('crypto');
const keccak = require('keccak');
const secp256k1 = require('secp256k1');
const wanutils = require('wanchain-util');
const Web3 = require('web3');

const web3 = new Web3();

function validateSendOpts(type, opts) {
  // console.log(type, opts);

  // TODO: there should be an opt schema and this should check against it
  if (type === 'ETH') {
    if (! opts.value || opts.value <= 0) {
      throw new Error('Invalid tx value');
    }
  }

  return {
    source: opts.from,
    destination: opts.to,
    value: opts.value,
    storeman: opts.storeman,
  }
}

function validateRedeemOpts(type, opts) {
  // console.log(type, opts);

  // TODO: there should be an opt schema and this should check against it
  if (type === 'ETH') {
    if (! opts.redeemKey || ! opts.redeemKey.x || ! opts.redeemKey.xHash) {
      throw new Error('Invalid redeemKey');
    }
  }

  return {
    destination: opts.to,
    source: opts.from,
    storeman: opts.storeman,
    redeemKey: {
      x: opts.redeemKey.x,
      xHash: opts.redeemKey.xHash,
    },
  }
}

function validateRevokeOpts(type, opts) {
  // console.log(type, opts);

  // TODO: there should be an opt schema and this should check against it
  if (type === 'ETH') {
    if (! opts.xHash) {
      throw new Error('Invalid xHash');
    }
  }

  return {
    source: opts.from,
    xHash: opts.xHash,
  }
}

function getXHash(x) {
  // return bitcoin.crypto.sha256(Buffer.from(x, 'hex')).toString('hex');

  const buf = Buffer.from(x, 'hex');
  return keccak('keccak256').update(buf).digest().toString('hex')
}

function generateXHash() {
  let randomBuf;
  do {
    randomBuf = crypto.randomBytes(32);
  } while (!secp256k1.privateKeyVerify(randomBuf));

  const x = randomBuf.toString('hex');
  const xHash = getXHash(x);

  return { x, xHash };
}

function addr2Bytes(addr) {
  return '0'.repeat(24) + wanutils.stripHexPrefix(addr);
}

function number2Bytes(num) {
  const n = new BigNumber(num);
  const hex = n.toString(16);
  return '0'.repeat(64 - hex.length) + hex;
}

module.exports = {
  addr2Bytes,
  number2Bytes,
  getXHash,
  generateXHash,
  validateSendOpts,
  validateRedeemOpts,
  validateRevokeOpts,
}
