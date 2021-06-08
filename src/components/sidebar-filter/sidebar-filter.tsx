import FilterCollection from '@/components/filter-collection';
import FilterAttr from '@/components/filter-attr';
import styles from './styles.less';

export interface ISidebarFilterProps {
  collections: any[];
  attrs: any[];
  onChangeCollection: (item: any) => void;
  onAttrsChange: (attr: string, values: string[]) => void;
}

export default (props: ISidebarFilterProps) => {
  const { collections, attrs, onChangeCollection, onAttrsChange } = props;

  return (
    <div className={styles.sidebarFilter}>
      <FilterCollection
        collections={collections}
        onClick={onChangeCollection}
      />

      {attrs.map((attr) => (
        <FilterAttr
          key={attr.Name}
          header={attr.Name}
          values={attr.Values}
          onChange={onAttrsChange}
        />
      ))}
    </div>
  );
};
