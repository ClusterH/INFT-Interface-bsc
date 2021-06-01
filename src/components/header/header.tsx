import { useState, useEffect } from 'react';
import { Link, NavLink } from 'umi';
import { Menu } from 'antd';
import { useWallet } from '@binance-chain/bsc-use-wallet';
import logo from '@/assets/images/logo-inft.svg';
import walletIcon from '@/assets/images/wallet.png';
import { SearchInput } from '@/components/input';
import styles from './styles.less';

export default () => {
  const wallet = useWallet();

  const connectWallet = () => {
    if (wallet.status === 'disconnected') {
      wallet.connect();
    }
  };

  const formatAccount = (account: string): string => {
    return `${account.substr(0, 5)}...${account.substr(-4)}`;
  };

  return (
    <div className={styles.header}>
      <div className={styles.content}>
        <Link to="/">
          <img src={logo} alt="iNFT" className={styles.logo} />
        </Link>

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
          {wallet.status === 'connected' && (
            <span className={styles.account}>
              {formatAccount(wallet.account)}
            </span>
          )}
          <img
            src={walletIcon}
            alt=""
            className={styles.walletIcon}
            onClick={connectWallet}
          />
        </div>
      </div>
    </div>
  );
};
