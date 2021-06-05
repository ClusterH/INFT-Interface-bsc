import { useState, useEffect } from 'react';
import * as bsc from '@binance-chain/bsc-use-wallet';
import { Card, Button, Space, Input, notification } from 'antd';
import Web3 from 'web3';
import abi from '@/abis/idolbox.json';
import subscribeLogEvent from './subscribe';

const web3 = new Web3(Web3.givenProvider);
// const idolboxContract = new web3.eth.Contract(
//   abi,
//   '0x12afF846ce762D5632Db36F2161a08fB2bdA5a8C',
// );

const chainId = process.env.chainId as unknown as number; // taste-frontend-farms
const rpcUrl = process.env.rpcURL as string;

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

  const [data, setData] = useState({
    price: '',
    buyAmount: '',
    tokenBalance: 0,
  });

  const [eventLog, setEventLog] = useState([]);

  useEffect(() => {
    if (defaultContract) {
      subscribeLogEvent(idolbox.contract, 'BuyBox', web3, handleEventLog);
    }
  }, []);

  useEffect(() => {
    if (wallet.status === 'connected') {
      console.log('wallet connected');
    }
  }, [wallet.status]);

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
        },
      );

      console.log('交易完成', ret);
    } catch (error) {
      console.log('交易失败：', error);
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

  return (
    <div>
      <Card title="第一步 连接钱包">
        {wallet.status === 'connected' ? (
          <div>
            <div>钱包地址: {wallet.account} </div>
            <div>钱包余额: {wallet.balance}</div>
            <div>链ID: {wallet.chainId}</div>
            <div>状态: {wallet.status}</div>

            <Button onClick={handleDisconnect}>Disconnect</Button>
          </div>
        ) : (
          <Space>
            <Button onClick={handleConnect}>Connect</Button>
          </Space>
        )}
      </Card>

      <Card title="Idolbox">
        <Space direction="vertical">
          <div>
            <Space>
              <Button onClick={getPrice}>获取当前价格</Button>
              <span>{Web3.utils.fromWei(data.price)} BNB</span>
            </Space>
          </div>

          <div>
            {wallet.status === 'connected' && (
              <Space>
                <Input
                  placeholder="购买金额"
                  value={data.buyAmount}
                  defaultValue={data.price}
                  onChange={handleAmountChange}
                />
                <Button onClick={handleBuyToken}>购买Token</Button>
              </Space>
            )}
          </div>

          <div>
            <Space>
              {eventLog.map((item) => (
                <span>
                  用户：{item.buyer} 买了：{item.count} 个
                </span>
              ))}
            </Space>
          </div>
        </Space>
      </Card>

      <Card title="我的NFT">
        <Space direction="vertical">
          <Button onClick={balanceOf}>我的NFT</Button>
          <span>NFT数量：{data.tokenBalance}</span>
        </Space>
      </Card>

      <Card title="设置合约地址">
        <Input
          placeholder="设置合约地址"
          onChange={handleChangeContractAddress}
          defaultValue={idolbox.address}
        />
        <Button onClick={initIdolbox}>设置合约地址</Button>
      </Card>
    </div>
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
