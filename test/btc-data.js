const { expect } = require('chai');

const BTC_Inbound = require('../src/btc/inbound');
const BTC_Outbound = require('../src/btc/outbound');
const config = require('../src/config');

const redeemKey = {
  x: '57d064133ccc4c92833dcdd0f2fd54b85f69e57ce6a0980d5d33c363ac552dac',
  xHash: '69a1e4541ff920e1e87808bd6efedb11359007c238f16a73d9d638274128e2eb',
};

const storeman = {
  btc: '0x83e5ca256c9ffd0ae019f98e4371e67ef5026d2d',
  wan: '0x9ebf2acd509e0d5f9653e755f26d9a3ddce3977c',
};

const inboundOpts = {
  from: 'mtUTQ6b3fuxLCYgZXPBLyAxktTRKa9u9ry',
  to: '0xa6d72746a4bb19f46c99bf19b6592828435540b0',
  value: '2420000',
  storeman,
  redeemKey,
  txid: '7e78c7b456f06e23c0afb25b15856a5ff0794d1a6494bb4ae16fde42c65064df',
  lockTime: 1542317201,
};

const outboundOpts = {
  from: '0xa6d72746a4bb19f46c99bf19b6592828435540b0',
  to: 'mtUTQ6b3fuxLCYgZXPBLyAxktTRKa9u9ry',
  value: '2420000',
  storeman,
  redeemKey,
};

describe('btc inbound data', () => {

  it('should construct correct lock data', () => {
    const conf = config.get('testnet');
    const tx = new BTC_Inbound(conf);

    const lockData = tx.buildLockData(inboundOpts);
    const expected = '0xa1a3f15e0000000000000000000000009ebf2acd509e0d5f9653e755f26d9a3ddce3977c0000000000000000000000008e20aea88fe673d0f79eb2b6eeff51648a8a3d1469a1e4541ff920e1e87808bd6efedb11359007c238f16a73d9d638274128e2eb7e78c7b456f06e23c0afb25b15856a5ff0794d1a6494bb4ae16fde42c65064df000000000000000000000000000000000000000000000000000000005bede491';

    expect(lockData).to.equal(expected);
  });

  it('should throw if lock data schema validation fails', () => {
    const conf = config.get('testnet');
    const tx = new BTC_Inbound(conf);

    let opts1 = {
      to: '0xa6d72746a4bb19f46c99bf19b6592828435540b0',
      storeman: {
        wan: '0x9ebf2acd509e0d5f9653e755f26d9a3ddce3977c',
      },
    }

    expect(() => tx.buildLockData(opts1)).to.throw();

    let opts2 = {
      from: 'mtUTQ6b3fuxLCYgZXPBLyAxktTRKa9u9ry',
      storeman: {
        wan: '0x9ebf2acd509e0d5f9653e755f26d9a3ddce3977c',
      },
      redeemKey: {
        xHash: '69a1e4541ff920e1e87808bd6efedb11359007c238f16a73d9d638274128e2eb',
      },
    }

    expect(() => tx.buildLockData(opts2)).to.throw();

    let opts3 = {
      from: 'mtUTQ6b3fuxLCYgZXPBLyAxktTRKa9u9ry',
      to: '0xa6d72746a4bb19f46c99bf19b6592828435540b0',
      redeemKey: {
        xHash: '69a1e4541ff920e1e87808bd6efedb11359007c238f16a73d9d638274128e2eb',
      },
    }

    expect(() => tx.buildLockData(opts3)).to.throw();

    let opts4 = {
      from: 'mtUTQ6b3fuxLCYgZXPBLyAxktTRKa9u9ry',
      to: '0xa6d72746a4bb19f46c99bf19b6592828435540b0',
      storeman: {
        wan: '0x9ebf2acd509e0d5f9653e755f26d9a3ddce3977c',
      },
      redeemKey: {
        xHash: '69a1e4541ff920e1e87808bd6efedb11359007c238f16a73d9d638274128e2eb',
      },
      txid: '7e78c7b456f06e23c0afb25b15856a5ff0794d1a6494bb4ae16fde42c65064df',
      lockTime: 1542317201,
    }

    expect(() => tx.buildLockData(opts4)).to.not.throw();
  });

  it('should construct correct redeem data', () => {
    const conf = config.get('testnet');
    const tx = new BTC_Inbound(conf);

    const redeemData = tx.buildRedeemData(inboundOpts);
    const expected = '0x0aed103357d064133ccc4c92833dcdd0f2fd54b85f69e57ce6a0980d5d33c363ac552dac';

    expect(redeemData).to.equal(expected);
  });

  it('should throw if redeem data schema validation fails', () => {
    const conf = config.get('testnet');
    const tx = new BTC_Inbound(conf);

    let opts1 = {};

    expect(() => tx.buildRedeemData(opts1)).to.throw();

    let opts2 = {
      redeemKey: {
        x: redeemKey.x,
      },
    };

    expect(() => tx.buildRedeemData(opts2)).to.not.throw();
  });

});

describe('btc outbound data', () => {

  it('should construct correct outboundFee data', () => {
    const conf = config.get('testnet');
    const tx = new BTC_Outbound(conf);

    const feeData = tx.buildOutboundFeeData(outboundOpts);
    const expected = '0x92cad4540000000000000000000000009ebf2acd509e0d5f9653e755f26d9a3ddce3977c000000000000000000000000000000000000000000000000000000000024ed20';

    expect(feeData).to.equal(expected);
  });

  it('should throw if outboundFee data schema validation fails', () => {
    const conf = config.get('testnet');
    const tx = new BTC_Outbound(conf);

    let opts1 = {};

    expect(() => tx.buildOutboundFeeData(opts1)).to.throw();

    let opts2 = {
      storeman: {
        wan: '0x06daa9379cbe241a84a65b217a11b38fe3b4b063',
      },
      value: '1234567890',
    };

    expect(() => tx.buildOutboundFeeData(opts2)).to.not.throw();
  });

  it('should construct correct lock data', () => {
    const conf = config.get('testnet');
    const tx = new BTC_Outbound(conf);

    const lockData = tx.buildLockData(outboundOpts);
    const expected = '0x81791d8c69a1e4541ff920e1e87808bd6efedb11359007c238f16a73d9d638274128e2eb0000000000000000000000009ebf2acd509e0d5f9653e755f26d9a3ddce3977c0000000000000000000000008e20aea88fe673d0f79eb2b6eeff51648a8a3d14000000000000000000000000000000000000000000000000000000000024ed20';

    expect(lockData).to.equal(expected);
  });

  it('should throw if lock data schema validation fails', () => {
    const conf = config.get('testnet');
    const tx = new BTC_Outbound(conf);

    let opts1 = {
      to: 'mtUTQ6b3fuxLCYgZXPBLyAxktTRKa9u9ry',
      storeman: {
        wan: '0x06daa9379cbe241a84a65b217a11b38fe3b4b063',
      },
      value: '123456789',
    }

    expect(() => tx.buildLockData(opts1)).to.throw();

    let opts2 = {
      storeman: {
        wan: '0x06daa9379cbe241a84a65b217a11b38fe3b4b063',
      },
      redeemKey: {
        xHash: '69a1e4541ff920e1e87808bd6efedb11359007c238f16a73d9d638274128e2eb',
      },
    }

    expect(() => tx.buildLockData(opts2)).to.throw();

    let opts3 = {
      to: 'mtUTQ6b3fuxLCYgZXPBLyAxktTRKa9u9ry',
      redeemKey: {
        xHash: '69a1e4541ff920e1e87808bd6efedb11359007c238f16a73d9d638274128e2eb',
      },
      value: '1234567890',
    }

    expect(() => tx.buildLockData(opts3)).to.throw();

    let opts4 = {
      to: 'mtUTQ6b3fuxLCYgZXPBLyAxktTRKa9u9ry',
      storeman: {
        wan: '0x06daa9379cbe241a84a65b217a11b38fe3b4b063',
      },
      redeemKey: {
        xHash: '69a1e4541ff920e1e87808bd6efedb11359007c238f16a73d9d638274128e2eb',
      },
      value: '1234567890',
    }

    expect(() => tx.buildLockData(opts4)).to.not.throw();
  });

  it('should construct correct revoke data', () => {
    const conf = config.get('testnet');
    const tx = new BTC_Outbound(conf);

    const revokeData = tx.buildRevokeData(outboundOpts);
    const expected = '0x5e76e57869a1e4541ff920e1e87808bd6efedb11359007c238f16a73d9d638274128e2eb';

    expect(revokeData).to.equal(expected);
  });

  it('should throw if revoke data schema validation fails', () => {
    const conf = config.get('testnet');
    const tx = new BTC_Outbound(conf);

    let opts1 = {};

    expect(() => tx.buildRevokeData(opts1)).to.throw();

    let opts2 = {
      redeemKey: {
        xHash: redeemKey.xHash,
      },
    };

    expect(() => tx.buildRevokeData(opts2)).to.not.throw();
  });

});
