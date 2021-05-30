import Header from '@/components/header';
import Banner from '@/components/banner';
import Market from '@/components/market';

const item = {
  image: 'https://wx2.sinaimg.cn/large/005BaCAEly4ghple87niuj30mj0nvdhi.jpg',
  name: '三上优亚盲盒',
  owner: '0xsdfjkskd***sjdjfjsdfs',
  price: '1',
};
const list = new Array(20).fill(item, 0, 19);

export default () => (
  <div>
    <Header />
    <Banner />
    <Market.LevelCheckbox onChange={() => {}} />

    <Market.CardList data={list} onBuy={() => {}} />
  </div>
);
