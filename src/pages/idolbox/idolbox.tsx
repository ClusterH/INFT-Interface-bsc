import { useState, useEffect } from 'react';
import * as bsc from '@binance-chain/bsc-use-wallet';
import { Card, Button, Space, Input, notification } from 'antd';
import Web3 from 'web3';
import abi from '@/abis/idolbox.json';
import subscribeLogEvent from './subscribe';
import Idolbox from '@/components/idolbox/idolbox';
import demoSan1 from '@/assets/images/demo-san.jpeg';
import demoSan2 from '@/assets/images/demo-san2.png';

const web3 = new Web3(Web3.givenProvider);
// const idolboxContract = new web3.eth.Contract(
//   abi,
//   '0x12afF846ce762D5632Db36F2161a08fB2bdA5a8C',
// );

const chainId = 97; // taste-frontend-farms
const rpcUrl = 'https://data-seed-prebsc-1-s1.binance.org:8545/';

const defaultContractAddress =
  localStorage.getItem('contract-address') ||
  '0x12afF846ce762D5632Db36F2161a08fB2bdA5a8C';

let defaultContract = null;
try {
  defaultContract = new web3.eth.Contract(abi, defaultContractAddress);
} catch (error) {}

const App = () => {
  const wallet = bsc.useWallet();

  const [idolbox, setIdolbox] = useState({
    address: defaultContractAddress,
    contract: defaultContract,
  });

  const [data, setData] = useState<{
    price: string;
    buyAmount: string;
    tokenBalance: number;
  }>({
    price: '',
    buyAmount: '',
    tokenBalance: 0,
  });

  const [eventLog, setEventLog] = useState([]);

  const [tokens, setTokens] = useState([]);

  useEffect(() => {
    if (defaultContract) {
      subscribeLogEvent(idolbox.contract, 'BuyBox', web3, handleEventLog);
    }
  }, []);

  useEffect(() => {
    console.log(wallet);

    if (wallet.status === 'error') {
      notification.error({
        message: '钱包关联失败',
        description: `ChainId: ${wallet.chainId}, Network: ${
          wallet.chainId === 56 ? 'Testnet' : 'Mainnet'
        }`,
      });
    }

    if (wallet.status === 'connected') {
      console.log('ChainId: ', wallet.chainId);
      console.log(
        'Network: ',
        wallet.chainId === 56 ? 'BSC Testnet' : 'BSC Mainnet',
      );
      balanceOf();
    }
  }, [wallet.status]);

  useEffect(() => {
    getOwnerTokens(data.tokenBalance);
  }, [data.tokenBalance]);

  const handleEventLog = (name: string, e: any): void => {
    console.log(name, e);
    setEventLog([
      ...eventLog,
      {
        buyer: e.buyer,
        count: e.count,
      },
    ]);
  };

  const handleConnect = () => {
    wallet.connect('injected');
  };

  const handleDisconnect = () => {
    wallet.reset();
  };

  const getPrice = async () => {
    try {
      const price = await idolbox.contract.methods.getPrice().call();
      console.log('price', price);
      setData({
        ...data,
        price,
        buyAmount: Web3.utils.fromWei(price),
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleAmountChange = (e: any) => {
    setData({
      ...data,
      buyAmount: e.target.value,
    });
  };

  const handleBuyToken = async () => {
    if (wallet.status !== 'connected') {
      notification.info({
        message: '请先连接钱包',
      });
      return;
    }

    if (!data.buyAmount) {
      notification.info({
        message: '请输入购买金额',
      });
      return;
    }

    try {
      console.log(wallet.account, data.buyAmount);
      const ret = await idolbox.contract.methods.buyBox().send(
        {
          from: wallet.account,
          value: Web3.utils.toWei(data.buyAmount),
        },
        (sendRes: any) => {
          console.log('sendRes: ', sendRes);
          console.log('交易已发出');
          notification.info({
            message: '交易已发出',
          });
        },
      );

      console.log('交易完成', ret);
      notification.success({
        message: '交易完成',
      });
    } catch (error) {
      console.log('交易失败：', error);
      notification.error({
        message: '交易失败：',
      });
    }
  };

  const balanceOf = async () => {
    const ret = await idolbox.contract.methods
      .balanceOf(wallet.account)
      .call()
      .then((n: number) => {
        setData({
          ...data,
          tokenBalance: n,
        });
        console.log('res', n);
        console.log(`您拥有 ${n} 件 NFT`);
      });
  };

  const handleChangeContractAddress = (e: any) => {
    localStorage.setItem('contract-address', e.target.value);
    setIdolbox({
      ...idolbox,
      address: e.target.value,
    });
  };

  const initIdolbox = () => {
    try {
      const contract = new web3.eth.Contract(abi, idolbox.address);
      setIdolbox({
        ...idolbox,
        contract: contract,
      });

      notification.info({
        message: '合约地址已更换',
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleChangeAmount = (val: string) => {
    setData({
      ...data,
      buyAmount: val,
    });
  };

  const tokenByIndex = async (index: string | number) => {
    return await idolbox.contract.methods.tokenByIndex(index).call();
  };

  const tokenURI = async (tokenId: string) => {
    return await idolbox.contract.methods.tokenURI(tokenId).call();
  };

  const getOwnerTokens = async (balance: number) => {
    if (!balance) return;

    const images = [demoSan1, demoSan2];

    const newTokens = [];

    for (let i = 0; i < balance; i++) {
      const id = await tokenByIndex(i);
      const uri = await tokenURI(id);
      console.log('id', id);
      console.log('uri', uri);

      newTokens.push({
        id,
        image: images[Math.round(Math.random())],
      });
    }

    setTokens(newTokens);
  };

  return (
    <Idolbox
      balance={
        wallet.status === 'connected' ? web3.utils.fromWei(wallet.balance) : ''
      }
      amount={data.buyAmount}
      onConnect={handleConnect}
      onChange={handleChangeAmount}
      onBuy={handleBuyToken}
      tokens={tokens}
    />
  );
};

export default () => {
  return (
    <bsc.UseWalletProvider
      chainId={chainId}
      connectors={{
        walletconnect: { rpcUrl },
        bsc,
      }}
    >
      <App />
    </bsc.UseWalletProvider>
  );
};
