import { useIntl } from 'umi';
import { Drawer } from 'antd';
import { NavLink } from 'umi';
import styles from './styles.less';

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
            {intl.formatMessage({
              id: 'header_home',
              defaultMessage: 'Home',
            })}
          </NavLink>
        </span>
        <span className={styles.navItem} onClick={onOk}>
          <NavLink exact to="/market" activeClassName={styles.active}>
            {intl.formatMessage({
              id: 'header_market',
              defaultMessage: 'NFT Market',
            })}
          </NavLink>
          <NavLink to="/create" activeClassName={styles.active}>
            {intl.formatMessage({
              id: 'header_submit',
              defaultMessage: 'Create',
            })}
          </NavLink>
        </span>
        <span className={styles.navItem} onClick={onOk}>
          <NavLink exact to="/account" activeClassName={styles.active}>
            {intl.formatMessage({
              id: 'header_account',
              defaultMessage: 'Account',
            })}
          </NavLink>
        </span>
      </div>
    </Drawer>
  );
};
