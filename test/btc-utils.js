const bitcoin = require('bitcoinjs-lib');
const { expect } = require('chai');
const sinon = require('sinon');

const btcUtils = require('../src/btc/utils');

const getMockTxBuilder = () => {
  return {
    setVersion: sinon.spy(),
    setLockTime: sinon.spy(),
    addInput: sinon.spy(),
    addOutput: sinon.spy(),
    buildIncomplete: sinon.stub().returns('asdf'),
  };
};

const network = 'testnet';
const txid = '7e78c7b456f06e23c0afb25b15856a5ff0794d1a6494bb4ae16fde42c65064df';
const address = '2N14ScQUc3A2z5kD33pSHvTixDZ3hHE89Dk';
const value = '123456';
const lockTime = 150000000;

describe('btc incomplete txs', () => {

  it('should construct correct redeem tx', () => {
    const mockTxBuilder = getMockTxBuilder();
    const builder = sinon.stub(bitcoin, 'TransactionBuilder').returns(mockTxBuilder);

    const tx = btcUtils.buildIncompleteRedeem(network, txid, address, value);

    expect(builder.calledWith(bitcoin.networks[network]));
    expect(mockTxBuilder.setVersion.calledOnceWith(1));
    expect(mockTxBuilder.addInput.calledOnceWith(txid, 0));
    expect(mockTxBuilder.addOutput.calledOnceWith(address, 123456));
    expect(mockTxBuilder.setLockTime.notCalled);
    expect(mockTxBuilder.buildIncomplete.calledOnce);
    expect(tx).to.equal('asdf');

    builder.restore();
  });

  it('should construct correct revoke tx', () => {
    const mockTxBuilder = getMockTxBuilder();
    const builder = sinon.stub(bitcoin, 'TransactionBuilder').returns(mockTxBuilder);

    const tx = btcUtils.buildIncompleteRevoke(network, txid, address, value, lockTime);

    expect(builder.calledWith(bitcoin.networks[network]));
    expect(mockTxBuilder.setVersion.calledOnceWith(1));
    expect(mockTxBuilder.addInput.calledOnceWith(txid, 0));
    expect(mockTxBuilder.addOutput.calledOnceWith(address, 123456));
    expect(mockTxBuilder.setLockTime.calledOnceWith(lockTime));
    expect(mockTxBuilder.buildIncomplete.calledOnce);
    expect(tx).to.equal('asdf');

    builder.restore();
  });

});
