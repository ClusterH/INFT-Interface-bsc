import { Table } from 'antd';
import styles from './styles.less';

const columns = [
  {
    title: 'From',
    dataIndex: 'from',
    key: 'from',
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: 'Operate',
    dataIndex: 'operate',
    key: 'operate',
  },
];

export interface IOffer {
  from: string;
  price: string | number;
  date: string;
  operate: string;
}

export interface IOffersTableProps {
  dataSource: IOffer[];
}

export default (props: IOffersTableProps) => {
  const { dataSource } = props;

  return (
    <div className={styles.offersTable}>
      <Table dataSource={dataSource} columns={columns} pagination={false} />
    </div>
  );
};
