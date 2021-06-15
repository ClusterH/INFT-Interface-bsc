import { useIntl } from 'umi';
import React from 'react';
import { Select, Spin } from 'antd';
import debounce from 'lodash/debounce';
import { searchGlobal } from '@/servers';
import styles from './styles.less';
import { SearchOutlined } from '@ant-design/icons';

function DebounceSelect({
  fetchOptions,
  debounceTimeout = 800,
  onSelect,
  ...props
}) {
  const [fetching, setFetching] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const fetchRef = React.useRef(0);
  const debounceFetcher = React.useMemo(() => {
    const loadOptions = (value) => {
      fetchRef.current += 1;
      const fetchId = fetchRef.current;
      setOptions([]);
      setFetching(true);
      fetchOptions(value)
        .then((newOptions) => {
          if (fetchId !== fetchRef.current) {
            // for fetch callback order
            return;
          }

          setOptions(newOptions);
          setFetching(false);
        })
        .catch((e) => {
          setOptions([]);
          setFetching(false);
        });
    };

    return debounce(loadOptions, debounceTimeout);
  }, [fetchOptions, debounceTimeout]);

  return (
    <Select
      size="large"
      showSearch
      labelInValue
      filterOption={false}
      onSearch={debounceFetcher}
      notFoundContent={fetching ? <Spin size="small" /> : null}
      {...props}
      options={options}
      onSelect={onSelect}
      suffixIcon={<SearchOutlined />}
      style={{ width: '100%' }}
    />
  );
} // Usage of DebounceSelect

async function fetchUserList(query: string) {
  return searchGlobal({ query }).then((data) => {
    const { nft_collects } = data;
    if (nft_collects && nft_collects.length) {
      return nft_collects.map((item) => ({
        label: item.title,
        value: item.contract,
      }));
    } else {
      return [];
    }
  });
}

const SearchGlobal = (props) => {
  const intl = useIntl();
  const [value, setValue] = React.useState([]);
  const { onSelect } = props;

  return (
    <div className={styles.searchGlobal}>
      <DebounceSelect
        value={value}
        placeholder={intl.formatMessage({
          id: 'filterCollection_search',
          defaultMessage: 'Search collections',
        })}
        fetchOptions={fetchUserList}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        onSelect={onSelect}
      />
    </div>
  );
};

export default SearchGlobal;
