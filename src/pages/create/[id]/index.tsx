import BannerCreateNFT from '@/components/banner-create-nft';
import yua from '@/assets/images/demo-yua-2.jpeg';
import styles from './styles.less';

export default () => {
  return (
    <div>
      <BannerCreateNFT />

      <div className={styles.content}>
        <div className={styles.title}>NFT has been created!</div>
        <div className={styles.wrapImage}>
          <img src={yua} alt="" />
        </div>
        <div className={styles.wrapAction}></div>
      </div>
    </div>
  );
};
