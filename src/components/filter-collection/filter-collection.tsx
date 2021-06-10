import { createRef, useState } from 'react';
import { Collapse, AutoComplete, Input } from 'antd';
import { transResource } from '@/helpers/data-to-props';
import { SearchOutlined } from '@ant-design/icons';
import styles from './styles.less';

export interface IFilterCollectionProps {
  collections: any[];
  active?: boolean;
  onClick: (item: any) => void;
  onCancel?: () => void;
}

const { Panel } = Collapse;

export default (props: IFilterCollectionProps) => {
  const { collections, onClick, onCancel } = props;

  const [input, setInput] = useState('');
  const [activeId, setActiveId] = useState('');

  const handleClick = (item: any) => {
    if (item.id === activeId) {
      onCancel && onCancel();
      setActiveId('');
    } else {
      setActiveId(item.id);
      onClick(item);
    }
  };

  const RenderCollectionItems = () => {
    let list = collections;

    if (input) {
      const reg = new RegExp(input.trim(), 'i');
      list = collections.filter((item) => reg.test(item.title));
    }

    return (
      <>
        {list.map((item) => (
          <div
            className={[
              styles.collectItem,
              item.id === activeId ? styles.collectItemActive : '',
            ].join(' ')}
            key={item.id}
            onClick={() => handleClick(item)}
          >
            <img
              src={transResource(item.logo)}
              alt="logo"
              className={styles.collectionIcon}
            />
            <span className={styles.title}>{item.title}</span>
          </div>
        ))}
      </>
    );
  };

  return (
    <div className={styles.filterCollection}>
      <Collapse defaultActiveKey={['1']} bordered={false}>
        <Panel header="Collcetions" key="1">
          <Input
            allowClear
            suffix={<SearchOutlined />}
            placeholder="Search collections"
            className={styles.input}
            onChange={(e) => setInput(e.target.value)}
          />

          <div className={styles.collectionsWrap}>
            <RenderCollectionItems />
          </div>
        </Panel>
      </Collapse>
    </div>
  );
};
