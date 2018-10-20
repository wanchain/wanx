function validateSendOpts(type, opts) {
  // console.log(type, opts);

  // TODO: there should be an opt schema and this should check against it
  if (type === 'ETH') {
    if (! opts.value || opts.value <= 0) {
      throw new Error('Invalid tx value');
    }
  }

  return {
    source: opts.from,
    destination: opts.to,
    value: opts.value,
    storeman: opts.storeman,
  }
}

function validateRedeemOpts(type, opts) {
  // console.log(type, opts);

  // TODO: there should be an opt schema and this should check against it
  if (type === 'ETH') {
    if (! opts.redeemKey || ! opts.redeemKey.x || ! opts.redeemKey.xHash) {
      throw new Error('Invalid redeemKey');
    }
  }

  return {
    destination: opts.to,
    source: opts.from,
    storeman: opts.storeman,
    redeemKey: {
      x: opts.redeemKey.x,
      xHash: opts.redeemKey.xHash,
    },
  }
}

function validateRevokeOpts(type, opts) {
  // console.log(type, opts);

  // TODO: there should be an opt schema and this should check against it
  if (type === 'ETH') {
    if (! opts.xHash) {
      throw new Error('Invalid xHash');
    }
  }

  return {
    source: opts.from,
    xHash: opts.xHash,
  }
}

module.exports = {
  validateSendOpts,
  validateRedeemOpts,
  validateRevokeOpts,
}
