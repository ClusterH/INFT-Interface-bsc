# SellConfirm

```jsx
import React from 'react'; 
import { useState } from 'react';
import { Button } from 'antd';
import SellConfirm from '@/components/sell-confirm';

export default () => {
    const [visible, setVisivle] = useState(true);

    const handleOk = () => {
        setVisivle(false);
    };

    const handleCancel = () => {
        setVisivle(false);
    };

    return <>
        <Button onClick={() => setVisivle(true)}>sell</Button>

        <SellConfirm
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
            priceSymbol="BNB"
        />
    </>
}
```
