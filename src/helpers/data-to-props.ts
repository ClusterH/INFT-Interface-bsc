import web3 from 'web3';
import transIpfsUrl from '@/helpers/trans-ipfs-url';
const tlContract = '0xf7a21ffb762ef2c14d8713b18f5596b4b0b0490a';
const iNFTcommonContract = '0x52b29289df14c9ee2c135378c8c9cd4eda867ba8';

const transResource = (resource: string, item?: any): string => {
  if (item && item.contract === iNFTcommonContract) {
    return transIpfsUrl(item.token_uri || '');
  }

  if (!resource) return '';

  if (resource.startsWith('ipfs://')) {
    return transIpfsUrl(resource);
  }

  return resource.startsWith('http')
    ? resource
    : `https://api.treasureland.market/v2/v1/resourceS3?uri=${resource}&size=500x0`;
};

const itemsToList = (list: any[], wallet?: any): any[] => {
  const account = (
    wallet.status === 'connected' ? wallet.account : ''
  ).toLowerCase();

  return list.map((item) => {
    const maker = item.maker || '';
    return {
      contract: item.contract,
      tokenId: item.token_id,
      orderId: item.order_id,
      image: transResource(item.resource, item),
      imageType: item.resource_type,
      name: item.name,
      owner: `${maker.substr(0, 5)}***${maker.substr(-4)}`,
      price: web3.utils.fromWei(item.price),
      showFooter: true,
      onSale: !!account && account === maker.toLowerCase(),
    };
  });
};

const dataToDetailProps = (data: any, tokenId?: string): any => {
  return {
    img: transResource(data.image, data),
    imageType: data.image_type,
    name: data.name,
    collectName: data.collect_name,
    owner: data.seller,
    contract: data.contract || tlContract,
    tokenId: data.token_id || tokenId,
    blockchain: 'BSC',
    price: web3.utils.fromWei(data.price || '0'),
    priceSymbol: 'BNB',
  };
};

export { transResource, itemsToList, dataToDetailProps };
