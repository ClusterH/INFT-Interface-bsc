import Web3 from 'web3';
import idolboxABI from '@/abis/idolbox.json';
const address = '0xDC93dB27DfCD54be0F5cA8a92370E9f4eE6cE274';

const web3 = new Web3(process.env.rpcURL);
const contract = new web3.eth.Contract(idolboxABI as any, address);

export default contract;
