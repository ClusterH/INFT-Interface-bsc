import Web3 from 'web3';
import abi from '@/abis/tresrnft.json';
const address = '0xf7A21FFb762eF2C14D8713B18f5596b4B0B0490a';

const web3 = new Web3(process.env.rpcURL);
const contract = new web3.eth.Contract(abi as any, address);

export default contract;
