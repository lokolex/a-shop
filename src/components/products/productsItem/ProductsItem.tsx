import { TERipple } from 'tw-elements-react';
import { priceFormatingToRus } from '../../../utils/priceFormatingToRus';
import { BiSolidCartAdd } from 'react-icons/bi';
import { IProduct } from '../../../redux/slices/productsSlice/types';

import styles from './ProductsItem.module.css';

const ProductsItem = (props: IProduct) => {
  const { imageUrl, title, price } = props;

  return (
    <div className={styles.wrapper}>
      <TERipple>
        <div className={styles['img-wrapper']}>
          <img className="rounded-t-lg object-contain" src={imageUrl} alt={title} />
          <a href="#!">
            <div className={styles['img-link']}></div>
          </a>
        </div>
      </TERipple>
      <div className="p-6">
        <h5 className={styles.title}>{title}</h5>
        <div className="flex items-center justify-between">
          <h4 className="font-semibold text-base dark:text-neutral-200">
            {priceFormatingToRus(price)}₽
          </h4>
          <button type="button">
            <BiSolidCartAdd className="text-3xl text-orange-700" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductsItem;
