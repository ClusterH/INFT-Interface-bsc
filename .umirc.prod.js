import { defineConfig } from 'umi';

export default defineConfig({
  define: {
    'process.env.inftBASE': '/inft/api/v1/',
    // Mainnet
    'process.env.chainId': 56,
    'process.env.rpcURL': 'https://bsc-dataseed1.binance.org/',
    // Testnet
    // 'process.env.chainId': 97,
    // 'process.env.rpcURL': 'https://data-seed-prebsc-1-s1.binance.org:8545/',
    'process.env.BID_TOKEN_CONTRACT':
      '0x6352f57A0E17FE177fbfcdEa7FDAd83427b6B2b2',
  },
});
