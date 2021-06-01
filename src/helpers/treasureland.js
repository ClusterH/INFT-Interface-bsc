import cryptozABI from '@/abis/cryptoz.json';
import treasurelandABI from '@/abis/treasureland.json';
import Web3 from 'web3';
const ethers = require('ethers');
const web3 = new Web3(Web3.givenProvider);

console.log('ethers', ethers);

/**
 * @desc 计算 calldata
 * @param {string} e erc721
 * @param {string} t maker 卖方钱包地址
 * @param {string} n 0x0000000000000000000000000000000000000000 固定
 * @param {string} r tokenId
 * @param {int}    a amount 当前项目固定为 1
 * @returns
 */
function buildCalldata(e, t, n, r, a) {
  let o = cryptozABI;
  let s = new ethers.utils.Interface(o);

  let l = s.encodeFunctionData('transferFrom(address,address,uint256)', [
    t,
    n,
    r,
  ]);

  return l;
}

/**
 * @desc origin: https://d1iep3ievzy2jq.cloudfront.net/p__NFTDetailV2.a703051f.async.js:formatted
 * @desc line:   29957
 * @param {object} t orderData
 * @param {string} n 买方的地址
 * @param {number} r  购买数量
 * @returns
 */
function getA(t, n, r) {
  const it_a = '0x0000000000000000000000000000000000000000';
  const e = 'erc721';
  const zt_e =
    '0x00000000ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000';
  const zt_c =
    '0x00000000ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000';
  return {
    exchange: null === t || void 0 === t ? void 0 : t.exchange,
    maker: n,
    taker: null === t || void 0 === t ? void 0 : t.maker,
    makerRelayerFee: null === t || void 0 === t ? void 0 : t.maker_relayer_fee,
    takerRelayerFee: null === t || void 0 === t ? void 0 : t.taker_relayer_fee,
    makerProtocolFee:
      null === t || void 0 === t ? void 0 : t.maker_protocol_fee,
    takerProtocolFee:
      null === t || void 0 === t ? void 0 : t.taker_protocol_fee,
    // feeRecipient: It['a'],
    feeRecipient: it_a,
    feeMethod: null === t || void 0 === t ? void 0 : t.fee_method,
    side: 0,
    saleKind: null === t || void 0 === t ? void 0 : t.sale_kind,
    target: null === t || void 0 === t ? void 0 : t.target,
    howToCall: null === t || void 0 === t ? void 0 : t.how_to_call,
    // calldata: Vt(
    //   e,
    //   It['a'],
    //   n,
    //   null === t || void 0 === t ? void 0 : t.token_id,
    //   r,
    // ),
    calldata: buildCalldata(
      e,
      it_a,
      n,
      null === t || void 0 === t ? void 0 : t.token_id,
      r,
    ),

    // replacementPattern: 'erc721' === e ? zt['e'] : zt['c'],
    replacementPattern: 'erc721' === e ? zt_e : zt_c,
    staticTarget: null === t || void 0 === t ? void 0 : t.static_target,
    staticExtradata: null === t || void 0 === t ? void 0 : t.static_extradata,
    paymentToken: null === t || void 0 === t ? void 0 : t.payment_token,
    basePrice: null === t || void 0 === t ? void 0 : t.base_price,
    extra: null === t || void 0 === t ? void 0 : t.extra,
    listingTime: null === t || void 0 === t ? void 0 : t.listing_time,
    expirationTime: null === t || void 0 === t ? void 0 : t.expiration_time,
    salt: null === t || void 0 === t ? void 0 : t.salt,
  };
}

/**
 * @desc  origin: https://d1iep3ievzy2jq.cloudfront.net/p__NFTDetailV2.a703051f.async.js:formatted
 * @desc  line:   29956
 * @param {object} e orderData
 * @returns
 */
function getR(e) {
  return {
    exchange: null === e || void 0 === e ? void 0 : e.exchange,
    maker: null === e || void 0 === e ? void 0 : e.maker,
    taker: null === e || void 0 === e ? void 0 : e.taker,
    makerRelayerFee: null === e || void 0 === e ? void 0 : e.maker_relayer_fee,
    takerRelayerFee: null === e || void 0 === e ? void 0 : e.taker_relayer_fee,
    makerProtocolFee:
      null === e || void 0 === e ? void 0 : e.maker_protocol_fee,
    takerProtocolFee:
      null === e || void 0 === e ? void 0 : e.taker_protocol_fee,
    feeRecipient: null === e || void 0 === e ? void 0 : e.fee_recipient,
    feeMethod: null === e || void 0 === e ? void 0 : e.fee_method,
    side: null === e || void 0 === e ? void 0 : e.side,
    saleKind: null === e || void 0 === e ? void 0 : e.sale_kind,
    target: null === e || void 0 === e ? void 0 : e.target,
    howToCall: null === e || void 0 === e ? void 0 : e.how_to_call,
    calldata: null === e || void 0 === e ? void 0 : e.calldata,
    replacementPattern:
      null === e || void 0 === e ? void 0 : e.replacement_pattern,
    staticTarget: null === e || void 0 === e ? void 0 : e.static_target,
    staticExtradata: null === e || void 0 === e ? void 0 : e.static_extradata,
    paymentToken: null === e || void 0 === e ? void 0 : e.payment_token,
    basePrice: null === e || void 0 === e ? void 0 : e.base_price,
    extra: null === e || void 0 === e ? void 0 : e.extra,
    listingTime: null === e || void 0 === e ? void 0 : e.listing_time,
    expirationTime: null === e || void 0 === e ? void 0 : e.expiration_time,
    salt: null === e || void 0 === e ? void 0 : e.salt,
  };
}

/**
 * @desc 获取 i
 * @param {object} t orderData
 * @returns {object} {r,s,v}
 */
function getI(t) {
  const sig = JSON.parse(t.sig);
  return {
    r: sig.r,
    s: sig.s,
    v: sig.v,
  };
}

export { getA, getR, getI };

async function handleBuy(
  orderData,
  account = '0x8b7A9d07e34712F8473BeB95Cd85420ee25A600C',
  amount = 1,
) {
  const a = getA(orderData, account, amount);
  const r = getR(orderData);
  const i = getI(orderData);
  console.log('=============a');
  console.log(a);
  console.log('=============r');
  console.log(r);
  console.log('=============i');
  console.log(i);

  const zt_b =
    '0x0000000000000000000000000000000000000000000000000000000000000000';

  const exchangeContractAddr = '0x76265575B884F2F7b26B6071e26Ce17235184053';
  const exchangeContract = new web3.eth.Contract(
    treasurelandABI,
    exchangeContractAddr,
  );

  const result = await exchangeContract.methods
    .atomicMatch_(
      [
        a.exchange,
        a.maker,
        a.taker,
        a.feeRecipient,
        a.target,
        a.staticTarget,
        a.paymentToken,
        r.exchange,
        r.maker,
        r.taker,
        r.feeRecipient,
        r.target,
        r.staticTarget,
        r.paymentToken,
      ],
      [
        a.makerRelayerFee,
        a.takerRelayerFee,
        a.makerProtocolFee,
        a.takerProtocolFee,
        a.basePrice,
        a.extra,
        a.listingTime,
        a.expirationTime,
        a.salt,
        r.makerRelayerFee,
        r.takerRelayerFee,
        r.makerProtocolFee,
        r.takerProtocolFee,
        r.basePrice,
        r.extra,
        r.listingTime,
        r.expirationTime,
        r.salt,
      ],
      [
        a.feeMethod,
        a.side,
        a.saleKind,
        a.howToCall,
        r.feeMethod,
        r.side,
        r.saleKind,
        r.howToCall,
      ],
      a.calldata,
      r.calldata,
      a.replacementPattern,
      r.replacementPattern,
      a.staticExtradata,
      r.staticExtradata,
      [i.v, i.v],
      [i.r, i.s, i.r, i.s, zt_b],
    )
    .send({
      from: account,
      value: orderData.base_price,
    });

  console.log('result', result);
  return result;
}

/**
 * 出售
 */

/* 1. 构建对象 e */
function buildE({ maker, basePrice, tokenId, amount }) {
  const e = {
    //   basePrice: "1000000000000000000", // ？
    //   calldata:
    //     "0x23b872dd0000000000000000000000008b7a9d07e34712f8473beb95cd85420ee25a600c0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000c22c",
    exchange: '0x76265575B884F2F7b26B6071e26Ce17235184053',
    expirationTime: 0, // ？
    extra: 0, // ？
    feeMethod: 1, // ？
    feeRecipient: '0x4c9f5e85Dd88cd06015d791479a6a478c3D27B6B', // ？
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
    target: '0x8a0c542ba7bbbab7cf3551ffcc546cdc5362d2a1',
  };

  e.basePrice = basePrice;
  e.calldata = buildCalldata(
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

function getSha3Params(e) {
  return [
    {
      type: 'address',
      value: e.exchange,
    },
    {
      type: 'address',
      value: e.maker,
    },
    {
      type: 'address',
      value: e.taker,
    },
    {
      type: 'uint',
      value: String(e.makerRelayerFee),
    },
    {
      type: 'uint',
      value: String(e.takerRelayerFee),
    },
    {
      type: 'uint',
      value: String(e.takerProtocolFee),
    },
    {
      type: 'uint',
      value: String(e.takerProtocolFee),
    },
    {
      type: 'address',
      value: e.feeRecipient,
    },
    {
      type: 'uint8',
      value: String(e.feeMethod),
    },
    {
      type: 'uint8',
      value: String(e.side),
    },
    {
      type: 'uint8',
      value: String(e.saleKind),
    },
    {
      type: 'address',
      value: e.target,
    },
    {
      type: 'uint8',
      value: String(e.howToCall),
    },
    {
      type: 'bytes',
      value: e.calldata ? e.calldata : '',
    },
    {
      type: 'bytes',
      value: e.replacementPattern,
    },
    {
      type: 'address',
      value: e.staticTarget,
    },
    {
      type: 'bytes',
      value: e.staticExtradata,
    },
    {
      type: 'address',
      value: e.paymentToken,
    },
    {
      type: 'uint',
      value: String(e.basePrice),
    },
    {
      type: 'uint',
      value: String(e.extra),
    },
    {
      type: 'uint',
      value: String(e.listingTime),
    },
    {
      type: 'uint',
      value: String(e.expirationTime),
    },
    {
      type: 'uint',
      value: String(e.salt),
    },
  ];
}

/* 2. 构建请求body */
async function buildBody(e, { tokenId, maker, amount = 1 }) {
  const body = {
    chain_id: 56,
    //   token_id: "49708",
    amount: amount,
    //   order_hash:
    //     "0x2f34ef710be437a1c2a33c582b4da25c1723ec3902ef2624a5dafafc193a37f1",
    exchange: '0x76265575B884F2F7b26B6071e26Ce17235184053', // 交易所合约地址 固定值
    //   maker: "0x8b7A9d07e34712F8473BeB95Cd85420ee25A600C", // 提供流动性 卖方
    taker: '0x0000000000000000000000000000000000000000', // 固定值
    maker_relayer_fee: 200, // 固定
    taker_relayer_fee: 0, // 固定
    maker_protocol_fee: 0, // 固定
    taker_protocol_fee: 0, // 固定
    fee_recipient: '0x4c9f5e85Dd88cd06015d791479a6a478c3D27B6B', // 固定 平台地址
    fee_method: 1, // 固定
    side: 1, // 固定
    sale_kind: 0, // ？暂时认为固定
    target: '0x8a0c542ba7bbbab7cf3551ffcc546cdc5362d2a1', // erc721地址 nft地址
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

  const order_hash = web3.utils.soliditySha3(...getSha3Params(e));

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

function signHandler(signature) {
  signature = signature.substr(2);
  let r, s, v;
  r = '0x' + signature.substr(0, 64);
  s = '0x' + signature.substr(64, 64);
  v = '0x' + signature.substr(128, 2);

  return { r, s, v };
}

async function getSig(order_hash, address) {
  try {
    const signature = await web3.eth.personal.sign(order_hash, address);
    return signHandler(signature);
  } catch (error) {
    console.error(error);
    return null;
  }
}

function Xt(e) {
  var t,
    n = web3;
  return null ===
    (t = n.utils.soliditySha3(
      {
        type: 'address',
        value: e.exchange,
      },
      {
        type: 'address',
        value: e.maker,
      },
      {
        type: 'address',
        value: e.taker,
      },
      {
        type: 'uint',
        value: String(e.makerRelayerFee),
      },
      {
        type: 'uint',
        value: String(e.takerRelayerFee),
      },
      {
        type: 'uint',
        value: String(e.takerProtocolFee),
      },
      {
        type: 'uint',
        value: String(e.takerProtocolFee),
      },
      {
        type: 'address',
        value: e.feeRecipient,
      },
      {
        type: 'uint8',
        value: String(e.feeMethod),
      },
      {
        type: 'uint8',
        value: String(e.side),
      },
      {
        type: 'uint8',
        value: String(e.saleKind),
      },
      {
        type: 'address',
        value: e.target,
      },
      {
        type: 'uint8',
        value: String(e.howToCall),
      },
      {
        type: 'bytes',
        value: e.calldata ? e.calldata : '',
      },
      {
        type: 'bytes',
        value: e.replacementPattern,
      },
      {
        type: 'address',
        value: e.staticTarget,
      },
      {
        type: 'bytes',
        value: e.staticExtradata,
      },
      {
        type: 'address',
        value: e.paymentToken,
      },
      {
        type: 'uint',
        value: String(e.basePrice),
      },
      {
        type: 'uint',
        value: String(e.extra),
      },
      {
        type: 'uint',
        value: String(e.listingTime),
      },
      {
        type: 'uint',
        value: String(e.expirationTime),
      },
      {
        type: 'uint',
        value: String(e.salt),
      },
    )) || void 0 === t
    ? void 0
    : t.toString();
}

function getOrderHashSign(e) {
  var t,
    n = new Web3(Web3.givenProvider),
    r = Xt(e);

  if (r)
    return null ===
      (t = n.utils.soliditySha3(
        {
          type: 'string',
          value: '\x19Ethereum Signed Message:\n32',
        },
        {
          type: 'bytes32',
          value: r,
        },
      )) || void 0 === t
      ? void 0
      : t.toString();
}

/**
 * 取消出售
 */
function buildInputDataForCancelSell(e) {
  return {
    exchange: null === e || void 0 === e ? void 0 : e.exchange,
    maker: null === e || void 0 === e ? void 0 : e.maker,
    taker: null === e || void 0 === e ? void 0 : e.taker,
    makerRelayerFee: null === e || void 0 === e ? void 0 : e.maker_relayer_fee,
    takerRelayerFee: null === e || void 0 === e ? void 0 : e.taker_relayer_fee,
    makerProtocolFee:
      null === e || void 0 === e ? void 0 : e.maker_protocol_fee,
    takerProtocolFee:
      null === e || void 0 === e ? void 0 : e.taker_protocol_fee,
    feeRecipient: null === e || void 0 === e ? void 0 : e.fee_recipient,
    feeMethod: null === e || void 0 === e ? void 0 : e.fee_method,
    side: null === e || void 0 === e ? void 0 : e.side,
    saleKind: null === e || void 0 === e ? void 0 : e.sale_kind,
    target: null === e || void 0 === e ? void 0 : e.target,
    howToCall: null === e || void 0 === e ? void 0 : e.how_to_call,
    calldata: null === e || void 0 === e ? void 0 : e.calldata,
    replacementPattern:
      null === e || void 0 === e ? void 0 : e.replacement_pattern,
    staticTarget: null === e || void 0 === e ? void 0 : e.static_target,
    staticExtradata: null === e || void 0 === e ? void 0 : e.static_extradata,
    paymentToken: null === e || void 0 === e ? void 0 : e.payment_token,
    basePrice: null === e || void 0 === e ? void 0 : e.base_price,
    extra: null === e || void 0 === e ? void 0 : e.extra,
    listingTime: null === e || void 0 === e ? void 0 : e.listing_time,
    expirationTime: null === e || void 0 === e ? void 0 : e.expiration_time,
    salt: null === e || void 0 === e ? void 0 : e.salt,
  };
}

export { handleBuy, buildE, buildBody, buildInputDataForCancelSell };
