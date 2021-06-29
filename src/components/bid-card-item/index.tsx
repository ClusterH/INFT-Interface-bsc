import { getLocale } from 'umi';
import Countdown from 'react-countdown';
import styles from './styles.less';

interface IMarketCardProps {
  image: string;
  imageType: 'image' | 'video' | 'audio';
  name: string;
  countdown: number;
  owner?: string;
  price?: string;
  contract?: string;
  tokenId?: string;
  orderId?: string;
  onSale?: boolean;
  showFooter?: boolean;
  onClick?: (data: any) => void;
}

const renderer = (props: any) => {
  const { days, hours, minutes, seconds, formatted } = props;
  const daysInHours = hours + days * 24;

  return (
    <span className={styles.countdown}>
      <span className={styles.item}>
        {daysInHours < 10 ? '0' + daysInHours : daysInHours}
      </span>
      <span>:</span>
      <span className={styles.item}>{formatted.minutes}</span>
      <span>:</span>
      <span className={styles.item}>{formatted.seconds}</span>
    </span>
  );
};

export default (props: IMarketCardProps) => {
  const {
    tokenId,
    orderId,
    onSale,
    contract,
    image,
    imageType,
    name,
    owner,
    price,
    showFooter,
    countdown,
    onClick,
  } = props;

  const handleClick = () => {
    onClick &&
      onClick({
        contract,
        tokenId,
        orderId,
        onSale,
      });
  };

  return (
    <div className={styles.bidCardItem} onClick={handleClick}>
      <div
        className={[
          styles.imgBox,
          onSale
            ? getLocale() === 'zh-CN'
              ? styles.imageBoxOnSaleCN
              : styles.imageBoxOnSale
            : null,
        ].join(' ')}
      >
        {imageType === 'image' && (
          <img src={image} alt="" className={styles.image} />
        )}
        {imageType === 'video' && (
          <video controls className={styles.video}>
            <source src={image} type="video/mp4"></source>
          </video>
        )}
        {imageType === 'audio' && (
          <audio src={image} controls className={styles.audio}></audio>
        )}
      </div>

      <div className={styles.content}>
        <div className={styles.name}>{name}</div>

        {!!showFooter && (
          <div className={styles.buyWrap}>
            <div className={styles.wrapOwner}>
              <span className={styles.owner}>{owner}</span>
              <span className={styles.time}>
                <span className={styles.label}>Time Left</span>
                <Countdown
                  date={Date.now() + countdown * 1000}
                  renderer={renderer}
                />
              </span>
            </div>

            <button className={styles.buyBtn} onClick={handleClick}>
              {price} BNB
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
