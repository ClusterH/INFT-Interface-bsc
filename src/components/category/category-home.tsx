import { useIntl } from 'umi';
import styles from './styles.less';

export default (props: any) => {
  const intl = useIntl();
  const { categories, active = 0, onClick } = props;

  return (
    <div className={styles.categoryHome}>
      <span className={styles.categoryItem}>
        <a
          onClick={() => onClick(0)}
          className={active === 0 ? styles.active : null}
        >
          {intl.formatMessage({
            id: 'categoryHome_all',
            defaultMessage: 'All',
          })}
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
