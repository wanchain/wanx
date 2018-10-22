const path = require('path');

const testnetConfig = {
  network: 'testnet',
  chainId: 3,
  wethTokenAddress: '0x46397994a7e1e926ea0de95557a4806d38f10b0d',
  wbtcTokenAddress: '0x3ba524a9b01de0953ba8fe720befac9e14ff95b9',
  ethHtlcAddr: '0x358b18d9dfa4cce042f2926d014643d4b3742b31',
  wanHtlcAddr: '0xfbaffb655906424d501144eefe35e28753dea037',
  ethHtlcAddrE20: '0x87a0dee965e7679d15327ce0cc3df8dfc009b43d',
  wanHtlcAddrE20: '0xe10515355e684e515c9c632c9eed04cca425cda1',
  wanHtlcAddrBtc: '0x5c35c015da4299a039e58b42ef474d94324da5e4',
};

const mainnetConfig = {
  network: 'mainnet',
  chainId: 1,
  wethTokenAddress: '0x46397994a7e1e926ea0de95557a4806d38f10b0d',
  wbtcTokenAddress: '0x3ba524a9b01de0953ba8fe720befac9e14ff95b9',
  ethHtlcAddr: '0x358b18d9dfa4cce042f2926d014643d4b3742b31',
  wanHtlcAddr: '0xfbaffb655906424d501144eefe35e28753dea037',
  ethHtlcAddrE20: '0x87a0dee965e7679d15327ce0cc3df8dfc009b43d',
  wanHtlcAddrE20: '0xe10515355e684e515c9c632c9eed04cca425cda1',
  wanHtlcAddrBtc: '0x5c35c015da4299a039e58b42ef474d94324da5e4',
};

const defaultConfig = {
  wanNodeUrl: null,
  ethNodeUrl: null,

  wanKeyStorePath: process.env.HOME,
  ethkeyStorePath: process.env.HOME,

  btcNode: {
    host: 'localhost',
    port: 18332,
    user: 'btcuser',
    pass: 'btcpass',
  },

  signatures: {
    ERC20: {
      Approval: '8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925',
      Transfer: 'ddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
      allowance: 'dd62ed3e90e97b3d417db9c0c7522647811bafca5afc6694f143588d255fdfb4',
      approve: '095ea7b334ae44009aa867bfb386f5c3b4b443ac6f0ee573fa91c4608fbadfba',
      approveAndCall: 'cae9ca5133009d821214ac8231b3d170f22d822ee165adb631578070b6316fc9',
      balanceOf: '70a08231b98ef4ca268c9cc3f6b4590e4bfec28280db06bb5d45e689f2a360be',
      decimals: '313ce567add4d438edf58b94ff345d7d38c45b17dfc0f947988d7819dca364f9',
      name: '06fdde0383f15d582d1a74511486c9ddf862a882fb7904b3d9fe9b8b8e58a796',
      symbol: '95d89b41e2f5f391a79ec54e9d87c79d6e777c63e32c28da95b4e9e4a79250ec',
      totalSupply: '18160ddd7f15c72528c2f94fd8dfe3c8d5aa26e2c50c7d81f4bc7bee8d4b7932',
      transfer: 'a9059cbb2ab09eb219583f4a59a5d0623ade346d962bcd4e46b11da047c9049b',
      transferFrom: '23b872dd7302113369cda2901243429419bec145408fa8b352b3dd92b66c680b',
      version: '54fd4d50fce680dbc2593d9e893064bfa880e5642d0036394e1a1849f7fc0749',
    },
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
      eth2wethLock: '158e00a342a6a175423f99fa73b6143cdac32c9dba957cd42735256612aba28f',
      eth2wethRefund: '2000fe50eb66b272498817cbcb32b4ba2687299ce7c892deb9e2cd62d94ea02f',
      eth2wethRevoke: 'fecea9fb53c2efe720dfbc8570f21fe9a5bc3397dfb8b102d4e7b54b03e33b01',
      getHTLCLeftLockedTime: 'b62b85b7a46fd5489682e60150558b72a69226a5dd76f40fc182dbc21b089f43',
      lockedTime: 'a8b38205c16324dd50ed34ad97bdea9ca08b14e19bbf8ce02930a470feb20625',
      mapXHashHTLCTxs: '5c6698abd73456a050981cd02e7dbbb6d37b618a12bd938017187dd8370bfdf2',
      mapXHashShadow: '05438358bc76be8eaa131ebc5ee9d0fc4cc5dc563f08534cfce0bfca5ee1b21f',
      revokeFeeRatio: 'ad3cc2e505f559d4e06a8c658c8d285d6ab6cc7df130403c25037798abe59f45',
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
      eth2wethLock: '9c4380340ba82d85d70663758c75c5183c36a2e5b1b8d90d2d6a1b7b80f7edcf',
      eth2wethRefund: '2000fe50eb66b272498817cbcb32b4ba2687299ce7c892deb9e2cd62d94ea02f',
      eth2wethRevoke: 'fecea9fb53c2efe720dfbc8570f21fe9a5bc3397dfb8b102d4e7b54b03e33b01',
      getHTLCLeftLockedTime: 'b62b85b7a46fd5489682e60150558b72a69226a5dd76f40fc182dbc21b089f43',
      getWeth2EthFee: 'd10bafecb0fc895ae01f2250c9ebcdf4250dfee448c292ae1bbb757e150c6b34',
      lockedTime: 'a8b38205c16324dd50ed34ad97bdea9ca08b14e19bbf8ce02930a470feb20625',
      mapXHashFee: '9b58c6d2696f2e6765fbc629e1dd891103bc78dd17eca233e5a89ef8f2e42c05',
      mapXHashHTLCTxs: '5c6698abd73456a050981cd02e7dbbb6d37b618a12bd938017187dd8370bfdf2',
      mapXHashShadow: '05438358bc76be8eaa131ebc5ee9d0fc4cc5dc563f08534cfce0bfca5ee1b21f',
      revokeFeeRatio: 'ad3cc2e505f559d4e06a8c658c8d285d6ab6cc7df130403c25037798abe59f45',
      storemanGroupAdmin: '820413f35662c85e6fa65903ec21906291f0d3dd5a8ee034bd79e33eeb56332b',
      weth2ethLock: '004b4329bcce8c8e32c23eb8380c7f15198e9c32c7d4db6f1f9b335b90d90625',
      weth2ethRefund: '514d0b01bc210977074fbf1048be9b5dbb40c503a74b954e54b2ac200c3b4e73',
      weth2ethRevoke: 'a1270c47dce7b414898d9fbf17fa830212b3d131ea92a9cd87e048d445c45802',
      wethManager: 'a5138c75023427a3959141906b49ba74da1135b0598bff812ee85b9cf46c8478',
      xHashExist: 'a5fb7ef2bde7e61fb3c2ebe8f036cc8e8bce2fe815df12fbdf2d97455b832a42',
    },
    HTLCWBTC: {
      BTC2WBTCLock: 'bc5d2ea574e7cf33bf89888310d2e83efc204c5741f027dc1e36e0c482f75504',
      BTC2WBTCLockNotice: '4df7eaaa997eefec714b3071606b65fe3e6f00c69eba7dc8a37d297bde5104e0',
      BTC2WBTCRedeem: '385682be73a1291636f1a221b14b262a07bd9087e8835a6f83a9f9dcf3f288a5',
      BTC2WBTCRevoke: '3f83d9a66c292b55203fda3281fbf025cae4b6b333ffa2f41cd8ec507c09287d',
      BTC_INDEX: '25dbad8a4e18df92bf74f2ba3ab4f99c284b060c9ef925a3be0d142931a2a8e9',
      DEF_LOCKED_TIME: '79d90d8fdd6f63ab8414be6ecb4f73e62b1b4600d821d4868bb840c7dcbb7f10',
      DEF_MAX_TIME: 'cc062f2f3c2ff1c6c5c15ebf0d54b638c057fdbe63de5e24b71b9c6595fbae0f',
      EMPTY_BYTE32: 'b6e9f75273f5b1e0a180eb8e66ea5af2a93089553283e46e339909ea9b51c055',
      RATIO_PRECISE: '1d57d55c4d467dff3b18bc31ab1fd3a9924149698e3d0b8e871a41dc1574e009',
      WBTC2BTCLock: 'b3f2b83573510a8a78ef9f3c13607e652fadfdd3b5e4221c0bacac2d71f0825b',
      WBTC2BTCLockNotice: '5b04add5f5eb94f84a696ab006eaaf0dc1639783dc8f54940ded06724fa35ff2',
      WBTC2BTCRedeem: 'b14237ef866bda774abbf3c3b15c2bb257a0772c87653062c094475389287283',
      WBTC2BTCRevoke: 'ef206854b0c99cab1d407e5e2c63c750e84ad01ffc9a7e4242a5c20a09ba6d2a',
      btc2wbtcLock: 'e0605ad9e88fc86d7e39c1f5c1027f3bf5eb40df24bc820f242846cb4b66feb9',
      btc2wbtcLockNotice: 'a1a3f15ec35bfb4b2e3a3c0397ae917e32e5fa8bb310bab06ddef4161aabacab',
      btc2wbtcRedeem: '0aed10334d4abe2fef149289bcf5ebefb19ded189a9406e28e752f4c756a85ee',
      btc2wbtcRevoke: '88f3d550049f628329f6a6c6b7daaf6fdd6b40690fc20c255592e97e334fe9f4',
      coinAdmin: 'cd2290fba844b203554ffe5686d62fb90f68d1748484a77e651737a259a593e4',
      getHTLCLeftLockedTime: 'b62b85b7a46fd5489682e60150558b72a69226a5dd76f40fc182dbc21b089f43',
      getWbtc2BtcFee: '92cad454b9efb780e94c3d4d8ea554857bb42e6fd00849acdaee4fceeebf6546',
      lockedTime: 'a8b38205c16324dd50ed34ad97bdea9ca08b14e19bbf8ce02930a470feb20625',
      mapXHash2BtcLockedNotice: 'bcc1aa64fa431f24015b8f07b74d3e8f3bdf57fa8f1dfe6cd02787a75b49055a',
      mapXHashFee: '9b58c6d2696f2e6765fbc629e1dd891103bc78dd17eca233e5a89ef8f2e42c05',
      mapXHashHTLCTxs: '5c6698abd73456a050981cd02e7dbbb6d37b618a12bd938017187dd8370bfdf2',
      mapXHashShadow: '05438358bc76be8eaa131ebc5ee9d0fc4cc5dc563f08534cfce0bfca5ee1b21f',
      revokeFeeRatio: 'ad3cc2e505f559d4e06a8c658c8d285d6ab6cc7df130403c25037798abe59f45',
      storemanGroupAdmin: '820413f35662c85e6fa65903ec21906291f0d3dd5a8ee034bd79e33eeb56332b',
      wbtc2btcLock: '81791d8c7c2b5813626fe6828670f101ac6cfe7a08bda18d29b5da87821875e6',
      wbtc2btcLockNotice: '23644dde0a8e41b1057329d9da0af96e1eef5e49ab5bf341af9093cf1342f1da',
      wbtc2btcRedeem: '5ade6a4dd99dd350d756f44ebbd928817779f5c7ec7d7eb6ec3c5e82dfed772b',
      wbtc2btcRevoke: '5e76e57808a4e03bbb08e611437b0e4ac2ee9b6a2fd42917c4e0eba77d24fe76',
      wbtcManager: '1d857c60842ac1e90296c0952f77af979bdca64783df9718d18ab5efeb7ea2b6',
      xHashExist: 'a5fb7ef2bde7e61fb3c2ebe8f036cc8e8bce2fe815df12fbdf2d97455b832a42',
    },
    HTLCETH_ERC20: {
      DEF_LOCKED_TIME: '79d90d8fdd6f63ab8414be6ecb4f73e62b1b4600d821d4868bb840c7dcbb7f10',
      DEF_MAX_TIME: 'cc062f2f3c2ff1c6c5c15ebf0d54b638c057fdbe63de5e24b71b9c6595fbae0f',
      InboundLockLogger: 'a5c7f9318dedb570b8f7f86c6569ee9f5eace97a838efdc0a6f289e0b7e52a05',
      InboundRefundLogger: 'ff9a0eff6f7f4e744f6e74af690e97b6c8a9e54572b020d2ac232b5134f98235',
      InboundRevokeLogger: 'f4d51d8c04ad099991f03b1caef8531e845d6085612bcd4e86ff71789510b5c8',
      OutboundLockLogger: 'b9d34e3f1025e09843dd0351539ae19e826fe56b86d10c8936b6fcee221bdfdb',
      OutboundRefundLogger: 'eb380e702cf9f3359cf12160ac44560c31f00233c4a7a3540fb2726510c720b6',
      OutboundRevokeLogger: 'e7ebd8ab7c92ce6cb5b867e57cff88548c6719d07146d1e9e45c4cee80b29aa7',
      RATIO_PRECISE: '1d57d55c4d467dff3b18bc31ab1fd3a9924149698e3d0b8e871a41dc1574e009',
      TokenAddedLogger: '62fab4362fdd67583b35b087ab046f89366bb251c258372c7a22805af10dbf68',
      addToken: 'd48bfca77c1c8a493ffa97c292a53d8c42ff94728df4dab260e86bc742b6160e',
      getHTLCLeftLockedTime: '5057735d407d460cdd6b041308b807098d0b00994fa599c981b89f34747e895b',
      inboundLock: '92aea36d358c5328a1e46970d7a90ffd9dcfb997c1b2647a284bd636c40e94ed',
      inboundRefund: '6b2dedb9d0b9a71c1830064866c34145d277216f990e88a5153d66740acc55f8',
      inboundRevoke: '2d3acdbb8994e76893f3803a58218748e994fdbb224ad64a174c2ef411406afa',
      lockedTime: 'a8b38205c16324dd50ed34ad97bdea9ca08b14e19bbf8ce02930a470feb20625',
      mapTokenSupported: 'c9eb5fb673448eb3cf4d81ee69a661d22c3f22f7cfb781900db42a1d9abc8a6c',
      mapXHashHTLCTxs: 'ad727402ad33249cb5f51cc10855580b9d87f7cb3b3d864d20b1205a2327bdd0',
      mapXHashShadow: '6afb32d52c045e306dbc7fe9b0443716e0c7bf54f045ab92ed74f18a0ca09669',
      outboundLock: '2f48fc614e6ab8bad7af586e57b0dee4b25cd217f8d275078a5584bd73d1f72a',
      outboundRefund: '8185e0622b56f501e0a3897ced69c8708f16399092065fbb0c45337bb0af4cb8',
      outboundRevoke: '507dc32b1d67d82c6b88d9583c6a26a52f88f04852a65cf47a1508395fe667aa',
      revokeFeeRatio: 'ad3cc2e505f559d4e06a8c658c8d285d6ab6cc7df130403c25037798abe59f45',
      xHashExist: 'ece4e2177c503b8149d07ce2356b5b97e42db8187216d0ab123fd7b1f25dad73',
    },
    HTLCWAN_ERC20: {
      DEF_LOCKED_TIME: '79d90d8fdd6f63ab8414be6ecb4f73e62b1b4600d821d4868bb840c7dcbb7f10',
      DEF_MAX_TIME: 'cc062f2f3c2ff1c6c5c15ebf0d54b638c057fdbe63de5e24b71b9c6595fbae0f',
      InboundLockLogger: '225e922e480ef01b442ada1386b5faa26607e42e06b71ccd2e8db08da613b30d',
      InboundRefundLogger: 'ff9a0eff6f7f4e744f6e74af690e97b6c8a9e54572b020d2ac232b5134f98235',
      InboundRevokeLogger: 'f4d51d8c04ad099991f03b1caef8531e845d6085612bcd4e86ff71789510b5c8',
      OutboundLockLogger: 'ed0ea6b5f99893a1850b61fbbbfb8413304a4929d654a9b0fc12b52cba491429',
      OutboundRefundLogger: 'eb380e702cf9f3359cf12160ac44560c31f00233c4a7a3540fb2726510c720b6',
      OutboundRevokeLogger: 'e7ebd8ab7c92ce6cb5b867e57cff88548c6719d07146d1e9e45c4cee80b29aa7',
      RATIO_PRECISE: '1d57d55c4d467dff3b18bc31ab1fd3a9924149698e3d0b8e871a41dc1574e009',
      TokenAddedLogger: '62fab4362fdd67583b35b087ab046f89366bb251c258372c7a22805af10dbf68',
      addToken: 'd48bfca77c1c8a493ffa97c292a53d8c42ff94728df4dab260e86bc742b6160e',
      getHTLCLeftLockedTime: '5057735d407d460cdd6b041308b807098d0b00994fa599c981b89f34747e895b',
      getOutboundFee: '25a5377cf3ac1737496376d9d7fcbcd406491dd6309b9ac2fa3b2d80cafb2615',
      inboundLock: '122d7658c7a9890fae094a96c650af12592c388ea542c4bca82a0f1f142734f8',
      inboundRefund: '6b2dedb9d0b9a71c1830064866c34145d277216f990e88a5153d66740acc55f8',
      inboundRevoke: '2d3acdbb8994e76893f3803a58218748e994fdbb224ad64a174c2ef411406afa',
      lockedTime: 'a8b38205c16324dd50ed34ad97bdea9ca08b14e19bbf8ce02930a470feb20625',
      mapTokenSupported: 'c9eb5fb673448eb3cf4d81ee69a661d22c3f22f7cfb781900db42a1d9abc8a6c',
      mapXHashFee: 'e5111d432d5c521da329e44c754ab297aa6f6a6d84f86ea72b001ace1258f284',
      mapXHashHTLCTxs: 'ad727402ad33249cb5f51cc10855580b9d87f7cb3b3d864d20b1205a2327bdd0',
      mapXHashShadow: '6afb32d52c045e306dbc7fe9b0443716e0c7bf54f045ab92ed74f18a0ca09669',
      outboundLock: '42d3d55a487448f61df699b57fc600a615ad7bc6ce2c8a540e807fd62249387c',
      outboundRefund: '8185e0622b56f501e0a3897ced69c8708f16399092065fbb0c45337bb0af4cb8',
      outboundRevoke: '507dc32b1d67d82c6b88d9583c6a26a52f88f04852a65cf47a1508395fe667aa',
      quotaLedger: '40254165771fd18e5f9b7d47ff3e676dce22ef9f17a1a11a948e6647965d2062',
      revokeFeeRatio: 'ad3cc2e505f559d4e06a8c658c8d285d6ab6cc7df130403c25037798abe59f45',
      tokenManager: '2a709b14a4a9d9b2f0f15bae3ddf9164ab236df830b818ed86ab507149764435',
      xHashExist: 'ece4e2177c503b8149d07ce2356b5b97e42db8187216d0ab123fd7b1f25dad73',
    },
  },
};

const get = function(network, conf = {}) {
  if (typeof network !== 'string') {
    throw new Error('Network must be a string');
  }

  const networkConfig = network === 'mainnet' ? mainnetConfig : testnetConfig;
  const config = Object.assign({}, defaultConfig, networkConfig, conf);

  if (process.platform === 'darwin') {
    config.wanKeyStorePath = path.join(config.wanKeyStorePath, '/Library/wanchain/', network, 'keystore/');
    config.ethkeyStorePath = path.join(config.ethkeyStorePath, '/Library/ethereum/', network, 'keystore/');
  }

  else if (process.platform === 'freebsd' || process.platform === 'linux' || process.platform === 'sunos') {
    config.wanKeyStorePath = path.join(config.wanKeyStorePath, '.wanchain', network, 'keystore/');
    config.ethkeyStorePath = path.join(config.ethkeyStorePath, '.ethereum', network, 'keystore/');
  }

  else if (process.platform === 'win32') {
    config.wanKeyStorePath = path.join(process.env.APPDATA, 'wanchain', network, 'keystore\\');
    config.ethkeyStorePath = path.join(process.env.APPDATA, 'ethereum', network, 'keystore\\');
  }

  return config;
};

module.exports = {
  testnetConfig,
  mainnetConfig,
  defaultConfig,

  get,
};
