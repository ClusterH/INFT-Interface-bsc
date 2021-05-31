import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const antIcon = (
  <LoadingOutlined style={{ fontSize: 24, color: '#fed835' }} spin />
);

export default () => <Spin indicator={antIcon} />;
