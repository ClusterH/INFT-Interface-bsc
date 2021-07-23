import { useState } from 'react';
import { getLocale } from 'umi';
import { message } from 'antd';
import { useWallet } from '@binance-chain/bsc-use-wallet';
import SendAddress from '@/components/send-address';
import { sendToken } from '@/helpers/treasureland';
import styles from './styles.less';

interface IMarketCardProps {
  image: string;
  imageType: string;
  name: string;
  owner?: string;
  price?: string;
  contract?: string;
  tokenId?: string;
  orderId?: string;
  onSale?: boolean;
  showFooter?: boolean;
  withSendMask?: boolean;
  onClick?: (data: any) => void;
}

export default (props: IMarketCardProps) => {
  const { tokenId, orderId, onSale, contract, image, imageType, name, owner, price, showFooter, withSendMask, onClick } = props;
  const [sendVisible, setSendVisible] = useState(false);
  const [address, setAddress] = useState('');
  const wallet = useWallet();

  const onChange = (addr: string) => {
    setAddress(addr);
  };
  /** 点击发送，展示弹窗 */
  const onSend = (e: any) => {
    e.stopPropagation();
    setSendVisible(true);
  };
  /** 发送 */
  const handleSend = async () => {
    if (!wallet.account) return;

    console.log('to', address);
    console.log('contract', contract);

    try {
      const result = await sendToken(wallet.account, address, tokenId as string, contract as string);
      console.log('result', result);
      message.success('Success');

      setSendVisible(false);
      location.reload();
    } catch (error) {
      setSendVisible(false);
      console.error(error);
    }
  };
  const onCancelSend = () => {
    setSendVisible(false);
  };

  const handleClick = () => {
    onClick &&
      onClick({
        contract,
        tokenId,
        orderId,
        onSale,
      });
  };

  return (
    <div className={styles.marketCard} onClick={handleClick}>
      <div
        className={[styles.imgBox, withSendMask ? styles.withSendMask : null, onSale ? (getLocale() === 'zh-CN' ? styles.imageBoxOnSaleCN : styles.imageBoxOnSale) : null].join(
          ' ',
        )}
      >
        {imageType === 'image' && <img src={image} alt="" className={styles.image} />}
        {imageType === 'video' && (
          <video controls className={styles.video}>
            <source src={image} type="video/mp4"></source>
          </video>
        )}
        {imageType === 'audio' && <audio src={image} controls className={styles.audio}></audio>}

        {!!withSendMask && (
          <div className={styles.sendMask}>
            <a className={styles.sendButton} onClick={onSend}>
              Send
            </a>
          </div>
        )}
      </div>

      <div className={styles.content}>
        <div className={styles.name}>{name}</div>

        {!!showFooter && (
          <div className={styles.buyWrap}>
            <span className={styles.owner}>{owner}</span>
            <button className={styles.buyBtn} onClick={handleClick}>
              {price} BNB
            </button>
          </div>
        )}
      </div>

      <SendAddress visible={sendVisible} address={address} onChange={onChange} onOk={handleSend} onCancel={onCancelSend}></SendAddress>
    </div>
  );
};
