import styles from './SkeletonList.module.css';

const SkeletonList = () => {
  return (
    <div className={styles.wrapper}>
      <div className="border-r-2 p-2 basis-3/12 flex justify-center items-center">
        <div className={styles.img}></div>
      </div>
      <div className="flex flex-col justify-start p-6 basis-9/12">
        <div className={styles.title}></div>
        <p className={styles.descr}></p>
        <div className={styles['bottom-wrapper']}>
          <div className={styles.price}></div>
          <div className={styles.btn}></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonList;
