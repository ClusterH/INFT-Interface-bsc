import Web3 from 'web3';
import treasurelandProxyRegistryABI from '@/abis/treasureland-proxy-registry.json';
const address = '0xaD3eB5b1A9a5729f08C0A623c8EeacFb43Fb6B54';

const web3 = new Web3(Web3.givenProvider);
const contract = new web3.eth.Contract(treasurelandProxyRegistryABI as any, address);

export default contract;
