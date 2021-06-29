import { Table } from 'antd';
import styles from './styles.less';

const columns = [
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: 'from',
    dataIndex: 'bidder',
    key: 'bidder',
    render: (text: string) => `${text.substr(0, 3)}...${text.substr(-4)}`,
  },
  {
    title: 'Date',
    dataIndex: 'blockNumber',
    key: 'blockNumber',
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
