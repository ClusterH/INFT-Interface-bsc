# BuyConfirm

```jsx
import React from 'react'; 
import { useState } from 'react';
import { Button } from 'antd';
import BuyConfirm from '@/components/buy-confirm';

export default () => {
    const [visible, setVisivle] = useState(false);
    const [isCompleting, setIsCompleting] = useState(false)

    const handleOk = () => {
        setIsCompleting(true)

        setTimeout(() => {
            setVisivle(false);
            setIsCompleting(false)
        }, 5000)
    };

    const handleCancel = () => {
        setVisivle(false);
    };

    return <>
        <Button onClick={() => setVisivle(true)}>Buy</Button>

        <BuyConfirm
            visible={visible}
            isCompleting={isCompleting}
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
<Alert>注意，`visible`、`isCompleting` 关闭的顺序</Alert>

<API src="../../src/components/buy-confirm/index.tsx"></API>
