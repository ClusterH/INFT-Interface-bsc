import getOrderHash from './get-order-hash';
import getSig from './get-sig';
import getOrderHashSign from './get-order-hash';

export interface IGetBodyParams {
  tokenId: string;
  maker: string;
  amount: number;
  target: string;
}

const exchange = '0x76265575B884F2F7b26B6071e26Ce17235184053';
const feeRecipient = '0x4c9f5e85Dd88cd06015d791479a6a478c3D27B6B';
// const cryptozContractAddress = '0x8a0c542ba7bbbab7cf3551ffcc546cdc5362d2a1';

async function getBody(
  e: any,
  { tokenId, maker, amount, target }: IGetBodyParams,
) {
  const body: any = {
    chain_id: 56,
    //   token_id: "49708",
    amount: amount,
    //   order_hash:
    //     "0x2f34ef710be437a1c2a33c582b4da25c1723ec3902ef2624a5dafafc193a37f1",
    exchange: exchange, // 交易所合约地址 固定值
    //   maker: "0x8b7A9d07e34712F8473BeB95Cd85420ee25A600C", // 提供流动性 卖方
    taker: '0x0000000000000000000000000000000000000000', // 固定值
    maker_relayer_fee: 200, // 固定
    taker_relayer_fee: 0, // 固定
    maker_protocol_fee: 0, // 固定
    taker_protocol_fee: 0, // 固定
    fee_recipient: feeRecipient, // 固定 平台地址
    fee_method: 1, // 固定
    side: 1, // 固定
    sale_kind: 0, // ？暂时认为固定
    // target: cryptozContractAddress, // erc721地址 nft地址
    target: target,
    how_to_call: 0, // 固定
    // ？不确定 => 已解决
    //   calldata:
    //     "0x23b872dd0000000000000000000000008b7a9d07e34712f8473beb95cd85420ee25a600c0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000c22c",
    // ？不确定 (假设固定)
    replacement_pattern:
      '0x000000000000000000000000000000000000000000000000000000000000000000000000ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0000000000000000000000000000000000000000000000000000000000000000',
    static_target: '0x0000000000000000000000000000000000000000', // 固定
    static_extradata: '0x', // 固定
    payment_token: '0x0000000000000000000000000000000000000000', // 固定
    //   base_price: "1000000000000000000", // 卖出价格
    extra: 0, // 固定
    //   listing_time: 1622001606, // 当前时间
    expiration_time: 0, // 固定
    //   salt: "1622001606000", // listing_time * 1000
    // metamask 签名公钥字段
    // sig: {
    //   v: "0x1c",
    //   r: "0x4dbe649076cb1070df310aebbca9ace60022b7c8ae92f807a516c9c7c5a69288",
    //   s: "0x2bb0428212fbb0af8e34f36c7557908d11e881b122822ceeca48d34336db8509",
    // },
    // 通过order_hash 签名获得
    //   order_hash_sign:
    //     "0x4c0ebc82c1fe58f97b9fb485d7e9cb43f88f2c0e7fc7fdfb682da96aa809f895",
  };

  const order_hash = getOrderHash(e);
  if (!order_hash) {
    throw new Error('order_hash is null');
  }

  body.token_id = tokenId;
  body.order_hash = order_hash;
  body.maker = maker;
  body.calldata = e.calldata;
  body.base_price = e.basePrice;
  body.listing_time = e.listingTime;
  body.salt = e.salt;
  body.sig = await getSig(order_hash, maker);
  body.order_hash_sign = getOrderHashSign(e);

  return body;
}

export default getBody;
