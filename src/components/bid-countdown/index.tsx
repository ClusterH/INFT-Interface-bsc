import Countdown from 'react-countdown';
import styles from './styles.less';

const renderer = (props: any) => {
  const { days, hours, formatted } = props;
  const daysInHours = hours + days * 24;

  return (
    <span className={styles.countdown}>
      <span className={styles.item}>
        {daysInHours < 10 ? '0' + daysInHours : daysInHours}
      </span>
      <span className={styles.symbol}>:</span>
      <span className={styles.item}>{formatted.minutes}</span>
      <span className={styles.symbol}>:</span>
      <span className={styles.item}>{formatted.seconds}</span>
    </span>
  );
};

export default (props: any) => {
  const { countdown }: { countdown: number } = props;

  return <Countdown date={countdown} renderer={renderer} />;
};
