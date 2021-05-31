import { useHistory } from 'umi';
import Header from '@/components/header';
import Banner from '@/components/banner';
import Market from '@/components/market';

const item = {
  image: 'https://wx2.sinaimg.cn/large/005BaCAEly4ghple87niuj30mj0nvdhi.jpg',
  name: '三上优亚盲盒',
  owner: '0xsdfjkskd***sjdjfjsdfs',
  price: '1',
  showFooter: true,
};
const list: any = [];
for (let i = 0; i < 18; i++) {
  list.push({
    tokenId: i + 1,
    ...item,
  });
}

export default () => {
  const hitory = useHistory();

  const handleClick = (tokenId: string) => {
    hitory.push(`/market/${tokenId}`);
  };

  return (
    <div>
      <Header />
      <Banner />
      <Market.LevelCheckbox onChange={() => {}} />

      <Market.CardList data={list} onClick={handleClick} />
    </div>
  );
};
