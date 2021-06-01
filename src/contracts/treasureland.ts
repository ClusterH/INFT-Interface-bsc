import Web3 from 'web3';
import treasurelandABI from '@/abis/treasureland.json';
const address = '0x76265575B884F2F7b26B6071e26Ce17235184053';

const web3 = new Web3(Web3.givenProvider);
const contract = new web3.eth.Contract(treasurelandABI, address);

export default contract;
