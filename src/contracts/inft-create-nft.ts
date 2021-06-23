import Web3 from 'web3';
import abi from '@/abis/inft-create-nft.json';
const address = '0x3B6eB9fE7817130cb33E5Dd29aF2E50e83F72fd4';

const web3 = new Web3(Web3.givenProvider);
const contract = new web3.eth.Contract(abi as any, address);

export default contract;
