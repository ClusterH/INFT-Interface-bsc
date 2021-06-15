import { useIntl } from 'umi';
import styles from './styles.less';
import Card from './card';
import { Empty, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const antIcon = <LoadingOutlined style={{ fontSize: 32 }} spin />;

export interface ICardBaseProps {
  contract: string;
  tokenId: string;
  orderId: string;
  image: string;
  name: string;
  owner: string;
  price: string;
  onSale?: boolean;
  showFooter?: boolean;
}

export interface IHandleBuyParams {
  contract: string;
  tokenId: string;
  orderId: string;
  onSale: boolean;
}

export interface IMarketCardList {
  hideTotal?: boolean;
  loading?: boolean;
  data: ICardBaseProps[];
  total?: number;
  onClick: (params: IHandleBuyParams) => void;
}

export default (props: IMarketCardList) => {
  const intl = useIntl();
  const { hideTotal, loading, data, total, onClick } = props;

  if (loading) {
    return (
      <div className={styles.wrapSpin}>
        <Spin indicator={antIcon} size="large" className={styles.loading} />
      </div>
    );
  }

  if (!data.length)
    return (
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description={
          <span>
            {intl.formatMessage({
              id: 'market_nodata',
              defaultMessage: 'No Data',
            })}
          </span>
        }
        style={{ marginTop: 248, width: '100%', minWidth: '1000px' }}
      />
    );

  return (
    <div className={styles.cardList}>
      {!hideTotal && (
        <div className={styles.total}>
          {total}{' '}
          {intl.formatMessage({
            id: 'market_results',
            defaultMessage: 'Results',
          })}
        </div>
      )}

      {data.map((item) => (
        <Card
          key={item.contract + item.tokenId}
          image={item.image}
          name={item.name}
          owner={item.owner}
          price={item.price}
          tokenId={item.tokenId}
          orderId={item.orderId}
          onSale={item.onSale}
          contract={item.contract}
          showFooter={item.showFooter}
          onClick={onClick}
        />
      ))}
    </div>
  );
};
