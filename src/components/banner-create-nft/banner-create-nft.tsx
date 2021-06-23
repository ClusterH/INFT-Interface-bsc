import bannerImg from '@/assets/images/banner-create-nft.png';
import styles from './styles.less';

export default () => {
  return (
    <div className={styles.banner}>
      <img src={bannerImg} alt="Create your NFT" />
    </div>
  );
};
