const {
  hex,
  hash,
  hash160Address,
  value,
  redeemKeyAll,
  redeemKeyX,
  redeemKeyXHash,
  storemanEthWan,
  storemanEth,
  storemanWan,
  tokenEthWan,
  tokenEth,
  tokenWan,
} = require('../lib/schema/fields');

const InboundApproveSchema = {
  type: 'object',
  required: [
    'token', 'from', 'value',
  ],
  properties: {
    token: tokenEth,
    from: hash160Address,
    value: value,
  },
};

const InboundLockSchema = {
  type: 'object',
  required: [
    'token', 'from', 'to', 'value', 'storeman', 'redeemKey',
  ],
  properties: {
    token: tokenEth,
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
    'token', 'to', 'redeemKey',
  ],
  properties: {
    token: tokenEth,
    to: hash160Address,
    redeemKey: redeemKeyX,
  },
};

const InboundRevokeSchema = {
  type: 'object',
  required: [
    'token', 'from', 'redeemKey',
  ],
  properties: {
    token: tokenEth,
    from: hash160Address,
    redeemKey: redeemKeyXHash,
  },
};

const OutboundApproveSchema = {
  type: 'object',
  required: [
    'token', 'from', 'value',
  ],
  properties: {
    token: tokenWan,
    from: hash160Address,
    value: value,
  },
};

const OutboundLockSchema = {
  type: 'object',
  required: [
    'token', 'from', 'to', 'value', 'storeman', 'redeemKey',
  ],
  properties: {
    token: tokenEthWan,
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
    'token', 'from', 'to', 'value', 'outboundFee', 'storeman', 'redeemKey',
  ],
  properties: {
    token: tokenEthWan,
    from: hash160Address,
    to: hash160Address,
    value: value,
    outboundFee: value,
    storeman: storemanEthWan,
    redeemKey: redeemKeyAll,
  },
};

const OutboundRedeemSchema = {
  type: 'object',
  required: [
    'token', 'to', 'redeemKey',
  ],
  properties: {
    token: tokenEth,
    to: hash160Address,
    redeemKey: redeemKeyX,
  },
};

const OutboundRevokeSchema = {
  type: 'object',
  required: [
    'token', 'from', 'redeemKey',
  ],
  properties: {
    token: tokenEth,
    from: hash160Address,
    redeemKey: redeemKeyXHash,
  },
};

const OutboundFeeSchema = {
  type: 'object',
  required: [
    'token', 'to', 'value', 'storeman',
  ],
  properties: {
    token: tokenEthWan,
    to: hash160Address,
    value: value,
    storeman: storemanWan,
  },
};

const ApproveDataSchema = {
  type: 'object',
  required: [
    'value',
  ],
  properties: {
    value: value,
  },
};

const InboundLockDataSchema = {
  type: 'object',
  required: [
    'token', 'to', 'value', 'storeman', 'redeemKey',
  ],
  properties: {
    token: tokenEth,
    to: hash160Address,
    value: value,
    storeman: storemanEth,
    redeemKey: redeemKeyXHash,
  },
};

const OutboundLockDataSchema = {
  type: 'object',
  required: [
    'token', 'to', 'value', 'storeman', 'redeemKey',
  ],
  properties: {
    token: tokenEth,
    to: hash160Address,
    value: value,
    storeman: storemanWan,
    redeemKey: redeemKeyXHash,
  },
};

const RedeemDataSchema = {
  type: 'object',
  required: [
    'token', 'redeemKey',
  ],
  properties: {
    token: tokenEth,
    redeemKey: redeemKeyX,
  },
};

const RevokeDataSchema = {
  type: 'object',
  required: [
    'token', 'redeemKey',
  ],
  properties: {
    token: tokenEth,
    redeemKey: redeemKeyXHash,
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
  InboundApproveSchema,
  InboundLockSchema,
  InboundRedeemSchema,
  InboundRevokeSchema,

  OutboundApproveSchema,
  OutboundLockSchema,
  OutboundLockWithFeeSchema,
  OutboundRedeemSchema,
  OutboundRevokeSchema,
  OutboundFeeSchema,

  ApproveDataSchema,
  InboundLockDataSchema,
  OutboundLockDataSchema,
  RedeemDataSchema,
  RevokeDataSchema,
  ScanOptsSchema,
};
