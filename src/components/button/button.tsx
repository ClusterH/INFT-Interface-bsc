import { Button } from 'antd';

interface IProps {
  children: string;
}

export default (props: IProps) => (
  <Button type="primary">{props.children}</Button>
);
