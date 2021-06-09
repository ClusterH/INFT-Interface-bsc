import { useEffect, useState } from 'react';
import { useLocation } from 'umi';

const defaultParams = {
  chainId: 56,
  pageNo: 1,
  pageSize: 18,
  sortType: 1,
  pros: '',
  contract: '',
};

function useItems({ fetchCollectItems, fetchRecommendItems }: any) {
  const { query }: any = useLocation();
  const [dataCount, setDataCount] = useState(0);
  const [items, setItems] = useState<any[]>([]);
  const [params, setParams] = useState({
    ...defaultParams,
    contract: query ? query.contract || '' : '',
  });

  useEffect(() => {
    onInit();
    console.log('[useItem] onInit');
  }, [query]);

  const onInit = async () => {
    setParams({
      ...defaultParams,
      contract: query.contract,
    });
    setItems([]);
    setDataCount(0);

    if (query.contract) {
      const { dataCount, list, pageNo, pageSize } = await fetchCollectItems({
        ...params,
        contract: query.contract,
      });

      setDataCount(dataCount);
      setItems(list || []);
    } else {
      // TODO
      // fetchRecommendItems()
    }
  };

  const onLoadMore = async () => {
    console.log();
    if (params.contract) {
      const { dataCount, list, pageNo, pageSize } = await fetchCollectItems({
        ...params,
        pageNo: params.pageNo + 1,
      });

      setParams({
        ...params,
        pageNo: params.pageNo + 1,
      });

      setDataCount(dataCount);

      if (list) {
        setItems([...items, ...list]);
      }
    } else {
      // TODO
      // fetchRecommendItems()
    }
  };

  const setPros = () => {};

  const onChangePros = async (pros: string) => {
    setParams({
      ...defaultParams,
      contract: query.contract,
      pros,
    });
    setItems([]);
    setDataCount(0);

    if (query.contract) {
      const { dataCount, list, pageNo, pageSize } = await fetchCollectItems({
        ...params,
        contract: query.contract,
        pros,
      });

      setDataCount(dataCount);
      setItems(list || []);
    } else {
      // TODO
      // fetchRecommendItems()
    }
  };

  return {
    params,
    dataCount,
    items,
    onInit,
    onLoadMore,
    onChangePros,
    setPros,
  };
}

export default useItems;
