import web3 from 'web3';

const transResource = (resource: string): string => {
  return resource.startsWith('http')
    ? resource
    : `https://api.treasureland.market/v2/v1/resourceS3?uri=${resource}&size=500x0`;
};

const itemsToList = (list: any[]): any[] => {
  return list.map((item) => ({
    contract: item.contract,
    tokenId: item.token_id,
    orderId: item.order_id,
    image: transResource(item.resource),
    name: item.name,
    owner: `${item.maker.substr(0, 5)}***${item.maker.substr(-4)}`,
    price: web3.utils.fromWei(item.price),
    showFooter: true,
  }));
};

const dataToDetailProps = (data: any): any => {
  return {
    img: transResource(data.image),
    name: data.name,
    contract: data.contract,
    tokenId: data.token_id,
    blockchain: 'BSC',
    price: web3.utils.fromWei(data.price),
    priceSymbol: 'BNB',
  };
};

export { transResource, itemsToList, dataToDetailProps };
