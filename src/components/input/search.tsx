import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import styles from './styles.less';

export interface ISearchInputProps {
  placeholder: string;
}
export default (props: ISearchInputProps) => {
  return (
    <Input
      className={styles.searchInput}
      placeholder={props.placeholder}
      suffix={<SearchOutlined />}
    />
  );
};
