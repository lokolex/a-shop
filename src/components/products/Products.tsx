import { GridLoader } from 'react-spinners';
import ProductsItem from './productsItem/ProductsItem';
import { useSelector } from 'react-redux';
import {
  selectProducts,
  selectProductsStatus,
} from '../../redux/slices/productsSlice/productsSlice';
import { Status } from '../../redux/slices/authSlice/types';

const Products = () => {
  const products = useSelector(selectProducts);
  const productsStatus = useSelector(selectProductsStatus);
  const isLoading = productsStatus === Status.LOADING;

  return (
    <div className="flex gap-6 md:flex-wrap">
      <div className="w-full h-full flex items-center justify-center">
        <GridLoader color="#c2410c" loading={isLoading} />
      </div>
      {products.map((product) => (
        <ProductsItem key={product.id} {...product} />
      ))}
    </div>
  );
};

export default Products;
