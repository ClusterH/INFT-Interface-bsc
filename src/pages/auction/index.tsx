import { useState, useEffect } from 'react';
import { useHistory } from 'umi';
import { Button } from 'antd';
import Web3 from 'web3';
import bidContract from '@/contracts/bid';
import bidTokenContract from '@/contracts/bid-token';
import { fetchIpfs } from '@/servers';
import BidCardItem from '@/components/bid-card-item';
import transIpfsUrl from '@/helpers/trans-ipfs-url';
import styles from './styles.less';
import transAddressShort from '@/helpers/trans-address-short';
import useAuction from '@/hooks/useAuction';

export default () => {
  const history = useHistory();
  const [auctions, setAuctions] = useState<any>({});
  const [metadatas, setMetadatas] = useState<any>({});
  const _auc = useAuction(4);

  useEffect(() => {
    setup();
  }, []);

  const setup = async () => {
    const auction = await getAuction();
    const _id = auction[3];
    const metadata = await getToken(_id);

    setAuctions({
      [_id]: auction,
    });
    setMetadatas({
      ...metadatas,
      [_id]: metadata,
    });
  };

  /** 获取拍卖信息 */
  const getAuction = async () => {
    const auction = await bidContract.methods.getAuctions().call();
    console.log('data', auction);

    return auction;
  };

  /** 获取token信息 */
  const getToken = async (_id: string | number) => {
    const uri = await bidTokenContract.methods.tokenURI(_id).call();
    return await getMetadata(uri);
  };

  /** 获取metadata */
  const getMetadata = async (uri: string) => {
    const cid = uri.split('ipfs://').pop() || '';
    const metadata: any = await fetchIpfs(cid);
    console.log('metadata: ', metadata);
    return metadata;
  };

  return (
    <div className={styles.bid}>
      <div className={styles.content}>
        <div className={styles.wrapFilter}>
          <span className={`${styles.item} ${styles.active}`}>All</span>
          <span className={styles.item}>On Auction</span>
          <span className={styles.item}>Over</span>
        </div>

        <div className="wrapList"></div>
      </div>

      <div className={styles.wrapList}>
        {Object.keys(metadatas).map((key) => (
          <BidCardItem
            key={key}
            imageType="image"
            image={transIpfsUrl(metadatas[key].image)}
            name={auctions[key][1]}
            owner={transAddressShort(auctions[key][2])}
            countdown={auctions[key][4]}
            showFooter
            onClick={() => {
              history.push(`/auction/${auctions[key][3]}`);
            }}
          />
        ))}
      </div>
    </div>
  );
};
