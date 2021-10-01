import BidCardItem from '@/components/bid-card-item';
import styles from './styles.less';
import useAuctonData from '@/hooks/useAuctionData';
import useMetadata from '@/hooks/useMetadata';

export default () => {
  const auction: any = useAuctonData({ contract: '0xC14d3cdCd7291Bd6B464f1A9052CBd0A3404F9B8' }) || {};
  const metadata: any = useMetadata({ id: auction.id, contract: auction.nftContract }) || {};

  const auctionBird: any = useAuctonData({ contract: '0x2172BF05dB5529d33424bDDFDD7499f86C33AE6d' }) || {};
  const metadataBird: any = useMetadata({ id: auctionBird.id, contract: auctionBird.nftContract, useGateway: true }) || {};

  return (
    <div className={styles.bid}>
      <div className={styles.wrapList}>
        <BidCardItem key="1" auction={auction} image={metadata.image} />
        <BidCardItem auction={auctionBird} image={metadataBird.image} />
      </div>
    </div>
  );
};
