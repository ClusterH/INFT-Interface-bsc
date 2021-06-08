import { createRef, useState } from 'react';
import { Collapse, Checkbox } from 'antd';
import styles from './styles.less';

export interface IFilterAttrProps {
  header: string;
  values: any[];
  onChange: (attr: string, values: string[]) => void;
}

const { Panel } = Collapse;

export default (props: IFilterAttrProps) => {
  const { header, values, onChange } = props;

  const plainOptions = values.map((value) => ({
    label: value,
    value: value,
  }));

  const handleChange = (values: any) => {
    onChange(header, values);
  };

  return (
    <div className={styles.filterAttr}>
      <Collapse bordered={false}>
        <Panel header={header} key="1">
          <div className={styles.wrapAttrs}>
            <Checkbox.Group options={plainOptions} onChange={handleChange} />
          </div>
        </Panel>
      </Collapse>
    </div>
  );
};
