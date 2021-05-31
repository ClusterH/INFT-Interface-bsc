import { useEffect, useState } from 'react';
import { useParams } from 'umi';
import Header from '@/components/header';
import AssetInfo from '@/components/asset-info';
import OffersTable from '@/components/offers-table';
import { queryDetail, queryOrder } from '@/servers';
import { dataToDetailProps } from '@/helpers/data-to-props';

const data = {
  img: 'https://wx2.sinaimg.cn/large/005BaCAEly4ghple87niuj30mj0nvdhi.jpg',
  name: '三上优亚盲盒 #NO.1',
  contract: '0x8a0c542bbbab7cf3551ffcc546cdc5362d2a1',
  tokenId: '12701',
  blockchain: 'BSC',
  price: '19.99',
  priceSymbol: 'BNB',
  onBuy: () => {},
};

const dataSource = [
  {
    from: 'xxxxxxxxxxx1',
    price: '0.03 BNB',
    date: '2021-08-19 12:09',
    operate: 'Sell',
  },
  {
    from: 'xxxxxxxxxxx2',
    price: '0.03 BNB',
    date: '2021-08-19 12:09',
    operate: 'Sell',
  },
];

export default () => {
  const { contract, tokenId, orderId } = useParams();
  const [detail, setDetail] = useState(null);
  const [order, setOrder] = useState(null);

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

  const handleBuy = () => {
    console.log('handleBuy', order);
  };

  return (
    <>
      <Header />
      {!!detail && (
        <AssetInfo {...dataToDetailProps(detail)} onBuy={handleBuy} />
      )}
      <OffersTable dataSource={[]} />
    </>
  );
};
