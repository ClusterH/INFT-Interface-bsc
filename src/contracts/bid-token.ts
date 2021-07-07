import Web3 from 'web3';
import abi from '@/abis/bid-token.json';
const contractAddress = '0x6352f57A0E17FE177fbfcdEa7FDAd83427b6B2b2';

const web3 = new Web3(Web3.givenProvider);
const contract = new web3.eth.Contract(abi as any, contractAddress);

export default contract;
