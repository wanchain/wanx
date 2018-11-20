const bitcoin = require('bitcoinjs-lib');
const { expect } = require('chai');
const sinon = require('sinon');

const btcUtil = require('../src/btc/utils');

const getMockTxBuilder = () => {
  return {
    setVersion: sinon.spy(),
    setLockTime: sinon.spy(),
    addInput: sinon.spy(),
    addOutput: sinon.spy(),
    buildIncomplete: sinon.stub().returns('asdf'),
  };
};

const getMockIncompleteTx = () => {
  return {
    hashForSignature: sinon.stub().returns(new Buffer.from('abc123', 'hex')),
  };
};

const network = 'testnet';
const txid = '7e78c7b456f06e23c0afb25b15856a5ff0794d1a6494bb4ae16fde42c65064df';
const address = '2N14ScQUc3A2z5kD33pSHvTixDZ3hHE89Dk';
const value = '123456';
const lockTime = 1500000000;
const xHash = '52185649fdb94058ff9b3194b2757f090aa5a7432032c43c84e81ccb11ccea43';

describe('btc incomplete txs', () => {

  it('should construct correct redeem tx', () => {
    const mockTxBuilder = getMockTxBuilder();
    const builder = sinon.stub(bitcoin, 'TransactionBuilder').returns(mockTxBuilder);

    const tx = btcUtil.buildIncompleteRedeem(network, txid, address, value);

    expect(builder.calledWith(bitcoin.networks[network])).to.be.true;
    expect(mockTxBuilder.setVersion.calledOnceWithExactly(1)).to.be.true;
    expect(mockTxBuilder.addInput.calledOnceWithExactly(txid, 0)).to.be.true;
    expect(mockTxBuilder.addOutput.calledOnceWithExactly(address, 123456)).to.be.true;
    expect(mockTxBuilder.setLockTime.notCalled).to.be.true;
    expect(mockTxBuilder.buildIncomplete.calledOnce).to.be.true;
    expect(tx).to.equal('asdf');

    builder.restore();
  });

  it('should construct correct revoke tx', () => {
    const mockTxBuilder = getMockTxBuilder();
    const builder = sinon.stub(bitcoin, 'TransactionBuilder').returns(mockTxBuilder);

    const tx = btcUtil.buildIncompleteRevoke(network, txid, address, value, lockTime);

    expect(builder.calledWith(bitcoin.networks[network])).to.be.true;
    expect(mockTxBuilder.setVersion.calledOnceWithExactly(1)).to.be.true;
    expect(mockTxBuilder.addInput.calledOnceWithExactly(txid, 0, 0)).to.be.true;
    expect(mockTxBuilder.addOutput.calledOnceWithExactly(address, 123456)).to.be.true;
    expect(mockTxBuilder.setLockTime.calledOnceWithExactly(lockTime)).to.be.true;
    expect(mockTxBuilder.buildIncomplete.calledOnce).to.be.true;
    expect(tx).to.equal('asdf');

    builder.restore();
  });

});

describe('btc build htlc', () => {

  it('should build correct timelock contract', () => {
    const destAddr = '0x83e5ca256c9ffd0ae019f98e4371e67ef5026d2d';
    const revokeAddr = '0x8e20aea88fe673d0f79eb2b6eeff51648a8a3d14';

    const htlc = btcUtil.buildHashTimeLockContract(network, xHash, destAddr, revokeAddr, lockTime);

    const expectedAddr = '2N7qaWgB5z7owPTMxL3qJSGzEyf5pzhzhkQ';
    const expectedRedeemScript = '63a82052185649fdb94058ff9b3194b2757f090aa5a7432032c43c84e81ccb11ccea438876a91483e5ca256c9ffd0ae019f98e4371e67ef5026d2d6704002f6859b17576a9148e20aea88fe673d0f79eb2b6eeff51648a8a3d146888ac';

    expect(htlc.address).to.equal(expectedAddr);
    expect(htlc.redeemScript).to.equal(expectedRedeemScript);
  });

});

describe('btc signature hash', () => {

  it('should supply correct hash for redeem signature', () => {
    const incompleteTx = getMockIncompleteTx();
    const builder = sinon.stub(btcUtil, 'buildIncompleteRedeem').returns(incompleteTx);

    const destAddr = '0x83e5ca256c9ffd0ae019f98e4371e67ef5026d2d';
    const revokeAddr = '0x8e20aea88fe673d0f79eb2b6eeff51648a8a3d14';
    const redeemScript = '63a82052185649fdb94058ff9b';

    const hash = btcUtil.hashForRedeemSig(network, txid, address, value, redeemScript);

    const expectedArgs = [
      0,
      new Buffer.from(redeemScript, 'hex'),
      bitcoin.Transaction.SIGHASH_ALL,
    ];

    expect(builder.calledOnceWithExactly(network, txid, address, value)).to.be.true;
    expect(incompleteTx.hashForSignature.calledOnceWithExactly(...expectedArgs)).to.be.true;
    expect(hash).to.equal('abc123');

    builder.restore();
  });

  it('should supply correct hash for revoke signature', () => {
    const incompleteTx = getMockIncompleteTx();
    const builder = sinon.stub(btcUtil, 'buildIncompleteRevoke').returns(incompleteTx);

    const destAddr = '0x83e5ca256c9ffd0ae019f98e4371e67ef5026d2d';
    const revokeAddr = '0x8e20aea88fe673d0f79eb2b6eeff51648a8a3d14';
    const redeemScript = '63a82052185649fdb94058ff9b';

    const hash = btcUtil.hashForRevokeSig(network, txid, address, value, lockTime, redeemScript);

    const expectedArgs = [
      0,
      new Buffer.from(redeemScript, 'hex'),
      bitcoin.Transaction.SIGHASH_ALL,
    ];

    expect(builder.calledOnceWithExactly(network, txid, address, value, lockTime)).to.be.true;
    expect(incompleteTx.hashForSignature.calledOnceWithExactly(...expectedArgs)).to.be.true;
    expect(hash).to.equal('abc123');

    builder.restore();
  });

});
