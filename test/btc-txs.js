const bitcoin = require('bitcoinjs-lib');
const { expect } = require('chai');
const sinon = require('sinon');

const btcUtil = require('../src/btc/utils');

const network = 'testnet';
const txid = '7e78c7b456f06e23c0afb25b15856a5ff0794d1a6494bb4ae16fde42c65064df';
const signerAddress = 'mtUTQ6b3fuxLCYgZXPBLyAxktTRKa9u9ry';
const signerPublicKey = '0340991cb8f6354b857b1aff28c45cef0e72dfb2032bd62cc57c606974c623fbb1';
const signerWif = 'cVJT2b5AE6JwaJdhprH7h4Deb5NiqMLfmXxG2ZThkZn6gqYZgZJq';
const toAddress = '2NC7xERiQxR7FUyFy6kH8uzpMvc1c3VpppM';
const value = '123456';
const lockTime = 1500000000;
const xHash = '52185649fdb94058ff9b3194b2757f090aa5a7432032c43c84e81ccb11ccea43';
const x = '53118731b48ebbfa033d9e7eed6a269357f32f23325b66ae66e2cc26fd2dfce3';
const redeemScript = '63a82052185649fdb94058ff9b';
const signedSigHash = '88fe673d0f79eb2b6eeff51648a8a3d14521';

const getMockIncompleteRedeemTx = () => {
  return {
    hashForSignature: sinon.stub().returns('sigHash'),
    setInputScript: sinon.spy(),
    toHex: sinon.stub().returns('123456abcdef'),
  };
};

const getMockIncompleteRevokeTx = () => {
  return {
    hashForSignature: sinon.stub().returns('sigHash'),
    setInputScript: sinon.spy(),
    toHex: sinon.stub().returns('123456abcdef'),
  };
};

const getMockECPair = () => {
  return {
    sign: sinon.stub().returns(new Buffer(signedSigHash, 'base64')),
    publicKey: new Buffer(signerPublicKey, 'hex'),
  };
};

const p2pkhArgs = {
  network: bitcoin.networks[network],
  pubkey: new Buffer(signerPublicKey, 'hex')
};

const hashForSignatureArgs = [
  0,
  new Buffer.from(redeemScript, 'hex'),
  bitcoin.Transaction.SIGHASH_ALL
];

const encodeArgs = [
  new Buffer(signedSigHash, 'base64'),
  bitcoin.Transaction.SIGHASH_ALL,
];

const redeemCompileArgs = [
  'signature123',
  new Buffer(signerPublicKey, 'hex'),
  new Buffer(x, 'hex'),
  bitcoin.opcodes.OP_TRUE,
];

const revokeCompileArgs = [
  'signature123',
  new Buffer(signerPublicKey, 'hex'),
  bitcoin.opcodes.OP_FALSE,
];

const p2shArgs = {
  redeem: {
    input: 'compiledScript',
    output: new Buffer.from(redeemScript, 'hex'),
  },
  network: bitcoin.networks[network],
};

let sandbox;
let p2pkh;
let encode;
let compile;
let p2sh;

describe('btc redeem transactions', () => {

  beforeEach(() => {
    sandbox = sinon.createSandbox();

    p2pkh = sandbox.stub(bitcoin.payments, 'p2pkh').returns({ address: signerAddress });
    encode = sandbox.stub(bitcoin.script.signature, 'encode').returns('signature123');
    compile = sandbox.stub(bitcoin.script, 'compile').returns('compiledScript');
    p2sh = sandbox.stub(bitcoin.payments, 'p2sh').returns({ input: 'scriptSig' });
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should construct correct redeem tx from signed sigHash', () => {
    const incompleteRedeemTx = getMockIncompleteRedeemTx();
    const builder = sandbox.stub(btcUtil, 'buildIncompleteRedeem').returns(incompleteRedeemTx);

    const tx = btcUtil.buildRedeemTx(network, txid, value, redeemScript, x, signerPublicKey, signedSigHash);

    expect(p2pkh.calledOnceWithExactly(p2pkhArgs)).to.be.true;
    expect(builder.calledOnceWithExactly(network, txid, signerAddress, value)).to.be.true;
    expect(encode.calledOnceWithExactly(...encodeArgs)).to.be.true;
    expect(compile.calledOnceWithExactly(redeemCompileArgs)).to.be.true;
    expect(p2sh.calledOnceWithExactly(p2shArgs)).to.be.true;
    expect(incompleteRedeemTx.setInputScript.calledOnceWithExactly(0, 'scriptSig')).to.be.true;
    expect(incompleteRedeemTx.toHex.calledOnce).to.be.true;
    expect(tx).to.equal('123456abcdef');
  });

  it('should use optional toAddress if supplied for redeem tx', () => {
    const incompleteRedeemTx = getMockIncompleteRedeemTx();
    const builder = sandbox.stub(btcUtil, 'buildIncompleteRedeem').returns(incompleteRedeemTx);

    const tx = btcUtil.buildRedeemTx(network, txid, value, redeemScript, x, signerPublicKey, signedSigHash, toAddress);

    expect(builder.calledOnceWithExactly(network, txid, toAddress, value)).to.be.true;
    expect(p2pkh.called).to.be.false;
  });

  it('should construct correct redeem tx from wif', () => {
    const ecPair = getMockECPair();
    const incompleteRedeemTx = getMockIncompleteRedeemTx();

    const fromWIF = sandbox.stub(bitcoin.ECPair, 'fromWIF').returns(ecPair);
    const builder = sandbox.stub(btcUtil, 'buildIncompleteRedeem').returns(incompleteRedeemTx);

    const tx = btcUtil.buildRedeemTxFromWif(network, txid, value, redeemScript, x, signerWif);

    expect(fromWIF.calledOnceWithExactly(signerWif, bitcoin.networks[network])).to.be.true;
    expect(p2pkh.calledOnceWithExactly(p2pkhArgs)).to.be.true;
    expect(builder.calledOnceWithExactly(network, txid, signerAddress, value)).to.be.true;
    expect(incompleteRedeemTx.hashForSignature.calledOnceWithExactly(...hashForSignatureArgs)).to.be.true;
    expect(encode.calledOnceWithExactly(...encodeArgs)).to.be.true;
    expect(compile.calledOnceWithExactly(redeemCompileArgs)).to.be.true;
    expect(p2sh.calledOnceWithExactly(p2shArgs)).to.be.true;
    expect(incompleteRedeemTx.setInputScript.calledOnceWithExactly(0, 'scriptSig')).to.be.true;
    expect(incompleteRedeemTx.toHex.calledOnce).to.be.true;
    expect(tx).to.equal('123456abcdef');
  });

  it('should use optional toAddress if supplied for redeem tx from wif', () => {
    const ecPair = getMockECPair();
    const incompleteRedeemTx = getMockIncompleteRedeemTx();

    const fromWIF = sandbox.stub(bitcoin.ECPair, 'fromWIF').returns(ecPair);
    const builder = sandbox.stub(btcUtil, 'buildIncompleteRedeem').returns(incompleteRedeemTx);

    const tx = btcUtil.buildRedeemTxFromWif(network, txid, value, redeemScript, x, signerWif, toAddress);

    expect(builder.calledOnceWithExactly(network, txid, toAddress, value)).to.be.true;
    expect(p2pkh.called).to.be.false;
  });

});

describe('btc redeem transactions', () => {

  beforeEach(() => {
    sandbox = sinon.createSandbox();

    p2pkh = sandbox.stub(bitcoin.payments, 'p2pkh').returns({ address: signerAddress });
    encode = sandbox.stub(bitcoin.script.signature, 'encode').returns('signature123');
    compile = sandbox.stub(bitcoin.script, 'compile').returns('compiledScript');
    p2sh = sandbox.stub(bitcoin.payments, 'p2sh').returns({ input: 'scriptSig' });
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should construct correct revoke tx from signed sigHash', () => {
    const incompleteRevokeTx = getMockIncompleteRevokeTx();
    const builder = sandbox.stub(btcUtil, 'buildIncompleteRevoke').returns(incompleteRevokeTx);

    const tx = btcUtil.buildRevokeTx(network, txid, value, redeemScript, x, lockTime, signerPublicKey, signedSigHash);

    expect(p2pkh.calledOnceWithExactly(p2pkhArgs)).to.be.true;
    expect(builder.calledOnceWithExactly(network, txid, signerAddress, value, lockTime)).to.be.true;
    expect(encode.calledOnceWithExactly(...encodeArgs)).to.be.true;
    expect(compile.calledOnceWithExactly(revokeCompileArgs)).to.be.true;
    expect(p2sh.calledOnceWithExactly(p2shArgs)).to.be.true;
    expect(incompleteRevokeTx.setInputScript.calledOnceWithExactly(0, 'scriptSig')).to.be.true;
    expect(incompleteRevokeTx.toHex.calledOnce).to.be.true;
    expect(tx).to.equal('123456abcdef');
  });

  it('should use optional toAddress if supplied for revoke tx', () => {
    const incompleteRevokeTx = getMockIncompleteRevokeTx();
    const builder = sandbox.stub(btcUtil, 'buildIncompleteRevoke').returns(incompleteRevokeTx);

    const tx = btcUtil.buildRevokeTx(network, txid, value, redeemScript, x, lockTime, signerPublicKey, signedSigHash, toAddress);

    expect(builder.calledOnceWithExactly(network, txid, toAddress, value, lockTime)).to.be.true;
    expect(p2pkh.called).to.be.false;
  });

  it('should construct correct revoke tx from wif', () => {
    const ecPair = getMockECPair();
    const incompleteRevokeTx = getMockIncompleteRevokeTx();

    const fromWIF = sandbox.stub(bitcoin.ECPair, 'fromWIF').returns(ecPair);
    const builder = sandbox.stub(btcUtil, 'buildIncompleteRevoke').returns(incompleteRevokeTx);

    const tx = btcUtil.buildRevokeTxFromWif(network, txid, value, redeemScript, x, lockTime, signerWif);

    expect(fromWIF.calledOnceWithExactly(signerWif, bitcoin.networks[network])).to.be.true;
    expect(p2pkh.calledOnceWithExactly(p2pkhArgs)).to.be.true;
    expect(builder.calledOnceWithExactly(network, txid, signerAddress, value, lockTime)).to.be.true;
    expect(incompleteRevokeTx.hashForSignature.calledOnceWithExactly(...hashForSignatureArgs)).to.be.true;
    expect(encode.calledOnceWithExactly(...encodeArgs)).to.be.true;
    expect(compile.calledOnceWithExactly(revokeCompileArgs)).to.be.true;
    expect(p2sh.calledOnceWithExactly(p2shArgs)).to.be.true;
    expect(incompleteRevokeTx.setInputScript.calledOnceWithExactly(0, 'scriptSig')).to.be.true;
    expect(incompleteRevokeTx.toHex.calledOnce).to.be.true;
    expect(tx).to.equal('123456abcdef');
  });

  it('should use optional toAddress if supplied for revoke tx from wif', () => {
    const ecPair = getMockECPair();
    const incompleteRevokeTx = getMockIncompleteRevokeTx();

    const fromWIF = sandbox.stub(bitcoin.ECPair, 'fromWIF').returns(ecPair);
    const builder = sandbox.stub(btcUtil, 'buildIncompleteRevoke').returns(incompleteRevokeTx);

    const tx = btcUtil.buildRevokeTxFromWif(network, txid, value, redeemScript, x, lockTime, signerWif, toAddress);

    expect(builder.calledOnceWithExactly(network, txid, toAddress, value, lockTime)).to.be.true;
    expect(p2pkh.called).to.be.false;
  });

});
