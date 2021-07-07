import { useState } from 'react';
import { Button, Input, Form } from 'antd';
import Web3 from 'web3';
import abi from '@/abis/cryptoz.json';
const contractAddress = '0x8a0C542bA7bBBab7cF3551fFcc546CdC5362d2a1';
const web3 = new Web3(process.env.rpcURL);
const cryptozContract = new web3.eth.Contract(abi as any, contractAddress);

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
const tailLayout = {
  wrapperCol: { offset: 4, span: 20 },
};

export default () => {
  const [account, setAccount] = useState('0x8b7A9d07e34712F8473BeB95Cd85420ee25A600C');
  const [proxies, setProxies] = useState('0x2011e906491500A69c8F83ebe0CBeBf4126bB536');
  const [approved, setApproved] = useState('未检测');

  /** 检查是否已经授权 */
  const checkIsApprovedForAll = async () => {
    const _approved = await cryptozContract.methods.isApprovedForAll(account, proxies).call();
    setApproved(_approved);
  };

  const setApproval = async () => {
    await cryptozContract.methods.setApprovalForAll(proxies, true).send({
      from: account,
    });
  };

  return (
    <>
      <Form {...layout}>
        <Form.Item label="账户">
          <Input style={{ width: 420 }} value={account} onChange={(e) => setAccount(e.target.value)} />
        </Form.Item>
        <Form.Item label="代理">
          <Input style={{ width: 420 }} value={proxies} onChange={(e) => setProxies(e.target.value)} />
        </Form.Item>
        <Form.Item label="授权">
          <span>{String(approved)}</span>
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button onClick={checkIsApprovedForAll}>检查授权</Button>
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button onClick={setApproval} disabled={!!approved}>
            授权
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
