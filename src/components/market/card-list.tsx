import styles from './styles.less';
import Card from './card';

export interface ICardBaseProps {
  contract: string;
  tokenId: string;
  orderId: string;
  image: string;
  name: string;
  owner: string;
  price: string;
  showFooter?: boolean;
}

export interface IHandleBuyParams {
  contract: string;
  tokenId: string;
  orderId: string;
}

export interface IMarketCardList {
  data: ICardBaseProps[];
  total: number;
  onClick: (params: IHandleBuyParams) => void;
}

export default (props: IMarketCardList) => {
  const { data, total, onClick } = props;
  return (
    <div className={styles.cardList}>
      <div className={styles.total}>{total} Results</div>

      {data.map((item, index) => (
        <Card
          key={index}
          image={item.image}
          name={item.name}
          owner={item.owner}
          price={item.price}
          tokenId={item.tokenId}
          contract={item.contract}
          showFooter={item.showFooter}
          onClick={() =>
            onClick({
              contract: item.contract,
              tokenId: item.tokenId,
              orderId: item.orderId,
            })
          }
        />
      ))}
    </div>
  );
};
