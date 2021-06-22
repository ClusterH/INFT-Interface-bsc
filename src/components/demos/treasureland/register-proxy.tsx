import { useState } from 'react';
import { Button, Input, Form } from 'antd';
import Web3 from 'web3';
import abi from '@/abis/treasureland-proxy-registry.json';
const contractAddress = '0xaD3eB5b1A9a5729f08C0A623c8EeacFb43Fb6B54';
const web3 = new Web3(Web3.givenProvider);
const tlProxyContract = new web3.eth.Contract(abi as any, contractAddress);

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
const tailLayout = {
  wrapperCol: { offset: 4, span: 20 },
};

export default () => {
  const [account, setAccount] = useState(
    '0x8b7A9d07e34712F8473BeB95Cd85420ee25A600C',
  );
  const [proxies, setProxies] = useState('');

  const handleRegister = async () => {
    try {
      const result = await tlProxyContract.methods
        .registerProxy()
        .send({ from: account });

      console.log(result);
      setProxies(JSON.stringify(result));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Form {...layout}>
        <Form.Item label="Account">
          <Input
            style={{ width: 420 }}
            value={account}
            onChange={(e) => setAccount(e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Proxies">
          <Input style={{ width: 420 }} value={proxies} readOnly />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button onClick={handleRegister}>注册代理</Button>
        </Form.Item>
      </Form>
    </>
  );
};
