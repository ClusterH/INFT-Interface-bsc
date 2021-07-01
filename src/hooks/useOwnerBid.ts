import { useState, useEffect } from 'react';
import bidTokenFactory from '@/contracts/bid-token-factory';
import { fetchInftIpfs } from '@/servers';

/**
 * 获取竞拍获得的NFT
 */
const address = process.env.BID_TOKEN_CONTRACT;
export default (wallet: any) => {
  const [owners, setOwners] = useState<any[]>([]);
  const bidTokenContract = bidTokenFactory(address as string);

  useEffect(() => {
    if (wallet.status === 'connected') {
      setup();
    }
  }, [wallet]);

  const setup = async () => {
    const account = wallet.account || '';
    const ids = [5, 6];

    const _owners = await getAccountOwners(account, ids);
    const _tokens = await getTokens(_owners);

    setOwners(_tokens);
  };

  const getAccountOwners = async (account: string, ids: number[]) => {
    try {
      if (!account) return [];

      const _owners = [];
      for (const id of ids) {
        const owner = (await bidTokenContract.methods.ownerOf(id).call()) || '';
        console.log('owner', id, owner);
        if (owner.toLowerCase() === account.toLowerCase()) {
          _owners.push(id);
        }
      }

      return _owners;
    } catch (error) {
      return [];
    }
  };

  const getTokens = async (ids: number[]) => {
    const _tokens = [];
    for (const id of ids) {
      let _token = (await getToken(id)) || {};
      _token.isBid = true;

      _token = _formatToekn(id, _token);
      _tokens.push(_token);
    }

    return _tokens;
  };

  /** 获取token信息 */
  const getToken = async (_id: string | number) => {
    const uri = await bidTokenContract.methods.tokenURI(_id).call();
    return await _getMetadata(uri);
  };

  /** 获取metadata */
  const _getMetadata = async (uri: string): Promise<any> => {
    try {
      const cid = uri.split('ipfs://').pop() || '';
      const metadata: any = await fetchInftIpfs(cid);

      return metadata;
    } catch (error) {
      return await _getMetadata(uri);
    }
  };

  const _formatToekn = (id: number, _token: any) => {
    return {
      amount: '1',
      chain_id: 56,
      collect_name: '',
      contract: address,
      erc_type: 'erc721',
      name: _token.name,
      on_sale: false,
      order_id: 0,
      owner: wallet.account,
      price: '0',
      resource: _token.image,
      resource_type: 'image',
      token_id: id,
      token_uri: '',
      isBid: true,
    };
  };

  return owners;
};
