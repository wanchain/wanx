const BigNumber = require('bignumber.js');

const hex = require('./hex');

function addr2Bytes(addr) {
  const a = hex.stripPrefix(addr) || '';
  return '0'.repeat(64 - a.length) + a.toLowerCase();
}

function number2Bytes(num) {
  const n = new BigNumber(num);
  const str = n.toString(16);
  return '0'.repeat(64 - str.length) + str;
}

module.exports = {
  addr2Bytes,
  number2Bytes,
}
