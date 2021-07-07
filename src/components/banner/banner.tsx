import { useHistory } from 'umi';
import banner from '@/assets/images/banner-bird.png';
import styles from './styles.less';

export default () => {
  const history = useHistory();

  const handleClick = () => {
    history.push('/auction');
  };

  return (
    <div className={styles.banner} onClick={handleClick}>
      <img src={banner} alt="banner" />
    </div>
  );
};
