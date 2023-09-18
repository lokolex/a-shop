import ProductsItemGrid from './productsItemGrid/ProductsItemGrid';
import ProductsItemList from './productsItemList/ProductsItemList';
import { useSelector } from 'react-redux';
import {
  selectProducts,
  selectProductsStatus,
} from '../../redux/slices/productsSlice/productsSlice';
import { Status } from '../../redux/slices/authSlice/types';
import SkeletonGrid from '../UI/skeleton/SkeletonGrid';

import styles from './Products.module.css';
import { selectPageSize } from '../../redux/slices/filterSlice/filterSlice';
import SkeletonList from '../UI/skeleton/SkeletonList';

interface IProductsProps {
  isGrid: boolean;
}

const Products = (props: IProductsProps) => {
  const products = useSelector(selectProducts);
  const productsStatus = useSelector(selectProductsStatus);
  const pageSize = useSelector(selectPageSize);
  const isLoading = productsStatus === Status.LOADING;
  // const isLoading = true;

  const { isGrid } = props;

  const skeletonArray = [];

  for (let i = 0; i < pageSize; i++) {
    skeletonArray.push(i);
  }

  return (
    <>
      <div className={isGrid ? styles['wrapper-grid'] : styles['wrapper-list']}>
        {isLoading && isGrid && skeletonArray.map((num) => <SkeletonGrid key={num} />)}
        {isLoading && !isGrid && skeletonArray.map((num) => <SkeletonList key={num} />)}
        {products.map((product) => {
          if (isGrid) {
            return <ProductsItemGrid key={product.id} {...product} />;
          } else {
            return <ProductsItemList key={product.id} {...product} />;
          }
        })}
      </div>
    </>
  );
};

export default Products;
