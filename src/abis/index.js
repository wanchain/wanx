// Ethereum
const HTLCETH = require('./HTLCETH.abi');
const HTLCWETH = require('./HTLCWETH.abi');
const WETHManager = require('./WETHManager.abi');
const StoremanGroupAdmin_ETH = require('./StoremanGroupAdmin-ETH.abi');

// ERC20
const HTLCETH_ERC20 = require('./HTLCETH-ERC20.abi');
const HTLCWAN_ERC20 = require('./HTLCWAN-ERC20.abi');
const QuotaLedger = require('./QuotaLedger.abi');
const TokenManager = require('./TokenManager.abi');
const StoremanGroupAdmin_ERC20 = require('./StoremanGroupAdmin-ERC20.abi');

// Bitcoin
const HTLCWBTC = require('./HTLCWBTC.abi');
const WBTCManager = require('./WBTCManager.abi');
const StoremanGroupAdmin_BTC = require('./StoremanGroupAdmin-BTC.abi');

module.exports = {
  HTLCETH,
  HTLCWETH,
  WETHManager,
  StoremanGroupAdmin_ETH,

  HTLCETH_ERC20,
  HTLCWAN_ERC20,
  QuotaLedger,
  TokenManager,
  StoremanGroupAdmin_ERC20,

  HTLCWBTC,
  WBTCManager,
  StoremanGroupAdmin_BTC,
};
