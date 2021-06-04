import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'umi';
import { useWallet } from '@binance-chain/bsc-use-wallet';
import Banner from '@/components/banner';
import Market from '@/components/market';
import { itemsRecommend, queryItems, queryCollections } from '@/servers';
import InfiniteScroll from 'react-infinite-scroller';
import Spin from '@/components/spin';
import { itemsToList } from '@/helpers/data-to-props';
import SidebarFilter from '@/components/sidebar-filter';
import styles from './styles.less';

export default () => {
  const history = useHistory();
  const { query }: any = useLocation();
  const wallet = useWallet();

  const [assets, setAssets] = useState({
    dataCount: 0,
    hasMore: true,
    list: [],
  });

  const [queryParam, setQueryParam] = useState({
    pageNo: 1,
    pageSize: 18,
    sortType: 1,
  });

  const [collections, setCollections] = useState([]);

  // 初始化
  useEffect(() => {
    initCollections();
    loadItems();
  }, []);

  useEffect(() => {
    if (query.contract) {
      loadItems();
    }
  }, [query.contract]);

  const loadItems = (append?: boolean) => {
    if (query && query.contract) {
      loadCollectionItems(
        {
          contract: query.contract,
          sortType: queryParam.sortType,
          pageNo: queryParam.pageNo,
          pageSize: queryParam.pageSize,
        },
        append,
      );
    } else {
      // loadContractItems()
      loadRecommendItems(
        {
          pageNo: queryParam.pageNo,
          pageSize: queryParam.pageSize,
          sortType: 1,
        },
        append,
      );
    }
  };

  /** 获取推荐列表 */
  const loadRecommendItems = async (params: any, append?: boolean) => {
    try {
      const {
        list: newList,
        dataCount,
        pageNo,
        pageSize,
      }: any = await itemsRecommend(params);

      if (append) {
        // setList([...list, ...newList]);
        setAssets({
          dataCount: dataCount,
          hasMore: pageSize * pageNo <= dataCount,
          list: [...assets.list, ...newList],
        });
      } else {
        setAssets({
          dataCount: dataCount,
          hasMore: pageSize * pageNo <= dataCount,
          list: [...newList],
        });
      }

      setQueryParam({
        ...queryParam,
        pageNo: pageNo + 1,
        pageSize: pageSize,
        sortType: 1,
      });
    } catch (error) {
      console.error(error);
    }
  };

  /** 获取系列列表 */
  const loadCollectionItems = async (params: any, append?: boolean) => {
    try {
      const {
        list: newList,
        dataCount,
        pageNo,
        pageSize,
      }: any = await queryItems(params);

      if (append) {
        setAssets({
          dataCount: dataCount,
          hasMore: pageSize * pageNo <= dataCount,
          list: [...assets.list, ...newList],
        });
      } else {
        console.log('hasMore', pageSize * pageNo <= dataCount);

        setAssets({
          dataCount: dataCount,
          hasMore: pageSize * pageNo <= dataCount,
          list: newList ? [...newList] : [],
        });
      }

      setQueryParam({
        ...queryParam,
        pageNo: pageNo + 1,
        pageSize: pageSize,
        sortType: 1,
      });
    } catch (error) {
      console.error(error);
    }
  };

  /** 初始化collections */
  const initCollections = async () => {
    const res: any = await queryCollections(56, 0);
    setCollections(res.items);
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
    resetQueryParam();
    history.push(`/market?contract=${item.address}`);
  };

  const resetQueryParam = () => {
    setQueryParam({
      pageNo: 1,
      pageSize: 18,
      sortType: 1,
    });
  };

  return (
    <div>
      <Banner />
      <Market.LevelCheckbox />

      <div className={styles.content}>
        <SidebarFilter
          collections={collections}
          onChangeCollection={onChangeCollection}
        />

        {!!assets.list.length && (
          <InfiniteScroll
            initialLoad={false}
            loadMore={() => loadItems(true)}
            useWindow={true}
            hasMore={assets.hasMore}
            loader={
              <div key={queryParam.pageNo} style={{ textAlign: 'center' }}>
                <Spin />
              </div>
            }
          >
            <div style={{ paddingLeft: 30 }}>
              <Market.CardList
                data={itemsToList(assets.list, wallet)}
                total={assets.dataCount}
                onClick={handleClick}
              />
            </div>
          </InfiniteScroll>
        )}
      </div>
    </div>
  );
};
