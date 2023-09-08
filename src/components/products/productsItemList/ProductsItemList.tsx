import { IProduct } from '../../../redux/slices/productsSlice/types';
import { shortText } from '../../../utils/shortText';
import { priceFormatingToRus } from '../../../utils/priceFormatingToRus';
import { Link } from 'react-router-dom';

import styles from './ProductsItemList.module.css';
import { withCartFunctional } from '../../../HOC/withCartFunctional';

interface IProductsItemGrid extends IProduct {
  handleAddCart: (item: IProduct) => void;
}

const ProductsItemList = (props: IProductsItemGrid) => {
  const { handleAddCart, ...product } = props;

  return (
    <div className={styles.wrapper}>
      <div className="border-r-2 p-2 basis-3/12">
        <Link to={`/products/${product.id}`}>
          <img className={styles.img} src={product.imageUrl} alt={product.title} />
        </Link>
      </div>
      <div className="flex flex-col justify-start p-6 basis-9/12">
        <h5 className={styles.title}>{product.title}</h5>
        <p className={styles.descr}>{shortText(product.description, 400)}</p>
        <div className="flex items-center gap-7">
          <h3 className="text-lg text-black font-semibold">
            {priceFormatingToRus(product.price)}₽
          </h3>
          <button
            onClick={() => handleAddCart(product)}
            type="button"
            className={`bg-orange-600 ${styles['btn-add']}`}
          >
            Добавить в корзину
          </button>
        </div>
      </div>
    </div>
  );
};

export default withCartFunctional(ProductsItemList);
