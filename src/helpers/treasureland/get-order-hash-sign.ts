import Web3 from 'web3';

function Xt(e: any) {
  const n = Web3;
  const t = n.utils.soliditySha3(
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
  );

  return t || void 0;
}

function getOrderHashSign(e: any) {
  var t,
    n = Web3,
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

export default getOrderHashSign;
