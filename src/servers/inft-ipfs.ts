import Axios from 'axios';
import { notification } from 'antd';

const axios = Axios.create({
  baseURL: 'https://inft.mypinata.cloud/ipfs',
  timeout: 60000,
});

axios.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  },
);

const fetchInftIpfs = (path: string): Promise<any[]> => axios.get(path);

export { fetchInftIpfs };
