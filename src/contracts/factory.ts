import Web3 from 'web3';
import { bscscan } from '@/servers';

const contractMap = new Map();
async function factory(address: string): Promise<any> {
  if (contractMap.has(address)) {
    return contractMap.get(address);
  } else {
    const abi = await bscscan({ address });
    const web3 = new Web3(Web3.givenProvider);
    const contract = new web3.eth.Contract(abi, address);
    contractMap.set(address, contract);

    return contract;
  }
}

export default factory;
