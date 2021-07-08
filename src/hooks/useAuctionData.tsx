import { useState, useEffect } from 'react';
import auctionFactory from '@/contracts/bid-factory';

export interface IUseAuctionInfoParams {
  /** 拍卖合约地址 */
  contract: string;
}

export interface IAuctionData {
  id: string | number;
  auctionContract: string;
  nftContract: string;
  name: string;
  description: string;
  startTime: string;
  isStart: boolean;
  endTime: string;
  isEnd: boolean;
  highestPrice: string;
  highestBidder: string;
}

const defaultAuction = {
  id: '',
  auctionContract: '',
  nftContract: '',
  name: '',
  description: '',
  startTime: '',
  isStart: false,
  endTime: '',
  isEnd: false,
  highestPrice: '',
  highestBidder: '',
};

export default (params: IUseAuctionInfoParams) => {
  const { contract } = params;
  const [auction, setAuction] = useState<IAuctionData>(defaultAuction);

  useEffect(() => {
    setup();
  }, []);

  /** 活动开始且未结束，需要监听拍卖事件更新拍卖信息 */
  useEffect(() => {
    if (auction && auction?.isStart && !auction.isEnd) {
      listenerNewBid();
    }
  }, [auction]);

  const setup = async () => {
    const dataItems = await getAuctionDataItems();
    if (dataItems) {
      setAuction({
        ...auction,
        ...dataItems,
        auctionContract: contract,
      });
    }
  };

  // /** 用户钱包账户、用户最新出价 */
  // const initAccountInfo = async () => {
  //   if (!account) {
  //     setAuction({
  //       ...auction,
  //       account: '',
  //       accountPrice: '0',
  //     });

  //     return;
  //   }

  //   try {
  //     const auctionContract = auctionFactory(contract);
  //     // const accountPrice = await auctionContract.methods.getBidderPrice(account).call();
  //     const accountPrice = '100000000000000000';

  //     console.log('accountPrice', account, accountPrice);
  //     setAuction({
  //       ...auction,
  //       account,
  //       accountPrice,
  //     });
  //   } catch (error) {
  //     setAuction({
  //       ...auction,
  //       account: '',
  //       accountPrice: '0',
  //     });
  //   }
  // };

  /** 监听竞拍事件-更新数据 */
  const listenerNewBid = () => {
    const auctionContract = auctionFactory(contract);

    auctionContract.events.NewBid(function (error: Error, event: any) {
      if (error) {
        console.error(error);
      } else {
        console.log(event);
        setup();
      }
    });
  };

  /** 活动结束后，无法直接查询合约信息,需要逐项查询合约信息 */
  const getAuctionDataItems = async () => {
    try {
      const auctionContract = auctionFactory(contract);

      const [nftContract, name, description, startTime, endTime, highestPrice, highestBidder, id] = await Promise.all([
        await auctionContract.methods.NFTContractAddress().call(),
        await auctionContract.methods.name().call(),
        await auctionContract.methods.ItemDescription().call(),
        await auctionContract.methods.startTime().call(),
        await auctionContract.methods.endTime().call(),
        await auctionContract.methods.highestPrice().call(),
        await auctionContract.methods.highestBidder().call(),
        await auctionContract.methods.tokenId().call(),
      ]);

      return {
        id,
        nftContract,
        name,
        description,
        startTime,
        endTime,
        highestPrice,
        highestBidder,
        isStart: isStart(startTime),
        isEnd: getIsEnd(endTime),
      };
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  /** 拍卖是否已结束 */
  const getIsEnd = (_endTime: string) => {
    return Date.now() > Number(_endTime) * 1000;
  };

  const isStart = (_startTime: string) => {
    return Date.now() > Number(_startTime) * 1000;
  };

  return auction;
};
