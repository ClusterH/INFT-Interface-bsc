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

## LevelCheckbox
```jsx
import React from 'react'; 
import {LevelCheckbox} from '@/components/market' 

export default () => (
  <LevelCheckbox
    onChange={(values) => {
      console.log('onChange', values);
    }}
  />
);
```

## MarketCardList
```jsx
import React from 'react'; 
import {CardList} from '@/components/market' 

const item = {
  image: 'https://wx2.sinaimg.cn/large/005BaCAEly4ghple87niuj30mj0nvdhi.jpg',
  name: '三上优亚盲盒',
  owner: '0xsdfjkskd***sjdjfjsdfs',
  price: '1',
};
const list = new Array(20).fill(item, 0, 19);

export default () => (
  <CardList data={list} />
);
```