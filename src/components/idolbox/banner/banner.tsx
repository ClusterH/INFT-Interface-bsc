import React from 'react';
import { InputNumber, Button } from 'antd';

export interface IBannerProps {
  /** 活动标题 */
  title: string;
  /** 展示图片 */
  image: string;
  /** 账户余额 */
  balance: string;
  /** 支付金额 */
  amount: number;
  /** 开盲盒概率 */
  percent: number;
  /** 关联钱包 */
  onConnect: () => void;
  /** 更新购买金额 */
  onChange: () => void;
  /** 抢购 */
  onBuy: () => void;
}

export default (props: IBannerProps) => {
  const { title, image, balance, amount, percent, onConnect, onChange, onBuy } =
    props;
  return (
    <div>
      <img src={image} alt="image" style={{ width: 200 }} />
      <div className="title">{title}</div>
      <div>余额：{balance} BNB</div>
      <div>
        <InputNumber value={amount} onChange={onChange} />
      </div>
      <div>开出传奇盲盒概率：{percent}</div>

      <Button onClick={onConnect}>关联钱包</Button>
      <Button onClick={onBuy}>立即抢购</Button>
    </div>
  );
};
