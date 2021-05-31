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
      notification.error({ message });
      return res;
    }
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  },
);

export interface IQueryItemsParams {
  pageNo: number;
  pageSize: number;
}

const queryItems = (params: IQueryItemsParams) =>
  axios.get('/nft/items', {
    params: {
      chain_id: 56,
      contract: '0x8a0c542ba7bbbab7cf3551ffcc546cdc5362d2a1',
      sort_type: 1,
      page_no: params.pageNo,
      page_size: params.pageSize,
    },
  });

export { queryItems };
