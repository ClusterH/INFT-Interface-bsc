import { useHistory } from 'umi';
import bidContract from '@/contracts/bid';
import bidTokenContract from '@/contracts/bid-token';
import BidCardItem from '@/components/bid-card-item';
import styles from './styles.less';
import useAuction from '@/hooks/useAuction';
import useBidderPrice from '@/hooks/useBidderPrice';

const TOKEN_ID = 5;
export default () => {
  const auction: any = useAuction({
    id: TOKEN_ID,
    bidContract,
    tokenContract: bidTokenContract,
  });
  const bidderPrice = useBidderPrice({ bidContract });
  console.log('auction', auction);

  return (
    <div className={styles.bid}>
      <div className={styles.content}>
        {/* <div className={styles.wrapFilter}>
          <span className={`${styles.item} ${styles.active}`}>All</span>
          <span className={styles.item}>On Auction</span>
          <span className={styles.item}>Over</span>
        </div> */}

        <div className="wrapList"></div>
      </div>

      <div className={styles.wrapList}>
        <BidCardItem auction={auction} bidderPrice={bidderPrice} />
      </div>
    </div>
  );
};
