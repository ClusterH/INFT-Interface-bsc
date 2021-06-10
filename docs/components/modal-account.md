# ModalAccount

```jsx
import React, { useState } from 'react';
import ModalAccount from '@/components/modal-account';
import {Button} from 'antd';

const address = '0x8b7A9d07e34712F8473BeB95Cd85420ee25A600C';
export default () => {
  const [visible, setVisivle] = useState(true);

  const onOk = () => {
    setVisivle(false);
  };

  const onCancel = () => {
    setVisivle(false);
  };

  const onDisconnect = () => {
      console.log('onDisconnect')
  }

  return (
    <>
      <Button
        onClick={() => {
          setVisivle(true);
        }}
      >
        Account
      </Button>

      <ModalAccount
        visible={visible}
        onOk={onOk}
        onCancel={onCancel}
        address={address}
        onDisconnect={onDisconnect}
      ></ModalAccount>
    </>
  );
};

```