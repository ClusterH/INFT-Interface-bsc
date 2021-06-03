import styles from './styles.less';

export interface IBscAddressProps {
  value: string;
  short?: boolean;
}

export default (props: IBscAddressProps) => {
  const { value, short } = props;

  const onClick = () => {
    window.open(`https://bscscan.com/address/${value}`, '_blank');
  };

  return (
    <span className={styles.bscAddress} onClick={onClick}>
      {short ? value.substr(0, 5) + '...' + value.substr(-4) : value}
    </span>
  );
};
