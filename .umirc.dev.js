import { defineConfig } from 'umi';

export default defineConfig({
  define: {
    // Mainnet
    'process.env.chainId': 56,
    'process.env.rpcURL': 'https://bsc-dataseed1.binance.org/',
    // Testnet
    // 'process.env.chainId': 97,
    // 'process.env.rpcURL': 'https://data-seed-prebsc-1-s1.binance.org:8545/',
  },
});
