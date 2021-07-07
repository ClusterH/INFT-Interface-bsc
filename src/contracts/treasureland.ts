import Web3 from 'web3';
import treasurelandABI from '@/abis/treasureland.json';
const address = '0x76265575B884F2F7b26B6071e26Ce17235184053';

const web3 = new Web3(process.env.rpcURL);
const contract = new web3.eth.Contract(treasurelandABI as any, address);

export default contract;
