import banner from '@/assets/images/banner-coming-soon.png';
import styles from './styles.less';

export default () => (
  <div className={styles.banner}>
    <img src={banner} alt="banner" />
  </div>
);
