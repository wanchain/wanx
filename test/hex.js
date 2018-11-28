const { expect } = require('chai');

const hex = require('../src/lib/hex');

describe('hex prefixing', () => {

  it('should determine if string is prefixed', () => {
    let str = '0x686920746865726521';
    let res = hex.isPrefixed(str);

    expect(res).to.equal(true);

    str = '686920746865726521';
    res = hex.isPrefixed(str);

    expect(res).to.equal(false);
  });

  it('should strip the prefix', () => {
    let str = '0x686920746865726521';
    let res = hex.stripPrefix(str);

    expect(res).to.equal('686920746865726521');
  });

  it('should ensure the prefix is present', () => {
    let str = '0x686920746865726521';
    let res = hex.ensurePrefix(str);

    expect(res).to.equal('0x686920746865726521');

    str = '686920746865726521';
    res = hex.ensurePrefix(str);

    expect(res).to.equal('0x686920746865726521');

    str = 123;
    res = hex.ensurePrefix(str);

    expect(res).to.equal(123);
  });

});

describe('hex conversion', () => {

  it('should convert a number to hex', () => {
    let num = 68692074686;
    let res = hex.fromNumber(num);

    expect(res).to.equal('0xffe5de0be');

    num = '686920746865726521';
    res = hex.fromNumber(num);

    expect(res).to.equal('0x9886ec7a1c71439');
  });

  it('should convert a string to hex', () => {
    let num = 'hi there!';
    let res = hex.fromString(num);

    expect(res).to.equal('0x686920746865726521');
  });

});
