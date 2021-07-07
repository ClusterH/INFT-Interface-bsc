import Web3 from 'web3';
import abi from '@/abis/bid-token.json';
// const contractAddress = '0x6352f57A0E17FE177fbfcdEa7FDAd83427b6B2b2';

const web3 = new Web3(process.env.rpcURL);
const contractMap = new Map();

function factory(address: string): any {
  if (contractMap.has(address)) {
    return contractMap.get(address);
  } else {
    const contract = new web3.eth.Contract(abi as any, address);
    contractMap.set(address, contract);

    return contract;
  }
}

export default factory;
