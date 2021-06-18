import { useIntl } from 'umi';
import { Button } from 'antd';
import styles from './styles.less';
import { useState } from 'react';
import IconFont from '@/components/icon-font';
import BscAddress from '@/components/bsc-address';

export interface IAssetInfoProps {
  img: string;
  imageType: string;
  name: string;
  owner: string;
  collectName: string;
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

const BuyPanel = (props: any) => {
  const intl = useIntl();
  const { isOnSale, price, priceSymbol, onBuy, loading } = props;

  return (
    <div className={styles.buyPanel}>
      {isOnSale ? (
        <>
          <div className={styles.priceText}>
            {intl.formatMessage({
              id: 'assetInfo_price',
              defaultMessage: 'Price',
            })}
            :
          </div>
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
            {intl.formatMessage({
              id: 'assetInfo_buy',
              defaultMessage: 'Buy',
            })}
          </Button>
        </>
      ) : null}
    </div>
  );
};

const SellPanel = (props: any) => {
  const intl = useIntl();
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
          {intl.formatMessage({
            id: 'assetInfo_send',
            defaultMessage: 'Send',
          })}
        </Button>

        {isOnSale ? (
          <Button
            type="primary"
            onClick={onCancelSell}
            size="large"
            loading={cancelSellLoading}
            className={styles.sellBtn}
          >
            {intl.formatMessage({
              id: 'assetInfo_cancel',
              defaultMessage: 'Cancel',
            })}
          </Button>
        ) : (
          <Button
            type="primary"
            onClick={onSell}
            size="large"
            loading={sellLoading}
            className={styles.sellBtn}
          >
            {intl.formatMessage({
              id: 'assetInfo_sell',
              defaultMessage: 'Sell',
            })}
          </Button>
        )}
      </div>
    </div>
  );
};

export default (props: IAssetInfoProps) => {
  const intl = useIntl();
  const {
    img,
    imageType,
    collectName,
    owner,
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
        {imageType === 'image' && (
          <img src={img} alt="img" className={styles.img} />
        )}
        {imageType === 'video' && (
          <video controls className={styles.video}>
            <source src={img} type="video/mp4"></source>
          </video>
        )}
        {imageType === 'audio' && (
          <audio src={img} controls className={styles.audio}></audio>
        )}
      </div>
      <div className={styles.content}>
        <div className={styles.name}>{name}</div>

        <div className={styles.tagsWrap}>
          <span className={styles.chainTag}>
            <IconFont type="icon-bsc" />
            BSC
          </span>
          {!!collectName && (
            <span className={styles.collectName}>#{collectName}#</span>
          )}
        </div>

        <div className={styles.ownerWrap}>
          <span className={styles.text}>
            {intl.formatMessage({
              id: 'assetInfo_ownedBy',
              defaultMessage: 'Owned by',
            })}
          </span>
          <BscAddress value={owner} short></BscAddress>
        </div>

        <div className={styles.textBox}>
          <div className={styles.infoItem}>
            <span className={styles.label}>
              {intl.formatMessage({
                id: 'assetInfo_contractAddress',
                defaultMessage: 'Contract Address',
              })}
            </span>
            {/* <span className={styles.value}>{contract}</span> */}
            <span className={styles.wrapContract}>
              <BscAddress value={contract}></BscAddress>
            </span>
            <span className={styles.wrapContractShort}>
              <BscAddress value={contract} short={true}></BscAddress>
            </span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.label}>
              {intl.formatMessage({
                id: 'assetInfo_tokenId',
                defaultMessage: 'Token ID',
              })}
            </span>
            <span className={styles.value}>{tokenId}</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.label}>
              {intl.formatMessage({
                id: 'assetInfo_blockchain',
                defaultMessage: 'Blockchain',
              })}
            </span>
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
