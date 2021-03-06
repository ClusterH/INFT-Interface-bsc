import { useState, useEffect } from 'react';
import erc721Factory from '@/contracts/factories/erc721';
import { fetchIpfs, fetchInftIpfs } from '@/servers';
import web3 from '@/helpers/web3';
import abi from '@/contracts/factories/abis/erc721.json';

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

export interface IUseMetadataParams {
  /** tokenId */
  id: string | number;
  /** Token 合约地址 */
  contract: string;
  /** 是否启用专属网关 */
  useGateway?: boolean;
}

export default (params: IUseMetadataParams) => {
  const { id, contract, useGateway } = params;
  const [metadata, setMetadata] = useState<IMetadata | null>(null);

  useEffect(() => {
    setup();
  }, [id]);

  const setup = async () => {
    if (!id) return;

    try {
      const erc721Contract = new web3.eth.Contract(abi as any, contract);
      const tokenURI = await erc721Contract.methods.tokenURI(id).call();
      const _metadata = await getMetadata(tokenURI, useGateway);

      setMetadata(_metadata);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getMetadata = async (tokenURI: string, _useGateway?: boolean): Promise<IMetadata | null> => {
    if (!tokenURI || !tokenURI.startsWith('ipfs://')) return null;

    try {
      const path = tokenURI.split('ipfs://').pop() || '';
      const _metadata: IMetadata = _useGateway ? await fetchInftIpfs(path) : await fetchIpfs(path);

      return _metadata;
    } catch (error) {
      console.log(error.message);
      return await getMetadata(tokenURI, _useGateway);
    }
  };

  return metadata;
};
