import { useState, useEffect } from 'react';
import auctionFactory from '@/contracts/bid-factory';

export interface IUseAuctionInfoParams {
  /** NFT tokenId */
  id: string | number;
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

let auctionContract: any = null;
export default (params: IUseAuctionInfoParams) => {
  const { id, contract } = params;
  const [auction, setAuction] = useState<IAuctionData | null>(null);

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
    auctionContract = auctionFactory(contract);
    const endTime = await getEndTime();
    const isEnd = await getIsEnd(endTime);
    const _auction = await getAuctionData(isEnd);

    setAuction(_auction);
  };

  /** 监听竞拍事件-更新数据 */
  const listenerNewBid = () => {
    auctionContract.events.NewBid(function (error: Error, event: any) {
      if (error) {
        console.error(error);
      } else {
        console.log(event);
        setup();
      }
    });
  };

  /** 获取拍卖信息 */
  const getAuctionData = async (isEnd: boolean): Promise<IAuctionData | null> => {
    let _auction = null;

    // if (!isEnd) {
    //   try {
    //     _auction = await auctionContract.methods.getAuctions(); // todo
    //   } catch (error) {
    //     _auction = await getAuctionDataItems();
    //   }
    // } else {
    //   _auction = await getAuctionDataItems();
    // }
    _auction = await getAuctionDataItems();

    if (_auction) {
      return {
        id,
        auctionContract: contract,
        nftContract: _auction.nftContract,
        name: _auction.name,
        description: _auction.description,
        startTime: _auction.startTime,
        isStart: _auction.isStart,
        endTime: _auction.endTime,
        isEnd: _auction.isEnd,
        highestPrice: _auction.highestPrice,
        highestBidder: _auction.highestBidder,
      };
    }
    return null;
  };

  /** 活动结束后，无法直接查询合约信息,需要逐项查询合约信息 */
  const getAuctionDataItems = async () => {
    try {
      const [_nftContract, _name, _description, _startTime, _endTime, _highestPrice, _highestBidder] = await Promise.all([
        await auctionContract.methods.NFTContractAddress().call(),
        await auctionContract.methods.name().call(),
        await auctionContract.methods.ItemDescription().call(),
        await auctionContract.methods.startTime().call(),
        await auctionContract.methods.endTime().call(),
        await auctionContract.methods.highestPrice().call(),
        await auctionContract.methods.highestBidder().call(),
      ]);

      return {
        nftContract: _nftContract,
        name: _name,
        description: _description,
        startTime: _startTime,
        endTime: _endTime,
        isStart: isStart(_startTime),
        isEnd: getIsEnd(_endTime),
        highestPrice: _highestPrice,
        highestBidder: _highestBidder,
      };
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  /** 结束时间 */
  const getEndTime = async () => {
    try {
      return await auctionContract.methods.endTime().call();
    } catch (error) {
      return '0';
    }
  };
  /** 拍卖是否已结束 */
  const getIsEnd = (_endTime: string) => {
    console.log(Date.now(), Number(_endTime) * 1000);
    console.log('isEnd', Date.now() > Number(_endTime) * 1000);
    return Date.now() > Number(_endTime) * 1000;
  };

  const isStart = (_startTime: string) => {
    return Date.now() > Number(_startTime) * 1000;
  };

  return auction;
};
