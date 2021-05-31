import { Modal, Input } from 'antd';
import { Button } from 'antd';
import styles from './styles.less';

export interface ISellConfirmProps {
  visible: boolean;
  priceSymbol: string;
  onOk: () => void;
  onCancel: () => void;
}

export default (props: ISellConfirmProps) => {
  const { visible, priceSymbol, onOk, onCancel } = props;

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
          <Input className={styles.input} />
          <span className={styles.priceSymbol}>{priceSymbol}</span>
        </div>

        <Button className={styles.confirmBtn}>Confirm</Button>
      </div>
    </Modal>
  );
};
