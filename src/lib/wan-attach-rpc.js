const { formatters } = require('web3-core-helpers');
const Method = require('web3-core-method');

function attachWanRpc(web3) {
  web3.wan = new Wan3(web3);
  return web3;
}

function Wan3(web3) {
    this._requestManager = web3._requestManager;

    methods().forEach(method => {
        method.attachToObject(this);
        method.setRequestManager(this._requestManager);
    });

    properties().forEach(p => {
        p.attachToObject(this);
        p.setRequestManager(this._requestManager);
    });
}

const methods = function() {

    const computeOTAPPKeys = new Method({
        name: 'computeOTAPPKeys',
        call: 'wan_computeOTAPPKeys',
        params: 2,
        inputFormatter: [formatters.inputAddressFormatter, null]
    });

    const generateOneTimeAddress = new Method({
        name: 'generateOneTimeAddress',
        call: 'wan_generateOneTimeAddress',
        params: 1,
        inputFormatter: [null]
    });

    const getOTABalance = new Method({
        name: 'getOTABalance',
        call: 'wan_getOTABalance',
        params: 2,
        inputFormatter: [null, formatters.inputDefaultBlockNumberFormatter],
        outputFormatter: formatters.outputBigNumberFormatter
    });

    const getOTAMixSet = new Method({
        name: 'getOTAMixSet',
        call: 'wan_getOTAMixSet',
        params: 2
    });

    const getSupportStampOTABalances = new Method({
        name: 'getSupportStampOTABalances',
        call: 'wan_getSupportStampOTABalances',
        params: 0,
    });

    const getSupportWanCoinOTABalances = new Method({
        name: 'getSupportWanCoinOTABalances',
        call: 'wan_getSupportWanCoinOTABalances',
        params: 0,
    });

    const getWanAddress = new Method({
        name: 'getWanAddress',
        call: 'wan_getWanAddress',
        params: 1,
        inputFormatter: [formatters.inputAddressFormatter]
    });

    const scanOTAbyAccount = new Method({
        name: 'scanOTAbyAccount',
        call: 'wan_scanOTAbyAccount',
        params: 2,
        inputFormatter: [formatters.inputAddressFormatter,formatters.inputBlockNumberFormatter]
    });

    const genRingSignData = new Method({
        name: 'genRingSignData',
        call: 'personal_genRingSignData',
        params: 3,
    });

    const sendPrivacyCxtTransaction = new Method({
        name: 'sendPrivacyCxtTransaction',
        call: 'personal_sendPrivacyCxtTransaction',
        params: 2,
        inputFormatter: [formatters.inputTransactionFormatter, null]
    });


    return [
        computeOTAPPKeys,
        generateOneTimeAddress,
        getOTABalance,
        getOTAMixSet,
        getSupportWanCoinOTABalances,
        getSupportStampOTABalances,
        getWanAddress,
        scanOTAbyAccount,
        genRingSignData,
        sendPrivacyCxtTransaction,
    ];
};

const properties = function() {
    return [];
};

module.exports = attachWanRpc;
