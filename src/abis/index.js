// Ethereum
const HTLCETH = require('./HTLCETH.abi');
const HTLCWETH = require('./HTLCWETH.abi');
const WETHManager = require('./WETHManager.abi');

// ERC20
const HTLCETH_ERC20 = require('./HTLCETH-ERC20.abi');
const HTLCWAN_ERC20 = require('./HTLCWAN-ERC20.abi');
const QuotaLedger = require('./QuotaLedger.abi');

// Bitcoin
const HTLCWBTC = require('./HTLCWBTC.abi');
const WBTCManager = require('./WBTCManager.abi');

module.exports = {
  HTLCETH,
  HTLCWETH,
  WETHManager,
  HTLCETH_ERC20,
  HTLCWAN_ERC20,
  QuotaLedger,
  HTLCWBTC,
  WBTCManager,
};
