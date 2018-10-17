const path = require('path');

const testnetConfig = {
  network: 'testnet',
  chainId: 3,
  wethTokenAddress: '0x46397994a7e1e926ea0de95557a4806d38f10b0d',
  ethHtlcAddr: '0x358b18d9dfa4cce042f2926d014643d4b3742b31',
  wanHtlcAddr: '0xfbaffb655906424d501144eefe35e28753dea037',
  ethHtlcAddrE20: '0x87a0dee965e7679d15327ce0cc3df8dfc009b43d',
  wanHtlcAddrE20: '0xe10515355e684e515c9c632c9eed04cca425cda1',
  ethHtlcAddrBtc: '0xcdc96fea7e2a6ce584df5dc22d9211e53a5b18b2',
  wanHtlcAddrBtc: '0x5d1dd99ebaa6ee3289d9cd3369948e4ce96736c3',
};

const mainnetConfig = {
  network: 'mainnet',
  chainId: 1,
  wethTokenAddress: '0x46397994a7e1e926ea0de95557a4806d38f10b0d',
  ethHtlcAddr: '0x358b18d9dfa4cce042f2926d014643d4b3742b31',
  wanHtlcAddr: '0xfbaffb655906424d501144eefe35e28753dea037',
  ethHtlcAddrE20: '0x87a0dee965e7679d15327ce0cc3df8dfc009b43d',
  wanHtlcAddrE20: '0xe10515355e684e515c9c632c9eed04cca425cda1',
  ethHtlcAddrBtc: '0xcdc96fea7e2a6ce584df5dc22d9211e53a5b18b2',
  wanHtlcAddrBtc: '0x5d1dd99ebaa6ee3289d9cd3369948e4ce96736c3',
};

const defaultConfig = {
  wanNodeURI: 'http://localhost:8545',
  ethNodeURI: 'http://localhost:18545',
  rpcWsUrl: 'localhost',

  rpcIpcPath: process.env.HOME,
  keyStorePath: process.env.HOME,
  ethkeyStorePath: process.env.HOME,

  confirmBlocks: 2,

  signatures: {
    HTLCETH: {
      DEF_LOCKED_TIME: '79d90d8fdd6f63ab8414be6ecb4f73e62b1b4600d821d4868bb840c7dcbb7f10',
      DEF_MAX_TIME: 'cc062f2f3c2ff1c6c5c15ebf0d54b638c057fdbe63de5e24b71b9c6595fbae0f',
      ETH2WETHLock: 'cc48f73333597801a1bda70f5cf2d78c250a881d98369fde1c8b4792f819c218',
      ETH2WETHRefund: 'fad890a22ccb482ffadbbcd6b6f024362be5b9623de19a688544089aeffec7d5',
      ETH2WETHRevoke: '3873481607f6bf8519a932d0f86ae1d64e63ae05021866a2fc7ea14e263cb4d3',
      RATIO_PRECISE: '1d57d55c4d467dff3b18bc31ab1fd3a9924149698e3d0b8e871a41dc1574e009',
      WETH2ETHLock: '9f9db7aab2890dd11e9ef0359c3e13a5cc61aac6de07a5b4e80a750e6083d965',
      WETH2ETHRefund: '52e2a72ff57b3717f8e04f07fa4a1a812f7bc071ed82c3e155c861e0627fa5fa',
      WETH2ETHRevoke: '46b48b44fd0fd1f7b9eb85ea89a01361716a767b493943204815e47dd339be32',
      acceptOwnership: '79ba5097e5519a381a52113cdcc59540d13f73fd9d26abc0453484a096cc96f2',
      changeOwner: 'a6f9dae13f6f9f7de69814715796059e291f78e951670d244dd3b07111b8bb18',
      eth2wethLock: '158e00a342a6a175423f99fa73b6143cdac32c9dba957cd42735256612aba28f',
      eth2wethRefund: '2000fe50eb66b272498817cbcb32b4ba2687299ce7c892deb9e2cd62d94ea02f',
      eth2wethRevoke: 'fecea9fb53c2efe720dfbc8570f21fe9a5bc3397dfb8b102d4e7b54b03e33b01',
      getHTLCLeftLockedTime: 'b62b85b7a46fd5489682e60150558b72a69226a5dd76f40fc182dbc21b089f43',
      halted: 'b9b8af0b70fcc612bf3b267c4151c9be4e036d16b749964dfb8cd24d08e96052',
      kill: '41c0e1b5eba5f1ef69db2e30c1ec7d6e0a5f3d39332543a8a99d1165e460a49e',
      lockedTime: 'a8b38205c16324dd50ed34ad97bdea9ca08b14e19bbf8ce02930a470feb20625',
      mapXHashHTLCTxs: '5c6698abd73456a050981cd02e7dbbb6d37b618a12bd938017187dd8370bfdf2',
      mapXHashShadow: '05438358bc76be8eaa131ebc5ee9d0fc4cc5dc563f08534cfce0bfca5ee1b21f',
      newOwner: 'd4ee1d906fe4031cbc7cec1b7e371ab90fefdc827c8e8d68e6285c89f58e04e3',
      owner: '8da5cb5b36e7f68c1d2e56001220cdbdd3ba2616072f718acfda4a06441a807d',
      revokeFeeRatio: 'ad3cc2e505f559d4e06a8c658c8d285d6ab6cc7df130403c25037798abe59f45',
      setHalt: 'f49543873829e2e8e9941f11e2d29e6f03ed8bc92ca393609591678548287767',
      setLockedTime: 'df1dcaa929cae4d7e8032b5df4e1006429455b5da2487be189955647a09dc1c2',
      setRevokeFeeRatio: 'ce49caac81619d67fc437d873d2c7b61d5d224d80f9f29ad9f7063323ecf85c3',
      weth2ethLock: 'f6ecd851a22a677ca46187ac53fcae71dbac489b0ace9ea2cdaea09f8f548283',
      weth2ethRefund: '514d0b01bc210977074fbf1048be9b5dbb40c503a74b954e54b2ac200c3b4e73',
      weth2ethRevoke: 'a1270c47dce7b414898d9fbf17fa830212b3d131ea92a9cd87e048d445c45802',
      xHashExist: 'a5fb7ef2bde7e61fb3c2ebe8f036cc8e8bce2fe815df12fbdf2d97455b832a42',
    },
    HTLCWETH: {
      DEF_LOCKED_TIME: '79d90d8fdd6f63ab8414be6ecb4f73e62b1b4600d821d4868bb840c7dcbb7f10',
      DEF_MAX_TIME: 'cc062f2f3c2ff1c6c5c15ebf0d54b638c057fdbe63de5e24b71b9c6595fbae0f',
      ETH2WETHLock: 'edcc59255109c84dd5be1380f9fb6a888e7268ecc292b30436c92ae5e2ad4ae0',
      ETH2WETHRefund: 'fad890a22ccb482ffadbbcd6b6f024362be5b9623de19a688544089aeffec7d5',
      ETH2WETHRevoke: '3873481607f6bf8519a932d0f86ae1d64e63ae05021866a2fc7ea14e263cb4d3',
      ETH_INDEX: '81844c2a3dc183a749e79eb084df149d72ac2e3b26b3535ff31689e507572485',
      RATIO_PRECISE: '1d57d55c4d467dff3b18bc31ab1fd3a9924149698e3d0b8e871a41dc1574e009',
      WETH2ETHLock: '0afccc1495e2dfc76d04e6d5e90f8cea2abf3b9569b1401246cc3fabae0a48c0',
      WETH2ETHRefund: '52e2a72ff57b3717f8e04f07fa4a1a812f7bc071ed82c3e155c861e0627fa5fa',
      WETH2ETHRevoke: '46b48b44fd0fd1f7b9eb85ea89a01361716a767b493943204815e47dd339be32',
      acceptOwnership: '79ba5097e5519a381a52113cdcc59540d13f73fd9d26abc0453484a096cc96f2',
      changeOwner: 'a6f9dae13f6f9f7de69814715796059e291f78e951670d244dd3b07111b8bb18',
      eth2wethLock: '9c4380340ba82d85d70663758c75c5183c36a2e5b1b8d90d2d6a1b7b80f7edcf',
      eth2wethRefund: '2000fe50eb66b272498817cbcb32b4ba2687299ce7c892deb9e2cd62d94ea02f',
      eth2wethRevoke: 'fecea9fb53c2efe720dfbc8570f21fe9a5bc3397dfb8b102d4e7b54b03e33b01',
      getHTLCLeftLockedTime: 'b62b85b7a46fd5489682e60150558b72a69226a5dd76f40fc182dbc21b089f43',
      getWeth2EthFee: 'd10bafecb0fc895ae01f2250c9ebcdf4250dfee448c292ae1bbb757e150c6b34',
      halted: 'b9b8af0b70fcc612bf3b267c4151c9be4e036d16b749964dfb8cd24d08e96052',
      kill: '41c0e1b5eba5f1ef69db2e30c1ec7d6e0a5f3d39332543a8a99d1165e460a49e',
      lockedTime: 'a8b38205c16324dd50ed34ad97bdea9ca08b14e19bbf8ce02930a470feb20625',
      mapXHashFee: '9b58c6d2696f2e6765fbc629e1dd891103bc78dd17eca233e5a89ef8f2e42c05',
      mapXHashHTLCTxs: '5c6698abd73456a050981cd02e7dbbb6d37b618a12bd938017187dd8370bfdf2',
      mapXHashShadow: '05438358bc76be8eaa131ebc5ee9d0fc4cc5dc563f08534cfce0bfca5ee1b21f',
      newOwner: 'd4ee1d906fe4031cbc7cec1b7e371ab90fefdc827c8e8d68e6285c89f58e04e3',
      owner: '8da5cb5b36e7f68c1d2e56001220cdbdd3ba2616072f718acfda4a06441a807d',
      revokeFeeRatio: 'ad3cc2e505f559d4e06a8c658c8d285d6ab6cc7df130403c25037798abe59f45',
      setHalt: 'f49543873829e2e8e9941f11e2d29e6f03ed8bc92ca393609591678548287767',
      setLockedTime: 'df1dcaa929cae4d7e8032b5df4e1006429455b5da2487be189955647a09dc1c2',
      setRevokeFeeRatio: 'ce49caac81619d67fc437d873d2c7b61d5d224d80f9f29ad9f7063323ecf85c3',
      setStoremanGroupAdmin: '9778fa40fab377b219992336896d7b0257874c24bcabd246f5a0f204637064ff',
      setWETHManager: 'ebc24b53e87442b305f5342b34b0e032884fd6869544411a406e17e14d5234ed',
      storemanGroupAdmin: '820413f35662c85e6fa65903ec21906291f0d3dd5a8ee034bd79e33eeb56332b',
      weth2ethLock: '004b4329bcce8c8e32c23eb8380c7f15198e9c32c7d4db6f1f9b335b90d90625',
      weth2ethRefund: '514d0b01bc210977074fbf1048be9b5dbb40c503a74b954e54b2ac200c3b4e73',
      weth2ethRevoke: 'a1270c47dce7b414898d9fbf17fa830212b3d131ea92a9cd87e048d445c45802',
      wethManager: 'a5138c75023427a3959141906b49ba74da1135b0598bff812ee85b9cf46c8478',
      xHashExist: 'a5fb7ef2bde7e61fb3c2ebe8f036cc8e8bce2fe815df12fbdf2d97455b832a42',
    }
  }
};

const get = function(network, conf = {}) {
  if (typeof network !== 'string') {
    throw new Error('Network must be a string');
  }

  const networkConfig = network === 'mainnet' ? mainnetConfig : testnetConfig;
  const config = Object.assign({}, defaultConfig, networkConfig, conf);

  if (process.platform === 'darwin') {
    config.rpcIpcPath += '/Library/Wanchain/gwan.ipc';
    config.keyStorePath = path.join(config.keyStorePath, '/Library/wanchain/', network, 'keystore/');
    config.ethkeyStorePath = path.join(config.ethkeyStorePath, '/Library/ethereum/', network, 'keystore/');
  }

  else if (process.platform === 'freebsd' || process.platform === 'linux' || process.platform === 'sunos') {
    config.rpcIpcPath += '/.wanchain/gwan.ipc';
    config.keyStorePath = path.join(config.keyStorePath, '.wanchain', network, 'keystore/');
    config.ethkeyStorePath = path.join(config.ethkeyStorePath, '.ethereum', network, 'keystore/');
  }

  else if (process.platform === 'win32') {
    config.rpcIpcPath = '\\\\.\\pipe\\gwan.ipc';
    config.keyStorePath = path.join(process.env.APPDATA, 'wanchain', network, 'keystore\\');
    config.ethkeyStorePath = path.join(process.env.APPDATA, 'ethereum', network, 'keystore\\');
  }

  return config;
};

module.exports = { get };
