import { useState } from 'react';
import { NavLink } from 'umi';
import { Menu } from 'antd';
import logo from '@/assets/images/logo-inft.svg';
import walletIcon from '@/assets/images/wallet.png';
import { SearchInput } from '@/components/input';
import styles from './styles.less';

export default () => {
  const [current, setCurrent] = useState('/market');
  const handleClick = () => {};

  return (
    <div className={styles.header}>
      <div className={styles.content}>
        <img src={logo} alt="iNFT" className={styles.logo} />
        <SearchInput placeholder="请输入NFT名称" />

        <div className={styles.nav}>
          <NavLink to="/market" activeClassName={styles.activeLink}>
            Home
          </NavLink>
          <NavLink to="/account" activeClassName={styles.activeLink}>
            Account
          </NavLink>
        </div>

        <div className={styles.wallet}>
          <img src={walletIcon} alt="" className={styles.walletIcon} />
        </div>
      </div>
    </div>
  );
};
