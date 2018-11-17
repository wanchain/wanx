// FIELDS
const storemanAll = {
  type: 'object',
  required: ['wan', 'btc'],
  properties: {
    wan: { '$ref': 'defs.json#/definitions/hash160Address' },
    btc: { '$ref': 'defs.json#/definitions/hash160Address' },
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
const hash160 = { '$ref': 'defs.json#/definitions/hash160Address' };
const base58 = { '$ref': 'defs.json#/definitions/base58Address' };
const hash = { '$ref': 'defs.json#/definitions/hash' };
const hex = { '$ref': 'defs.json#/definitions/hex' };
const hexArray = { '$ref': 'defs.json#/definitions/hexArray' };

// WAN
//
const InboundLockSchema = {
  type: 'object',
  required: [
    'from', 'to', 'txid', 'lockTime', 'value', 'storeman', 'redeemKey',
  ],
  properties: {
    from: base58,
    to: hash160,
    txid: hash,
    lockTime: lockTime,
    value: value,
    storeman: storemanAll,
    redeemKey: redeemKeyAll,
  },
};

const InboundRedeemSchema = {
  type: 'object',
  required: [
    'to', 'redeemKey',
  ],
  properties: {
    to: hash160,
    redeemKey: redeemKeyX,
  },
};

const OutboundLockSchema = {
  type: 'object',
  required: [
    'from', 'to', 'value', 'fee', 'storeman', 'redeemKey',
  ],
  properties: {
    from: hash160,
    to: base58,
    value: value,
    fee: value,
    storeman: storemanAll,
    redeemKey: redeemKeyAll,
  },
};

const OutboundRevokeSchema = {
  type: 'object',
  required: [
    'from', 'redeemKey',
  ],
  properties: {
    from: hash160,
    redeemKey: redeemKeyXHash,
  },
};

const OutboundFeeSchema = {
  type: 'object',
  required: [
    'to', 'value', 'storeman',
  ],
  properties: {
    to: base58,
    value: value,
    storeman: storemanWan,
  },
};

const ScanOptsSchema = {
  type: 'object',
  required: ['redeemKey'],
  properties: {
    redeemKey: redeemKeyXHash,
  },
};

// BTC
//
const InboundHTLCSchema = {
  type: 'object',
  required: [
    'from', 'storeman', 'redeemKey', 'lockTime',
  ],
  properties: {
    from: base58,
    storeman: storemanBtc,
    redeemKey: redeemKeyXHash,
    lockTime: lockTime,
  },
};

const OutboundHTLCSchema = {
  type: 'object',
  required: [
    'to', 'storeman', 'redeemKey', 'lockTime',
  ],
  properties: {
    to: base58,
    storeman: storemanBtc,
    redeemKey: redeemKeyXHash,
    lockTime: lockTime,
  },
};

const HashForRevokeSchema = {
  type: 'object',
  required: [
    'txid', 'from', 'lockTime', 'value', 'redeemScript'
  ],
  properties: {
    txid: hash,
    from: base58,
    lockTime: lockTime,
    value: value,
    redeemKey: redeemKeyX,
  },
};

const HashForRedeemSchema = {
  type: 'object',
  required: [
    'txid', 'from', 'value', 'redeemScript'
  ],
  properties: {
    txid: hash,
    to: base58,
    value: value,
    redeemKey: redeemKeyX,
  },
};

const InboundRevokeSchema = {
  type: 'object',
  required: [
    'to', 'txid', 'value', 'redeemScript', 'redeemKey', 'lockTime', 'publicKey', 'sigHash'
  ],
  properties: {
    to: hash160,
    txid: hash,
    value: value,
    redeemScript: hex,
    redeemKey: redeemKeyX,
    lockTime: lockTime,
    publicKey: hex,
    sigHash: { instanceof: 'Buffer' },
  },
};

const InboundRevokeFromWifSchema = {
  type: 'object',
  required: [
    'to', 'txid', 'value', 'redeemScript', 'redeemKey', 'lockTime', 'wif'
  ],
  properties: {
    to: hash160,
    txid: hash,
    value: value,
    redeemScript: hex,
    redeemKey: redeemKeyX,
    lockTime: lockTime,
    wif: { type: 'string' },
  },
};

const OutboundRedeemSchema = {
  type: 'object',
  required: [
    'to', 'txid', 'value', 'redeemScript', 'redeemKey', 'lockTime', 'publicKey', 'sigHash'
  ],
  properties: {
    to: hash160,
    txid: hash,
    value: value,
    redeemScript: hex,
    redeemKey: redeemKeyX,
    lockTime: lockTime,
    publicKey: hex,
    sigHash: { instanceof: 'Buffer' },
  },
};

const OutboundRedeemFromWifSchema = {
  type: 'object',
  required: [
    'to', 'txid', 'value', 'redeemScript', 'redeemKey', 'lockTime', 'wif'
  ],
  properties: {
    to: hash160,
    txid: hash,
    value: value,
    redeemScript: hex,
    redeemKey: redeemKeyX,
    lockTime: lockTime,
    wif: { type: 'string' },
  },
};

module.exports = {
  HashForRevokeSchema,
  HashForRedeemSchema,

  InboundHTLCSchema,
  InboundLockSchema,
  InboundRedeemSchema,
  InboundRevokeSchema,
  InboundRevokeFromWifSchema,

  OutboundHTLCSchema,
  OutboundLockSchema,
  OutboundRedeemSchema,
  OutboundRedeemFromWifSchema,
  OutboundRevokeSchema,
  OutboundFeeSchema,
  ScanOptsSchema,
};
