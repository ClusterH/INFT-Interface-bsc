# DrawerNav 

```jsx
import React, { useState } from 'react';
import DrawerNav from '@/components-mobile/drawer-nav';
import Button from '@/components/button';

export default () => {
  const [visible, setVisible] = useState(false);

  const onOk = () => {
    setVisible(false);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <>
      <Button onClick={() => setVisible(true)}>Open</Button>
      <DrawerNav visible={visible} onOk={onOk} onClose={onClose} onOk={onOk} />
    </>
  );
};

```