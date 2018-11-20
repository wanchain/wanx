const { expect } = require('chai');

const Wanx = require('../src/wanx');
const config = require('../src/config');

const redeemKey = {
  x: '57d064133ccc4c92833dcdd0f2fd54b85f69e57ce6a0980d5d33c363ac552dac',
  xHash: '69a1e4541ff920e1e87808bd6efedb11359007c238f16a73d9d638274128e2eb',
};

const storeman = {
  wan: '0x06daa9379cbe241a84a65b217a11b38fe3b4b063',
  eth: '0x41623962c5d44565de623d53eb677e0f300467d2',
};

const inboundOpts = {
  from: '0x4bbdfe0eb33ed498020de9286fd856f5b8331c2c',
  to: '0xa6d72746a4bb19f46c99bf19b6592828435540b0',
  value: '2242000000000000',
  storeman,
  redeemKey,
};

const outboundOpts = {
  from: '0xa6d72746a4bb19f46c99bf19b6592828435540b0',
  to: '0x4bbdfe0eb33ed498020de9286fd856f5b8331c2c',
  value: '2242000000000000',
  storeman,
  redeemKey,
};

describe('eth inbound data', () => {

  it('should construct correct lock data', () => {
    const wanx = new Wanx('testnet');
    const conf = config.get('testnet');

    const tx = wanx.newChain('eth', true);

    const lockData = tx.buildLockData(inboundOpts);
    const expected = '0x158e00a369a1e4541ff920e1e87808bd6efedb11359007c238f16a73d9d638274128e2eb00000000000000000000000041623962c5d44565de623d53eb677e0f300467d2000000000000000000000000a6d72746a4bb19f46c99bf19b6592828435540b0';

    expect(lockData).to.equal(expected);
  });

  it('should throw if lock data schema validation fails', () => {
    const wanx = new Wanx('testnet');
    const tx = wanx.newChain('eth', true);

    let opts1 = {
      to: '0xa6d72746a4bb19f46c99bf19b6592828435540b0',
      storeman: {
        eth: '0x41623962c5d44565de623d53eb677e0f300467d2',
      },
    }

    expect(() => tx.buildLockData(opts1)).to.throw();

    let opts2 = {
      storeman: {
        eth: '0x41623962c5d44565de623d53eb677e0f300467d2',
      },
      redeemKey: {
        xHash: '69a1e4541ff920e1e87808bd6efedb11359007c238f16a73d9d638274128e2eb',
      },
    }

    expect(() => tx.buildLockData(opts2)).to.throw();

    let opts3 = {
      to: '0xa6d72746a4bb19f46c99bf19b6592828435540b0',
      redeemKey: {
        xHash: '69a1e4541ff920e1e87808bd6efedb11359007c238f16a73d9d638274128e2eb',
      },
    }

    expect(() => tx.buildLockData(opts3)).to.throw();

    let opts4 = {
      to: '0xa6d72746a4bb19f46c99bf19b6592828435540b0',
      storeman: {
        eth: '0x41623962c5d44565de623d53eb677e0f300467d2',
      },
      redeemKey: {
        xHash: '69a1e4541ff920e1e87808bd6efedb11359007c238f16a73d9d638274128e2eb',
      },
    }

    expect(() => tx.buildLockData(opts4)).to.not.throw();
  });

  it('should construct correct redeem data', () => {
    const wanx = new Wanx('testnet');
    const conf = config.get('testnet');

    const tx = wanx.newChain('eth', true);

    const redeemData = tx.buildRedeemData(inboundOpts);
    const expected = '0x2000fe5057d064133ccc4c92833dcdd0f2fd54b85f69e57ce6a0980d5d33c363ac552dac';

    expect(redeemData).to.equal(expected);
  });

  it('should throw if redeem data schema validation fails', () => {
    const wanx = new Wanx('testnet');
    const tx = wanx.newChain('eth', true);

    let opts1 = {};

    expect(() => tx.buildRedeemData(opts1)).to.throw();

    let opts2 = {
      redeemKey: {
        x: redeemKey.x,
      },
    };

    expect(() => tx.buildRedeemData(opts2)).to.not.throw();
  });

  it('should construct correct revoke data', () => {
    const wanx = new Wanx('testnet');
    const conf = config.get('testnet');

    const tx = wanx.newChain('eth', true);

    const revokeData = tx.buildRevokeData(inboundOpts);
    const expected = '0xfecea9fb69a1e4541ff920e1e87808bd6efedb11359007c238f16a73d9d638274128e2eb';

    expect(revokeData).to.equal(expected);
  });

  it('should throw if revoke data schema validation fails', () => {
    const wanx = new Wanx('testnet');
    const tx = wanx.newChain('eth', true);

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

describe('eth outbound data', () => {

  it('should construct correct lock data', () => {
    const wanx = new Wanx('testnet');
    const conf = config.get('testnet');

    const tx = wanx.newChain('eth', false);

    const lockData = tx.buildLockData(outboundOpts);
    const expected = '0x004b432969a1e4541ff920e1e87808bd6efedb11359007c238f16a73d9d638274128e2eb00000000000000000000000006daa9379cbe241a84a65b217a11b38fe3b4b0630000000000000000000000004bbdfe0eb33ed498020de9286fd856f5b8331c2c0000000000000000000000000000000000000000000000000007f7164d962000';

    expect(lockData).to.equal(expected);
  });

  it('should throw if lock data schema validation fails', () => {
    const wanx = new Wanx('testnet');
    const tx = wanx.newChain('eth', false);

    let opts1 = {
      to: '0xa6d72746a4bb19f46c99bf19b6592828435540b0',
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
      to: '0xa6d72746a4bb19f46c99bf19b6592828435540b0',
      redeemKey: {
        xHash: '69a1e4541ff920e1e87808bd6efedb11359007c238f16a73d9d638274128e2eb',
      },
      value: '1234567890',
    }

    expect(() => tx.buildLockData(opts3)).to.throw();

    let opts4 = {
      to: '0xa6d72746a4bb19f46c99bf19b6592828435540b0',
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

  it('should construct correct redeem data', () => {
    const wanx = new Wanx('testnet');
    const conf = config.get('testnet');

    const tx = wanx.newChain('eth', false);

    const redeemData = tx.buildRedeemData(outboundOpts);
    const expected = '0x514d0b0157d064133ccc4c92833dcdd0f2fd54b85f69e57ce6a0980d5d33c363ac552dac';

    expect(redeemData).to.equal(expected);
  });

  it('should throw if redeem data schema validation fails', () => {
    const wanx = new Wanx('testnet');
    const tx = wanx.newChain('eth', false);

    let opts1 = {};

    expect(() => tx.buildRedeemData(opts1)).to.throw();

    let opts2 = {
      redeemKey: {
        x: redeemKey.x,
      },
    };

    expect(() => tx.buildRedeemData(opts2)).to.not.throw();
  });

  it('should construct correct revoke data', () => {
    const wanx = new Wanx('testnet');
    const conf = config.get('testnet');

    const tx = wanx.newChain('eth', false);

    const revokeData = tx.buildRevokeData(outboundOpts);
    const expected = '0xa1270c4769a1e4541ff920e1e87808bd6efedb11359007c238f16a73d9d638274128e2eb';

    expect(revokeData).to.equal(expected);
  });

  it('should throw if revoke data schema validation fails', () => {
    const wanx = new Wanx('testnet');
    const tx = wanx.newChain('eth', false);

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
