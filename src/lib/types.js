const BigNumber = require('bignumber.js');

const hex = require('./hex');

function hex2Bytes32(str) {
  const h = hex.stripPrefix(str) || '';
  return '0'.repeat(64 - h.length) + h.toLowerCase();
}

function num2Bytes32(num) {
  const n = new BigNumber(num);
  const str = n.toString(16);
  return '0'.repeat(64 - str.length) + str;
}

module.exports = {
  hex2Bytes32,
  num2Bytes32,
}
