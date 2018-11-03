module.exports = {
  isHexPrefixed,
  stripHexPrefix,
};

// from wanchain/wanchain-util

/**
 * Returns a `Boolean` on whether or not the a `String` starts with "0x"
 * @param {String} str
 * @return {Boolean}
 */
function isHexPrefixed(str) {
  return str.slice(0, 2) === '0x';
}

/**
 * Removes "0x" from a given `String`
 * @param {String} str
 * @return {String}
 */
function stripHexPrefix(str) {
  if (typeof str !== 'string') {
    return str;
  }

  return isHexPrefixed(str) ? str.slice(2) : str;
}
