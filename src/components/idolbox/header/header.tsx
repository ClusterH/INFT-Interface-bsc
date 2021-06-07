import { Link } from 'umi';
import logo from '@/assets/images/logo-inft.svg';
import styles from './styles.less';

export default () => {
  return (
    <div className={styles.header}>
      <div className={styles.content}>
        <Link to="/">
          <img src={logo} alt="iNFT" className={styles.logo} />
        </Link>

        <span>English</span>
      </div>
    </div>
  );
};
