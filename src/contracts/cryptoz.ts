import Web3 from 'web3';
import cryptozABI from '@/abis/cryptoz.json';
const address = '0x8a0C542bA7bBBab7cF3551fFcc546CdC5362d2a1';

const web3 = new Web3(process.env.rpcURL);
const contract = new web3.eth.Contract(cryptozABI as any, address);

export default contract;
