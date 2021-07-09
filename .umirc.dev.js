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

    'process.env.bscRpcURL': 'https://bsc-dataseed.binance.org/',
  },
  proxy: {
    '/inft/api/v1/': {
      target: 'http://8.214.29.180:8008',
      changeOrigin: true,
      pathRewrite: { '^/inft': '' },
    },
  },
});
