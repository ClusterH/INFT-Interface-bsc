import Banner from '@/components/banner';
import Category from '@/components/category';
import useCategory from '@/hooks/useCategory';
import { useEffect, useState } from 'react';
import { useHistory } from 'umi';
import { recentlyListed } from '@/servers';
import { Card } from '@/components/market';
import { transResource } from '@/helpers/data-to-props';
import { itemsToList } from '@/helpers/data-to-props';
import Market from '@/components/market';
import { useWallet } from '@binance-chain/bsc-use-wallet';
import { useWindowSize } from 'react-use';

import styles from './styles.less';

export default () => {
  const wallet = useWallet();
  const categories = useCategory();
  const [cateId, setCateId] = useState(null);
  const history: any = useHistory();
  const [recentlyItems, setRecentlyItems] = useState<any[]>([]);
  const { width, height } = useWindowSize();

  useEffect(() => {
    setup();
  }, []);

  const setup = async () => {
    const { items }: any = await recentlyListed();
    if (items && items.length) {
      console.log(items);
      console.log(items.slice(0, 3));
      setRecentlyItems(items.slice(0, width <= 768 ? 4 : 3));
    }
  };

  const onClickCate = (id: number) => {
    setCateId(id);
    if (id === 0) {
      history.push('/market');
    } else {
      history.push({
        pathname: '/market',
        query: {
          cate_id: id,
        },
      });
    }
  };

  const handleClickCard = (params: any) => {
    const { contract, tokenId, orderId } = params;
    history.push(`/market/${contract}/${tokenId}/${orderId}`);
  };

  return (
    <div className={styles.home}>
      <Banner />

      <Category.Home
        categories={categories}
        active={cateId}
        onClick={onClickCate}
      />

      <div className={styles.trendingCollections}>
        <div className={styles.content}>
          <div className={styles.header}>
            <div className={styles.headerContent}>
              <span className="">TRENDING COLLECTIONS</span>
              <span
                className={styles.viewAll}
                onClick={() => history.push('/market')}
              >
                View all &gt;
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.wrapRecentlyItems}>
        <Market.CardList
          data={itemsToList(recentlyItems, wallet)}
          hideTotal
          onClick={handleClickCard}
        />
      </div>
    </div>
  );
};
