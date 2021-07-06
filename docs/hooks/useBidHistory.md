# useBidHisotry

- 1. 获取竞拍记录
- 2. 活动进行中，监听竞拍事件，自动更新拍卖记录

```jsx
import React from 'react';
import useAuctionData from '@/hooks/useAuctionData';
import useBidHistory from '@/hooks/useBidHistory'

export default () => {
  const auction = useAuctionData({
    id: 17,
    contract: '0xC14d3cdCd7291Bd6B464f1A9052CBd0A3404F9B8',
  });
  const bidHistory = useBidHistory({auction})

  console.log('auction',auction);
  console.log('bidHistory',bidHistory);

  return (
    <div>
      <p>id: 17</p>
      <p>contract: 0xC14d3cdCd7291Bd6B464f1A9052CBd0A3404F9B8</p>

      <p>BidHistory</p>
      <pre>{JSON.stringify(bidHistory, null, 4)}</pre>
    </div>
  );
};
```

<API src="../../src/hooks/useBidHistory.tsx"></API>
