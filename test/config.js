const { expect } = require('chai');

const config = require('../src/config');

describe('configuration', () => {

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
