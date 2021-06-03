import Web3 from 'web3';
const web3 = new Web3(Web3.givenProvider);

function signHandler(signature: string) {
  signature = signature.substr(2);
  let r, s, v;
  r = '0x' + signature.substr(0, 64);
  s = '0x' + signature.substr(64, 64);
  v = '0x' + signature.substr(128, 2);

  return { r, s, v };
}

async function getSig(order_hash: string, address: string) {
  const signature = await web3.eth.personal.sign(order_hash, address, '');
  return signHandler(signature);
}

export default getSig;
