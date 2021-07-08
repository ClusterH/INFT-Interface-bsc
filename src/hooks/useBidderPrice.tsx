import { useEffect, useState } from 'react';
import { useWallet } from '@binance-chain/bsc-use-wallet';
import bidFactory from '@/contracts/bid-factory';

export interface IUseBidderPrice {
  /** 拍卖合约地址 */
  contract: string;
}

export default (contract: string): string => {
  const wallet = useWallet();
  const [bidderPrice, setBidderPrice] = useState('0');
  const bidContract = bidFactory(contract);

  useEffect(() => {
    if (!contract) return;

    if (wallet.status === 'connected') {
      (async () => {
        const _bidderPrice = await getBidderPrice(wallet.account as string);
        setBidderPrice(_bidderPrice);
      })();
    }
  }, [contract, wallet]);

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
