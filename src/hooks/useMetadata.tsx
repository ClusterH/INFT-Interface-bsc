import { useState, useEffect } from 'react';
import erc721Factory from '@/contracts/factories/erc721';
import { fetchIpfs, fetchInftIpfs } from '@/servers';

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
}

let erc721Contract = null;
export default (params: IUseMetadataParams) => {
  const { id, contract } = params;
  const [metadata, setMetadata] = useState<IMetadata | null>(null);

  useEffect(() => {
    setup();
  }, []);

  const setup = async () => {
    try {
      erc721Contract = erc721Factory(contract);
      const tokenURI = await erc721Contract.methods.tokenURI(id).call();
      const _metadata = await getMetadata(tokenURI);

      setMetadata(_metadata);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getMetadata = async (tokenURI: string, inftGateway?: boolean): Promise<IMetadata | null> => {
    if (!tokenURI || !tokenURI.startsWith('ipfs://')) return null;

    try {
      const path = tokenURI.split('ipfs://').pop() || '';
      const _metadata: IMetadata = inftGateway ? await fetchInftIpfs(path) : await fetchIpfs(path);

      return _metadata;
    } catch (error) {
      console.log(error.message);
      return await getMetadata(tokenURI, inftGateway);
    }
  };

  return metadata;
};
