import styles from './styles.less';
import Card from './card';

interface ICardBaseProps {
  image: string;
  name: string;
  owner: string;
  price: string;
}
export interface IMarketCardList {
  data: ICardBaseProps[];
  onBuy: () => void;
}

export default (props: IMarketCardList) => {
  const { data, onBuy } = props;
  return (
    <div className={styles.cardList}>
      {data.map((item, index) => (
        <Card
          key={index}
          image={item.image}
          name={item.name}
          owner={item.owner}
          price={item.price}
          onBuy={onBuy}
        />
      ))}
    </div>
  );
};
