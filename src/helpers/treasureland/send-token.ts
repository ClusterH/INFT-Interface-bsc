import { cryptozContract } from '@/contracts';

const sendToken = async (from: string, to: string, id: string) => {
  const result = await cryptozContract.methods.transferFrom(from, to, id).send({
    from: from,
    gas: 126842,
  });

  return result;
};

export default sendToken;
