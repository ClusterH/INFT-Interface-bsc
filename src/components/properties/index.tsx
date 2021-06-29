import styles from './styles.less';

const PropertyItem = (props: any) => {
  const { attr = {} } = props;

  return (
    <>
      <div className={styles.propertyItem}>
        <span className={styles.attr}>{attr.trait_type}</span>
        <span className={styles.value}>{attr.value}</span>
      </div>
    </>
  );
};

export default (props: any) => {
  const { attrs } = props;
  if (!attrs) return null;

  return (
    <div className={styles.properties}>
      <div className={styles.header}>Properties</div>
      <div className={styles.wrapProps}>
        {attrs.map((attr: any, index: number) => (
          <PropertyItem key={index} attr={attr} />
        ))}
      </div>
    </div>
  );
};
