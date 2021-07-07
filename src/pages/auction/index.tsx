import BidCardItem from '@/components/bid-card-item';
import styles from './styles.less';
import useAuctonData from '@/hooks/useAuctionData';
import useMetadata from '@/hooks/useMetadata';

export default () => {
  // const auction: any = useAuctonData({ id: 17, contract: process.env.BID_CONTRACT as string }) || {};
  // const metadata: any = useMetadata({ id: 17, contract: process.env.TOKEN_CONTRACT as string }) || {};
  // console.log('auction', auction);

  const auctionBird: any = useAuctonData({ id: 1, contract: '0x2172BF05dB5529d33424bDDFDD7499f86C33AE6d' }) || {};
  const metadataBird: any = useMetadata({ id: 1, contract: '0xE0bB6f87CF28E1cE325a0F6AC8a4f91A228Df433', useGateway: true }) || {};
  console.log('auctionBird', auctionBird);
  console.log('metadataBird', metadataBird);

  return (
    <div className={styles.bid}>
      <div className={styles.wrapList}>
        {/* <BidCardItem key="1" auction={auction} bidderPrice={auction.highestPrice} image={''} /> */}
        <BidCardItem auction={auctionBird} bidderPrice={auctionBird.highestPrice} image={metadataBird.image} />
      </div>
    </div>
  );
};
