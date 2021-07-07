import Web3 from 'web3';
import bnbusdABI from '@/abis/bnbusd.json';
const address = '0x0567F2323251f0Aab15c8dFb1967E4e8A7D42aeE';

const web3 = new Web3(process.env.rpcURL);
const contract = new web3.eth.Contract(bnbusdABI as any, address);

export default contract;
