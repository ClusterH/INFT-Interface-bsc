import Header from '@/components/header';
import { CardList } from '@/components/market';

const item = {
  image: 'https://wx2.sinaimg.cn/large/005BaCAEly4ghple87niuj30mj0nvdhi.jpg',
  name: '三上优亚盲盒',
  showFooter: false,
};
const list = new Array(19).fill(item, 0, 18);

export default () => {
  return (
    <div>
      <Header></Header>

      <div style={{ marginTop: '48px' }}></div>
      <CardList data={list} onClick={() => {}} />
    </div>
  );
};
