import styles from './SkeletonGrid.module.css';

const SkeletonGrid = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles['img-wrapper']}>
        <span className={styles.img}></span>
      </div>

      <div className={styles.divider}></div>
      <div className={styles.title}></div>

      <div className={styles['bottom-wrapper']}>
        <div className={styles.price}></div>
        <div className={styles.cart}></div>
      </div>
    </div>
  );
};

export default SkeletonGrid;
