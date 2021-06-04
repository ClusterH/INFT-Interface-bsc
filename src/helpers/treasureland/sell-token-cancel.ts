import getDataForCancelSell from './get-data-for-cancel-sell';
import { treasurelandContract } from '@/contracts';

const sellTokenCancel = async (order: any) => {
  const n = getDataForCancelSell(order);
  const i = JSON.parse(order.sig);

  try {
    const result = await treasurelandContract.methods
      .cancelOrder_(
        [
          n.exchange,
          n.maker,
          n.taker,
          n.feeRecipient,
          n.target,
          n.staticTarget,
          n.paymentToken,
        ],
        [
          n.makerRelayerFee,
          n.takerRelayerFee,
          n.makerProtocolFee,
          n.takerProtocolFee,
          n.basePrice,
          n.extra,
          n.listingTime,
          n.expirationTime,
          n.salt,
        ],
        n.feeMethod,
        n.side,
        n.saleKind,
        n.howToCall,
        n.calldata,
        n.replacementPattern,
        n.staticExtradata,
        i.v,
        i.r,
        i.s,
      )
      .send({
        from: n.maker,
        gas: 300000,
      });
    //   .then((receipt: any) => {
    //     console.log('receipt', receipt);
    //   });

    console.log('sell token cancel result', result);
    return result;
  } catch (error) {
    throw error;
  }
};

export default sellTokenCancel;
