import Axios from 'axios';
import { notification } from 'antd';

const axios = Axios.create({
  baseURL: 'http://api.bscscan.com/api',
  timeout: 30000,
});

axios.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  },
);

export interface IBscscanParams {
  module?: 'contract';
  action?: 'getabi';
  address: string; // 合约
  format?: 'raw';
}

const bscscan = (params: IBscscanParams): Promise<any[]> =>
  axios.get('/', {
    params: {
      module: 'contract',
      action: 'getabi',
      address: params.address,
      format: 'raw',
    },
  });

export { bscscan };
