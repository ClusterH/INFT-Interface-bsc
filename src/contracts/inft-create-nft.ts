import Web3 from 'web3';
import abi from '@/abis/inft-create-nft.json';
const address = '0x52b29289DF14c9Ee2c135378c8c9Cd4eDA867BA8';

const web3 = new Web3(process.env.rpcURL);
const contract = new web3.eth.Contract(abi as any, address);

export default contract;
