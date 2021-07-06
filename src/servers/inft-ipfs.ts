import Axios from 'axios';

export interface IAttribute {
  trait_type: string;
  value: string;
}

export interface IMetadata {
  name: string;
  description: string;
  attributes: IAttribute[];
  image: string;
}

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

const fetchInftIpfs = (path: string): Promise<IMetadata> => axios.get(path);

export { fetchInftIpfs };
