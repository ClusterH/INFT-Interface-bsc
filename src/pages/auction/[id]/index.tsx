import { useState, useEffect } from 'react';
import { useParams, useIntl } from 'umi';
import { Button, Input, Modal, notification } from 'antd';
import Web3 from 'web3';
// import bidContract from '@/contracts/bid';
import bidFactory from '@/contracts/bid-factory';
import bidTokenContract from '@/contracts/bid-token';
import erc721Factory from '@/contracts/factories/erc721';
import { useWallet } from '@binance-chain/bsc-use-wallet';
import AssetInfo from '@/components/asset-info-bid';
import Properties from '@/components/properties';
import transIpfsUrl from '@/helpers/trans-ipfs-url';
import BidHistory from '@/components/bid-history';
import useAuction from '@/hooks/useAuction';
import useBidderPrice from '@/hooks/useBidderPrice';
import useAuctonData from '@/hooks/useAuctionData';
import useMetadata from '@/hooks/useMetadata';
import useBidHistory from '@/hooks/useBidHistory';
import styles from './styles.less';

const web3 = new Web3(process.env.rpcURL);
const PRICE_STEP_PERCENT = 0.05; // 百分比
let tokenContract = erc721Factory(process.env.TOKEN_CONTRACT as string);
export default () => {
  const intl = useIntl();
  const wallet = useWallet();
  const { id, contract } = useParams<{ id: string; contract: string }>();
  const auction: any = useAuctonData({ id: 17, contract }) || {};
  const tokenMetadata: any = useMetadata({ id: 17, contract: process.env.TOKEN_CONTRACT as string }) || {};
  const bidEvents: any = useBidHistory({ auction });

  const myBidderPrice = useBidderPrice(contract);
  const bidContract = bidFactory(contract);

  const [isVisible, setIsVisible] = useState(false);
  const [bidHistory, setBidHistory] = useState<any[]>([]); // 竞拍历史-格式化后的数据
  const [pidBtnLoading, setPidBtnLoading] = useState(false);
  const [owner, setOwner] = useState('');
  const [inputPrice, setInputPrice] = useState<number | string>(''); // 输入的竞拍价格
  const [minPriceLimit, setMinPriceLimit] = useState<string | number>(0); // 当前最小竞拍价格
  const [priceStep, setPriceStep] = useState(0);

  useEffect(() => {
    if (bidEvents.length) {
      initBisHistory(bidEvents);
    }
  }, [bidEvents]);

  useEffect(() => {
    setup();
  }, [id]);

  // 设置推荐竞拍价
  useEffect(() => {
    try {
      const { highestBidder = '0' } = auction;
      const highest = Number(Web3.utils.fromWei(highestBidder));
      const _priceStep = Number(highest * PRICE_STEP_PERCENT);
      const _minPriceLimit = Math.ceil((_priceStep + highest) * 1e5) / 1e5;

      setPriceStep(_priceStep);
      setMinPriceLimit(_minPriceLimit);
      setInputPrice(_minPriceLimit);
    } catch (error) {}
  }, [auction]);

  const setup = async () => {
    const _owner = await getTokenOwner();
    setOwner(_owner);
  };

  const initBisHistory = async (events: any) => {
    try {
      const _history = [];
      for (const event of events) {
        const { blockNumber, returnValues = {} } = event;
        const { timestamp } = await web3.eth.getBlock(blockNumber);
        console.log('timestamp', timestamp);
        _history.push({
          timestamp: timestamp,
          bidder: returnValues.bidder || '',
          price: Web3.utils.fromWei(returnValues.price || '0'),
        });
      }

      setBidHistory(_history.reverse());
    } catch (error) {
      console.log(error.message);
      setBidHistory([]);
    }
  };

  /** token owner */
  const getTokenOwner = async () => {
    try {
      return await tokenContract.methods.ownerOf(id).call();
    } catch (error) {
      console.log('getTokenOwner error:', error);
      return '';
    }
  };

  /** 竞拍 */
  const placeBid = async (_price: string | number) => {
    if (wallet.status !== 'connected') return;
    setPidBtnLoading(true);

    try {
      const payAmount = Math.floor((Number(_price) - parseFloat(Web3.utils.fromWei(myBidderPrice))) * 1e8) / 1e8;

      // const gas = await bidContract.methods.bid().estimateGas();
      // console.log('gas', gas);

      const ret = await bidContract.methods.bid().send({
        from: wallet.account,
        value: Web3.utils.toWei(String(payAmount)),
      });

      notification.success({
        message: intl.formatMessage({
          id: 'notify_success',
          defaultMessage: 'Success',
        }),
      });
    } catch (error) {
      notification.error({
        message: error.message,
      });
    }

    setPidBtnLoading(false);
    setIsVisible(false);
  };

  const handlePlaceBidOk = () => {
    setIsVisible(false);
  };

  const handlePlaceBidCancel = () => {
    setIsVisible(false);
  };

  /** 取回质押BNB */
  const withdraw = async () => {
    setPidBtnLoading(true);

    if (wallet.status !== 'connected') {
      notification.info({
        message: intl.formatMessage({
          id: 'notify_connectWallet',
          defaultMessage: 'Connect wallet',
        }),
      });
      return;
    }

    try {
      const ret = await bidContract.methods.Withdraw().send({
        from: wallet.account,
      });

      console.log('ret', ret);
      notification.success({
        message: intl.formatMessage({
          id: 'notify_success',
          defaultMessage: 'Success',
        }),
      });
    } catch (error) {
      console.log('withdraw error:', error);
      notification.error({
        message: error.message,
      });
    }

    setPidBtnLoading(false);
  };

  return (
    <div className={styles.bidDetail}>
      <AssetInfo
        img={transIpfsUrl(tokenMetadata.image)}
        name={auction.name}
        description={auction.description}
        countdown={auction.endTime * 1000}
        priceSymbol="BNB"
        imageType="image"
        owner={owner}
        account={wallet && wallet.account}
        collectName={auction.name}
        highestPrice={auction.highestPrice || '0'}
        highestBidder={auction.highestBidder || ''}
        bidderPrice={myBidderPrice || '0'}
        isStart={auction.isStart}
        startTime={auction.startTime}
        isEnd={auction.isEnd}
        onWithdraw={withdraw}
        onPlaceBid={() => setIsVisible(true)}
      />

      <div className={styles.wrapInfo}>
        <div className={styles.wrapProperties}>
          <Properties attrs={tokenMetadata.attributes} />
        </div>

        <div className={styles.wrapBidHistory}>
          <BidHistory source={bidHistory} />
        </div>
      </div>

      <Modal
        title={null}
        visible={isVisible}
        footer={null}
        centered
        maskClosable={false}
        onOk={handlePlaceBidOk}
        onCancel={handlePlaceBidCancel}
        wrapClassName={styles.placeBidModal}
      >
        <div className={styles.content}>
          <span className={styles.price}>
            {intl.formatMessage({
              id: 'auction_price',
              defaultMessage: 'PRICE',
            })}
          </span>
          <Input type="number" size="large" addonAfter="BNB" value={inputPrice} step={priceStep} onChange={(e) => setInputPrice(e.target.value)} />
          <div className={styles.tip}>
            {intl.formatMessage(
              {
                id: 'auction_priceTip',
                defaultMessage: `This bidding requires payment of : ${minPriceLimit} BNB`,
              },
              {
                minPriceLimit,
              },
            )}
          </div>

          <div className={styles.message}>
            {intl.formatMessage({
              id: 'auction_message',
              defaultMessage: `If the user win the bid, NFT will be automatically sent to your
              account.If the user lose the bid, the money will be automatically
              returned to your wallet.`,
            })}
          </div>

          <Button type="primary" block size="large" loading={pidBtnLoading} disabled={pidBtnLoading} onClick={() => placeBid(inputPrice)}>
            {intl.formatMessage({
              id: 'auction_confirm',
              defaultMessage: 'Confirm',
            })}
          </Button>
        </div>
      </Modal>
    </div>
  );
};
