# BidCardItem

## MarketCard-未开始
```jsx
import React from 'react'; 
import BidCardItem from '@/components/bid-card-item' 

const auction = {
    "id": 5,
    "contract": "0x6352f57A0E17FE177fbfcdEa7FDAd83427b6B2b2",
    "name": "iNFTAuctionTest",
    "description": "Test auction on inft platform.",
    "startTime": Date.now() / 1000 + 60,
    "isStart": false,
    "endTime": Date.now() / 1000 + 600,
    "isFinish": false,
    "owner": "0xc667A07B5140d9F63EC2aFa87784Df1497e9e905",
    "highestBidder": "248373485877300000",
    "bidEvents": [
        {
            "address": "0x87B213fa7e1bB171c0f538B39eFCf3650b4FbB87",
            "blockNumber": 10178651,
            "transactionHash": "0x75cac9d5587e317286e9dc822a66d25b7b12124054d8046f231458fbceebf88a",
            "transactionIndex": 1,
            "blockHash": "0xc13af804c8a0bf4fd45257d104f44e23259eb25c0d8799dc64ee2dcc9c999419",
            "logIndex": 1,
            "removed": false,
            "id": "log_8c55915e",
            "returnValues": {
                "0": "0xc667A07B5140d9F63EC2aFa87784Df1497e9e905",
                "1": "248373485877300000",
                "bidder": "0xc667A07B5140d9F63EC2aFa87784Df1497e9e905",
                "price": "248373485877300000"
            },
            "event": "NewBid",
            "signature": "0xdd0b6c6a77960e2066c96171b4d7ac9e8b4c184011f38544afa36a5bb63ec59f",
            "raw": {
                "data": "0x000000000000000000000000c667a07b5140d9f63ec2afa87784df1497e9e9050000000000000000000000000000000000000000000000000372665e95578b20",
                "topics": [
                    "0xdd0b6c6a77960e2066c96171b4d7ac9e8b4c184011f38544afa36a5bb63ec59f"
                ]
            },
            "timestamp": 1625036768
        },
        {
            "address": "0x87B213fa7e1bB171c0f538B39eFCf3650b4FbB87",
            "blockNumber": 10178506,
            "transactionHash": "0xfe0bb1e0b80584ce90c39b1c79b07a6b1475d2026b6224a1240e65c958ba38ec",
            "transactionIndex": 0,
            "blockHash": "0xa9e928f2ca605d21768c020071643d405e8c7a3b2a417eb3c22ef4e178a18dd9",
            "logIndex": 0,
            "removed": false,
            "id": "log_8811777b",
            "returnValues": {
                "0": "0xc667A07B5140d9F63EC2aFa87784Df1497e9e905",
                "1": "120000000000000000",
                "bidder": "0xc667A07B5140d9F63EC2aFa87784Df1497e9e905",
                "price": "120000000000000000"
            },
            "event": "NewBid",
            "signature": "0xdd0b6c6a77960e2066c96171b4d7ac9e8b4c184011f38544afa36a5bb63ec59f",
            "raw": {
                "data": "0x000000000000000000000000c667a07b5140d9f63ec2afa87784df1497e9e90500000000000000000000000000000000000000000000000001aa535d3d0c0000",
                "topics": [
                    "0xdd0b6c6a77960e2066c96171b4d7ac9e8b4c184011f38544afa36a5bb63ec59f"
                ]
            },
            "timestamp": 1625036333
        },
        {
            "address": "0x87B213fa7e1bB171c0f538B39eFCf3650b4FbB87",
            "blockNumber": 10177657,
            "transactionHash": "0x8814c636182f6dd723c5b5063b0b01baa0e0cc0d07a25b235726e30d9bc39dc4",
            "transactionIndex": 2,
            "blockHash": "0x17a86d31870b588a83b2053956e32cbf86ea5a43b75a50c3fc8f29dc907750fc",
            "logIndex": 0,
            "removed": false,
            "id": "log_5f5c92ea",
            "returnValues": {
                "0": "0x1Cefd773df24C54898a51aC11555F3C1355dD423",
                "1": "110000000000000000",
                "bidder": "0x1Cefd773df24C54898a51aC11555F3C1355dD423",
                "price": "110000000000000000"
            },
            "event": "NewBid",
            "signature": "0xdd0b6c6a77960e2066c96171b4d7ac9e8b4c184011f38544afa36a5bb63ec59f",
            "raw": {
                "data": "0x0000000000000000000000001cefd773df24c54898a51ac11555f3c1355dd4230000000000000000000000000000000000000000000000000186cc6acd4b0000",
                "topics": [
                    "0xdd0b6c6a77960e2066c96171b4d7ac9e8b4c184011f38544afa36a5bb63ec59f"
                ]
            },
            "timestamp": 1625033786
        },
        {
            "address": "0x87B213fa7e1bB171c0f538B39eFCf3650b4FbB87",
            "blockNumber": 10177606,
            "transactionHash": "0xda67e05aa44261774dc3cae01dd125ff72d9a1a8b1496c38829a4c942e47a92e",
            "transactionIndex": 0,
            "blockHash": "0xb4663ce0170248ba79efcf318ad762fb86e765158ab6d46225394c16e5cd6ed1",
            "logIndex": 0,
            "removed": false,
            "id": "log_8e30a314",
            "returnValues": {
                "0": "0x1Cefd773df24C54898a51aC11555F3C1355dD423",
                "1": "100000000000000000",
                "bidder": "0x1Cefd773df24C54898a51aC11555F3C1355dD423",
                "price": "100000000000000000"
            },
            "event": "NewBid",
            "signature": "0xdd0b6c6a77960e2066c96171b4d7ac9e8b4c184011f38544afa36a5bb63ec59f",
            "raw": {
                "data": "0x0000000000000000000000001cefd773df24c54898a51ac11555f3c1355dd423000000000000000000000000000000000000000000000000016345785d8a0000",
                "topics": [
                    "0xdd0b6c6a77960e2066c96171b4d7ac9e8b4c184011f38544afa36a5bb63ec59f"
                ]
            },
            "timestamp": 1625033633
        },
        {
            "address": "0x87B213fa7e1bB171c0f538B39eFCf3650b4FbB87",
            "blockNumber": 10177580,
            "transactionHash": "0x97c7aed2b624090532c6fbc246dc4bfc3d21e4ebc95d3a49fee9f449739d84d2",
            "transactionIndex": 1,
            "blockHash": "0xbbef083070f26329c6a014d4a107d802701fa4fd1df9fda684263c5f45397975",
            "logIndex": 1,
            "removed": false,
            "id": "log_d1de1f6b",
            "returnValues": {
                "0": "0x4fe6Afe49786bD2EdCe2CA83034148C86C612381",
                "1": "1000000000000000",
                "bidder": "0x4fe6Afe49786bD2EdCe2CA83034148C86C612381",
                "price": "1000000000000000"
            },
            "event": "NewBid",
            "signature": "0xdd0b6c6a77960e2066c96171b4d7ac9e8b4c184011f38544afa36a5bb63ec59f",
            "raw": {
                "data": "0x0000000000000000000000004fe6afe49786bd2edce2ca83034148c86c61238100000000000000000000000000000000000000000000000000038d7ea4c68000",
                "topics": [
                    "0xdd0b6c6a77960e2066c96171b4d7ac9e8b4c184011f38544afa36a5bb63ec59f"
                ]
            },
            "timestamp": 1625033555
        }
    ],
    "tokenMetadata": {
        "name": "ss",
        "description": "sssss",
        "attributes": [
            {
                "trait_type": "3",
                "value": "4"
            }
        ],
        "image": "ipfs://bafybeicy7trvrysc36hmgxjdj2ctpanqfvr6kdgak6r6zzz2zjeta4hijy/demo-san.jpeg"
    }
}

export default () => (
  <BidCardItem auction={auction} bidderPrice='0' />
);
```

## MarketCard-进行中
```jsx
import React from 'react'; 
import BidCardItem from '@/components/bid-card-item' 

const auction = {
    "id": 5,
    "contract": "0x6352f57A0E17FE177fbfcdEa7FDAd83427b6B2b2",
    "name": "iNFTAuctionTest",
    "description": "Test auction on inft platform.",
    "startTime": Date.now() / 1000,
    "isStart": true,
    "endTime": Date.now() / 1000 + 600,
    "isFinish": false,
    "owner": "0xc667A07B5140d9F63EC2aFa87784Df1497e9e905",
    "highestBidder": "248373485877300000",
    "bidEvents": [
        {
            "address": "0x87B213fa7e1bB171c0f538B39eFCf3650b4FbB87",
            "blockNumber": 10178651,
            "transactionHash": "0x75cac9d5587e317286e9dc822a66d25b7b12124054d8046f231458fbceebf88a",
            "transactionIndex": 1,
            "blockHash": "0xc13af804c8a0bf4fd45257d104f44e23259eb25c0d8799dc64ee2dcc9c999419",
            "logIndex": 1,
            "removed": false,
            "id": "log_8c55915e",
            "returnValues": {
                "0": "0xc667A07B5140d9F63EC2aFa87784Df1497e9e905",
                "1": "248373485877300000",
                "bidder": "0xc667A07B5140d9F63EC2aFa87784Df1497e9e905",
                "price": "248373485877300000"
            },
            "event": "NewBid",
            "signature": "0xdd0b6c6a77960e2066c96171b4d7ac9e8b4c184011f38544afa36a5bb63ec59f",
            "raw": {
                "data": "0x000000000000000000000000c667a07b5140d9f63ec2afa87784df1497e9e9050000000000000000000000000000000000000000000000000372665e95578b20",
                "topics": [
                    "0xdd0b6c6a77960e2066c96171b4d7ac9e8b4c184011f38544afa36a5bb63ec59f"
                ]
            },
            "timestamp": 1625036768
        },
        {
            "address": "0x87B213fa7e1bB171c0f538B39eFCf3650b4FbB87",
            "blockNumber": 10178506,
            "transactionHash": "0xfe0bb1e0b80584ce90c39b1c79b07a6b1475d2026b6224a1240e65c958ba38ec",
            "transactionIndex": 0,
            "blockHash": "0xa9e928f2ca605d21768c020071643d405e8c7a3b2a417eb3c22ef4e178a18dd9",
            "logIndex": 0,
            "removed": false,
            "id": "log_8811777b",
            "returnValues": {
                "0": "0xc667A07B5140d9F63EC2aFa87784Df1497e9e905",
                "1": "120000000000000000",
                "bidder": "0xc667A07B5140d9F63EC2aFa87784Df1497e9e905",
                "price": "120000000000000000"
            },
            "event": "NewBid",
            "signature": "0xdd0b6c6a77960e2066c96171b4d7ac9e8b4c184011f38544afa36a5bb63ec59f",
            "raw": {
                "data": "0x000000000000000000000000c667a07b5140d9f63ec2afa87784df1497e9e90500000000000000000000000000000000000000000000000001aa535d3d0c0000",
                "topics": [
                    "0xdd0b6c6a77960e2066c96171b4d7ac9e8b4c184011f38544afa36a5bb63ec59f"
                ]
            },
            "timestamp": 1625036333
        },
        {
            "address": "0x87B213fa7e1bB171c0f538B39eFCf3650b4FbB87",
            "blockNumber": 10177657,
            "transactionHash": "0x8814c636182f6dd723c5b5063b0b01baa0e0cc0d07a25b235726e30d9bc39dc4",
            "transactionIndex": 2,
            "blockHash": "0x17a86d31870b588a83b2053956e32cbf86ea5a43b75a50c3fc8f29dc907750fc",
            "logIndex": 0,
            "removed": false,
            "id": "log_5f5c92ea",
            "returnValues": {
                "0": "0x1Cefd773df24C54898a51aC11555F3C1355dD423",
                "1": "110000000000000000",
                "bidder": "0x1Cefd773df24C54898a51aC11555F3C1355dD423",
                "price": "110000000000000000"
            },
            "event": "NewBid",
            "signature": "0xdd0b6c6a77960e2066c96171b4d7ac9e8b4c184011f38544afa36a5bb63ec59f",
            "raw": {
                "data": "0x0000000000000000000000001cefd773df24c54898a51ac11555f3c1355dd4230000000000000000000000000000000000000000000000000186cc6acd4b0000",
                "topics": [
                    "0xdd0b6c6a77960e2066c96171b4d7ac9e8b4c184011f38544afa36a5bb63ec59f"
                ]
            },
            "timestamp": 1625033786
        },
        {
            "address": "0x87B213fa7e1bB171c0f538B39eFCf3650b4FbB87",
            "blockNumber": 10177606,
            "transactionHash": "0xda67e05aa44261774dc3cae01dd125ff72d9a1a8b1496c38829a4c942e47a92e",
            "transactionIndex": 0,
            "blockHash": "0xb4663ce0170248ba79efcf318ad762fb86e765158ab6d46225394c16e5cd6ed1",
            "logIndex": 0,
            "removed": false,
            "id": "log_8e30a314",
            "returnValues": {
                "0": "0x1Cefd773df24C54898a51aC11555F3C1355dD423",
                "1": "100000000000000000",
                "bidder": "0x1Cefd773df24C54898a51aC11555F3C1355dD423",
                "price": "100000000000000000"
            },
            "event": "NewBid",
            "signature": "0xdd0b6c6a77960e2066c96171b4d7ac9e8b4c184011f38544afa36a5bb63ec59f",
            "raw": {
                "data": "0x0000000000000000000000001cefd773df24c54898a51ac11555f3c1355dd423000000000000000000000000000000000000000000000000016345785d8a0000",
                "topics": [
                    "0xdd0b6c6a77960e2066c96171b4d7ac9e8b4c184011f38544afa36a5bb63ec59f"
                ]
            },
            "timestamp": 1625033633
        },
        {
            "address": "0x87B213fa7e1bB171c0f538B39eFCf3650b4FbB87",
            "blockNumber": 10177580,
            "transactionHash": "0x97c7aed2b624090532c6fbc246dc4bfc3d21e4ebc95d3a49fee9f449739d84d2",
            "transactionIndex": 1,
            "blockHash": "0xbbef083070f26329c6a014d4a107d802701fa4fd1df9fda684263c5f45397975",
            "logIndex": 1,
            "removed": false,
            "id": "log_d1de1f6b",
            "returnValues": {
                "0": "0x4fe6Afe49786bD2EdCe2CA83034148C86C612381",
                "1": "1000000000000000",
                "bidder": "0x4fe6Afe49786bD2EdCe2CA83034148C86C612381",
                "price": "1000000000000000"
            },
            "event": "NewBid",
            "signature": "0xdd0b6c6a77960e2066c96171b4d7ac9e8b4c184011f38544afa36a5bb63ec59f",
            "raw": {
                "data": "0x0000000000000000000000004fe6afe49786bd2edce2ca83034148c86c61238100000000000000000000000000000000000000000000000000038d7ea4c68000",
                "topics": [
                    "0xdd0b6c6a77960e2066c96171b4d7ac9e8b4c184011f38544afa36a5bb63ec59f"
                ]
            },
            "timestamp": 1625033555
        }
    ],
    "tokenMetadata": {
        "name": "ss",
        "description": "sssss",
        "attributes": [
            {
                "trait_type": "3",
                "value": "4"
            }
        ],
        "image": "ipfs://bafybeicy7trvrysc36hmgxjdj2ctpanqfvr6kdgak6r6zzz2zjeta4hijy/demo-san.jpeg"
    }
}

export default () => (
  <BidCardItem auction={auction} bidderPrice='0' />
);
```

## MarketCard-已结束
```jsx
import React from 'react'; 
import BidCardItem from '@/components/bid-card-item' 

const auction = {
    "id": 5,
    "contract": "0x6352f57A0E17FE177fbfcdEa7FDAd83427b6B2b2",
    "name": "iNFTAuctionTest",
    "description": "Test auction on inft platform.",
    "startTime": "1625023800",
    "isStart": true,
    "endTime": "1625038200",
    "isFinish": true,
    "owner": "0xc667A07B5140d9F63EC2aFa87784Df1497e9e905",
    "highestBidder": "248373485877300000",
    "bidEvents": [
        {
            "address": "0x87B213fa7e1bB171c0f538B39eFCf3650b4FbB87",
            "blockNumber": 10178651,
            "transactionHash": "0x75cac9d5587e317286e9dc822a66d25b7b12124054d8046f231458fbceebf88a",
            "transactionIndex": 1,
            "blockHash": "0xc13af804c8a0bf4fd45257d104f44e23259eb25c0d8799dc64ee2dcc9c999419",
            "logIndex": 1,
            "removed": false,
            "id": "log_8c55915e",
            "returnValues": {
                "0": "0xc667A07B5140d9F63EC2aFa87784Df1497e9e905",
                "1": "248373485877300000",
                "bidder": "0xc667A07B5140d9F63EC2aFa87784Df1497e9e905",
                "price": "248373485877300000"
            },
            "event": "NewBid",
            "signature": "0xdd0b6c6a77960e2066c96171b4d7ac9e8b4c184011f38544afa36a5bb63ec59f",
            "raw": {
                "data": "0x000000000000000000000000c667a07b5140d9f63ec2afa87784df1497e9e9050000000000000000000000000000000000000000000000000372665e95578b20",
                "topics": [
                    "0xdd0b6c6a77960e2066c96171b4d7ac9e8b4c184011f38544afa36a5bb63ec59f"
                ]
            },
            "timestamp": 1625036768
        },
        {
            "address": "0x87B213fa7e1bB171c0f538B39eFCf3650b4FbB87",
            "blockNumber": 10178506,
            "transactionHash": "0xfe0bb1e0b80584ce90c39b1c79b07a6b1475d2026b6224a1240e65c958ba38ec",
            "transactionIndex": 0,
            "blockHash": "0xa9e928f2ca605d21768c020071643d405e8c7a3b2a417eb3c22ef4e178a18dd9",
            "logIndex": 0,
            "removed": false,
            "id": "log_8811777b",
            "returnValues": {
                "0": "0xc667A07B5140d9F63EC2aFa87784Df1497e9e905",
                "1": "120000000000000000",
                "bidder": "0xc667A07B5140d9F63EC2aFa87784Df1497e9e905",
                "price": "120000000000000000"
            },
            "event": "NewBid",
            "signature": "0xdd0b6c6a77960e2066c96171b4d7ac9e8b4c184011f38544afa36a5bb63ec59f",
            "raw": {
                "data": "0x000000000000000000000000c667a07b5140d9f63ec2afa87784df1497e9e90500000000000000000000000000000000000000000000000001aa535d3d0c0000",
                "topics": [
                    "0xdd0b6c6a77960e2066c96171b4d7ac9e8b4c184011f38544afa36a5bb63ec59f"
                ]
            },
            "timestamp": 1625036333
        },
        {
            "address": "0x87B213fa7e1bB171c0f538B39eFCf3650b4FbB87",
            "blockNumber": 10177657,
            "transactionHash": "0x8814c636182f6dd723c5b5063b0b01baa0e0cc0d07a25b235726e30d9bc39dc4",
            "transactionIndex": 2,
            "blockHash": "0x17a86d31870b588a83b2053956e32cbf86ea5a43b75a50c3fc8f29dc907750fc",
            "logIndex": 0,
            "removed": false,
            "id": "log_5f5c92ea",
            "returnValues": {
                "0": "0x1Cefd773df24C54898a51aC11555F3C1355dD423",
                "1": "110000000000000000",
                "bidder": "0x1Cefd773df24C54898a51aC11555F3C1355dD423",
                "price": "110000000000000000"
            },
            "event": "NewBid",
            "signature": "0xdd0b6c6a77960e2066c96171b4d7ac9e8b4c184011f38544afa36a5bb63ec59f",
            "raw": {
                "data": "0x0000000000000000000000001cefd773df24c54898a51ac11555f3c1355dd4230000000000000000000000000000000000000000000000000186cc6acd4b0000",
                "topics": [
                    "0xdd0b6c6a77960e2066c96171b4d7ac9e8b4c184011f38544afa36a5bb63ec59f"
                ]
            },
            "timestamp": 1625033786
        },
        {
            "address": "0x87B213fa7e1bB171c0f538B39eFCf3650b4FbB87",
            "blockNumber": 10177606,
            "transactionHash": "0xda67e05aa44261774dc3cae01dd125ff72d9a1a8b1496c38829a4c942e47a92e",
            "transactionIndex": 0,
            "blockHash": "0xb4663ce0170248ba79efcf318ad762fb86e765158ab6d46225394c16e5cd6ed1",
            "logIndex": 0,
            "removed": false,
            "id": "log_8e30a314",
            "returnValues": {
                "0": "0x1Cefd773df24C54898a51aC11555F3C1355dD423",
                "1": "100000000000000000",
                "bidder": "0x1Cefd773df24C54898a51aC11555F3C1355dD423",
                "price": "100000000000000000"
            },
            "event": "NewBid",
            "signature": "0xdd0b6c6a77960e2066c96171b4d7ac9e8b4c184011f38544afa36a5bb63ec59f",
            "raw": {
                "data": "0x0000000000000000000000001cefd773df24c54898a51ac11555f3c1355dd423000000000000000000000000000000000000000000000000016345785d8a0000",
                "topics": [
                    "0xdd0b6c6a77960e2066c96171b4d7ac9e8b4c184011f38544afa36a5bb63ec59f"
                ]
            },
            "timestamp": 1625033633
        },
        {
            "address": "0x87B213fa7e1bB171c0f538B39eFCf3650b4FbB87",
            "blockNumber": 10177580,
            "transactionHash": "0x97c7aed2b624090532c6fbc246dc4bfc3d21e4ebc95d3a49fee9f449739d84d2",
            "transactionIndex": 1,
            "blockHash": "0xbbef083070f26329c6a014d4a107d802701fa4fd1df9fda684263c5f45397975",
            "logIndex": 1,
            "removed": false,
            "id": "log_d1de1f6b",
            "returnValues": {
                "0": "0x4fe6Afe49786bD2EdCe2CA83034148C86C612381",
                "1": "1000000000000000",
                "bidder": "0x4fe6Afe49786bD2EdCe2CA83034148C86C612381",
                "price": "1000000000000000"
            },
            "event": "NewBid",
            "signature": "0xdd0b6c6a77960e2066c96171b4d7ac9e8b4c184011f38544afa36a5bb63ec59f",
            "raw": {
                "data": "0x0000000000000000000000004fe6afe49786bd2edce2ca83034148c86c61238100000000000000000000000000000000000000000000000000038d7ea4c68000",
                "topics": [
                    "0xdd0b6c6a77960e2066c96171b4d7ac9e8b4c184011f38544afa36a5bb63ec59f"
                ]
            },
            "timestamp": 1625033555
        }
    ],
    "tokenMetadata": {
        "name": "ss",
        "description": "sssss",
        "attributes": [
            {
                "trait_type": "3",
                "value": "4"
            }
        ],
        "image": "ipfs://bafybeicy7trvrysc36hmgxjdj2ctpanqfvr6kdgak6r6zzz2zjeta4hijy/demo-san.jpeg"
    }
}

export default () => (
  <BidCardItem auction={auction} bidderPrice='0' />
);
```