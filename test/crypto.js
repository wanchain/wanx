const { expect } = require('chai');

const crypto = require('../src/lib/crypto');

describe('hash functions', () => {

  it('should correctly make sha256 hash', () => {
    const hex = '0x686920746865726521';
    const hash = crypto.sha256(hex);
    const expected = '3e36d3622f5adad01080cc2120bb72c0714ecec6118eb9523586410b7435ae80';

    expect(hash).to.equal(expected);
  });

  it('should correctly make hash256 hash', () => {
    const hex = '0x686920746865726521';
    const hash = crypto.hash256(hex);
    const expected = 'f99a66a4e457dabef4212bfd73f82a2d11489d9e51b8ab6b28157b5dcd6bfae9';

    expect(hash).to.equal(expected);
  });

  it('should correctly make keccak256 hash', () => {
    const hex = '0x686920746865726521';
    const hash = crypto.keccak256(hex);
    const expected = 'c5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470';

    expect(hash).to.equal(expected);
  });

});

describe('generate random', () => {

  it('should generate a unique x', () => {
    const x1 = crypto.generateX();
    const x2 = crypto.generateX();

    expect(x1).to.have.length(64);
    expect(x2).to.have.length(64);
    expect(x1).not.to.equal(x2);
  });

});


describe('address hash160', () => {

  it('should convert a legacy btc address to hash160', () => {
    const address = 'mrQqYn2AAxTa5dCsbH5ExSgVvYbUZKjmgC';
    const hash160 = crypto.addressToHash160(address, 'pubkeyhash', 'testnet');
    const expected = '778141a652213fb243de2093293bf030f5971fa3';

    expect(hash160).to.equal(expected);
  });

  it('should convert a p2sh btc address to hash160', () => {
    const address = '2N2Ej58MgkPyRim3j3NHypXXTBeYEcpFhxU';
    const hash160 = crypto.addressToHash160(address, 'scripthash', 'testnet');
    const expected = '62a0fe68ba31cb03105e3c5ebd4ecd1b7edf4488';

    expect(hash160).to.equal(expected);
  });

  it('should convert a hash160 to a legacy btc address', () => {
    const hash160 = '778141a652213fb243de2093293bf030f5971fa3';
    const address = crypto.hash160ToAddress(hash160, 'pubkeyhash', 'testnet');
    const expected = 'mrQqYn2AAxTa5dCsbH5ExSgVvYbUZKjmgC';

    expect(address).to.equal(expected);
  });

  it('should convert a hash160 to a p2sh btc address', () => {
    const hash160 = '62a0fe68ba31cb03105e3c5ebd4ecd1b7edf4488';
    const address = crypto.hash160ToAddress(hash160, 'scripthash', 'testnet');
    const expected = '2N2Ej58MgkPyRim3j3NHypXXTBeYEcpFhxU';

    expect(address).to.equal(expected);
  });

});
