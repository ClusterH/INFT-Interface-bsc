# Treasureland 

## 出售

如果钱包地址第一次在Treasureland上连接使用，想要出售Token需要额外两步操作：设置代理和授权。

### 第一步 设置代理
在Treasureland系统中，每个账户地址对应一个代理地址，默认代理地址是`0x0000000000000000000000000000000000000000`，即未指定代理地址。
如果需要进行出售操作，先检查账户是否已注册代理地址，如果没有注册代理地址，则需要先为账户注册一个代理地址。

TL有一个叫做[Project TreasureLand Proxy Registry](https://bscscan.com/address/0xad3eb5b1a9a5729f08c0a623c8eeacfb43fb6b54#readContract)的合约，从名字可以看出，这个合于是专门用于注册代理地址的。

第1步：先检查是否已注册代理地址，示例如下：
```jsx
import React, { useState } from 'react';
import { Button, Input, Form } from 'antd';
import Web3 from 'web3';
import abi from '@/abis/treasureland-proxy-registry.json';
const address = '0xaD3eB5b1A9a5729f08C0A623c8EeacFb43Fb6B54';
const web3 = new Web3(Web3.givenProvider);
const tlProxyContract = new web3.eth.Contract(abi, address);

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
  const getProxies = async (_account) => {
    const _proxies = await tlProxyContract.methods.proxies(_account).call();
    setProxies(_proxies);
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
          <Button onClick={() => getProxies(account)}>获取Proxies</Button>
        </Form.Item>
      </Form>
    </>
  );
};

```

如果账户未曾注册代理地址，返回`0x0000000000000000000000000000000000000000`，否则返回账户的代理地址。
比如通过上面代码可查询到：`0x8b7A9d07e34712F8473BeB95Cd85420ee25A600C`的代理地址是`0x2011e906491500A69c8F83ebe0CBeBf4126bB536`

通过第1步查询，如果账户没有注册代理地址，则进行第2步：注册代理地址。
第2步：注册代理示例（需要连接MetaMask）：
```tsx
import React, { useState } from 'react';
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

```
完成注册后，再次执行第1步，调用合约的 `proxies` 方法，即可获取代理地址。


### 第二步 授权
如果账户已经注册了代理地址，还需要进行授权。授权的意思就是允许合约操作我们账户，这样合约就能够不经过我们签名，对我们的账户执行转账等操作，所以务必只授权给可信任的合约，否则可能造成资产损失。

在TL中，授权是将账户的操作权限授权给代理地址的，就是上一步注册的代理地址。
授权操作调用的是集合合约，比如，我们要出售Cryptoz系列中的一个NFT卡片，那么就需要调用Cryptoz合约的授权方法，授权只需要操作一次，后续再出售Cryptoz系列中的其他卡片时，不需要再次授权，但是如果需要出售其他系列的卡片，就需要用对应系列的合约进行一次授权操作。

[Cryptoz合约](https://bscscan.com/address/0x8a0C542bA7bBBab7cF3551fFcc546CdC5362d2a1) 授权示例：
```tsx
import React, { useState } from 'react';
import { Button, Input, Form } from 'antd';
import Web3 from 'web3';
import abi from '@/abis/cryptoz.json';
const contractAddress = '0x8a0C542bA7bBBab7cF3551fFcc546CdC5362d2a1';
const web3 = new Web3(Web3.givenProvider);
const cryptozContract = new web3.eth.Contract(abi as any, contractAddress);

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
  const [proxies, setProxies] = useState(
    '0x2011e906491500A69c8F83ebe0CBeBf4126bB536',
  );
  const [approved, setApproved] = useState('未检测');

  /** 检查是否已经授权 */
  const checkIsApprovedForAll = async () => {
    const _approved = await cryptozContract.methods
      .isApprovedForAll(account, proxies)
      .call();
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
          <Input
            style={{ width: 420 }}
            value={account}
            onChange={(e) => setAccount(e.target.value)}
          />
        </Form.Item>
        <Form.Item label="代理">
          <Input
            style={{ width: 420 }}
            value={proxies}
            onChange={(e) => setProxies(e.target.value)}
          />
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

```
现在，我们完成了授权，可以出售Cryptoz的NFT卡片了！

### 第三步 出售

## 购买

## 发送



## 使用estimateGas设置gas的示例  

<Alert type="info">
调用合约方法时，如果不手动设置 gas，系统会自动设置gas,但是自动设置的gas一般比较高，为了节约gas fee，建议手动设置gas，但是手动设置的时候要注意不能设置太低，否则交易可能会失败，这就要求我们需要知道最低可设置的gas是多少？
</Alert>

```tsx
import React, { useState } from 'react';
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
      const gasAmount = await tlProxyContract.methods
        .registerProxy()
        .estimateGas();
      const _proxies = await tlProxyContract.methods
        .registerProxy()
        .send({ from: account, gas: gasAmount });
      setProxies(_proxies);
    } catch (error) {
      console.log('catch error: ', error);
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
```