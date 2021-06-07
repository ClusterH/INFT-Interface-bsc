import React from 'react';
import { Link } from 'umi';
import { InputNumber, Button } from 'antd';
import styles from './styles.less';
import levels from '@/assets/images/levels-1280.png';

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
    <div className={styles.bannerWrap}>
      <div className={styles.content}>
        <div className={styles.wrapImage}>
          <img src={image} alt="image" className={styles.image} />
        </div>

        <div className={styles.warpInfo}>
          <div className={styles.title}>{title}</div>

          <span className={styles.introBtn}>查看活动说明&gt;</span>

          <div className={styles.leveCard}>
            {/* <img src={levels} alt="" /> */}
          </div>

          <div className={styles.messageWrap}>
            <span className={styles.messageTitle}>粉丝福利：</span>
            <span className={styles.text}>传说卡牌*2=泡温泉</span>
            <span className={styles.text}>史诗卡牌*3=晚宴</span>
            <span className={styles.text}>珍奇*5=真声闹钟</span>
            <span className={styles.text}>稀有*5=生日祝福视频</span>
            <span className={styles.text}>高级*5=粉丝见面签名会</span>
          </div>
        </div>

        <div className={styles.wrapAction}>
          <span className={styles.btnConnect}>关联钱包</span>

          <div className={styles.wrapBalance}>
            <span>余额：{balance}</span>
            <Link to="/market">去购买BNB</Link>
          </div>

          <div className={styles.wrapInput}>
            <input type="text" className={styles.input} />
          </div>

          <div className={styles.btnBuy}></div>
        </div>
      </div>
    </div>
  );
};
