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
import { StickyContainer, Sticky } from 'react-sticky';
import useNFTItems from '@/hooks/useNFTItems';
import useCollections from '@/hooks/useCollections';
import useCollectAttrs from '@/hooks/useCollectAttrs';
import useItems from '@/hooks/useItems';
import useCollectPros from '@/hooks/useCollectPros';

export default () => {
  const history = useHistory();
  const wallet = useWallet();

  const collections = useCollections(queryCollections);
  const collectAttrs = useCollectAttrs(queryCollectAttrs);
  const {
    params,
    dataCount,
    items,
    onInit,
    onLoadMore,
    setPros,
    onChangePros,
  } = useItems({
    fetchCollectItems: queryItems,
    fetchRecommendItems: itemsRecommend,
  });
  const { pros, propsObj, setPropsObj } = useCollectPros();

  useEffect(() => {
    onChangePros(pros);
    console.log('onChangePros', pros);
  }, [pros]);

  const handleClickCard = (params: {
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

  const onAttrsChange = (attr: string, values: string[]) => {
    setPropsObj({
      ...propsObj,
      [attr]: values,
    });
  };

  return (
    <div>
      <Banner />
      <Market.LevelCheckbox />

      <div className={styles.content}>
        <StickyContainer>
          <Sticky>
            {({ style }) => (
              <div style={style}>
                <SidebarFilter
                  collections={collections}
                  attrs={collectAttrs}
                  onChangeCollection={onChangeCollection}
                  onAttrsChange={onAttrsChange}
                />
              </div>
            )}
          </Sticky>
        </StickyContainer>

        {!!items.length && (
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
            <div style={{ paddingLeft: 30 }}>
              <Market.CardList
                data={itemsToList(items, wallet)}
                total={dataCount}
                onClick={handleClickCard}
              />
            </div>
          </InfiniteScroll>
        )}
      </div>
    </div>
  );
};
