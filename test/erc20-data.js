const { expect } = require('chai');

const ERC20_Inbound = require('../src/erc20/inbound');
const ERC20_Outbound = require('../src/erc20/outbound');
const config = require('../src/config');
const hex = require('../src/lib/hex');

const redeemKey = {
  x: '57d064133ccc4c92833dcdd0f2fd54b85f69e57ce6a0980d5d33c363ac552dac',
  xHash: '69a1e4541ff920e1e87808bd6efedb11359007c238f16a73d9d638274128e2eb',
};

const storeman = {
  eth: '0x41623962c5d44565de623d53eb677e0f300467d2',
  wan: '0x06daa9379cbe241a84a65b217a11b38fe3b4b063',
};

const token = {
  eth: '0xdbf193627ee704d38495c2f5eb3afc3512eafa4c',
  wan: '0xda16e66820a3c64c34f2b35da3f5e1d1742274cb',
};

const inboundOpts = {
  from: '0x4bbdfe0eb33ed498020de9286fd856f5b8331c2c',
  to: '0xa6d72746a4bb19f46c99bf19b6592828435540b0',
  value: '2242000000000000',
  token,
  storeman,
  redeemKey,
};

const outboundOpts = {
  from: '0xa6d72746a4bb19f46c99bf19b6592828435540b0',
  to: '0x4bbdfe0eb33ed498020de9286fd856f5b8331c2c',
  value: '2242000000000000',
  token,
  storeman,
  redeemKey,
};

describe('erc20 inbound data', () => {

  it('should construct correct approve data', () => {
    const conf = config.get('testnet');
    const tx = new ERC20_Inbound(conf);

    const approveData = tx.buildApproveData(inboundOpts);
    const expected = '0x095ea7b3000000000000000000000000' + hex.stripPrefix(conf.ethHtlcAddrE20) + '0000000000000000000000000000000000000000000000000007f7164d962000';

    expect(approveData).to.equal(expected);
  });

  it('should throw if approve data schema validation fails', () => {
    const conf = config.get('testnet');
    const tx = new ERC20_Inbound(conf);

    let opts1 = {};

    expect(() => tx.buildApproveData(opts1)).to.throw();

    let opts2 = {
      value: '123456789',
    };

    expect(() => tx.buildApproveData(opts2)).to.not.throw();
  });

  it('should construct correct lock data', () => {
    const conf = config.get('testnet');
    const tx = new ERC20_Inbound(conf);

    const lockData = tx.buildLockData(inboundOpts);
    const expected = '0xb5c98fc6000000000000000000000000dbf193627ee704d38495c2f5eb3afc3512eafa4c69a1e4541ff920e1e87808bd6efedb11359007c238f16a73d9d638274128e2eb00000000000000000000000041623962c5d44565de623d53eb677e0f300467d2000000000000000000000000a6d72746a4bb19f46c99bf19b6592828435540b00000000000000000000000000000000000000000000000000007f7164d962000';

    expect(lockData).to.equal(expected);
  });

  it('should throw if lock data schema validation fails', () => {
    const conf = config.get('testnet');
    const tx = new ERC20_Inbound(conf);

    let opts1 = {
      to: '0xa6d72746a4bb19f46c99bf19b6592828435540b0',
      storeman: {
        eth: '0x41623962c5d44565de623d53eb677e0f300467d2',
      },
      value: '12345678',
      redeemKey: {
        xHash: '69a1e4541ff920e1e87808bd6efedb11359007c238f16a73d9d638274128e2eb',
      },
    }

    expect(() => tx.buildLockData(opts1)).to.throw();

    let opts2 = {
      storeman: {
        eth: '0x41623962c5d44565de623d53eb677e0f300467d2',
      },
      value: '12345678',
      redeemKey: {
        xHash: '69a1e4541ff920e1e87808bd6efedb11359007c238f16a73d9d638274128e2eb',
      },
      token,
    }

    expect(() => tx.buildLockData(opts2)).to.throw();

    let opts3 = {
      to: '0xa6d72746a4bb19f46c99bf19b6592828435540b0',
      value: '12345678',
      redeemKey: {
        xHash: '69a1e4541ff920e1e87808bd6efedb11359007c238f16a73d9d638274128e2eb',
      },
      token,
    }

    expect(() => tx.buildLockData(opts3)).to.throw();

    let opts4 = {
      to: '0xa6d72746a4bb19f46c99bf19b6592828435540b0',
      value: '12345678',
      storeman: {
        eth: '0x41623962c5d44565de623d53eb677e0f300467d2',
      },
      redeemKey: {
        xHash: '69a1e4541ff920e1e87808bd6efedb11359007c238f16a73d9d638274128e2eb',
      },
      token,
    }

    expect(() => tx.buildLockData(opts4)).to.not.throw();
  });

  it('should construct correct redeem data', () => {
    const conf = config.get('testnet');
    const tx = new ERC20_Inbound(conf);

    const redeemData = tx.buildRedeemData(inboundOpts);
    const expected = '0x94d53601000000000000000000000000dbf193627ee704d38495c2f5eb3afc3512eafa4c57d064133ccc4c92833dcdd0f2fd54b85f69e57ce6a0980d5d33c363ac552dac';

    expect(redeemData).to.equal(expected);
  });

  it('should throw if redeem data schema validation fails', () => {
    const conf = config.get('testnet');
    const tx = new ERC20_Inbound(conf);

    let opts1 = {};

    expect(() => tx.buildRedeemData(opts1)).to.throw();

    let opts2 = {
      token: {
        eth: '0xdbf193627ee704d38495c2f5eb3afc3512eafa4c',
      },
      redeemKey: {
        x: redeemKey.x,
      },
    };

    expect(() => tx.buildRedeemData(opts2)).to.not.throw();
  });

  it('should construct correct revoke data', () => {
    const conf = config.get('testnet');
    const tx = new ERC20_Inbound(conf);

    const revokeData = tx.buildRevokeData(inboundOpts);
    const expected = '0x2d3acdbb000000000000000000000000dbf193627ee704d38495c2f5eb3afc3512eafa4c69a1e4541ff920e1e87808bd6efedb11359007c238f16a73d9d638274128e2eb';

    expect(revokeData).to.equal(expected);
  });

  it('should throw if revoke data schema validation fails', () => {
    const conf = config.get('testnet');
    const tx = new ERC20_Inbound(conf);

    let opts1 = {};

    expect(() => tx.buildRevokeData(opts1)).to.throw();

    let opts2 = {
      token: {
        eth: '0xdbf193627ee704d38495c2f5eb3afc3512eafa4c',
      },
      redeemKey: {
        xHash: redeemKey.xHash,
      },
    };

    expect(() => tx.buildRevokeData(opts2)).to.not.throw();
  });

});

describe('erc20 outbound data', () => {

  it('should construct correct approve data', () => {
    const conf = config.get('testnet');
    const tx = new ERC20_Outbound(conf);

    const approveData = tx.buildApproveData(inboundOpts);
    const expected = '0x095ea7b3000000000000000000000000' + hex.stripPrefix(conf.wanHtlcAddrE20) + '0000000000000000000000000000000000000000000000000007f7164d962000';

    expect(approveData).to.equal(expected);
  });

  it('should throw if approve data schema validation fails', () => {
    const conf = config.get('testnet');
    const tx = new ERC20_Outbound(conf);

    let opts1 = {};

    expect(() => tx.buildApproveData(opts1)).to.throw();

    let opts2 = {
      value: '123456789',
    };

    expect(() => tx.buildApproveData(opts2)).to.not.throw();
  });

  it('should construct correct outboundFee data', () => {
    const conf = config.get('testnet');
    const tx = new ERC20_Outbound(conf);

    const feeData = tx.buildOutboundFeeData(outboundOpts);
    const expected = '0x25a5377c000000000000000000000000dbf193627ee704d38495c2f5eb3afc3512eafa4c00000000000000000000000006daa9379cbe241a84a65b217a11b38fe3b4b0630000000000000000000000000000000000000000000000000007f7164d962000';

    expect(feeData).to.equal(expected);
  });

  it('should throw if outboundFee data schema validation fails', () => {
    const conf = config.get('testnet');
    const tx = new ERC20_Outbound(conf);

    let opts1 = {};

    expect(() => tx.buildOutboundFeeData(opts1)).to.throw();

    let opts2 = {
      token: {
        eth: '0xdbf193627ee704d38495c2f5eb3afc3512eafa4c',
      },
      storeman: {
        wan: '0x06daa9379cbe241a84a65b217a11b38fe3b4b063',
      },
      value: '1234567890',
    };

    expect(() => tx.buildOutboundFeeData(opts2)).to.not.throw();
  });

  it('should construct correct lock data', () => {
    const conf = config.get('testnet');
    const tx = new ERC20_Outbound(conf);

    const lockData = tx.buildLockData(outboundOpts);
    const expected = '0x42d3d55a000000000000000000000000dbf193627ee704d38495c2f5eb3afc3512eafa4c69a1e4541ff920e1e87808bd6efedb11359007c238f16a73d9d638274128e2eb00000000000000000000000006daa9379cbe241a84a65b217a11b38fe3b4b0630000000000000000000000004bbdfe0eb33ed498020de9286fd856f5b8331c2c0000000000000000000000000000000000000000000000000007f7164d962000';

    expect(lockData).to.equal(expected);
  });

  it('should throw if lock data schema validation fails', () => {
    const conf = config.get('testnet');
    const tx = new ERC20_Outbound(conf);

    let opts1 = {
      to: '0xa6d72746a4bb19f46c99bf19b6592828435540b0',
      storeman: {
        wan: '0x06daa9379cbe241a84a65b217a11b38fe3b4b063',
      },
      value: '123456789',
    }

    expect(() => tx.buildLockData(opts1)).to.throw();

    let opts2 = {
      token: {
        eth: '0xdbf193627ee704d38495c2f5eb3afc3512eafa4c',
      },
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
      token: {
        eth: '0xdbf193627ee704d38495c2f5eb3afc3512eafa4c',
      },
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
      token: {
        eth: '0xdbf193627ee704d38495c2f5eb3afc3512eafa4c',
      },
      value: '1234567890',
    }

    expect(() => tx.buildLockData(opts4)).to.not.throw();
  });

  it('should construct correct redeem data', () => {
    const conf = config.get('testnet');
    const tx = new ERC20_Outbound(conf);

    const redeemData = tx.buildRedeemData(outboundOpts);
    const expected = '0xadb58c0c000000000000000000000000dbf193627ee704d38495c2f5eb3afc3512eafa4c57d064133ccc4c92833dcdd0f2fd54b85f69e57ce6a0980d5d33c363ac552dac';

    expect(redeemData).to.equal(expected);
  });

  it('should throw if redeem data schema validation fails', () => {
    const conf = config.get('testnet');
    const tx = new ERC20_Outbound(conf);

    let opts1 = {};

    expect(() => tx.buildRedeemData(opts1)).to.throw();

    let opts2 = {
      token: {
        eth: '0xdbf193627ee704d38495c2f5eb3afc3512eafa4c',
      },
      redeemKey: {
        x: redeemKey.x,
      },
    };

    expect(() => tx.buildRedeemData(opts2)).to.not.throw();
  });

  it('should construct correct revoke data', () => {
    const conf = config.get('testnet');
    const tx = new ERC20_Outbound(conf);

    const revokeData = tx.buildRevokeData(outboundOpts);
    const expected = '0x507dc32b000000000000000000000000dbf193627ee704d38495c2f5eb3afc3512eafa4c69a1e4541ff920e1e87808bd6efedb11359007c238f16a73d9d638274128e2eb';

    expect(revokeData).to.equal(expected);
  });

  it('should throw if revoke data schema validation fails', () => {
    const conf = config.get('testnet');
    const tx = new ERC20_Outbound(conf);

    let opts1 = {};

    expect(() => tx.buildRevokeData(opts1)).to.throw();

    let opts2 = {
      token: {
        eth: '0xdbf193627ee704d38495c2f5eb3afc3512eafa4c',
      },
      redeemKey: {
        xHash: redeemKey.xHash,
      },
    };

    expect(() => tx.buildRevokeData(opts2)).to.not.throw();
  });

});
