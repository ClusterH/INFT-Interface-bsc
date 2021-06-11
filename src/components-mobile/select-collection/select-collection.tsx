import { Select } from 'antd';
import { transResource } from '@/helpers/data-to-props';
import styles from './styles.less';

const { Option } = Select;

const CollectionItem = (props: any) => {
  const { data } = props;
  return (
    <span className={styles.collectItem}>
      <img
        src={transResource(data.logo)}
        alt="logo"
        className={styles.collectionIcon}
      />
      <span className={styles.title}>{data.title}</span>
    </span>
  );
};

export default (props: any) => {
  const { collections, onChange } = props;

  return (
    <Select
      size="large"
      showSearch
      allowClear
      placeholder="Collections"
      className={styles.selectCollection}
      onChange={onChange}
      filterOption={(input, option) => {
        return (
          option?.title.toLowerCase().indexOf(input.toLocaleLowerCase()) >= 0
        );
      }}
    >
      {collections.map((item: any) => (
        <Option key={item.id} value={item.address} title={item.title}>
          <CollectionItem data={item} />
        </Option>
      ))}
    </Select>
  );
};
