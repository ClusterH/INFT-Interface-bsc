# useAuctionData

- 1. 获取拍卖合约信息
- 2. 活动进行时，会监听拍卖事件，自动更新拍卖信息

```jsx
import React from 'react';
import useAuctionData from '@/hooks/useAuctionData';

export default () => {
  const auction = useAuctionData({
    id: 17,
    contract: '0xC14d3cdCd7291Bd6B464f1A9052CBd0A3404F9B8',
  });

  console.log(auction);

  return (
    <div>
      <p>id: 17</p>
      <p>contract: 0xC14d3cdCd7291Bd6B464f1A9052CBd0A3404F9B8</p>

      <pre>{JSON.stringify(auction, null, 4)}</pre>
    </div>
  );
};
```

<API src="../../src/hooks/useAuctionData.tsx"></API>