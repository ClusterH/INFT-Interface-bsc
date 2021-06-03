import getCalldata from './get-calldata';

export interface IGetEParam {
  maker: string;
  basePrice: string;
  tokenId: string;
  amount: number;
}

// TODO 这里硬编码，后期作为参数传入
const cryptozContractAddress = '0x8a0c542ba7bbbab7cf3551ffcc546cdc5362d2a1';
const treasurelandContractAddress =
  '0x76265575B884F2F7b26B6071e26Ce17235184053';
const feeRecipient = '0x4c9f5e85Dd88cd06015d791479a6a478c3D27B6B'; // 接收手续费的地址

function getE({ maker, basePrice, tokenId, amount }: IGetEParam): any {
  const e: any = {
    //   basePrice: "1000000000000000000", // ？
    //   calldata:
    //     "0x23b872dd0000000000000000000000008b7a9d07e34712f8473beb95cd85420ee25a600c0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000c22c",
    exchange: treasurelandContractAddress,
    expirationTime: 0, // ？
    extra: 0, // ？
    feeMethod: 1, // ？
    feeRecipient: feeRecipient, // ？
    howToCall: 0, // ？
    //   listingTime: 1622013006,
    //   maker: "0x8b7A9d07e34712F8473BeB95Cd85420ee25A600C",
    makerProtocolFee: 0,
    makerRelayerFee: 200,
    paymentToken: '0x0000000000000000000000000000000000000000',
    replacementPattern:
      '0x000000000000000000000000000000000000000000000000000000000000000000000000ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0000000000000000000000000000000000000000000000000000000000000000',
    saleKind: 0,
    //   salt: "1622013006000",
    side: 1,
    staticExtradata: '0x',
    staticTarget: '0x0000000000000000000000000000000000000000',
    taker: '0x0000000000000000000000000000000000000000',
    takerProtocolFee: 0,
    takerRelayerFee: 0,
    target: cryptozContractAddress,
  };

  e.basePrice = basePrice;
  e.calldata = getCalldata(
    'erc721', // 固定
    maker, // 卖方钱包地址
    '0x0000000000000000000000000000000000000000', // 固定
    tokenId, // token ID
    amount, // amount 认为固定
  );
  e.maker = maker;
  e.listingTime = Math.floor(Date.now() / 1e3);
  e.salt = String(1e3 * e.listingTime);

  return e;
}

export default getE;
