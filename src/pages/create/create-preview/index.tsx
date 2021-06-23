import { useLocation } from 'umi';
import BannerCreateNFT from '@/components/banner-create-nft';
import styles from './styles.less';

export default () => {
  const { query = {} } = useLocation();
  const { imgUrl = '' } = query;
  return (
    <div>
      <BannerCreateNFT />

      <div className={styles.content}>
        <div className={styles.title}>
          Your NFT has been submitted! Please wait with patient. If there is no
          response after a working day, please don’t feel hesitate to contact
          our staff <a type="mailto:help@inft.io">help@inft.io</a>
        </div>
        <div className={styles.wrapImage}>
          <img src={imgUrl} alt="" />
        </div>
        <div className={styles.wrapAction}></div>
      </div>
    </div>
  );
};
