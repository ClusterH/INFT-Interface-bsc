# Header

```jsx
import React from 'react'; // react一定要手动引入
import * as bsc from '@binance-chain/bsc-use-wallet';
import Header from '@/components/header/header.tsx' // 可以在 .umirc.ts配置alias
const chainId = 97; // taste-frontend-farms
const rpcUrl = 'https://data-seed-prebsc-1-s1.binance.org:8545/';

export default () => (
     <bsc.UseWalletProvider
      chainId={chainId}
      connectors={{
        walletconnect: { rpcUrl },
        bsc,
      }}
    >
      <Header />
    </bsc.UseWalletProvider>
)
```