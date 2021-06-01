import { Modal, InputNumber } from 'antd';
import { Button } from 'antd';
import styles from './styles.less';

export interface ISellConfirmProps {
  visible: boolean;
  priceSymbol: string;
  onChange: (val: number) => void;
  onOk: () => void;
  onCancel: () => void;
}

export default (props: ISellConfirmProps) => {
  const { visible, priceSymbol, onChange, onOk, onCancel } = props;

  return (
    <Modal
      title={null}
      visible={visible}
      onOk={onOk}
      onCancel={onCancel}
      width={473}
      footer={null}
      closable={false}
      wrapClassName={styles.sellConfirm}
    >
      <div className={styles.content}>
        <div className={styles.label}>Sell Price</div>

        <div>
          <InputNumber className={styles.input} onChange={onChange} />
          <span className={styles.priceSymbol}>{priceSymbol}</span>
        </div>

        <Button className={styles.confirmBtn} onClick={onOk}>
          Confirm
        </Button>
      </div>
    </Modal>
  );
};
