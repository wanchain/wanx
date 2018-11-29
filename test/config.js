const { expect } = require('chai');

const config = require('../src/config');

describe('configuration', () => {

  it('should throw if network is not valid', () => {
    const try1 = () => {
      config.get();
    };

    const try2 = () => {
      config.get({});
    };

    const try3 = () => {
      config.get('wrongnet');
    };

    const try4 = () => {
      config.get('testnet');
    };

    expect(try1).to.throw();
    expect(try2).to.throw();
    expect(try3).to.throw();
    expect(try4).to.not.throw();
  });

  it('should load the config from network', () => {
    let conf = config.get('testnet');

    expect(conf.wanHtlcAddr).to.equal(config.testnetConfig.wanHtlcAddr);

    conf = config.get('mainnet');

    expect(conf.wanHtlcAddr).to.equal(config.mainnetConfig.wanHtlcAddr);
  });

  it('should allow overrides to be passed to config', () => {
    const wanHtlcAddr = '0x123456';
    let conf = config.get('testnet', { wanHtlcAddr });

    expect(conf.wanHtlcAddr).to.equal(wanHtlcAddr);
  });

});
