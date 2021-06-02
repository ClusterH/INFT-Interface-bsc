import { Button } from 'antd';
import styles from './styles.less';
import { useState } from 'react';

export interface IAssetInfoProps {
  img: string;
  name: string;
  contract: string;
  tokenId: string;
  blockchain: string;
  price: string;
  priceSymbol: string;
  buyLoading?: boolean;
  sendLoading?: boolean;
  sellLoading?: boolean;
  cancelSellLoading?: boolean;
  isMyOrder?: boolean;
  isOnSale?: boolean;
  onBuy: () => void;
  onSend: () => void;
  onSell: () => void;
  onCancelSell: () => void;
}

const BuyPanel = (props) => {
  const { isOnSale, price, priceSymbol, onBuy, loading } = props;

  return (
    <div className={styles.buyPanel}>
      {isOnSale ? (
        <>
          <div className={styles.priceText}>Price:</div>
          <div className={styles.priceWrap}>
            <span className={styles.price}>{price}</span>
            <span className={styles.priceSymbol}>{priceSymbol}</span>
          </div>

          <Button
            type="primary"
            onClick={onBuy}
            block
            size="large"
            loading={loading}
            className={styles.button}
          >
            Buy
          </Button>
        </>
      ) : null}
    </div>
  );
};

const SellPanel = (props) => {
  const {
    sendLoading,
    sellLoading,
    cancelSellLoading,
    isOnSale,
    onSend,
    onSell,
    onCancelSell,
  } = props;

  return (
    <div className={styles.sellPanel}>
      <div className={styles.btnWrap}>
        <Button
          type="default"
          onClick={onSend}
          size="large"
          loading={sendLoading}
          className={styles.sendBtn}
        >
          Send
        </Button>

        {isOnSale ? (
          <Button
            type="primary"
            onClick={onCancelSell}
            size="large"
            loading={cancelSellLoading}
            className={styles.sellBtn}
          >
            Cancel
          </Button>
        ) : (
          <Button
            type="primary"
            onClick={onSell}
            size="large"
            loading={sellLoading}
            className={styles.sellBtn}
          >
            Sell
          </Button>
        )}
      </div>
    </div>
  );
};

export default (props: IAssetInfoProps) => {
  const {
    img,
    name,
    contract,
    tokenId,
    blockchain,
    price,
    priceSymbol,
    buyLoading,
    sendLoading,
    sellLoading,
    cancelSellLoading,
    isMyOrder,
    isOnSale,
    onBuy,
    onSend,
    onSell,
    onCancelSell,
  } = props;

  return (
    <div className={styles.assetInfo}>
      <div className={styles.imgBox}>
        <img src={img} alt="img" className={styles.img} />
      </div>
      <div className={styles.content}>
        <div className={styles.name}>{name}</div>
        <div className={styles.textBox}>
          <div className={styles.infoItem}>
            <span className={styles.label}>Contract Address</span>
            <span className={styles.value}>{contract}</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.label}>Token ID</span>
            <span className={styles.value}>{tokenId}</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.label}>Blockchain</span>
            <span className={styles.value}>{blockchain}</span>
          </div>
        </div>

        {!isMyOrder && (
          <BuyPanel
            isOnSale={isOnSale}
            price={price}
            priceSymbol={priceSymbol}
            onBuy={onBuy}
            loading={buyLoading}
          />
        )}
        {isMyOrder && (
          <SellPanel
            isOnSale={isOnSale}
            sendLoading={sendLoading}
            sellLoading={sellLoading}
            cancelSellLoading={cancelSellLoading}
            onSend={onSend}
            onSell={onSell}
            onCancelSell={onCancelSell}
          />
        )}
      </div>
    </div>
  );
};
