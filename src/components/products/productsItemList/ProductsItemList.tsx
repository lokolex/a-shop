import { IProduct } from '../../../redux/slices/productsSlice/types';
import { shortText } from '../../../utils/shortText';
import { priceFormatingToRus } from '../../../utils/priceFormatingToRus';
import { Link } from 'react-router-dom';

import styles from './ProductsItemList.module.css';

const ProductsItemList = (props: IProduct) => {
  const { title, description, imageUrl, price, id } = props;

  return (
    <div className={styles.wrapper}>
      <div className="border-r-2 p-2 basis-3/12">
        <Link to={`/products/${id}`}>
          <img className={styles.img} src={imageUrl} alt={title} />
        </Link>
      </div>
      <div className="flex flex-col justify-start p-6 basis-9/12">
        <h5 className={styles.title}>{title}</h5>
        <p className={styles.descr}>{shortText(description, 400)}</p>
        <div className="flex items-center gap-7">
          <h3 className="text-lg text-black font-semibold">{priceFormatingToRus(price)}₽</h3>
          <button type="button" className={`bg-orange-600 ${styles['btn-add']}`}>
            Добавить в корзину
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductsItemList;
