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

    expect(conf.addresses.HTLCWETH).to.equal(config.testnetConfig.addresses.HTLCWETH);

    conf = config.get('mainnet');

    expect(conf.addresses.HTLCWETH).to.equal(config.mainnetConfig.addresses.HTLCWETH);
  });

  it('should allow overrides to be passed to config', () => {
    const HTLCWETH = '0x123456';
    let conf = config.get('testnet', { addresses: { HTLCWETH }});

    expect(conf.addresses.HTLCWETH).to.equal(HTLCWETH);
  });

});
