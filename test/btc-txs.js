const bitcoin = require('bitcoinjs-lib');
const { expect } = require('chai');
const sinon = require('sinon');

const btcUtil = require('../src/btc/utils');

const getMockIncompleteRedeemTx = () => {
  return {
    setInputScript: sinon.spy(),
    toHex: sinon.stub().returns('123456abcdef'),
  };
};

const network = 'testnet';
const txid = '7e78c7b456f06e23c0afb25b15856a5ff0794d1a6494bb4ae16fde42c65064df';
const address = '2N14ScQUc3A2z5kD33pSHvTixDZ3hHE89Dk';
const newAddress = 'mtUTQ6b3fuxLCYgZXPBLyAxktTRKa9u9ry';
const publicKey = '0340991cb8f6354b857b1aff28c45cef0e72dfb2032bd62cc57c606974c623fbb1';
const value = '123456';
const lockTime = 1500000000;
const xHash = '52185649fdb94058ff9b3194b2757f090aa5a7432032c43c84e81ccb11ccea43';
const x = '53118731b48ebbfa033d9e7eed6a269357f32f23325b66ae66e2cc26fd2dfce3';
const redeemScript = '63a82052185649fdb94058ff9b';
const signedSigHash = '88fe673d0f79eb2b6eeff51648a8a3d14521';

describe('btc transactions', () => {

  it('should construct correct redeem tx', () => {
    const mockIncompleteRedeemTx = getMockIncompleteRedeemTx();
    const builder = sinon.stub(btcUtil, 'buildIncompleteRedeem').returns(mockIncompleteRedeemTx);
    const p2pkh = sinon.stub(bitcoin.payments, 'p2pkh').returns({ address: newAddress });
    const encode = sinon.stub(bitcoin.script.signature, 'encode').returns('signature123');
    const compile = sinon.stub(bitcoin.script, 'compile').returns('compiledScript');
    const p2sh = sinon.stub(bitcoin.payments, 'p2sh').returns({ input: 'scriptSig' });

    const tx = btcUtil.buildRedeemTx(network, txid, value, redeemScript, x, publicKey, signedSigHash);

    const p2pkhArgs = {
      network: bitcoin.networks[network],
      pubkey: new Buffer(publicKey, 'hex')
    };

    const encodeArgs = [
      new Buffer(signedSigHash, 'base64'),
      bitcoin.Transaction.SIGHASH_ALL,
    ];

    const compileArgs = [
      'signature123',
      new Buffer(publicKey, 'hex'),
      new Buffer(x, 'hex'),
      bitcoin.opcodes.OP_TRUE,
    ];

    const p2shArgs = {
      redeem: {
        input: 'compiledScript',
        output: new Buffer.from(redeemScript, 'hex'),
      },
      network: bitcoin.networks[network],
    };

    expect(p2pkh.calledOnceWithExactly(p2pkhArgs)).to.be.true;
    // console.log(builder.getCall(0).args)
    expect(builder.calledOnceWithExactly(network, txid, newAddress, value)).to.be.true;
    expect(encode.calledOnceWithExactly(...encodeArgs)).to.be.true;
    expect(compile.calledOnceWithExactly(compileArgs)).to.be.true;
    expect(p2sh.calledOnceWithExactly(p2shArgs)).to.be.true;
    expect(mockIncompleteRedeemTx.setInputScript.calledOnceWithExactly(0, 'scriptSig')).to.be.true;
    expect(mockIncompleteRedeemTx.toHex.calledOnce).to.be.true;
    expect(tx).to.equal('123456abcdef');

    builder.restore();
    p2pkh.restore();
    encode.restore();
    compile.restore();
    p2sh.restore();
  });

});
