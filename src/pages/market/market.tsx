import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'umi';
import { useWallet } from '@binance-chain/bsc-use-wallet';
import { Select } from 'antd';
import Category from '@/components/category';
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
import { StickyContainer, Sticky } from 'react-sticky';
import SelectSortType from '@/components/select-sort-type/select-sort-type';
import SelectCollection from '@/components-mobile/select-collection';

import useCollections from '@/hooks/useCollections';
import useCollectAttrs from '@/hooks/useCollectAttrs';
import useItems from '@/hooks/useItems';
import useCollectPros from '@/hooks/useCollectPros';
import useCategory from '@/hooks/useCategory';

export default () => {
  const history: any = useHistory();
  const wallet = useWallet();
  const { query }: any = useLocation();
  const categories = useCategory();

  const [cate, setCate] = useState(query ? query.cate_id || 0 : 0);
  const { collections, initCollections } = useCollections(
    queryCollections,
    query.cate_id || 0,
  );
  const collectAttrs = useCollectAttrs(queryCollectAttrs);
  const {
    params,
    dataCount,
    items,
    onLoadMore,
    onChangePros,
    onChangeSortType,
  } = useItems({
    fetchCollectItems: queryItems,
    fetchRecommendItems: itemsRecommend,
  });
  const { pros, propsObj, setPropsObj } = useCollectPros();

  useEffect(() => {
    onChangePros(pros);
  }, [pros]);

  const handleClickCard = (params: {
    contract: string;
    tokenId: string;
    orderId: string;
  }): void => {
    const { contract, tokenId, orderId } = params;
    history.push(`/market/${contract}/${tokenId}/${orderId}`);
  };

  const onChangeCollection = (address: string) => {
    console.log('onChangeCollection');
    if (!address) {
      history.push('/market');
    } else {
      history.push(`/market?contract=${address}`);
    }
  };

  const onAttrsChange = (attr: string, values: string[]) => {
    setPropsObj({
      ...propsObj,
      [attr]: values,
    });
  };

  const changedSortType = (type: string) => {
    console.log('changedSortType', type);
    onChangeSortType(type);
  };

  const onCancelSellect = () => {
    console.log('onCancelSellect');
    history.push('/market');
  };

  const onClickCate = (id: number) => {
    setCate(id);
    initCollections(id);

    if (id === 0) {
      history.push({
        pathname: '/market',
      });
    } else {
      history.push({
        pathname: '/market',
        query: {
          cate_id: String(id),
        },
      });
    }
  };

  return (
    <div className={styles.market}>
      {/* <Banner />
      <Market.LevelCheckbox /> */}

      {/* 移动端-选择器 */}
      <div className={styles.wrapMobileSelector}>
        <SelectCollection
          collections={collections}
          onChange={onChangeCollection}
        ></SelectCollection>

        <SelectSortType
          mode="mobile"
          size="large"
          onChange={changedSortType}
        ></SelectSortType>
      </div>

      <div className={styles.content}>
        <StickyContainer className={styles.stickyContainer}>
          <Sticky>
            {({ style }) => (
              <div style={style}>
                <div className={styles.wrapSortType}>
                  <SelectSortType onChange={changedSortType} />
                </div>
                <SidebarFilter
                  collections={collections}
                  attrs={collectAttrs}
                  onChangeCollection={onChangeCollection}
                  onAttrsChange={onAttrsChange}
                  onCancel={onCancelSellect}
                />
              </div>
            )}
          </Sticky>
        </StickyContainer>

        <InfiniteScroll
          className={styles.scrollWrapList}
          initialLoad={false}
          loadMore={onLoadMore}
          useWindow={true}
          hasMore={items.length < dataCount}
          loader={
            <div key={params.pageNo} style={{ textAlign: 'center' }}>
              <Spin />
            </div>
          }
        >
          {/* 分类 */}
          <div className={styles.wrapTopbar}>
            <Category.Market
              active={cate}
              onClick={onClickCate}
              categories={categories}
            />
          </div>

          <div className={styles.wrapCardList}>
            <Market.CardList
              data={itemsToList(items, wallet)}
              total={dataCount}
              onClick={handleClickCard}
            />
          </div>
        </InfiniteScroll>
      </div>
    </div>
  );
};
