import { useIntl } from 'umi';
import { Drawer } from 'antd';
import { useState } from 'react';
import styles from './styles.less';

export default (props: any) => {
  const intl = useIntl();
  const { visible, onClose, onOk } = props;

  return (
    <Drawer
      className={styles.drawerConnectWallet}
      title={intl.formatMessage({
        id: 'drawerConnectWallet_title',
        defaultMessage: 'Connect wallet',
      })}
      placement="bottom"
      closable={true}
      onClose={onClose}
      visible={visible}
      height="284"
    >
      <div className={styles.content}>
        <div className={styles.wrapMetaMask} onClick={() => onOk('METAMASK')}>
          <span className={styles.name}>METAMASK</span>
        </div>
        <div
          className={styles.wrapTokenPocket}
          onClick={() => onOk('TOKENPOCKET')}
        >
          <span className={styles.name}>TOKENPOCKET</span>
        </div>
      </div>
    </Drawer>
  );
};
