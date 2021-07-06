import { useEffect, useState } from 'react';
import bidFactory from '@/contracts/bid-factory';
import { IAuctionData } from '@/hooks/useAuctionData';

export interface IUseBidHistoryParams {
  /** 合约信息-useAuctionData的返回值 */
  auction: IAuctionData;
}

const step = 5000;
const createdBlockNumber = process.env.BID_CONTRACT_CREATED_BLOCK;
let auctionContract: any | null = null;
export default (params: IUseBidHistoryParams): any[] => {
  const { auction } = params;
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    auction && auction.isStart && setup();

    /** 活动进行中，监听竞拍事件，自动更新拍卖记录 */
    auction && auction.isStart && !auction.isEnd && listenerNewBid();
  }, [auction]);

  const setup = async () => {
    const { auctionContract: contract } = auction;
    auctionContract = bidFactory(contract);
    const _events = await getBidHistory();

    setEvents(_events);
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

  /** 获取竞拍记录 */
  const getBidHistory = async () => {
    const latest = await getLatestBlockNumber(auction.startTime, auction.endTime);
    // console.log('latest', latest);
    let from = Number(createdBlockNumber);
    let to = from + step;

    let events: any[] = [];
    do {
      const ret = await getBidEvents(from, to);
      //   console.log(from, to, latest, ret);

      from = from + step;
      to = to + step;
      if (ret.length) {
        events = events.concat(ret);
      }
    } while (from < latest);

    return events;
  };

  const getBidEvents = async (fromBlock: number, toBlock: number) => {
    try {
      const events = await auctionContract.getPastEvents('NewBid', {
        fromBlock,
        toBlock,
      });

      return events;
    } catch (error) {
      console.log(error.message);
      return [];
    }
  };

  /**
   * 估算结束时区块高度
   * bsc出块速度约为 3s一个块
   * 为了增加容错，按2.5s一个块计算
   * 结束时区块高度：(结束时间 - 开始时间) / 2.5 + 开始时区块高度
   * */
  const getLatestBlockNumber = (startTime: string, endTime: string): number => {
    return Math.ceil((Number(endTime) - Number(startTime)) / 2.5 + Number(createdBlockNumber));
  };

  return events;
};
