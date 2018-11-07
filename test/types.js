const { expect } = require('chai');
const BigNumber = require('bignumber.js');

const types = require('../src/lib/types');

describe('bytes32 conversion', () => {

  it('should convert hex string to bytes32', () => {
    const address = '0x9abbd236e46eae3ae230f3284d40f9df4ddb677f';
    const bytes = types.hex2Bytes32(address);
    const expected = '0000000000000000000000009abbd236e46eae3ae230f3284d40f9df4ddb677f';

    expect(bytes).to.equal(expected);
  });

  it('should convert uppercase hex string to bytes32', () => {
    const address = '0x9ABbD236e46EAE3ae230f3284D40f9DF4ddb677F';
    const bytes = types.hex2Bytes32(address);
    const expected = '0000000000000000000000009abbd236e46eae3ae230f3284d40f9df4ddb677f';

    expect(bytes).to.equal(expected);
  });

  it('should convert empty hex string to array of 0s', () => {
    const address = null;
    const bytes = types.hex2Bytes32(address);
    const expected = '0000000000000000000000000000000000000000000000000000000000000000';

    expect(bytes).to.equal(expected);
  });

  it('should convert number to bytes32', () => {
    const number = 800000000;
    const bytes = types.num2Bytes32(number);
    const expected = '000000000000000000000000000000000000000000000000000000002faf0800';

    expect(bytes).to.equal(expected);
  });

  it('should convert number string to bytes32', () => {
    const number = '800000000000000000000';
    const bytes = types.num2Bytes32(number);
    const expected = '00000000000000000000000000000000000000000000002b5e3af16b18800000';

    expect(bytes).to.equal(expected);
  });

  it('should convert big number to bytes32', () => {
    const number = new BigNumber('800000000000000000000');
    const bytes = types.num2Bytes32(number);
    const expected = '00000000000000000000000000000000000000000000002b5e3af16b18800000';

    expect(bytes).to.equal(expected);
  });

});
