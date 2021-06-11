import { Select } from 'antd';
import styles from './styles.less';

const { Option } = Select;

export default (props: any) => {
  const { size = 'middle', mode, onChange } = props;

  return (
    <Select
      size={size}
      defaultValue="1"
      onChange={onChange}
      className={
        mode === 'mobile' ? styles.selectSortTypeMoble : styles.selectSortType
      }
    >
      <Option value="1">Recently listed</Option>
      <Option value="2">Latest created</Option>
      <Option value="3">Price asc</Option>
      <Option value="4">Price desc</Option>
    </Select>
  );
};
