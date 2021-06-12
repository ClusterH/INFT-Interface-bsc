import { Spin, Empty, Button } from 'antd';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'umi';
import { useWallet } from '@binance-chain/bsc-use-wallet';
import { notification } from 'antd';
import { CardList } from '@/components/market';
import { queryAssets, queryCollections } from '@/servers';
import { transResource } from '@/helpers/data-to-props';
import { LoadingOutlined } from '@ant-design/icons';
import { StickyContainer, Sticky } from 'react-sticky';
import FilterCollection from '@/components/filter-collection';
import useCollections from '@/hooks/useCollections';
import styles from './styles.less';

const antIcon = <LoadingOutlined style={{ fontSize: 32 }} spin />;

const transItems = (list: any[]): any[] => {
  return list.map((item) => ({
    image: transResource(item.resource),
    name: item.name,
    contract: item.contract,
    tokenId: item.token_id,
    orderId: item.order_id,
    onSale: item.on_sale,
    showFooter: false,
  }));
};

export default () => {
  const wallet = useWallet();
  const history = useHistory();
  const [assets, setAssets] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const collections = useCollections(queryCollections, 0);

  useEffect(() => {
    if (wallet.status === 'connected') {
      wallet.account && initAssets(wallet.account);
    }
  }, [wallet.status]);

  const initAssets = async (account: string) => {
    setLoading(true);
    try {
      const { list } = await queryAssets(account, null);
      setAssets(list);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const showDetail = ({ contract, tokenId, orderId, onSale }: any) => {
    if (onSale) {
      history.push(`/market/${contract}/${tokenId}/${orderId}`);
    } else {
      history.push(`/market/${contract}/${tokenId}`);
    }
  };

  const onChangeCollection = async (item: any) => {
    if (wallet.status !== 'connected') return;

    setLoading(true);
    setAssets([]);
    try {
      const { list } = await queryAssets(
        wallet.account as string,
        item.address,
      );
      setAssets(list || []);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const onCancelFilter = async () => {
    if (wallet.status !== 'connected') return;

    setLoading(true);
    setAssets([]);
    try {
      const { list } = await queryAssets(wallet.account as string, null);
      setAssets(list || []);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <div>
      <div style={{ marginTop: '48px' }}></div>

      <div className={styles.content}>
        <div className={styles.wrapFilterCollection}>
          <FilterCollection
            collections={collections}
            onClick={onChangeCollection}
            onCancel={onCancelFilter}
          />
        </div>

        <div className={styles.wrapCardList}>
          <CardList
            loading={loading}
            data={transItems(assets)}
            onClick={showDetail}
            total={assets.length}
          />
        </div>
      </div>
    </div>
  );
};
