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
