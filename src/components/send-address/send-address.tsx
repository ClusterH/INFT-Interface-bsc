import { useIntl } from 'umi';
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
  const intl = useIntl();
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
        <div className={styles.title}>
          {intl.formatMessage({
            id: 'sendAddress_address',
            defaultMessage: 'Address',
          })}
        </div>
        <Input
          placeholder={intl.formatMessage({
            id: 'sendAddress_placeholder',
            defaultMessage: 'Fill in the transfer address',
          })}
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
          {intl.formatMessage({
            id: 'sendAddress_cofirmn',
            defaultMessage: 'Confirm',
          })}
        </Button>
      </div>
    </Modal>
  );
};
