import Axios from 'axios';
import { notification } from 'antd';

const axios = Axios.create({
  baseURL: 'https://api.treasureland.market/v2/v1/',
  timeout: 30000,
});

axios.interceptors.response.use(
  function (response) {
    const { data: res } = response;
    const { code, message, data } = res;
    if (code === 0) {
      return data;
    } else {
      return Promise.reject(res);
    }
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  },
);

const chainId = 56;
const contract = '0x8a0c542ba7bbbab7cf3551ffcc546cdc5362d2a1';

export interface IQueryItemsParams {
  pageNo: number;
  pageSize: number;
  sortType: number;
  contract?: string;
  pros?: string;
}

export interface IQueryDetailParams {
  tokenId: string;
}

const queryDetail = (tokenId: string, contract: string) =>
  axios.get('/nft/detail', {
    params: {
      chain_id: chainId,
      contract: contract,
      token_id: tokenId,
    },
  });

const queryOrder = (tokenId: string) =>
  axios.get('/query/order', { params: { order_id: tokenId } });

const queryAssets = (
  address: string,
  contract: string | null,
): Promise<{ list: any[] }> =>
  axios.get('/account/assets', {
    params: {
      chain_id: chainId,
      contract: contract,
      owner: address,
      page_no: 1,
      page_size: 9999,
    },
  });

const makeOrder = (body: any) => axios.post('/make/order', body);

const queryCollections = (chainId: string | number, catId: string | number) =>
  axios.get('/category/collection', {
    params: {
      chain_id: chainId,
      cat_id: catId,
    },
  });

const itemsRecommend = ({ pageNo, pageSize, sortType }: any) =>
  axios.get('/nft/items_recommend', {
    params: {
      chain_id: chainId,
      page_no: pageNo,
      page_size: pageSize,
      sort_type: sortType,
    },
  });

const queryItems = (params: IQueryItemsParams) =>
  axios.get('/nft/items', {
    params: {
      chain_id: chainId,
      contract: params.contract,
      sort_type: params.sortType,
      page_no: params.pageNo,
      page_size: params.pageSize,
      pros: params.pros,
    },
  });

const queryCollectAttrs = (params: {
  chainId: number | string;
  contract: string;
}) =>
  axios.get('/nft/collect_attrs', {
    params: {
      chain_id: params.chainId,
      contract: params.contract,
    },
  });

export {
  itemsRecommend,
  queryItems,
  queryDetail,
  queryOrder,
  queryAssets,
  makeOrder,
  queryCollections,
  queryCollectAttrs,
};
