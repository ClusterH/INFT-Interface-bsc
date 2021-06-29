# BidCardItem

## MarketCard
```jsx
import React from 'react'; 
import BidCardItem from '@/components/bid-card-item' 

export default () => (
  <BidCardItem
    imageType="image"
    image="https://wx2.sinaimg.cn/large/005BaCAEly4ghple87niuj30mj0nvdhi.jpg"
    name="三上优亚盲盒"
    owner="0xsdf***x600C"
    price="1"
    countdown={172800}
    showFooter
    onClick={() => {
      console.log('onClick');
    }}
  />
);
```