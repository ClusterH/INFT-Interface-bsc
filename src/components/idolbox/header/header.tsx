import { Link } from 'umi';
import logo from '@/assets/images/logo-inft.svg';
import styles from './styles.less';

export default () => {
  return (
    <div className={styles.header}>
      <div className={styles.content}>
        <div className={styles.wrapLogo}>
          <Link to="/">
            <img src={logo} alt="iNFT" className={styles.logo} />
          </Link>
        </div>

        <div className={styles.wrapLanguage}>
          <span className={styles.language}>English</span>
        </div>
      </div>
    </div>
  );
};
