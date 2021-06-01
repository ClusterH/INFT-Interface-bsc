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
function Vt(e, t, n, r, a) {
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
    calldata: Vt(
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

export { handleBuy };
