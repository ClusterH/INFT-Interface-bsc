import { useEffect, useState } from 'react';
import { useHistory } from 'umi';
import { useWallet } from '@binance-chain/bsc-use-wallet';
import { notification } from 'antd';
import { CardList } from '@/components/market';
import { queryAssets } from '@/servers';
import { transResource } from '@/helpers/data-to-props';

const transItems = (list: any[]): any[] => {
  return list.map((item) => ({
    image: transResource(item.resource),
    name: item.name,
    contract: item.contract,
    tokenId: item.token_id,
    showFooter: false,
  }));
};

export default () => {
  const wallet = useWallet();
  const history = useHistory();
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    if (wallet.status === 'connected') {
      initAssets(wallet.account);
    }
  }, [wallet.status]);

  const initAssets = async (account: string) => {
    try {
      const { list } = await queryAssets(account);
      setAssets(list);
    } catch (error) {
      console.error(error);
    }
  };

  const showDetail = ({ contract, tokenId }) => {
    history.push(`/market/${contract}/${tokenId}`);
  };

  return (
    <div>
      <div style={{ marginTop: '48px' }}></div>
      {!!assets.length && (
        <CardList data={transItems(assets)} onClick={showDetail} />
      )}
    </div>
  );
};
