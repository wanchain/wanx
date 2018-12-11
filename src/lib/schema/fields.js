const storemanEthWan = {
  type: 'object',
  required: ['wan', 'eth'],
  properties: {
    wan: { '$ref': 'defs.json#/definitions/hash160Address' },
    eth: { '$ref': 'defs.json#/definitions/hash160Address' },
  },
};

const storemanBtcWan = {
  type: 'object',
  required: ['wan', 'btc'],
  properties: {
    wan: { '$ref': 'defs.json#/definitions/hash160Address' },
    btc: { '$ref': 'defs.json#/definitions/hash160Address' },
  },
};

const storemanEth = {
  type: 'object',
  required: ['eth'],
  properties: {
    eth: { '$ref': 'defs.json#/definitions/hash160Address' },
  },
};

const storemanBtc = {
  type: 'object',
  required: ['btc'],
  properties: {
    btc: { '$ref': 'defs.json#/definitions/hash160Address' },
  },
};

const storemanWan = {
  type: 'object',
  required: ['wan'],
  properties: {
    wan: { '$ref': 'defs.json#/definitions/hash160Address' },
  },
};

const tokenEthWan = {
  type: 'object',
  required: ['wan', 'eth'],
  properties: {
    wan: { '$ref': 'defs.json#/definitions/hash160Address' },
    eth: { '$ref': 'defs.json#/definitions/hash160Address' },
  },
};

const tokenEth = {
  type: 'object',
  required: ['eth'],
  properties: {
    eth: { '$ref': 'defs.json#/definitions/hash160Address' },
  },
};

const tokenWan = {
  type: 'object',
  required: ['wan'],
  properties: {
    wan: { '$ref': 'defs.json#/definitions/hash160Address' },
  },
};

const tokenKey = {
  type: 'object',
  required: ['key'],
  properties: {
    key: { '$ref': 'defs.json#/definitions/hash' },
  },
};

const redeemKeyAll = {
  type: 'object',
  required: ['x', 'xHash'],
  properties: {
    x: { '$ref': 'defs.json#/definitions/hash' },
    xHash: { '$ref': 'defs.json#/definitions/hash' },
  },
};

const redeemKeyX = {
  type: 'object',
  required: ['x'],
  properties: {
    x: { '$ref': 'defs.json#/definitions/hash' },
  },
};

const redeemKeyXHash = {
  type: 'object',
  required: ['xHash'],
  properties: {
    xHash: { '$ref': 'defs.json#/definitions/hash' },
  },
};

const value = { type: 'string' };
const lockTime = { type: 'number' };

const hex = { '$ref': 'defs.json#/definitions/hex' };
const hash = { '$ref': 'defs.json#/definitions/hash' };
const hash160Address = { '$ref': 'defs.json#/definitions/hash160Address' };
const base58Address = { '$ref': 'defs.json#/definitions/base58Address' };
const bitcoinAddress = { '$ref': 'defs.json#/definitions/bitcoinAddress' };

module.exports = {
  storemanEthWan,
  storemanBtcWan,
  storemanEth,
  storemanBtc,
  storemanWan,

  tokenEthWan,
  tokenEth,
  tokenWan,
  tokenKey,

  redeemKeyAll,
  redeemKeyX,
  redeemKeyXHash,

  value,
  lockTime,

  hex,
  hash,
  hash160Address,
  base58Address,
  bitcoinAddress,
};
