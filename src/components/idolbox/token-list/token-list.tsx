import { Link } from 'umi';
import { Empty } from 'antd';
import { TokenItem } from '../index';
import { ITokenItemProps } from '../token-item/token-item';
import styles from './styles.less';

export interface ITokenListProps {
  tokens: ITokenItemProps[];
}

export default (props: ITokenListProps) => {
  const { tokens } = props;

  return (
    <div className={styles.tokenList}>
      <div className={styles.header}>
        <Link to="/market">
          <span className={styles.marketLink}>去NFT市场</span>
        </Link>

        <span className={styles.nftBtn}>我的NFT</span>
      </div>

      {tokens.length ? (
        tokens.map((token) => (
          <TokenItem key={token.id} id={token.id} image={token.image} />
        ))
      ) : (
        <div style={{ paddingBottom: 60 }}>
          <Empty />
        </div>
      )}
    </div>
  );
};
