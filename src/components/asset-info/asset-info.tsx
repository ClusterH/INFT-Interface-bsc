import { Button } from 'antd';
import styles from './styles.less';

export interface IAssetInfoProps {
  img: string;
  name: string;
  contract: string;
  tokenId: string;
  blockchain: string;
  price: string;
  priceSymbol: string;
  loading?: boolean;
  onBuy: () => void;
}

export default (props: IAssetInfoProps) => {
  const {
    img,
    name,
    contract,
    tokenId,
    blockchain,
    price,
    priceSymbol,
    loading,
    onBuy,
  } = props;

  return (
    <div className={styles.assetInfo}>
      <div className={styles.imgBox}>
        <img src={img} alt="img" className={styles.img} />
      </div>
      <div className={styles.content}>
        <div className={styles.name}>{name}</div>

        <div className={styles.textBox}>
          <div className={styles.infoItem}>
            <span className={styles.label}>Contract Address</span>
            <span className={styles.value}>{contract}</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.label}>Token ID</span>
            <span className={styles.value}>{tokenId}</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.label}>Blockchain</span>
            <span className={styles.value}>{blockchain}</span>
          </div>
        </div>

        <div className={styles.priceBox}>
          <div className={styles.priceText}>Price:</div>
          <div className={styles.priceWrap}>
            <span className={styles.price}>{price}</span>
            <span className={styles.priceSymbol}>{priceSymbol}</span>
          </div>

          <Button
            type="primary"
            onClick={onBuy}
            block
            size="large"
            loading={loading}
            className={styles.button}
          >
            Buy
          </Button>
        </div>
      </div>
    </div>
  );
};
