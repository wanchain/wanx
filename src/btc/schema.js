const {
  hex,
  hash,
  hash160Address,
  base58Address,
  value,
  lockTime,
  redeemKeyAll,
  redeemKeyX,
  redeemKeyXHash,
  storemanBtcWan,
  storemanBtc,
  storemanWan,
} = require('../lib/schema/fields');


// WAN
//
const InboundLockSchema = {
  type: 'object',
  required: [
    'from', 'to', 'txid', 'lockTime', 'value', 'storeman', 'redeemKey',
  ],
  properties: {
    from: base58Address,
    to: hash160Address,
    txid: hash,
    lockTime: lockTime,
    value: value,
    storeman: storemanBtcWan,
    redeemKey: redeemKeyAll,
  },
};

const InboundRedeemSchema = {
  type: 'object',
  required: [
    'to', 'redeemKey',
  ],
  properties: {
    to: hash160Address,
    redeemKey: redeemKeyX,
  },
};

const OutboundLockSchema = {
  type: 'object',
  required: [
    'from', 'to', 'value', 'fee', 'storeman', 'redeemKey',
  ],
  properties: {
    from: hash160Address,
    to: base58Address,
    value: value,
    fee: value,
    storeman: storemanBtcWan,
    redeemKey: redeemKeyAll,
  },
};

const OutboundRevokeSchema = {
  type: 'object',
  required: [
    'from', 'redeemKey',
  ],
  properties: {
    from: hash160Address,
    redeemKey: redeemKeyXHash,
  },
};

const OutboundFeeSchema = {
  type: 'object',
  required: [
    'to', 'value', 'storeman',
  ],
  properties: {
    to: base58Address,
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
    from: base58Address,
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
    to: base58Address,
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
    from: base58Address,
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
    to: base58Address,
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
    to: hash160Address,
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
    to: hash160Address,
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
    to: hash160Address,
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
    to: hash160Address,
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
