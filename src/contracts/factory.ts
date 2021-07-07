import Web3 from 'web3';
import abi from '@/abis/collection.json';

const contractMap = new Map();
async function factory(address: string): Promise<any> {
  if (contractMap.has(address)) {
    return contractMap.get(address);
  } else {
    const web3 = new Web3(process.env.rpcURL);
    const contract = new web3.eth.Contract(abi as any, address);
    contractMap.set(address, contract);

    return contract;
  }
}

export default factory;
