import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'umi';
import { useWallet } from '@binance-chain/bsc-use-wallet';
import Banner from '@/components/banner';
import Market from '@/components/market';
import {
  itemsRecommend,
  queryItems,
  queryCollections,
  queryCollectAttrs,
} from '@/servers';
import InfiniteScroll from 'react-infinite-scroller';
import Spin from '@/components/spin';
import { itemsToList } from '@/helpers/data-to-props';
import SidebarFilter from '@/components/sidebar-filter';
import styles from './styles.less';

export default () => {
  const history = useHistory();
  const { query }: any = useLocation();
  const wallet = useWallet();

  const [assets, setAssets] = useState<{
    dataCount: number;
    hasMore: boolean;
    list: any[];
  }>({
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
  const [collectAttrParams, setCollectAttrParams] = useState({
    chainId: 56,
    contract: query ? query.contract || '' : '',
  });
  /** 当前系列的属性集 */
  const [collectAttrs, setCollectAttrs] = useState([]);
  /** 选中的属性集 */
  const [selectedAttrs, setSelectedAttrs] = useState({
    // someAttr: []
  });

  // 初始化
  useEffect(() => {
    initCollections();
    initCollectAttrs({
      chainId: collectAttrParams.chainId,
      contract: collectAttrParams.contract,
    });
    loadItems();
  }, []);

  useEffect(() => {
    if (query.contract) {
      loadItems();
    }
  }, [query.contract]);

  // 相应属性过滤
  useEffect(() => {
    if (Object.keys(selectedAttrs).length) {
      console.log('effect selectedAttrs');
      loadCollectionItems({
        contract: query.contract,
        sortType: queryParam.sortType,
        pageNo: queryParam.pageNo,
        pageSize: queryParam.pageSize,
        pros: setPropsParam(selectedAttrs),
      });
    }
  }, [selectedAttrs]);

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
    console.log('--', res);
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
    setSelectedAttrs({});
    setCollectAttrParams({
      chainId: item.chain_id,
      contract: item.contract,
    });
    initCollectAttrs({
      chainId: item.chain_id,
      contract: item.address,
    });
    history.push(`/market?contract=${item.address}`);
  };

  const resetQueryParam = () => {
    setQueryParam({
      pageNo: 1,
      pageSize: 18,
      sortType: 1,
    });
  };

  const initCollectAttrs = async (params: any) => {
    if (!params.contract) return;

    const res = await queryCollectAttrs(params);
    setCollectAttrs(res as any);
  };

  const setPropsParam = (attrsObj: any) => {
    const keys = Object.keys(attrsObj);
    let props = '';
    for (const key of keys) {
      if (!props) {
        props = attrsObj[key].length ? `${key}=${attrsObj[key].join(',')}` : '';
      } else {
        props = attrsObj[key].length
          ? props + `|${key}=` + attrsObj[key].join(',')
          : props;
      }
    }

    return props;
  };

  const onAttrsChange = (attr: string, values: string[]) => {
    // 重置列表
    setAssets({
      dataCount: 0,
      hasMore: true,
      list: [],
    });
    // 重置请求参数
    resetQueryParam();

    // 设置属性
    setSelectedAttrs({
      ...selectedAttrs,
      [attr]: values,
    });
  };

  return (
    <div>
      <Banner />
      <Market.LevelCheckbox />

      <div className={styles.content}>
        <SidebarFilter
          collections={collections}
          attrs={collectAttrs}
          onChangeCollection={onChangeCollection}
          onAttrsChange={onAttrsChange}
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
