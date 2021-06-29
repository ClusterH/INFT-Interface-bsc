import { useState, useEffect } from 'react';
import bidContract from '@/contracts/bid';
import bidTokenContract from '@/contracts/bid-token';

/** 暂时未使用参数id */
export default (id: string | number) => {
  const [auction, setAucton] = useState({});

  useEffect(() => {
    setup();
  }, []);

  const setup = async () => {
    const bidEvents = await getBidRecords();
    const highestBidder = await getHighestBidder();
    const endTime = await getEndTime();
    const owner = await getTokenOwner();
    const description = await getDescription();
    const name = await getName();
    const isFinish = await getIsFinish(endTime);

    setAucton({
      name,
      description,
      endTime,
      isFinish,
      owner,
      highestBidder,
      bidEvents,
    });
  };

  /** 获取竞拍记录 */
  const getBidRecords = async () => {
    try {
      const events = await bidContract.getPastEvents('NewBid', {
        fromBlock: 10124363,
        toBlock: 'latest',
      });
      return events;
    } catch (error) {
      console.log('getBidRecords err:', error);
    }
  };

  /** 最高出价 */
  const getHighestBidder = async () => {
    try {
      return await bidContract.methods.highestPrice().call();
    } catch (error) {
      return '0';
    }
  };

  /** 结束时间 */
  const getEndTime = async () => {
    try {
      return await bidContract.methods.endTime().call();
    } catch (error) {
      return 0;
    }
  };

  /** 拥有者 */
  const getTokenOwner = async () => {
    try {
      return await bidTokenContract.methods.ownerOf(id).call();
    } catch (error) {
      return '';
    }
  };

  /** NFT 描述 */
  const getDescription = async () => {
    try {
      return await bidContract.methods.ItemDescription().call();
    } catch (error) {
      console.log('getDescription error:', error);
      return '';
    }
  };

  /** NFT 名字 */
  const getName = async () => {
    try {
      return await bidContract.methods.name().call();
    } catch (error) {
      console.log('getName error:', error);
      return '';
    }
  };

  /** 拍卖是否已结束 */
  const getIsFinish = async (_endTime: string) => {
    return Date.now() > parseInt(_endTime) * 1000;
  };

  return auction;
};
