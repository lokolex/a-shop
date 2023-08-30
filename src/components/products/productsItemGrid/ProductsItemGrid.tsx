import { TERipple } from 'tw-elements-react';
import { priceFormatingToRus } from '../../../utils/priceFormatingToRus';
import { BiSolidCartAdd } from 'react-icons/bi';
import { IProduct } from '../../../redux/slices/productsSlice/types';
import { shortText } from '../../../utils/shortText';
import { Link } from 'react-router-dom';

import styles from './ProductsItemGrid.module.css';

const ProductsItemGrid = (props: IProduct) => {
  const { imageUrl, title, price, id } = props;

  return (
    <div className={styles.wrapper}>
      <TERipple>
        <div className={styles['img-wrapper']}>
          <img className="rounded-t-lg object-contain" src={imageUrl} alt={title} />
          <Link to={`/products/${id}`}>
            <div className={styles['img-link']}></div>
          </Link>
        </div>
      </TERipple>
      <div className="p-6">
        <h5 className={styles.title}>{shortText(title, 19)}</h5>
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

export default ProductsItemGrid;
