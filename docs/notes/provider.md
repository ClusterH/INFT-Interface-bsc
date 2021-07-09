# 用户网络检查逻辑

- 如果直接第三方Provider，当用户的操作需要与BSC智能链交互时，可能会出现Error: unknow account 问题，原因在于用户当前账户在该节点不存在。[参考链接](https://ethereum.stackexchange.com/questions/38146/web3-eth-sendtransaction-unknown-account-error)。

- 用户未链接-使用自定义Provider
- 用户已链接-使用Web3.givenProvider

