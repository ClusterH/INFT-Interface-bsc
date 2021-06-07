import { Input } from 'antd';
import styles from './styles.less';
import { InputProps } from 'antd';

export default (props: InputProps) => {
  return (
    <span className={styles.input}>
      <Input {...props} />
    </span>
  );
};
