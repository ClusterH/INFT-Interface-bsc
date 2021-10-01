import { useIntl } from 'umi';
import { Table } from 'antd';
import moment from 'moment';
import styles from './styles.less';

export default (props: any) => {
  const intl = useIntl();
  const columns = [
    {
      title: intl.formatMessage({
        id: 'bidHistory_price',
        defaultMessage: 'Price',
      }),
      dataIndex: 'price',
      key: 'price',
      render: (text: string) => Math.floor(Number(text) * 1e5) / 1e5,
    },
    {
      title: intl.formatMessage({
        id: 'bidHistory_from',
        defaultMessage: 'From',
      }),
      dataIndex: 'bidder',
      key: 'bidder',
      render: (text: string) => `${text.substr(0, 3)}...${text.substr(-4)}`,
    },
    {
      title: intl.formatMessage({
        id: 'bidHistory_date',
        defaultMessage: 'Date',
      }),
      dataIndex: 'timestamp',
      key: 'timestamp',
      render: (text: number) =>
        moment(text * 1000).format('YYYY-MM-DD HH:mm:ss'),
    },
  ];

  return (
    <div className={styles.bidHistory}>
      <div className={styles.header}>
        {intl.formatMessage({
          id: 'bidHistory_title',
          defaultMessage: 'Bid history',
        })}
      </div>
      <Table
        columns={columns}
        dataSource={props.source}
        pagination={false}
        scroll={{ y: 120 }}
        rowKey={(record) => `${record.from}_${record.price}`}
      ></Table>
    </div>
  );
};
