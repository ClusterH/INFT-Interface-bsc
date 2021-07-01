import { useEffect, useState } from 'react';
import { useWallet } from '@binance-chain/bsc-use-wallet';
import bidFactory from '@/contracts/bid-factory';

export default (contractAddress: string) => {
  const wallet = useWallet();
  const [bidderPrice, setBidderPrice] = useState('0');
  const bidContract = bidFactory(contractAddress);

  useEffect(() => {
    if (wallet.status === 'connected') {
      (async () => {
        const _bidderPrice = await getBidderPrice(wallet.account as string);
        setBidderPrice(_bidderPrice);
      })();
    }
  }, [wallet]);

  /** 我的出价 */
  const getBidderPrice = async (address: string) => {
    try {
      return await bidContract.methods.getBidderPrice(address).call();
    } catch (error) {
      console.error(error);
      return '0';
    }
  };

  return bidderPrice;
};
