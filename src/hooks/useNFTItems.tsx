import { useLocation } from 'umi';
import React, { useState, useEffect } from 'react';

/**
 * 挂载时请求列表
 */

export interface IParams {
  chainId: string | number;
  contract: string;
  pageNo: number;
  pageSize: number;
  sortType: string | number;
  pros: string;
}

const defaultParams = {
  chainId: 56,
  pageNo: 1,
  pageSize: 18,
  sortType: 1,
  pros: '',
  contract: '',
};

function useNFTItems(fetchNftItems: (params: any) => any) {
  const { query }: any = useLocation();
  const [params, setParams] = useState<IParams>({
    ...defaultParams,
    contract: query ? query.contract || '' : '',
  });
  const [dataCount, setDataCount] = useState(0);
  const [items, setItems] = useState<any[]>([]);
  const [propsObj, setPropsObj] = useState<any>({});

  /** 1.重置请求参数 2.重置PropsObj 3.重置Items */
  useEffect(() => {
    if (query.contract) {
      onContractChanged(query.contract);
    }
  }, [query.contract]);

  useEffect(() => {
    setProsParam();
  }, [propsObj]);

  /** 重置请求参数 */
  const resetParams = (_contract: string | undefined) => {
    setParams({
      chainId: 56,
      pageNo: 1,
      pageSize: 18,
      sortType: 1,
      pros: '',
      contract: _contract ? _contract : params.contract,
    });
    console.log('resetParams: ', _contract);
  };

  /** 初始化NFTItems */
  const initItems = async (_params: IParams) => {
    console.log('useNFTItems setup');
    const {
      dataCount,
      list = [],
      pageNo,
      pageSize,
    } = await fetchNftItems({
      chain_id: _params.chainId,
      contract: _params.contract,
      pageNo: _params.pageNo,
      pageSize: _params.pageSize,
      sortType: _params.sortType,
      pros: _params.pros,
    });

    setParams({
      ..._params,
      pageNo: pageNo,
      pageSize,
    });
    setDataCount(dataCount);
    setItems(list || []);
  };

  /** 获取更多NFTItems */
  const loadMoreItems = async (_params: IParams) => {
    let { dataCount, list, pageNo, pageSize } = await fetchNftItems({
      chain_id: _params.chainId,
      contract: _params.contract,
      pageNo: _params.pageNo,
      pageSize: _params.pageSize,
      sortType: _params.sortType,
      pros: _params.pros,
    });

    setParams({
      ..._params,
      pageNo: pageNo,
      pageSize,
    });
    setDataCount(dataCount);
    setItems([...items, ...(list || [])]);

    console.log('useNftItems append items: ', [...items, ...list]);
  };

  /** 设置PropsObj */
  const changePropsObj = (attr: string, values: any[]) => {
    setPropsObj({
      ...propsObj,
      [attr]: values,
    });
  };

  /** 设置请求参数 */
  const setProsParam = () => {
    const keys = Object.keys(propsObj);
    let props = '';
    for (const key of keys) {
      if (!props) {
        props =
          propsObj[key] && propsObj[key].length
            ? `${key}=${propsObj[key].join(',')}`
            : '';
      } else {
        props =
          propsObj[key] && propsObj[key].length
            ? props + `|${key}=` + propsObj[key].join(',')
            : props;
      }
    }

    setParams({
      ...params,
      pros: props,
    });

    initItems({
      ...params,
      pros: props,
    });
  };

  /** 1.重置请求参数 2.设置PropsObj 3.重置Items */
  const onContractChanged = (_contract: string) => {
    resetParams(_contract);
    setPropsObj({});

    initItems({
      ...defaultParams,
      contract: query.contract,
    });
  };

  return {
    dataCount,
    items,
    params,
    setParams,
    loadMoreItems,
    changePropsObj,
  };
}

export default useNFTItems;
