import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import IconFont from '@/components/icon-font';
import logo from '@/assets/images/logo-inft.png';
import styles from './styles.less';

export default () => (
  <div className={styles.header}>
    <div className={styles.content}>
      <img src={logo} alt="iNFT" className={styles.logo} />
      <Input
        placeholder="请输入NFT名称"
        suffix={<SearchOutlined />}
        className={styles.inputSearch}
      />

      <div className={styles.wallet}>
        <IconFont type="icon-wallet" style={{ fontSize: '30px' }} />
      </div>
    </div>
  </div>
);
