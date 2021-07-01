import { useState, useEffect } from 'react';
import Web3 from 'web3';
// import { useWallet } from '@binance-chain/bsc-use-wallet';
import { fetchInftIpfs } from '@/servers';
import bidFactory from '@/contracts/bid-factory';
import bidTokenFactory from '@/contracts/bid-token-factory';

const web3 = new Web3(Web3.givenProvider);

interface IUseAuctionParams {
  id: string | number;
  bidContract: string;
  tokenContract: string;
}

export default (params: IUseAuctionParams) => {
  const [auction, setAucton] = useState({});
  const { id, bidContract: bidContractAddress, tokenContract } = params;

  useEffect(() => {
    const bidContract = bidFactory(bidContractAddress);
    const bidTokenContract = bidTokenFactory(tokenContract);

    setup(id, bidContract, bidTokenContract);
    listenerNewBid(bidContract, bidTokenContract);
  }, []);

  /** 监听竞拍事件-更新数据 */
  const listenerNewBid = (bidContract: any, bidTokenContract: any) => {
    bidContract.events.NewBid(function (error: Error, event: any) {
      if (error) {
        console.error(error);
      } else {
        console.log(event);
        setup(id, bidContract, bidTokenContract);
      }
    });
  };

  const setup = async (
    _id: string | number,
    bidContract: any,
    bidTokenContract: any,
  ) => {
    const bidEvents = await getBidRecords(bidContract);
    const highestBidder = await getHighestBidder(bidContract);
    const endTime = await getEndTime(bidContract);
    const owner = await getTokenOwner(bidTokenContract);
    const description = await getDescription(bidContract);
    const name = await getName(bidContract);
    const startTime = await getStartTime(bidContract);
    const isStart = await getIsStart(startTime);
    const isFinish = await getIsFinish(endTime);
    const tokenMetadata = await getToken(_id, bidTokenContract);
    const nftContract = await getNFTContractAddress(bidContract);
    const _auction = !isFinish ? await getAuction(bidContract) : null;

    await setRecordsTime(bidEvents);

    setAucton({
      ...auction,
      id,
      bidContract: bidContractAddress,
      nftContract,
      name,
      description,
      startTime,
      isStart,

      endTime,
      isFinish,
      owner,
      highestBidder,
      bidEvents: bidEvents.reverse(),
      tokenMetadata,
      auction: _auction,
    });
  };

  /** 获取竞拍记录 */
  const getBidRecords = async (bidContract: any) => {
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

  /** 获取并设置竞价事件时间 */
  const setRecordsTime = async (events: any[]) => {
    for (const event of events) {
      const timestamp = await _getBlockTimestamp(event.blockNumber);
      event.timestamp = timestamp;
    }
  };

  /** 获取区块时间 */
  const _getBlockTimestamp = async (
    blockNumber: string | number,
  ): Promise<number | string> => {
    try {
      const { timestamp } = await web3.eth.getBlock(blockNumber);
      console.log(timestamp);
      return timestamp;
    } catch (error) {
      return _getBlockTimestamp(blockNumber);
    }
  };

  /** 最高出价 */
  const getHighestBidder = async (bidContract: any) => {
    try {
      return await bidContract.methods.highestPrice().call();
    } catch (error) {
      return '0';
    }
  };

  /** 结束时间 */
  const getEndTime = async (bidContract: any) => {
    try {
      return await bidContract.methods.endTime().call();
    } catch (error) {
      return 0;
    }
  };

  /** 拥有者 */
  const getTokenOwner = async (bidTokenContract: any) => {
    try {
      return await bidTokenContract.methods.ownerOf(id).call();
    } catch (error) {
      return '';
    }
  };

  /** NFT 描述 */
  const getDescription = async (bidContract: any) => {
    try {
      return await bidContract.methods.ItemDescription().call();
    } catch (error) {
      console.log('getDescription error:', error);
      return '';
    }
  };

  /** NFT 名字 */
  const getName = async (bidContract: any) => {
    try {
      return await bidContract.methods.name().call();
    } catch (error) {
      console.log('getName error:', error);
      return '';
    }
  };

  /** 活动是否开始 */
  const getIsStart = async (_startTime: string) => {
    return Date.now() > parseInt(_startTime) * 1000;
  };

  /** 拍卖是否已结束 */
  const getIsFinish = async (_endTime: string) => {
    return Date.now() > parseInt(_endTime) * 1000;
  };

  /** 获取token信息 */
  const getToken = async (_id: string | number, bidTokenContract: any) => {
    const uri = await bidTokenContract.methods.tokenURI(_id).call();
    return await _getMetadata(uri);
  };

  /** 获取metadata */
  const _getMetadata = async (uri: string): Promise<any> => {
    try {
      const cid = uri.split('ipfs://').pop() || '';
      const metadata: any = await fetchInftIpfs(cid);
      console.log('metadata: ', metadata);
      return metadata;
    } catch (error) {
      return await _getMetadata(uri);
    }
  };

  /** 开始时间 */
  const getStartTime = async (bidContract: any) => {
    try {
      return await bidContract.methods.startTime().call();
    } catch (error) {
      console.log('getStartTime', error);
      return '0';
    }
  };

  /** 获取拍卖合约地址 */
  const getNFTContractAddress = async (bidContract: any) => {
    try {
      return await bidContract.methods.NFTContractAddress().call();
    } catch (error) {
      console.log('error', error);
      return '';
    }
  };

  /** 获取拍卖信息 */
  const getAuction = async (bidContract: any) => {
    try {
      return await bidContract.methods.getAuctions().call();
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  return auction;
};
