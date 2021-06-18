import factory from '@/contracts';

const sendToken = async (
  from: string,
  to: string,
  id: string,
  contractAddress: string,
) => {
  const contractObj = await factory(contractAddress);
  const result = await contractObj.methods.transferFrom(from, to, id).send({
    from: from,
    gas: 144864,
  });

  return result;
};

export default sendToken;
