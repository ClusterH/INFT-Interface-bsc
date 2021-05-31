import styles from './styles.less';
import Card from './card';

interface ICardBaseProps {
  tokenId: string;
  image: string;
  name: string;
  owner: string;
  price: string;
  showFooter?: boolean;
}
export interface IMarketCardList {
  data: ICardBaseProps[];
  onClick: (tokenId: string) => void;
}

export default (props: IMarketCardList) => {
  const { data, onClick } = props;
  return (
    <div className={styles.cardList}>
      {data.map((item, index) => (
        <Card
          key={index}
          image={item.image}
          name={item.name}
          owner={item.owner}
          price={item.price}
          showFooter={item.showFooter}
          onClick={() => onClick(item.tokenId)}
        />
      ))}
    </div>
  );
};
