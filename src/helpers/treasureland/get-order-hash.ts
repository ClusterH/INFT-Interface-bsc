import Web3 from 'web3';

const getOrderHash = (e: any) => {
  const args = [
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
      value: String(e.makerProtocolFee),
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

  return Web3.utils.soliditySha3(...args);
};

export default getOrderHash;
