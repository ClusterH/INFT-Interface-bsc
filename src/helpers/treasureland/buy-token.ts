import getA from './get-a';
import getR from './get-r';
import getI from './get-i';
import { treasurelandContract } from '@/contracts';

async function buyToken(orderData: any, account: string, amount: number) {
  const a = await getA(orderData, account, amount);
  const r = getR(orderData);
  const i = getI(orderData);

  const zt_b =
    '0x0000000000000000000000000000000000000000000000000000000000000000';

  const result = await treasurelandContract.methods
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
      gas: 300000,
    });

  return result;
}
export default buyToken;
