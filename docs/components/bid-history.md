# BidHistory

```jsx
import React from 'react'; 
import BidHistory from '@/components/bid-history' 

const source = [
    {
        "blockNumber": 10124435,
        "bidder": "0x8b7A9d07e34712F8473BeB95Cd85420ee25A600C",
        "price": "0.0001"
    },
    {
        "bidder": "0x8b7A9d07e34712F8473BeB95Cd85420ee25A600C",
        "price": "0.0003",
        "blockNumber": 10124445,
       
    },
    {
        "blockNumber": 10124475,
        "bidder": "0x4fe6Afe49786bD2EdCe2CA83034148C86C612381",
        "price": "0.0004"
    },
    {
        "blockNumber": 10124475,
        "bidder": "0x4fe6Afe49786bD2EdCe2CA83034148C86C612381",
        "price": "0.0004"
    },
    {
        "blockNumber": 10124475,
        "bidder": "0x4fe6Afe49786bD2EdCe2CA83034148C86C612381",
        "price": "0.0004"
    }
]

export default () => <BidHistory source={source} />
```
