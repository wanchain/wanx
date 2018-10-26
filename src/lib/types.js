const BigNumber = require('bignumber.js');
const wanutils = require('wanchain-util');

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
}
