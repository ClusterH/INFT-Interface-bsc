import { useHistory } from 'umi';
import bidContract from '@/contracts/bid';
import bidTokenContract from '@/contracts/bid-token';
import BidCardItem from '@/components/bid-card-item';
import styles from './styles.less';
import useAuction from '@/hooks/useAuction';
import useBidderPrice from '@/hooks/useBidderPrice';

const TOKEN_1_ID = 5;
const TOKEN_2_ID = 6;
const TOKEN_3_ID = 4;

export default () => {
  const auction1: any = useAuction({
    id: TOKEN_1_ID,
    bidContract: '0x87B213fa7e1bB171c0f538B39eFCf3650b4FbB87',
    tokenContract: '0x6352f57A0E17FE177fbfcdEa7FDAd83427b6B2b2',
  });
  const auction2: any = useAuction({
    id: TOKEN_2_ID,
    bidContract: '0x184BABcBF932f0E0665F45371C33F66791e4bb2F',
    tokenContract: '0x6352f57A0E17FE177fbfcdEa7FDAd83427b6B2b2',
  });

  const bidderPrice_1 = useBidderPrice(
    '0x87B213fa7e1bB171c0f538B39eFCf3650b4FbB87',
  );
  const bidderPrice_2 = useBidderPrice(
    '0x184BABcBF932f0E0665F45371C33F66791e4bb2F',
  );

  return (
    <div className={styles.bid}>
      <div className={styles.wrapList}>
        <BidCardItem auction={auction1} bidderPrice={bidderPrice_1} />
        <BidCardItem auction={auction2} bidderPrice={bidderPrice_2} />
      </div>
    </div>
  );
};
