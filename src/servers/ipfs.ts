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

const fetchIpfs = (path: string): Promise<IMetadata> => axios.get(path);

export { fetchIpfs };
