import Axios from 'axios';
import { notification } from 'antd';

const axios = Axios.create({
  baseURL: process.env.inftBASE,
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

const createNft = (body: any): Promise<any[]> => axios.post('/createnft', body);

export { createNft };
