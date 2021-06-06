import { Button } from 'antd';
import React from 'react';

export default (props: React.PropsWithChildren<any>) => (
  <Button type="primary" {...props}>
    {props.children}
  </Button>
);
