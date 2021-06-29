import Axios from 'axios';
import { notification } from 'antd';

const axios = Axios.create({
  baseURL: 'https://ipfs.io/ipfs',
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

const fetchIpfs = (path: string): Promise<any[]> => axios.get(path);

export { fetchIpfs };
