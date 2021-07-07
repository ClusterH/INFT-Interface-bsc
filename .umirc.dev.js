import { defineConfig } from 'umi';

export default defineConfig({
  define: {
    'process.env.inftBASE': '/inft/api/v1/',
    // Mainnet
    'process.env.chainId': 56,
    'process.env.rpcURL': 'https://bsc-dataseed.binance.org/',
    // Testnet
    // 'process.env.chainId': 97,
    // 'process.env.rpcURL': 'https://data-seed-prebsc-1-s1.binance.org:8545/',

    'process.env.TOKEN_CONTRACT': '0x52b29289DF14c9Ee2c135378c8c9Cd4eDA867BA8',
    'process.env.BID_CONTRACT': '0xC14d3cdCd7291Bd6B464f1A9052CBd0A3404F9B8',
    'process.env.BID_CONTRACT_CREATED_BLOCK': 8945512,
  },
  proxy: {
    '/inft/api/v1/': {
      target: 'http://8.214.29.180:8008',
      changeOrigin: true,
      pathRewrite: { '^/inft': '' },
    },
  },
});
