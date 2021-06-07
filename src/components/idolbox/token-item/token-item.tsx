import styles from './styles.less';

export interface ITokenItemProps {
  id: string;
  image: string;
}

export default (props: ITokenItemProps) => {
  const { image, id } = props;

  const handleShow = () => {
    console.log('open');
  };

  const handleSell = () => {
    console.log('sell ', id);
  };

  return (
    <div className={styles.tokenItem}>
      <img src={image} alt="" className={styles.image} />

      <div className={styles.footer}>
        <span className={styles.showBtn} onClick={handleShow}>
          查看
        </span>
        <span className={styles.sellBtn} onClick={handleSell}>
          出售
        </span>
      </div>
    </div>
  );
};
