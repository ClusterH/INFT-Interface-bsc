import { Spin, Empty, Button } from 'antd';
import { useEffect, useState } from 'react';
import { useHistory } from 'umi';
import { useWallet } from '@binance-chain/bsc-use-wallet';
import { notification } from 'antd';
import { CardList } from '@/components/market';
import { queryAssets } from '@/servers';
import { transResource } from '@/helpers/data-to-props';
import { LoadingOutlined } from '@ant-design/icons';
const antIcon = <LoadingOutlined style={{ fontSize: 32 }} spin />;

const styles = {
  loading: {
    position: 'absolute',
    left: '50%',
    top: ' 248px',
    transform: 'translateX(-50%)',
  },
};

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
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (wallet.status === 'connected') {
      initAssets(wallet.account);
    }
  }, [wallet.status]);

  const initAssets = async (account: string) => {
    setLoading(true);
    try {
      const { list } = await queryAssets(account);
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

  if (loading)
    return <Spin indicator={antIcon} size="large" style={styles.loading} />;

  return (
    <div>
      <div style={{ marginTop: '48px' }}></div>
      {!assets.length && (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={
            <span>
              {wallet.status === 'connected' ? 'No Data' : 'Connect wallet'}
            </span>
          }
          style={{ marginTop: 248 }}
        />
      )}
      {!!assets.length && (
        <CardList
          data={transItems(assets)}
          onClick={showDetail}
          total={assets.length}
        />
      )}
    </div>
  );
};
