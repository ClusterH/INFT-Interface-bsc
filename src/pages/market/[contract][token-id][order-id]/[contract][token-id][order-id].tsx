import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'umi';
import { notification } from 'antd';
import { useWallet } from '@binance-chain/bsc-use-wallet';
import AssetInfo from '@/components/asset-info';
import OffersTable from '@/components/offers-table';
import { queryDetail, queryOrder, makeOrder } from '@/servers';
import { dataToDetailProps } from '@/helpers/data-to-props';
import {
  handleBuy as doBuy,
  handleSell as doSell,
  buildE,
  buildBody,
} from '@/helpers/treasureland';
import SellConfirm from '@/components/sell-confirm';
import Web3 from 'web3';

export default () => {
  const { contract, tokenId, orderId } = useParams();
  const wallet = useWallet();
  const history = useHistory();
  const [detail, setDetail] = useState(null);
  const [order, setOrder] = useState(null);
  const [buyLoading, setBuyLoading] = useState(false);
  const [sendLoading, setSendLoading] = useState(false);
  const [sellLoading, setSellLoading] = useState(false);
  const [visible, setVisivle] = useState(false);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    initDetailData(tokenId);
    if (orderId) {
      initOrderData(orderId);
    }
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

  const handleSend = async () => {};

  const inputPrice = async () => {
    if (wallet.status !== 'connected') {
      notification.info({ message: '请先连接钱包' });
    } else {
      setVisivle(true);
    }
  };

  const handleSell = async ({ maker, tokenId, amount = 1 }) => {
    console.log({ maker, tokenId, amount });
  };

  const handleOk = async () => {
    setVisivle(false);

    setSellLoading(true);
    try {
      const maker = wallet.account;
      const basePrice = Web3.utils.toWei(String(price));
      const tokenId = detail.token_id;
      const amount = 1;

      const e = await buildE({ maker, basePrice, tokenId, amount });
      const body = await buildBody(e, { tokenId, maker, amount });
      const res = await makeOrder(body);
      console.log('res', res);
      const orderId = res.ID;
      setSellLoading(false);

      history.push(`/market/${contract}/${tokenId}/${orderId}`);
    } catch (error) {
      notification.error({
        message: error.message,
      });
      setSellLoading(false);
    }
  };

  const handleCancel = () => {
    setVisivle(false);
  };

  return (
    <>
      {!!detail && (
        <AssetInfo
          {...dataToDetailProps(detail)}
          buyLoading={buyLoading}
          sendLoading={sendLoading}
          sellLoading={sellLoading}
          onBuy={handleBuy}
          onSend={handleSend}
          onSell={inputPrice}
          isMyOrder={!orderId}
        />
      )}
      <OffersTable dataSource={[]} />
      <SellConfirm
        visible={visible}
        onChange={setPrice}
        onOk={handleOk}
        onCancel={handleCancel}
        priceSymbol="BNB"
      />
    </>
  );
};
