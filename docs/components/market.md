# Market

## MarketCard
```jsx
import React from 'react'; 
import {Card} from '@/components/market' 

export default () => (
  <Card
    image="https://wx2.sinaimg.cn/large/005BaCAEly4ghple87niuj30mj0nvdhi.jpg"
    name="三上优亚盲盒"
    owner="0xsdf***x600C"
    price="1"
    showFooter
    onClick={() => {
      console.log('onClick');
    }}
  />
);
```

## MarketCard - 无底部信息
```jsx
import React from 'react'; 
import {Card} from '@/components/market' 

export default () => (
  <Card
    image="https://wx2.sinaimg.cn/large/005BaCAEly4ghple87niuj30mj0nvdhi.jpg"
    name="三上优亚盲盒"
    hideFooter={true}
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

## AssetInfo
```jsx
import React from 'react'; 
import AssetInfo from '@/components/asset-info' 

const data = {
  img: 'https://wx2.sinaimg.cn/large/005BaCAEly4ghple87niuj30mj0nvdhi.jpg',
  name: '三上优亚盲盒 #NO.1',
  contract: '0x8a0c542bbbab7cf3551ffcc546cdc5362d2a1',
  tokenId: '12701',
  blockchain: 'BSC',
  price: '19.99',
  priceSymbol: 'BNB',
  onBuy: () => {}
}

export default () => (
  <AssetInfo {...data} />
);
```

## OffersTable
## AssetInfo
```jsx
import React from 'react'; 
import OffersTable from '@/components/offers-table' 

const dataSource = [
  {
    from: 'xxxxxxxxxxx1',
    price: '0.03 BNB',
    date: '2021-08-19 12:09',
    operate: 'Sell',
  },
  {
    from: 'xxxxxxxxxxx2',
    price: '0.03 BNB',
    date: '2021-08-19 12:09',
    operate: 'Sell',
  },
];

export default () => (
  <OffersTable dataSource={dataSource} />
);
```