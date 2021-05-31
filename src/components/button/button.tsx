import { Button } from 'antd';

interface IProps {
  children: string;
}

export default (props: IProps) => (
  <Button type="primary" {...props}>
    {props.children}
  </Button>
);
