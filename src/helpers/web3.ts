import Web3 from 'web3';

const web3 = new Web3(process.env.bscRpcURL as string);

export default web3;
