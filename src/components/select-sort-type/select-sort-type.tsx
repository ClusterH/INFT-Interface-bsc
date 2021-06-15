import { useIntl } from 'umi';
import { Select } from 'antd';
import styles from './styles.less';

const { Option } = Select;

export default (props: any) => {
  const intl = useIntl();
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
      <Option value="1">
        {intl.formatMessage({
          id: 'selectSortType_listed',
          defaultMessage: 'Recently listed',
        })}
      </Option>
      <Option value="2">
        {intl.formatMessage({
          id: 'selectSortType_created',
          defaultMessage: 'Latest created',
        })}
      </Option>
      <Option value="3">
        {intl.formatMessage({
          id: 'selectSortType_asc',
          defaultMessage: 'Price asc',
        })}
      </Option>
      <Option value="4">
        {intl.formatMessage({
          id: 'selectSortType_desc',
          defaultMessage: 'Price desc',
        })}
      </Option>
    </Select>
  );
};
