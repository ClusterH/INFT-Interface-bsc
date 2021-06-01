import styles from './styles.less';

interface IMarketCardProps {
  image: string;
  name: string;
  owner?: string;
  price?: string;
  contract?: string;
  tokenId?: string;
  showFooter?: boolean;
  onClick?: () => void;
}

export default (props: IMarketCardProps) => {
  const { image, name, owner, price, showFooter, onClick } = props;

  return (
    <div className={styles.marketCard} onClick={onClick}>
      <div className={styles.imgBox}>
        <img src={image} alt="" className={styles.image} />
      </div>

      <div className={styles.content}>
        <div className={styles.name}>{name}</div>

        {!!showFooter && (
          <div className={styles.buyWrap}>
            <span className={styles.owner}>{owner}</span>
            <button className={styles.buyBtn} onClick={onClick}>
              {price} BNB
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
