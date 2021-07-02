import { useEffect, useState } from 'react';
import { inftCreateNftContract } from '@/contracts';
import { useWallet } from '@binance-chain/bsc-use-wallet';
import axios from 'axios';

function useMyInftTokens() {
  const [tokens, setTokens] = useState<any[]>([]);
  const wallet = useWallet();

  useEffect(() => {
    if (wallet.status === 'connected') {
      setup(wallet.account as string);
    }
  }, [wallet.status]);

  const setup = async (account: string) => {
    try {
      const balance = await inftCreateNftContract.methods
        .balanceOf(account)
        .call();

      if (balance) {
        const tokenMetas = [];

        for (let index = 0; index < balance; index++) {
          const tokenId = await inftCreateNftContract.methods
            .tokenOfOwnerByIndex(account, index)
            .call();

          const uri = await inftCreateNftContract.methods
            .tokenURI(tokenId)
            .call();

          const ipfsPath = uri.split('ipfs://').pop();

          // 未审核时，ipfsPath 是 tokenId
          if (String(ipfsPath).length <= 5) {
            continue;
          }

          const metaRes: any = await axios.get(
            `https://inft.mypinata.cloud/ipfs/${ipfsPath}`,
          );

          const tokenMeta = metaRes.data;
          const imageIpfsPath = tokenMeta.image;
          const imageCid = imageIpfsPath.split('ipfs://').pop();
          const imageUrl = `https://inft.mypinata.cloud/ipfs/${imageCid}`;

          tokenMetas.push({
            amount: '1',
            chain_id: 56,
            collect_name: 'iNFT',
            contract: '0x3B6eB9fE7817130cb33E5Dd29aF2E50e83F72fd4',
            erc_type: 'erc721',
            name: tokenMeta.name,
            on_sale: false,
            order_id: '',
            owner: wallet.account,
            price: '-1',
            resource: '',
            resource_type: 'image',
            token_id: '-1',
            token_uri: '',
            imageUrl,
          });

          //   const uint8Array = uint8ArrayConcat(await all(ipfs.cat(ipfsPath)));
          //   const tokenMeta = JSON.parse(uint8ArrayToString(uint8Array));

          //   const imageIpfsPath = tokenMeta.image;
          //   const cid = imageIpfsPath.split('ipfs://').pop();
          //   const imageBuffer = uint8ArrayConcat(await all(ipfs.cat(cid)));
          //   const imageBlob = URL.createObjectURL(
          //     new Blob([imageBuffer.buffer], { type: 'image/png' }),
          //   );
          //   tokenMeta.imageBlob = imageBlob;

          //   tokenMetas.push(tokenMeta);
          //   console.log('tokenMeta', tokenMeta);
        }

        setTokens(tokenMetas);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return tokens;
}

export default useMyInftTokens;
