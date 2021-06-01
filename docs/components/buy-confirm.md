# BuyConfirm

```jsx
import React from 'react'; 
import { useState } from 'react';
import { Button } from 'antd';
import BuyConfirm from '@/components/buy-confirm';

export default () => {
    const [visible, setVisivle] = useState(false);

    const handleOk = () => {
        setVisivle(false);
    };

    const handleCancel = () => {
        setVisivle(false);
    };

    return <>
        <Button onClick={() => setVisivle(true)}>Buy</Button>

        <BuyConfirm
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
            name="Baby Cthulu #1209"
            title="The Cryptoz NFT Universe"
            image="https://wx2.sinaimg.cn/large/005BaCAEly4ghple87niuj30mj0nvdhi.jpg"
            volume={1}
            amount={0.2}
            symbol="BNB"
        />
    </>
}
```
