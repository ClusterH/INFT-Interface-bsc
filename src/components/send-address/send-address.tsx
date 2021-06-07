import { Modal, Button } from 'antd';
import Input from '@/components/input';
import styles from './styles.less';

export interface ISendAddressProps {
  visible: boolean;
  address: string;
  onChange: (address: string) => void;
  onOk: () => void;
  onCancel: () => void;
}

export default (props: ISendAddressProps) => {
  const { visible, onChange, onOk, onCancel } = props;
  return (
    <Modal
      visible={visible}
      title={null}
      footer={null}
      wrapClassName={styles.sendAddress}
      onCancel={onCancel}
    >
      <div className={styles.content}>
        <div className={styles.title}>Address</div>
        <Input
          placeholder="Fill in the transfer address"
          onChange={(e) => onChange(e.target.value)}
          className={styles.addressInput}
          size="large"
        />
        <Button
          type="primary"
          block
          onClick={onOk}
          size="large"
          className={styles.btn}
        >
          Confirm
        </Button>
      </div>
    </Modal>
  );
};
