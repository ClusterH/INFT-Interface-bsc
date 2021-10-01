import { useState, useEffect } from 'react';
import { Link, NavLink, useHistory, getLocale, setLocale, useIntl } from 'umi';
import { Menu, Dropdown, notification } from 'antd';
import { useWallet } from '@binance-chain/bsc-use-wallet';
import logo from '@/assets/images/logo-inft.svg';
import walletIcon from '@/assets/images/wallet.png';
import SearchGlobal from '@/components/search-global';
import ModalAccount from '@/components/modal-account';
import IconFont from '@/components/icon-font';
import DrawNav from '@/components-mobile/drawer-nav';
import Web3 from 'web3';

import styles from './styles.less';
const web3 = new Web3(Web3.givenProvider);

export default () => {
  const intl = useIntl();
  const history = useHistory();
  const wallet = useWallet();
  const [visible, setVisible] = useState(false);
  const [drawNavVisible, setDrawNavVisible] = useState(false);

  const menu = (
    <Menu>
      <Menu.Item key="en-US">
        <span className={[styles.langItem, getLocale() === 'en-US' ? styles.langItemActive : null].join(' ')} onClick={() => changeLang('en-US')}>
          English
        </span>
      </Menu.Item>
      <Menu.Item key="zh-CN">
        <span className={[styles.langItem, getLocale() === 'zh-CN' ? styles.langItemActive : null].join(' ')} onClick={() => changeLang('zh-CN')}>
          中 文
        </span>
      </Menu.Item>
    </Menu>
  );

  /** log wallet status */
  useEffect(() => {
    if (wallet.status === 'connected') {
      console.log('ChainId: ', wallet.chainId);
      console.log('Network: ', wallet.chainId === 56 ? 'BSC Mainnet' : 'BSC Testnet');
    }

    if (wallet.status === 'error') {
      notification.info({
        message: intl.formatMessage({
          id: 'notify_connect_appropriate_network',
          defaultMessage: 'Please connect to the appropriate BSC network.',
        }),
      });
    }
  }, [wallet.status]);

  useEffect(() => {
    const connected = sessionStorage.getItem('metamask-connected');
    if (connected === 'true') {
      wallet.connect('injected');
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

  const changeLang = (lang: 'zh-CN' | 'en-US') => {
    setLocale(lang, true);
  };

  const navtoHelp = () => {
    window.open('http://inftsupport.zendesk.com/', '_blank');
  };

  return (
    <div className={styles.header}>
      <div className={styles.content}>
        <IconFont type="icon-menu" className={styles.iconMenu} onClick={() => setDrawNavVisible(true)} />

        <Link to="/">
          <img src={logo} alt="iNFT" className={styles.logo} />
        </Link>

        <div className={styles.wrapSearchGlobal}>
          <SearchGlobal onSelect={onSelectContract} />
        </div>

        <div className={styles.nav}>
          <NavLink exact to="/home" activeClassName={styles.activeLink}>
            {intl.formatMessage({
              id: 'header_home',
              defaultMessage: 'Home',
            })}
          </NavLink>
          <NavLink exact to="/market" activeClassName={styles.activeLink}>
            {intl.formatMessage({
              id: 'header_market',
              defaultMessage: 'NFT Market',
            })}
          </NavLink>
          <NavLink exact to="/auction" activeClassName={styles.activeLink}>
            {intl.formatMessage({
              id: 'header_auction',
              defaultMessage: 'Auction',
            })}
          </NavLink>
          <NavLink to="/create" activeClassName={styles.activeLink}>
            {intl.formatMessage({
              id: 'header_submit',
              defaultMessage: 'Create',
            })}
          </NavLink>
          <NavLink to="/account" activeClassName={styles.activeLink}>
            {intl.formatMessage({
              id: 'header_account',
              defaultMessage: 'Account',
            })}
          </NavLink>
        </div>

        <IconFont
          type="icon-help"
          style={{
            fontSize: 26,
          }}
          className={styles.helpIcon}
          onClick={navtoHelp}
        />

        <Dropdown overlay={menu} placement="bottomCenter" trigger={['click']} overlayClassName={styles.dropdown}>
          <IconFont
            type="icon-global"
            style={{
              fontSize: 26,
            }}
            className={wallet.status === 'connected' ? styles.langIconConnected : styles.langIconDisconnect}
          />
        </Dropdown>

        <div className={styles.wallet}>
          {wallet.status === 'connected' && (
            <span className={styles.account} onClick={() => setVisible(true)}>
              {formatAccount(wallet.account as string)}
            </span>
          )}
          <img src={walletIcon} alt="" className={styles.walletIcon} onClick={connectWallet} />
        </div>
      </div>

      {wallet.status === 'connected' && (
        <ModalAccount visible={visible} address={wallet.account} onOk={() => setVisible(false)} onCancel={() => setVisible(false)} onDisconnect={onDisconnect} />
      )}

      <DrawNav visible={drawNavVisible} onClose={() => setDrawNavVisible(false)} onOk={() => setDrawNavVisible(false)} />
    </div>
  );
};
