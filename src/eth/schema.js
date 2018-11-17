// FIELDS
const storemanAll = {
  type: 'object',
  required: ['wan', 'eth'],
  properties: {
    wan: { '$ref': 'defs.json#/definitions/hash160Address' },
    eth: { '$ref': 'defs.json#/definitions/hash160Address' },
  },
};

const storemanEth = {
  type: 'object',
  required: ['eth'],
  properties: {
    eth: { '$ref': 'defs.json#/definitions/hash160Address' },
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
const hash = { '$ref': 'defs.json#/definitions/hash' };
const hex = { '$ref': 'defs.json#/definitions/hex' };


const InboundLockSchema = {
  type: 'object',
  required: [
    'from', 'to', 'value', 'storeman', 'redeemKey',
  ],
  properties: {
    from: hash160,
    to: hash160,
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

const InboundRevokeSchema = {
  type: 'object',
  required: [
    'from', 'redeemKey',
  ],
  properties: {
    from: hash160,
    redeemKey: redeemKeyXHash,
  },
};

const OutboundLockSchema = {
  type: 'object',
  required: [
    'from', 'to', 'value', 'fee', 'storeman', 'redeemKey',
  ],
  properties: {
    from: hash160,
    to: hash160,
    value: value,
    fee: value,
    storeman: storemanAll,
    redeemKey: redeemKeyAll,
  },
};

const OutboundRedeemSchema = {
  type: 'object',
  required: [
    'to', 'redeemKey',
  ],
  properties: {
    to: hash160,
    redeemKey: redeemKeyX,
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
    to: hash160,
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

module.exports = {
  InboundLockSchema,
  InboundRedeemSchema,
  InboundRevokeSchema,
  OutboundLockSchema,
  OutboundRedeemSchema,
  OutboundRevokeSchema,
  OutboundFeeSchema,
  ScanOptsSchema,
};
