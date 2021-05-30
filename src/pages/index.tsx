import { Button, Space } from 'antd';
import IButton from '@/components/button/button';
import styles from './index.less';

export default function IndexPage() {
  return (
    <div>
      <h1 className={styles.title}>Page index</h1>

      <Space>
        <Button type="primary">antd按钮</Button>

        <IButton>I-Button</IButton>
      </Space>
    </div>
  );
}
