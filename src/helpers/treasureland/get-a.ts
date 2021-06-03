import getCalldata from './get-calldata';

/**
 * @desc origin: https://d1iep3ievzy2jq.cloudfront.net/p__NFTDetailV2.a703051f.async.js:formatted
 * @desc line:   29957
 * @param {object} t orderData
 * @param {string} n 买方的地址
 * @param {number} r  购买数量
 * @returns
 */
function getA(t: any, n: string, r: number): any {
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
    calldata: getCalldata(
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

export default getA;
