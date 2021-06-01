import { Modal, Button } from 'antd';
import styles from './styles.less';

export interface ICheckoutBuyProps {
  name: string;
  title: string;
  image: string;
  volume: number;
  amount: number;
  symbol: string;
  visible: boolean;
  loading?: boolean;
  onOk: () => void;
  onCancel: () => void;
}

export default (props: ICheckoutBuyProps) => {
  const {
    name,
    title,
    image,
    volume,
    amount,
    symbol,
    visible,
    loading,
    onOk,
    onCancel,
  } = props;

  return (
    <Modal
      visible={visible}
      title={null}
      closable
      footer={null}
      onCancel={onCancel}
      width={473}
      wrapClassName={styles.buyConfirm}
    >
      <div className={styles.content}>
        <div className={styles.title}>Checkout</div>

        <div className={styles.labels}>
          <span>Item</span>
          <span>Amount</span>
        </div>

        <div className={styles.infoWrap}>
          <div className={styles.imageBox}>
            <img src={image} alt="" />
          </div>

          <div className={styles.nameWrap}>
            <span className={styles.name}>{name}</span>
            <span className={styles.title}>{title}</span>
          </div>

          <span className={styles.volume}>{volume}</span>
        </div>

        <div className={styles.paymentWrap}>
          <span className={styles.label}>Total Payment:</span>
          <span className={styles.value}>
            {amount} {symbol}
          </span>
        </div>

        <Button
          type="primary"
          block
          size="large"
          className={styles.btn}
          loading={loading}
          onClick={onOk}
        >
          Checkout
        </Button>
      </div>
    </Modal>
  );
};
