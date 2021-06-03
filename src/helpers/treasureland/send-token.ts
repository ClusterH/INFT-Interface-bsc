import { cryptozContract } from '@/contracts';

const sendToken = async (from: string, to: string, id: string) => {
  try {
    const result = await cryptozContract.methods
      .transferFrom(from, to, id)
      .send({
        from: from,
      });

    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default sendToken;
