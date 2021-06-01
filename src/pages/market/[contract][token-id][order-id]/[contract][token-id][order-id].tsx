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
  buildInputDataForCancelSell,
} from '@/helpers/treasureland';
import SellConfirm from '@/components/sell-confirm';
import Web3 from 'web3';
import { cryptozContract, treasurelandContract } from '@/contracts';

export default () => {
  const { contract, tokenId, orderId } = useParams();
  const wallet = useWallet();
  const history = useHistory();
  const [detail, setDetail] = useState(null);
  const [order, setOrder] = useState(null);
  const [buyLoading, setBuyLoading] = useState(false);
  const [sendLoading, setSendLoading] = useState(false);
  const [sellLoading, setSellLoading] = useState(false);
  const [cancelSellLoading, setCancelSellLoading] = useState(false);
  const [visible, setVisivle] = useState(false);
  const [price, setPrice] = useState(0);
  const [isMyOrder, setIsMyOrder] = useState(false);
  const [isOnSale, setIsOnSale] = useState(false);

  useEffect(() => {
    initDetailData(tokenId);
    if (orderId) {
      initOrderData(orderId);
    }
  }, [tokenId]);

  /** 是否是我的单子 */
  useEffect(() => {
    if (wallet.status === 'connected') {
      cryptozContract.methods
        .ownerOf(tokenId)
        .call()
        .then((owner) => {
          console.log('owner', owner);
          setIsMyOrder(owner === wallet.account);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [wallet.status]);

  /** 是否在售 */
  useEffect(() => {
    if (orderId) {
      setIsOnSale(true);
    }
  }, [orderId]);

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
      // notification.error({ message: error.message });
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
      const { code, message } = error;
      // 1002 用户拒绝

      if (code !== 1002) {
        notification.error({
          message,
        });
      }

      setSellLoading(false);
    }
  };

  const handleCancel = () => {
    setVisivle(false);
  };

  const handleCancelSell = async () => {
    const n = buildInputDataForCancelSell(order);
    const i = JSON.parse(order.sig);

    setCancelSellLoading(true);
    try {
      const result = await treasurelandContract.methods
        .cancelOrder_(
          [
            n.exchange,
            n.maker,
            n.taker,
            n.feeRecipient,
            n.target,
            n.staticTarget,
            n.paymentToken,
          ],
          [
            n.makerRelayerFee,
            n.takerRelayerFee,
            n.makerProtocolFee,
            n.takerProtocolFee,
            n.basePrice,
            n.extra,
            n.listingTime,
            n.expirationTime,
            n.salt,
          ],
          n.feeMethod,
          n.side,
          n.saleKind,
          n.howToCall,
          n.calldata,
          n.replacementPattern,
          n.staticExtradata,
          i.v,
          i.r,
          i.s,
        )
        .send({
          from: n.maker,
        })
        .then((receipt) => {
          // notification.success({
          //   message: '取消出售',
          // });
          console.log('receipt', receipt);
          setCancelSellLoading(false);
          history.push(`/market/${contract}/${tokenId}`);
        });

      console.log('result', result);
    } catch (error) {
      console.error(error);
      setCancelSellLoading(false);
    }
  };

  return (
    <>
      {!!detail && (
        <AssetInfo
          {...dataToDetailProps(detail)}
          buyLoading={buyLoading}
          sendLoading={sendLoading}
          sellLoading={sellLoading}
          cancelSellLoading={cancelSellLoading}
          isMyOrder={isMyOrder}
          isOnSale={isOnSale}
          onBuy={handleBuy}
          onSend={handleSend}
          onSell={inputPrice}
          onCancelSell={handleCancelSell}
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
