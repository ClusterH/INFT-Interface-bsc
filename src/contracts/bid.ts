import Web3 from 'web3';
import abi from '@/abis/bid.json';
const contractAddress = '0x87B213fa7e1bB171c0f538B39eFCf3650b4FbB87';

const web3 = new Web3(process.env.rpcURL);
const contract = new web3.eth.Contract(abi as any, contractAddress);

export default contract;
