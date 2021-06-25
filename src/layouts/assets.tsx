import * as bsc from '@binance-chain/bsc-use-wallet';
import Header from '@/components/header';
import React from 'react';
import Footer from '@/components/footer';
import styles from './styles.less';

const chainId = process.env.chainId; // taste-frontend-farms
const rpcUrl = process.env.rpcURL;

export default (props: React.PropsWithChildren<any>) => {
  return (
    <bsc.UseWalletProvider
      chainId={chainId as unknown as number}
      connectors={{
        walletconnect: { rpcUrl: rpcUrl as string },
        bsc,
      }}
    >
      <Header />
      <div className={styles.content}>{props.children}</div>
      <Footer />
    </bsc.UseWalletProvider>
  );
};
