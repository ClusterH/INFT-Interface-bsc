# Idolbox

## Header
```jsx
import React from 'react'; 
import Idolbox from '@/components/idolbox'
const { Header } = Idolbox

export default () => {
    return <Header />
}
```

## Banner
```jsx
import React, { useState } from 'react'; 
import Idolbox from '@/components/idolbox'
const { Banner } = Idolbox

export default () => {
    const [amount, setAmount] = useState('')

    const onChange = (val) => {
        setAmount(val)
    }

    return (
        <Banner 
            title="Idolbox 盲盒开奖啦"
            image="https://api.treasureland.market/v2/v1/resourceS3?uri=images/bsc/0xc25286ef3bae3f6fe2d6d0a6e2acad0301af97b8/5003e5e94eb281945e870869bc259b96&size=500x0"
            balance={2.12} 
            amount={amount}
            percent="17.4"
            onChange={onChange}
            onConnect={() => console.log("onConnect")}
            onBuy={() => console.log("onBuy")}
        />
    )
}
```

## TokenItem
```jsx
import React from 'react'; 
import Idolbox from '@/components/idolbox'
const { TokenItem } = Idolbox

export default () => {
    return (
        <TokenItem 
            id="2455"
            image="https://api.treasureland.market/v2/v1/resourceS3?uri=images/bsc/0xc25286ef3bae3f6fe2d6d0a6e2acad0301af97b8/5003e5e94eb281945e870869bc259b96&size=500x0"
        />
    )
}
```

Banner
<API src="../../src/components/idolbox/banner/banner.tsx"></API>

