import { Popover } from 'antd';
import styles from './styles.less';
import weibo from '@/assets/images/icon-weibo.svg';
import twitter from '@/assets/images/icon-twitter.svg';
import telegram from '@/assets/images/icon-telegram.svg';
import weixin from '@/assets/images/icon-weixin.svg';
import qrcodeWeixin from '@/assets/images/qrcode-weixin.jpeg';

export default () => {
  const content = <img src={qrcodeWeixin} alt="qrcode" />;

  return (
    <div className={styles.footer}>
      <div className={styles.content}>
        <span className={styles.copyright}>
          ©2021 iNFT,Inc.All rights reserved
        </span>

        <span className={styles.business}>
          Business cooperation：
          <a href="mailto:business@inft.io">business@inft.io</a>
        </span>

        <span className={styles.communtie}>
          <a
            href="https://weibo.com/u/7512350596"
            target="_blank"
            className={styles.communtieItem}
          >
            <img src={weibo} alt="weibo" />
          </a>

          <a
            href="https://twitter.com/InftOffical"
            target="_blank"
            className={styles.communtieItem}
          >
            <img src={twitter} alt="twitter" />
          </a>
          <a
            href="https://t.me/iNFTglobal"
            target="_blank"
            className={styles.communtieItem}
          >
            <img src={telegram} alt="telegram" />
          </a>
          <span className={styles.communtieItem}>
            <Popover
              content={content}
              trigger="hover"
              overlayClassName={styles.wrapQrcode}
            >
              <img src={weixin} alt="weixin" />
            </Popover>
          </span>
        </span>
      </div>
    </div>
  );
};
