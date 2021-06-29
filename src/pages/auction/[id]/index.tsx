import { useState, useEffect } from 'react';
import { useParams } from 'umi';
import { Button, Input, Modal, notification } from 'antd';
import Web3 from 'web3';
import bidContract from '@/contracts/bid';
import bidTokenContract from '@/contracts/bid-token';
import { useWallet } from '@binance-chain/bsc-use-wallet';
import AssetInfo from '@/components/asset-info-bid';
import { fetchIpfs } from '@/servers';
import Properties from '@/components/properties';
import transIpfsUrl from '@/helpers/trans-ipfs-url';
import BidHistory from '@/components/bid-history';
import styles from './styles.less';

export default () => {
  const { id } = useParams<{ id: string }>();
  const wallet = useWallet();

  const [auction, setAuction] = useState({
    0: '', // name
    1: '', // description
    2: '', // contract
    3: '', // tokenId
    4: '', // time left
    time: '',
  });
  const [metadata, setMetadata] = useState<any>({});
  const [isVisible, setIsVisible] = useState(false);
  // const [countdown, setCountdown] = useState(0);
  const [bidHistory, setBidHistory] = useState<any[]>([]);
  const [highestBidder, setHighestBidder] = useState('');
  const [bidderPrice, setBidderPrice] = useState('');
  const [inputPrice, setInputPrice] = useState('');
  const [pidBtnLoading, setPidBtnLoading] = useState(false);
  const [endTime, setEndTime] = useState(Date.now());
  const [owner, setOwner] = useState('');
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  const [isFinish, setIsFinish] = useState(false);

  useEffect(() => {
    setup();
  }, [id]);

  // useEffect(() => {
  //   setCountdown(Date.now() + parseInt(auction.time) * 1000);
  // }, [auction]);

  useEffect(() => {
    if (wallet.status === 'connected') {
      (async () => {
        const _bidderPrice = await getBidderPrice(wallet.account as string);
        setBidderPrice(_bidderPrice);
      })();
    }
  }, [wallet]);

  const setup = async () => {
    getToken(id);
    const bidEvents = await getBidRecords();
    const highestBidder = await getHighestBidder();
    const _endTime = await getEndTime();
    const _owner = await getTokenOwner();
    const _description = await getDescription();
    const _name = await getName();
    const _isFinish = await getIsFinish(_endTime);

    console.log('_endTime', _endTime);
    console.log('_isFinish', _isFinish);

    initBisHistory(bidEvents);
    setHighestBidder(highestBidder);
    setEndTime(_endTime * 1000);
    setOwner(_owner);
    setDescription(_description);
    setName(_name);
    setIsFinish(_isFinish);
  };

  const initBisHistory = async (events: any) => {
    const _history = events.map((event: any) => {
      const { blockNumber, returnValues = {} } = event;
      return {
        blockNumber: blockNumber,
        bidder: returnValues.bidder || '',
        price: Web3.utils.fromWei(returnValues.price || '0'),
      };
    });

    setBidHistory(_history);
  };

  /** 拍卖是否已结束 */
  const getIsFinish = async (_endTime: string) => {
    return Date.now() > parseInt(_endTime) * 1000;
  };

  /** NFT name */
  const getName = async () => {
    try {
      return await bidContract.methods.name().call();
    } catch (error) {
      console.log('getName error:', error);
      return '';
    }
  };

  /** NFT descript */
  const getDescription = async () => {
    try {
      return await bidContract.methods.ItemDescription().call();
    } catch (error) {
      console.log('getDescription error:', error);
      return '';
    }
  };

  /** token owner */
  const getTokenOwner = async () => {
    try {
      return await bidTokenContract.methods.ownerOf(id).call();
    } catch (error) {
      console.log('getTokenOwner error:', error);
      return '';
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

  /** 获取token信息 */
  const getToken = async (_id: string | number) => {
    console.log('_id', _id);
    try {
      const uri = await bidTokenContract.methods.tokenURI(_id).call();
      await getMetadata(uri);
    } catch (error) {
      console.log('err', error);
    }
  };

  /** 获取metadata */
  const getMetadata = async (uri: string) => {
    const cid = uri.split('ipfs://').pop() || '';
    const metadata: any = await fetchIpfs(cid);
    console.log('metadata: ', metadata);
    setMetadata(metadata);
  };

  /** 竞拍 */
  const placeBid = async (_price: string) => {
    if (wallet.status !== 'connected') return;

    setPidBtnLoading(true);

    try {
      const ret = await bidContract.methods.bid().send({
        from: wallet.account,
        value: Web3.utils.toWei(_price),
      });

      notification.success({
        message: 'Success',
      });
    } catch (error) {
      notification.error({
        message: error.message,
      });
    }

    setPidBtnLoading(false);
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

  const handlePlaceBidOk = () => {
    setIsVisible(false);
  };

  const handlePlaceBidCancel = () => {
    setIsVisible(false);
  };

  const getHighestBidder = async () => {
    const highestPrice = await bidContract.methods.highestPrice().call();
    return highestPrice;
  };

  const getBidderPrice = async (address: string) => {
    try {
      console.log('address', address);
      return await bidContract.methods.getBidderPrice(address).call();
    } catch (error) {
      console.log('error', error);
    }
  };

  /** 取回质押BNB */
  const withdraw = async () => {
    setPidBtnLoading(true);

    if (wallet.status !== 'connected') {
      notification.info({
        message: 'Connect wallet',
      });
      return;
    }

    try {
      const ret = await bidContract.methods.Withdraw().send({
        from: wallet.account,
      });

      console.log('ret', ret);
      notification.success({
        message: 'Success',
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
        img={transIpfsUrl(metadata.image)}
        name={name}
        description={description}
        countdown={endTime}
        priceSymbol="BNB"
        imageType="image"
        owner={owner}
        account={wallet && wallet.account}
        collectName={name}
        highestBidder={highestBidder}
        bidderPrice={bidderPrice}
        isFinish={isFinish}
        onWithdraw={withdraw}
        onPlaceBid={() => setIsVisible(true)}
      />

      <div className={styles.wrapInfo}>
        <div className={styles.wrapProperties}>
          <Properties attrs={metadata.attributes} />
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
        onOk={handlePlaceBidOk}
        onCancel={handlePlaceBidCancel}
        wrapClassName={styles.placeBidModal}
      >
        <div className={styles.content}>
          <span className={styles.price}>PRICE</span>
          <Input
            type="number"
            size="large"
            addonAfter="BNB"
            onChange={(e) => setInputPrice(e.target.value)}
          />
          <div className={styles.tip}>
            This bidding requires payment of : 0.002 BNB
          </div>

          <div className={styles.message}>
            If the user win the bid, NFT will be automatically sent to your
            account.If the user lose the bid, the money will be automatically
            returned to your wallet.
          </div>

          <Button
            type="primary"
            block
            size="large"
            loading={pidBtnLoading}
            disabled={pidBtnLoading}
            onClick={() => placeBid(inputPrice)}
          >
            Confirm
          </Button>
        </div>
      </Modal>
    </div>
  );
};
