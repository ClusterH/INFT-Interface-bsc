import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'umi';
import Banner from '@/components/banner';
import Market from '@/components/market';
import { queryItems, queryCollections } from '@/servers';
import InfiniteScroll from 'react-infinite-scroller';
import Spin from '@/components/spin';
import { itemsToList } from '@/helpers/data-to-props';
import SidebarFilter from '@/components/sidebar-filter';
import styles from './styles.less';

export default () => {
  const history = useHistory();
  const { query }: any = useLocation();

  const [queryParams, setQueryParams] = useState({
    dataCount: 0,
    pageNo: 0,
    pageSize: 18,
    sortType: 1,
    hasMore: true,
  });

  const [collections, setCollections] = useState([]);

  // 初始化assets
  useEffect(() => {
    if (query && query.contract) {
      queryAssets({
        pageNo: queryParams.pageNo,
        pageSize: queryParams.pageSize,
        sortType: queryParams.sortType,
        contract: query.contract,
      });
    } else {
      // 请求推荐items
      queryAssets({
        pageNo: queryParams.pageNo,
        pageSize: queryParams.pageSize,
        sortType: queryParams.sortType,
      });
    }
  }, [query.contract]);

  // 初始化 collections
  useEffect(() => {
    initCollections();
  }, []);

  const [list, setList] = useState([]);

  const initCollections = async () => {
    const res: any = await queryCollections(56, 0);
    setCollections(res.items);
  };

  const autoLoadAssets = (): void => {
    const currentPageNo = queryParams.pageNo;
    const nextPageNo = currentPageNo + 1;

    queryAssets({
      pageNo: queryParams.pageNo,
      pageSize: queryParams.pageSize,
      sortType: queryParams.sortType,
      contract: query ? query.contract : null,
    });
  };

  /** 查询列表 */
  const queryAssets = async ({
    pageNo,
    pageSize,
    sortType,
    contract,
  }: {
    pageNo: number;
    pageSize: number;
    sortType: number;
    contract?: string;
  }) => {
    try {
      const res = await queryItems({ pageNo, pageSize, sortType, contract });
      const newList = res.list;
      // 重置列表 或 追加数据
      if (list.length && list[0].contract === newList[0].contract) {
        setList([...list, ...newList]);
      } else {
        setList([...newList]);
      }

      setQueryParams({
        dataCount: res.dataCount,
        pageNo: res.pageNo,
        pageSize: res.pageSize,
        hasMore: (pageNo + 1) * pageSize <= res.dataCount,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleClick = (params: {
    contract: string;
    tokenId: string;
    orderId: string;
  }): void => {
    const { contract, tokenId, orderId } = params;
    history.push(`/market/${contract}/${tokenId}/${orderId}`);
  };

  const onChangeCollection = (item: any) => {
    history.push(`/market?contract=${item.address}`);
  };

  return (
    <div>
      <Banner />
      <Market.LevelCheckbox />

      <InfiniteScroll
        initialLoad={false}
        loadMore={autoLoadAssets}
        useWindow={true}
        hasMore={queryParams.hasMore}
        loader={
          <div key={queryParams.pageNo} style={{ textAlign: 'center' }}>
            <Spin />
          </div>
        }
      >
        <div className={styles.content}>
          <SidebarFilter
            collections={collections}
            onChangeCollection={onChangeCollection}
          />
          <Market.CardList
            data={itemsToList(list)}
            total={queryParams.dataCount}
            onClick={handleClick}
          />
        </div>
      </InfiniteScroll>
    </div>
  );
};
