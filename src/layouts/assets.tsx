import * as bsc from '@binance-chain/bsc-use-wallet';
import Header from '@/components/header';

const chainId = process.env.chainId; // taste-frontend-farms
const rpcUrl = process.env.rpcURL;

export default (props) => {
  return (
    <bsc.UseWalletProvider
      chainId={chainId}
      connectors={{
        walletconnect: { rpcUrl },
        bsc,
      }}
    >
      <Header />
      {props.children}
    </bsc.UseWalletProvider>
  );
};
