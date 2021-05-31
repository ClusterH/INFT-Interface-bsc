import { useEffect, useState } from 'react';
import { useHistory } from 'umi';
import Header from '@/components/header';
import Banner from '@/components/banner';
import Market from '@/components/market';
import { queryItems } from '@/servers';
import web3 from 'web3';
import InfiniteScroll from 'react-infinite-scroller';
import Spin from '@/components/spin';

const transResource = (resource: string): string => {
  return resource.startsWith('http')
    ? resource
    : `https://api.treasureland.market/v2/v1/resourceS3?uri=${resource}&size=500x0`;
};

const transListItem = (list: any[]): any[] => {
  return list.map((item) => ({
    tokenId: item.token_id,
    image: transResource(item.resource),
    name: item.name,
    owner: item.marke,
    price: web3.utils.fromWei(item.price),
    showFooter: true,
  }));
};

export default () => {
  const hitory = useHistory();

  const [pagination, setPagination] = useState({
    dataCount: 0,
    pageNo: 0,
    pageSize: 18,
    hasMore: true,
  });
  const [list, setList] = useState([]);

  useEffect(() => {
    queryAssets(pagination.pageNo);
  }, []);

  const autoLoadAssets = (): void => {
    const currentPageNo = pagination.pageNo;
    const nextPageNo = currentPageNo + 1;

    queryAssets(nextPageNo);
  };

  /** 查询列表 */
  const queryAssets = async (page: number) => {
    try {
      const {
        list: newList,
        dataCount,
        pageNo,
        pageSize,
      }: any = await queryItems({
        pageNo: page,
        pageSize: pagination.pageSize,
      });

      setPagination({
        dataCount,
        pageNo,
        pageSize,
        hasMore: (pageNo + 1) * pageSize <= dataCount,
      });
      setList([...list, ...newList]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClick = (tokenId: string) => {
    hitory.push(`/market/${tokenId}`);
  };

  return (
    <div>
      <Header />
      <Banner />
      <Market.LevelCheckbox onChange={() => {}} />

      <InfiniteScroll
        initialLoad={false}
        loadMore={autoLoadAssets}
        useWindow={true}
        hasMore={pagination.hasMore}
        loader={
          <div key={pagination.pageNo} style={{ textAlign: 'center' }}>
            <Spin />
          </div>
        }
      >
        <Market.CardList data={transListItem(list)} onClick={handleClick} />
      </InfiniteScroll>
    </div>
  );
};
