import { Drawer } from 'antd';
import { NavLink } from 'umi';
import styles from './styles.less';

export default (props: any) => {
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
            Home
          </NavLink>
        </span>
        <span className={styles.navItem} onClick={onOk}>
          <NavLink exact to="/market" activeClassName={styles.active}>
            NFT Market
          </NavLink>
        </span>
        <span className={styles.navItem} onClick={onOk}>
          <NavLink exact to="/account" activeClassName={styles.active}>
            Account
          </NavLink>
        </span>
      </div>
    </Drawer>
  );
};
