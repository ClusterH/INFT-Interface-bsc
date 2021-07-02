import { useHistory } from 'umi';
import bidContract from '@/contracts/bid';
import bidTokenContract from '@/contracts/bid-token';
import BidCardItem from '@/components/bid-card-item';
import styles from './styles.less';
import useAuction from '@/hooks/useAuction';
import useBidderPrice from '@/hooks/useBidderPrice';

const TOKEN_1_ID = 17;

export default () => {
  const auction1: any = useAuction({
    id: TOKEN_1_ID,
    bidContract: process.env.BID_CONTRACT as string,
    tokenContract: process.env.TOKEN_CONTRACT as string,
  });

  const bidderPrice_1 = useBidderPrice(process.env.BID_CONTRACT as string);

  console.log('auction1', auction1);
  return (
    <div className={styles.bid}>
      <div className={styles.wrapList}>
        <BidCardItem auction={auction1} bidderPrice={bidderPrice_1} />
      </div>
    </div>
  );
};
