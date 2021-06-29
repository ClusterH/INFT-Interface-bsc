import Web3 from 'web3';
import abi from '@/abis/bid.json';
const contractAddress = '0x0CC4EDe7134F7E6a2F25a3B8d8E76a6064515400';

const web3 = new Web3(Web3.givenProvider);
const contract = new web3.eth.Contract(abi as any, contractAddress);

export default contract;
