# Market

## MarketCard
```jsx
import React from 'react'; 
import {Card} from '@/components/market' 

export default () => (
  <Card
    image="https://wx2.sinaimg.cn/large/005BaCAEly4ghple87niuj30mj0nvdhi.jpg"
    name="三上优亚盲盒"
    owner="0xsdfjkskd***sjdjfjsdfs"
    price="1"
    onBuy={() => {
      console.log('onBuy');
    }}
  />
);
```