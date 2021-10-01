import Web3 from 'web3';
import getE from './get-e';
import getBody from './get-body';
import { makeOrder } from '@/servers';

export interface ISellTokenParam {
  maker: string;
  price: string | number;
  tokenId: string;
  amount: number;
  target: string;
  feeRecipient?: string;
}

const sellToken = async ({
  maker,
  price,
  tokenId,
  amount,
  target,
  feeRecipient,
}: ISellTokenParam): Promise<any> => {
  try {
    const basePrice = Web3.utils.toWei(String(price));

    const e = await getE({
      maker,
      basePrice,
      tokenId,
      amount,
      target,
      feeRecipient,
    });
    console.log('e', e);
    const body = await getBody(e, {
      tokenId,
      maker,
      amount,
      target,
      feeRecipient,
    });
    console.log('body', body);
    const res = await makeOrder(body);
    console.log('res', res);

    return res;
  } catch (error) {
    throw error;
  }
};

export default sellToken;
