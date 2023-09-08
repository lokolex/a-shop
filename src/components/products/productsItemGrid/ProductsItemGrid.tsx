import { TERipple } from 'tw-elements-react';
import { priceFormatingToRus } from '../../../utils/priceFormatingToRus';
import { BiSolidCartAdd } from 'react-icons/bi';
import { IProduct } from '../../../redux/slices/productsSlice/types';
import { shortText } from '../../../utils/shortText';
import { Link } from 'react-router-dom';

import styles from './ProductsItemGrid.module.css';
import { withCartFunctional } from '../../../HOC/withCartFunctional';

interface IProductsItemGrid extends IProduct {
  handleAddCart: (item: IProduct) => void;
}

const ProductsItemGrid = (props: IProductsItemGrid) => {
  const { handleAddCart, ...product } = props;

  return (
    <div className={styles.wrapper}>
      <TERipple>
        <div className={styles['img-wrapper']}>
          <img className="rounded-t-lg object-contain" src={product.imageUrl} alt={product.title} />
          <Link to={`/products/${product.id}`}>
            <div className={styles['img-link']}></div>
          </Link>
        </div>
      </TERipple>
      <div className="p-6">
        <h5 className={styles.title}>{shortText(product.title, 19)}</h5>
        <div className="flex items-center justify-between">
          <h4 className="font-semibold text-base dark:text-neutral-200">
            {priceFormatingToRus(product.price)}₽
          </h4>
          <button onClick={() => handleAddCart(product)} type="button">
            <BiSolidCartAdd className="text-3xl text-orange-700" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default withCartFunctional(ProductsItemGrid);
