const { generateXPair } = require('../../crypto');

// TODO:
// - there should be an opt schema and this should check against it
// - validate all options

function validateSendOpts(opts) {

  if (! opts.value || opts.value <= 0) {
    throw new Error('Invalid tx value');
  }

  if (! opts.redeemKey) {
    opts.redeemKey = generateXPair();
  }
  else if (! opts.redeemKey.x || ! opts.redeemKey.xHash) {
    throw new Error('Invalid redeemKey');
  }

  return {
    from: opts.from,
    to: opts.to,
    value: opts.value,
    storeman: opts.storeman,
    redeemKey: {
      x: opts.redeemKey.x,
      xHash: opts.redeemKey.xHash,
    },
  }
}

function validateRedeemOpts(opts) {

  if (! opts.redeemKey || ! opts.redeemKey.x || ! opts.redeemKey.xHash) {
    throw new Error('Invalid redeemKey');
  }

  return {
    from: opts.from,
    to: opts.to,
    storeman: opts.storeman,
    redeemKey: {
      x: opts.redeemKey.x,
      xHash: opts.redeemKey.xHash,
    },
  }
}

function validateRevokeOpts(opts) {

  if (! opts.redeemKey || ! opts.redeemKey.xHash) {
    throw new Error('Invalid redeemKey');
  }

  return {
    from: opts.from,
    redeemKey: {
      xHash: opts.redeemKey.xHash,
    },
  }
}

module.exports = {
  validateSendOpts,
  validateRedeemOpts,
  validateRevokeOpts,
}
