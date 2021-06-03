/**
 * @desc  origin: https://d1iep3ievzy2jq.cloudfront.net/p__NFTDetailV2.a703051f.async.js:formatted
 * @desc  line:   29956
 * @param {object} e orderData
 * @returns
 */
function getR(e: any) {
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

export default getR;
