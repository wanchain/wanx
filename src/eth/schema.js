const {
  hex,
  hash,
  hash160Address,
  value,
  redeemKeyAll,
  redeemKeyX,
  redeemKeyXHash,
  storemanEthWan,
  storemanWan,
} = require('../lib/schema/fields');

const InboundLockSchema = {
  type: 'object',
  required: [
    'from', 'to', 'value', 'storeman', 'redeemKey',
  ],
  properties: {
    from: hash160Address,
    to: hash160Address,
    value: value,
    storeman: storemanEthWan,
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

const InboundRevokeSchema = {
  type: 'object',
  required: [
    'from', 'redeemKey',
  ],
  properties: {
    from: hash160Address,
    redeemKey: redeemKeyXHash,
  },
};

const OutboundLockSchema = {
  type: 'object',
  required: [
    'from', 'to', 'value', 'storeman', 'redeemKey',
  ],
  properties: {
    from: hash160Address,
    to: hash160Address,
    value: value,
    storeman: storemanEthWan,
    redeemKey: redeemKeyAll,
  },
};

const OutboundLockWithFeeSchema = {
  type: 'object',
  required: [
    'from', 'to', 'value', 'fee', 'storeman', 'redeemKey',
  ],
  properties: {
    from: hash160Address,
    to: hash160Address,
    value: value,
    fee: value,
    storeman: storemanEthWan,
    redeemKey: redeemKeyAll,
  },
};

const OutboundRedeemSchema = {
  type: 'object',
  required: [
    'to', 'redeemKey',
  ],
  properties: {
    to: hash160Address,
    redeemKey: redeemKeyX,
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
    to: hash160Address,
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
  OutboundLockWithFeeSchema,
  OutboundRedeemSchema,
  OutboundRevokeSchema,
  OutboundFeeSchema,
  ScanOptsSchema,
};
