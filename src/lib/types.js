const BigNumber = require('bignumber.js');

const { stripHexPrefix } = require('./utils');

function addr2Bytes(addr) {
  const a = stripHexPrefix(addr) || '';
  return '0'.repeat(64 - a.length) + a.toLowerCase();
}

function number2Bytes(num) {
  const n = new BigNumber(num);
  const hex = n.toString(16);
  return '0'.repeat(64 - hex.length) + hex;
}

module.exports = {
  addr2Bytes,
  number2Bytes,
}
