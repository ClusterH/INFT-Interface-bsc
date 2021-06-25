import { useIntl } from 'umi';
import { Drawer } from 'antd';
import { NavLink } from 'umi';
import IconFont from '@/components/icon-font';
import styles from './styles.less';
import iconHome from '@/assets/images/icon-home.svg';
import iconMarket from '@/assets/images/icon-market.svg';
import iconSubmit from '@/assets/images/icon-submit.svg';
import iconAccount from '@/assets/images/icon-Account.svg';

export default (props: any) => {
  const intl = useIntl();
  const { visible, onClose, onOk } = props;

  return (
    <Drawer
      title={null}
      placement="left"
      closable={false}
      onClose={onClose}
      visible={visible}
      className={styles.drawerNav}
    >
      <div className={styles.content}>
        <span className={styles.navItem} onClick={onOk}>
          <NavLink exact to="/home" activeClassName={styles.active}>
            <img src={iconHome} alt="icon" />
            {intl.formatMessage({
              id: 'header_home',
              defaultMessage: 'Home',
            })}
          </NavLink>
        </span>
        <span className={styles.navItem} onClick={onOk}>
          <NavLink exact to="/market" activeClassName={styles.active}>
            <img src={iconMarket} alt="icon" />
            {intl.formatMessage({
              id: 'header_market',
              defaultMessage: 'NFT Market',
            })}
          </NavLink>
        </span>
        <span className={styles.navItem} onClick={onOk}>
          <NavLink to="/create" activeClassName={styles.active}>
            <img src={iconSubmit} alt="icon" />
            {intl.formatMessage({
              id: 'header_submit',
              defaultMessage: 'Create',
            })}
          </NavLink>
        </span>

        <span className={styles.navItem} onClick={onOk}>
          <NavLink exact to="/account" activeClassName={styles.active}>
            <img src={iconAccount} alt="icon" />

            {intl.formatMessage({
              id: 'header_account',
              defaultMessage: 'Account',
            })}
          </NavLink>
        </span>

        <span className={styles.navItemHelp} onClick={onOk}>
          <IconFont type="icon-help-dark" className={styles.helpIcon} />

          <a href="http://inftsupport.zendesk.com/" target="_blank">
            Help
          </a>
        </span>
      </div>
    </Drawer>
  );
};
