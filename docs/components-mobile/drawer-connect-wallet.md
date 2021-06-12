# DrawerConnectWallet

```jsx
import React, { useState } from 'react';
import DrawerConnectWallet from '@/components-mobile/drawer-connect-wallet';
import Button from '@/components/button';

export default () => {
  const [visible, setVisible] = useState(false);

  const onOk = (name) => {
    console.log('connect: ', name)
    setVisible(false);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <>
      <Button onClick={() => setVisible(true)}>Open</Button>
      <DrawerConnectWallet visible={visible} onOk={onOk} onClose={onClose} />
    </>
  );
};
```