import React, { useEffect, useState } from 'react';
import { useHistory, useIntl } from 'umi';
import { notification } from 'antd';
import { useWallet } from '@binance-chain/bsc-use-wallet';
import { CardList } from '@/components/market';
import { queryAssets, queryCollections } from '@/servers';
import { transResource } from '@/helpers/data-to-props';
import FilterCollection from '@/components/filter-collection';
import useCollections from '@/hooks/useCollections';
import useMyInftTokens from '@/hooks/useMyInftTokens';
import useOwnerBid from '@/hooks/useOwnerBid';
import styles from './styles.less';

const transItems = (list: any[]): any[] => {
  if (!list || !list.length) return [];

  const _list = list.map((item) => ({
    image: item.imageUrl || transResource(item.resource),
    imageType: item.resource_type,
    name: item.name,
    contract: item.contract,
    tokenId: item.token_id,
    orderId: item.order_id,
    onSale: item.on_sale,
    showFooter: false,
  }));

  return _list;
};

export default () => {
  const intl = useIntl();
  const wallet = useWallet();
  const history = useHistory();
  const [assets, setAssets] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const { collections } = useCollections(queryCollections, 0);
  const tokens = useMyInftTokens('0x52b29289DF14c9Ee2c135378c8c9Cd4eDA867BA8');
  const tokens2 = useMyInftTokens('0xEc0cc2F23DFe6b2A22e6EFA06092549c995773DA');
  const tokens3 = useMyInftTokens('0x3058AB097a7b7D190819BdC08c7fc59Cf5218C3d');
  const ownerBids = useOwnerBid(wallet);

  console.log('assets', assets);
  console.log('myInftTokens', tokens);
  console.log('ownerBids', ownerBids);

  useEffect(() => {
    if (wallet.status === 'connected') {
      const account = wallet.account || '';
      if (account) {
        initTlAssets(account);
      }
    }
  }, [wallet.status]);

  const initTlAssets = async (account: string) => {
    setLoading(true);
    try {
      const { list } = await queryAssets(account, null);

      setAssets(list || []);
      console.log('list', list);
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

  const disAllowShowDetail = () => {
    notification.info({
      message: intl.formatMessage({
        id: 'notify_disAllowShowDetail',
        defaultMessage: 'Waiting for approval',
      }),
    });
  };

  const onChangeCollection = async (item: any) => {
    if (wallet.status !== 'connected') return;

    setLoading(true);
    setAssets([]);
    try {
      const { list } = await queryAssets(wallet.account as string, item);
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

  console.log('transItems(assets)', transItems(assets));

  return (
    <div className={styles.account}>
      <div style={{ marginTop: '48px' }}></div>

      <div className={styles.content}>
        <div className={styles.wrapFilterCollection}>
          <FilterCollection collections={collections} onClick={onChangeCollection} onCancel={onCancelFilter} />
        </div>

        <div className={styles.wrapCardList}>
          {!!assets.length && <CardList loading={loading} data={transItems(assets)} onClick={showDetail} total={assets.length} />}

          {!!tokens.length && <CardList data={transItems(tokens)} onClick={() => {}} total={tokens.length} withSendMask={true} />}
          {!!tokens2.length && <CardList data={transItems(tokens2)} onClick={() => {}} total={tokens.length} withSendMask={true} />}
          {!!tokens3.length && <CardList data={transItems(tokens3)} onClick={() => {}} total={tokens.length} withSendMask={true} />}

          {/* {!!ownerBids.length && (
            <CardList
              data={transItems(ownerBids)}
              onClick={disAllowShowDetail}
              total={ownerBids.length}
            />
          )} */}
        </div>
      </div>
    </div>
  );
};
