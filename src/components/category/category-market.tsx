import useCategory from '@/hooks/useCategory';
import styles from './styles.less';

export default (props: any) => {
  const { categories, active = 0, onClick } = props;

  return (
    <div className={styles.categoryMarket}>
      <span className={styles.categoryItem}>
        <a
          href=""
          onClick={() => onClick(0)}
          className={active === 0 ? styles.active : null}
        >
          All
        </a>
      </span>
      {categories.map((cat: any) => (
        <span key={cat.id} className={styles.categoryItem}>
          <a
            onClick={() => onClick(cat.id)}
            className={active === cat.id ? styles.active : null}
          >
            {cat.name}
          </a>
        </span>
      ))}
    </div>
  );
};
