import { Table } from 'antd';
import moment from 'moment';
import styles from './styles.less';

const columns = [
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
    render: (text: string) => Math.floor(Number(text) * 1e5) / 1e5,
  },
  {
    title: 'from',
    dataIndex: 'bidder',
    key: 'bidder',
    render: (text: string) => `${text.substr(0, 3)}...${text.substr(-4)}`,
  },
  {
    title: 'Date',
    dataIndex: 'timestamp',
    key: 'timestamp',
    render: (text: number) => moment(text * 1000).format('YYYY-MM-DD HH:mm:ss'),
  },
];

export default (props: any) => {
  return (
    <div className={styles.bidHistory}>
      <div className={styles.header}>Bid history</div>
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
