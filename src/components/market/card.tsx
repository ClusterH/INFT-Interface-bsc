import styles from './styles.less';

interface IProps {
  image: string;
  name: string;
  owner: string;
  price: string;
  onBuy: () => void;
}

export default (props: IProps) => {
  const { image, name, owner, price, onBuy } = props;

  return (
    <div className={styles.marketCard}>
      <img src={image} alt="" className={styles.image} />
      <div className={styles.name}>{name}</div>

      <div className={styles.buyWrap}>
        <span className={styles.owner}>{owner}</span>
        <button className={styles.buyBtn} onClick={onBuy}>
          {price} BNB
        </button>
      </div>
    </div>
  );
};
