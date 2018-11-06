const BigNumber = require('bignumber.js');

module.exports = {
  isPrefixed,
  stripPrefix,
  ensurePrefix,

  fromNumber,
  fromString,
};

/**
 * Check if `String` starts with "0x"
 * @param {String} str
 * @return {Boolean}
 */
function isPrefixed(str) {
  return str.slice(0, 2) === '0x';
}

/**
 * Remove "0x" from a given `String`
 * @param {String} str
 * @return {String}
 */
function stripPrefix(str) {
  if (typeof str !== 'string') {
    return str;
  }

  return isPrefixed(str) ? str.slice(2) : str;
}

/**
 * Ensure `String` begins with "0x"
 * @param {String} str
 * @return {String}
 */
function ensurePrefix(str) {
  if (typeof str !== 'string') {
    return str;
  }

  return isPrefixed(str) ? str : `0x${str}`;
}

/**
 * Convert `Number` or numeric `String` to hex
 * @param {Number|String} num
 * @return {String}
 */
function fromNumber(num) {
  const n = new BigNumber(num);
  return '0x' + n.toString(16);
}

/**
 * Convert ascii `String` to hex
 * @param {String} str
 * @return {String}
 */
function fromString(str) {
  const bytes = [];

  for (let n = 0, l = str.length; n < l; n++) {
    const hex = Number(str.charCodeAt(n)).toString(16);
    bytes.push(hex);
  }

  return '0x' + bytes.join('');
}
