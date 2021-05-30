import { Checkbox } from 'antd';
import styles from './styles.less';

export interface ILevelCheckboxProps {
  onChange: () => void;
}

const options = [
  { label: '全部', value: '' },
  { label: '高级', value: '1' },
  { label: '稀有', value: '2' },
  { label: '珍奇', value: '3' },
  { label: '史诗', value: '4' },
  { label: '传说', value: '5' },
];

export default ({ onChange }: ILevelCheckboxProps) => {
  return (
    <div className={styles.levelCheckbox}>
      <div className={styles.title}>NFT Market</div>

      <Checkbox.Group
        options={options}
        defaultValue={['']}
        onChange={onChange}
      />
    </div>
  );
};
