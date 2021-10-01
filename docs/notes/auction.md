# 上线拍卖活动流程

1. 修改 `src/pages/auction/index.tsx`
    1. 获取 拍卖数据
    2. 获取 metadata
    3. 页面挂载

2. 修改 `src/hooks/useBidHistory.tsx`
    1. 手动查询活动开始时或者创建合约的`blockNumber`
    2. 注意：`合约地址全大写`

示例：
```js
const BID_CONTRACT_CREATED_BLOCK: any = {
  '0XC14D3CDCD7291BD6B464F1A9052CBD0A3404F9B8': 8792612,
  '0X2172BF05DB5529D33424BDDFDD7499F86C33AE6D': 8945512,
};
```

