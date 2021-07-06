import BidCardItem from '@/components/bid-card-item';
import styles from './styles.less';
import useAuctonData from '@/hooks/useAuctionData';
import useMetadata from '@/hooks/useMetadata';

export default () => {
  const auction: any = useAuctonData({ id: 17, contract: process.env.BID_CONTRACT as string }) || {};
  const metadata: any = useMetadata({ id: 17, contract: process.env.TOKEN_CONTRACT as string }) || {};

  return (
    <div className={styles.bid}>
      <div className={styles.wrapList}>
        <BidCardItem auction={auction} bidderPrice={auction.highestPrice} image={metadata.image} />
      </div>
    </div>
  );
};
