# Idolbox

## Header
```jsx
/**
 * background: "#9088cc"
 */
import React from 'react'; 
import { Header } from '@/components/idolbox'

export default () => {
    return <Header />
}
```

## Banner 
```jsx
/**
 * background: "#9F4E95"
 */
import React, { useState } from 'react';
import { Banner } from '@/components/idolbox';

export default () => {
  const [amount, setAmount] = useState('');

  const onChange = (val) => {
    setAmount(val);
  };

  return (
    <Banner
      title="Idolbox 盲盒开奖啦"
      image="https://wx2.sinaimg.cn/large/005BaCAEly4ghple87niuj30mj0nvdhi.jpg"
      balance={2.12}
      amount={amount}
      percent="17.4"
      onChange={onChange}
      onConnect={() => console.log('onConnect')}
      onBuy={() => console.log('onBuy')}
    />
  );
};
```

## TokenItem
```jsx
import React from 'react';
import { TokenItem } from '@/components/idolbox';

export default () => {
  return (
    <TokenItem
      id="2455"
      image="https://api.treasureland.market/v2/v1/resourceS3?uri=images/bsc/0xc25286ef3bae3f6fe2d6d0a6e2acad0301af97b8/5003e5e94eb281945e870869bc259b96&size=500x0"
    />
  );
};
```

## TokenList
```jsx
import React from 'react';
import { TokenList } from '@/components/idolbox';

const images = [
  'https://api.treasureland.market/v2/v1/resourceS3?uri=images/bsc/0xc25286ef3bae3f6fe2d6d0a6e2acad0301af97b8/5003e5e94eb281945e870869bc259b96&size=500x0',
  'https://wx2.sinaimg.cn/large/005BaCAEly4ghple87niuj30mj0nvdhi.jpg',
];

const tokens = [];
for (let i = 0; i < 10; i++) {
  tokens.push({
    id: i,
    image: images[Math.round(Math.random())],
  });
}

export default () => {
  return <TokenList tokens={tokens} />;
};
```

## API Banner 
<API src="../../src/components/idolbox/banner/banner.tsx"></API>