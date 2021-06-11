import { useState, useEffect } from 'react';
import { Link, NavLink, useHistory } from 'umi';
import { Menu } from 'antd';
import { useWallet } from '@binance-chain/bsc-use-wallet';
import logo from '@/assets/images/logo-inft.svg';
import walletIcon from '@/assets/images/wallet.png';
import { SearchInput } from '@/components/input';
import SearchGlobal from '@/components/search-global';
import ModalAccount from '@/components/modal-account';
import IconFont from '@/components/icon-font';
import DrawNav from '@/components-mobile/drawer-nav';
import styles from './styles.less';

export default () => {
  const history = useHistory();
  const wallet = useWallet();
  const [visible, setVisible] = useState(false);
  const [drawNavVisible, setDrawNavVisible] = useState(false);

  /** log wallet status */
  useEffect(() => {
    if (wallet.status === 'connected') {
      console.log('ChainId: ', wallet.chainId);
      console.log(
        'Network: ',
        wallet.chainId === 56 ? 'BSC Mainnet' : 'BSC Testnet',
      );
    }
  }, [wallet.status]);

  useEffect(() => {
    const connected = sessionStorage.getItem('metamask-connected');
    if (connected) {
      if (wallet.status !== 'connected') {
        console.log('connected');
        wallet.connect('injected');
        sessionStorage.setItem('metamask-connected', 'true');
      }
    }
  }, []);

  const connectWallet = () => {
    if (wallet.status === 'disconnected') {
      wallet.connect('injected');
      sessionStorage.setItem('metamask-connected', 'true');
    }
  };

  const formatAccount = (account: string): string => {
    if (!account) return '';
    return `${account.substr(0, 5)}...${account.substr(-4)}`;
  };

  const onDisconnect = () => {
    wallet.reset();
    setVisible(false);
    sessionStorage.removeItem('metamask-connected');
    location.reload();
  };

  const onSelectContract = (item: any) => {
    console.log('onSelectContract', item);
    history.push(`/market?contract=${item.value}`);
  };

  return (
    <div className={styles.header}>
      <div className={styles.content}>
        <IconFont
          type="icon-menu"
          className={styles.iconMenu}
          onClick={() => setDrawNavVisible(true)}
        />

        <Link to="/">
          <img src={logo} alt="iNFT" className={styles.logo} />
        </Link>

        <div className={styles.wrapSearchGlobal}>
          <SearchGlobal onSelect={onSelectContract} />
        </div>

        <div className={styles.nav}>
          <NavLink exact to="/market" activeClassName={styles.activeLink}>
            Home
          </NavLink>
          <NavLink to="/account" activeClassName={styles.activeLink}>
            Account
          </NavLink>
        </div>

        <div className={styles.wallet}>
          {wallet.status === 'connected' && (
            <span className={styles.account} onClick={() => setVisible(true)}>
              {formatAccount(wallet.account as string)}
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

      {wallet.status === 'connected' && (
        <ModalAccount
          visible={visible}
          address={wallet.account}
          onOk={() => setVisible(false)}
          onCancel={() => setVisible(false)}
          onDisconnect={onDisconnect}
        />
      )}

      <DrawNav
        visible={drawNavVisible}
        onClose={() => setDrawNavVisible(false)}
        onOk={() => setDrawNavVisible(false)}
      />
    </div>
  );
};
