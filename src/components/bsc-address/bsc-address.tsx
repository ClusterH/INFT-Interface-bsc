import React from 'react';
import styles from './styles.less';

export interface IBscAddressProps {
  /** 钱包/合约地址 */
  value: string;
  /** 是否脱敏 */
  short?: boolean;
}

const BscAddress: React.FC<IBscAddressProps> = (props) => {
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

export default BscAddress;
