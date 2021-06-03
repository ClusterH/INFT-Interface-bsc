import FilterCollection from '@/components/filter-collection';
import styles from './styles.less';

export interface ISidebarFilterProps {
  collections: any[];
  onChangeCollection: (item: any) => void;
}

export default (props: ISidebarFilterProps) => {
  const { collections, onChangeCollection } = props;

  return (
    <div className={styles.sidebarFilter}>
      <FilterCollection
        collections={collections}
        onClick={onChangeCollection}
      />
    </div>
  );
};
