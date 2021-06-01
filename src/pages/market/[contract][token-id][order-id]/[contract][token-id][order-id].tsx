import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'umi';
import { notification } from 'antd';
import { useWallet } from '@binance-chain/bsc-use-wallet';
import AssetInfo from '@/components/asset-info';
import OffersTable from '@/components/offers-table';
import { queryDetail, queryOrder } from '@/servers';
import { dataToDetailProps } from '@/helpers/data-to-props';
import { handleBuy as doBuy } from '@/helpers/treasureland';

export default () => {
  const { contract, tokenId, orderId } = useParams();
  const wallet = useWallet();
  const history = useHistory();
  const [detail, setDetail] = useState(null);
  const [order, setOrder] = useState(null);
  const [buyLoading, setBuyLoading] = useState(false);

  useEffect(() => {
    initDetailData(tokenId);
    initOrderData(orderId);
  }, [tokenId]);

  const initDetailData = async (id) => {
    try {
      const data = await queryDetail(id);
      setDetail(data);
    } catch (error) {
      console.error(error);
    }
  };

  const initOrderData = async (id) => {
    try {
      const data = await queryOrder(id);
      setOrder(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleBuy = async () => {
    if (wallet.status !== 'connected') {
      notification.info({ message: '请先连接钱包' });
      return;
    }

    setBuyLoading(true);
    try {
      const result = await doBuy(order, wallet.account, 1);
      const { contract, token_id } = result;
      history.push(`/market/${contract}/${tokenId}`);
      notification.success({ message: '购买成功' });
      setBuyLoading(false);
    } catch (error) {
      setBuyLoading(false);
      notification.error({ message: error.message });
    }
  };

  return (
    <>
      {!!detail && (
        <AssetInfo
          {...dataToDetailProps(detail)}
          onBuy={handleBuy}
          loading={buyLoading}
        />
      )}
      <OffersTable dataSource={[]} />
    </>
  );
};
