import { getLocale, useHistory } from 'umi';
import Countdown from 'react-countdown';
import Web3 from 'web3';
import transAddressShort from '@/helpers/trans-address-short';
import transIpfsUrl from '@/helpers/trans-ipfs-url';
import BidCountdown from '../bid-countdown';
import { ArrowRightOutlined } from '@ant-design/icons';

import styles from './styles.less';

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

const imageType = 'image';
export default (props: any) => {
  const history = useHistory();
  const { auction, bidderPrice = '0' } = props;
  const { tokenMetadata = {} } = auction || {};
  const { image = '' } = tokenMetadata;
  const {
    id,
    contract,
    name,
    owner,
    startTime,
    isStart,
    isFinish,
    endTime,
    highestBidder = '0',
  } = auction || {};

  const renderPreview = () => {
    if (imageType === 'image') {
      return <img src={transIpfsUrl(image)} alt="" className={styles.image} />;
    }
    if (imageType === 'video') {
      return (
        <video controls className={styles.video}>
          <source src={image} type="video/mp4"></source>
        </video>
      );
    }
    if (imageType === 'audio') {
      return <audio src={image} controls className={styles.audio}></audio>;
    }

    return null;
  };

  const onClick = () => {
    history.push(`/auction/${contract}/${id}`);
  };

  return (
    <div className={styles.bidCardItem} onClick={onClick}>
      <div
        className={[
          styles.imgBox,
          bidderPrice !== '0'
            ? getLocale() === 'zh-CN'
              ? styles.imageBoxOnSaleCN
              : styles.imageBoxOnSale
            : null,
        ].join(' ')}
      >
        {renderPreview()}

        {/* 未开始 */}
        {!!id && !isStart && (
          <span className={styles.coming}>
            <span className={styles.text}>Coming soon</span>
            <BidCountdown
              size="small"
              countdown={startTime * 1000}
            ></BidCountdown>
          </span>
        )}

        {/* 已结束 */}
        {isFinish && (
          <span className={styles.auctionClosed}>Auction closed</span>
        )}

        {/* 进行中 */}
        {isStart && !isFinish && (
          <span className={styles.auctioning}>
            <span className={styles.text}>
              Go to auction <ArrowRightOutlined />
            </span>
          </span>
        )}
      </div>

      <div className={styles.content}>
        <div className={styles.name}>{name}</div>

        <div className={styles.buyWrap}>
          <div className={styles.wrapOwner}>
            <span className={styles.owner}>{transAddressShort(owner)}</span>
            {/* {!!isStart && !isFinish && (
              <span className={styles.time}>
                <span className={styles.label}>Time Left</span>
                <Countdown
                  key={endTime}
                  date={endTime * 1000}
                  renderer={renderer}
                />
              </span>
            )} */}
          </div>

          <button className={styles.buyBtn}>
            {parseFloat(Web3.utils.fromWei(highestBidder)).toFixed(5)} BNB
          </button>
        </div>
      </div>
    </div>
  );
};
