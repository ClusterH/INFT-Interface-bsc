import { Modal, Button } from 'antd';
import styles from './styles.less';

export interface ICheckoutBuyProps {
  /** token 名称 */
  name: string;
  /** 系列名称 */
  title: string;
  /** 图片 */
  image: string;
  /** 购买数量 */
  volume: number;
  /** 购买总额 */
  amount: number | string;
  /** 标的符号 */
  symbol: string;
  /** 确认框是否可见 */
  visible: boolean;
  /** 是否在处理中 */
  isCompleting: boolean;
  /** 点击确认后回调 */
  onOk: () => void;
  /** 关闭弹窗 */
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
    isCompleting,
    onOk,
    onCancel,
  } = props;

  const CheckoutPanel = () => (
    <div className={styles.checkoutPanel}>
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
        onClick={onOk}
      >
        Checkout
      </Button>
    </div>
  );

  const CompletingPanel = () => (
    <div className={styles.completingPanel}>
      <div className={styles.title}>Completing the trade</div>
      <div className={styles.desc}>
        To purchase this item for {amount} {symbol} , complete this
        finaltransaction !
      </div>
      <div className={styles.imageWrap}>
        <img src={image} alt="" className={styles.image} />
      </div>
      <div className={styles.footerText}>
        WAITING FOR BLOCKCHAIN CONFIRMATION
      </div>
    </div>
  );

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
        {isCompleting ? <CompletingPanel /> : <CheckoutPanel />}
      </div>
    </Modal>
  );
};
