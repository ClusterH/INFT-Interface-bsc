import { Modal, Button } from 'antd';
import { useClipboard } from 'use-clipboard-copy';
import BscAddress from '@/components/bsc-address';
import useShortAddress from '@/hooks/useShortAddress';
import IconFont from '@/components/icon-font';
import styles from './styles.less';

export default (props: any) => {
  const { visible, address, onOk, onCancel, onDisconnect } = props;
  const clipboard = useClipboard({ copiedTimeout: 750 });
  const shortAddress = useShortAddress(address);
  const bscScan = `https://bscscan.com/address/${address}`;

  const handleCopy = () => {
    clipboard.copy(address);
  };

  return (
    <Modal
      title={false}
      footer={false}
      visible={visible}
      onOk={onOk}
      onCancel={onCancel}
      wrapClassName={styles.modalAccount}
    >
      <div className={styles.content}>
        <div className={styles.title}>Account</div>

        <div className={styles.wrapAddress}>
          <span className={styles.textConnected}>Connected with MetaMask</span>
          <span className={styles.textAddress}>
            {shortAddress}{' '}
            {clipboard.copied ? (
              <span className={styles.copied}>Copied</span>
            ) : (
              <IconFont type="icon-copy" onClick={handleCopy}></IconFont>
            )}
          </span>
          <span className={styles.textView}>
            <a href={bscScan} target="_blank">
              View on BscScan
            </a>
          </span>
        </div>

        <div className={styles.wrapBreak}>
          <Button type="primary" block size="large" onClick={onDisconnect}>
            Break
          </Button>
        </div>
      </div>
    </Modal>
  );
};
