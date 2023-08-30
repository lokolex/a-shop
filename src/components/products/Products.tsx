import { GridLoader } from 'react-spinners';
import ProductsItemGrid from './productsItemGrid/ProductsItemGrid';
import ProductsItemList from './productsItemList/ProductsItemList';
import { useSelector } from 'react-redux';
import {
  selectProducts,
  selectProductsStatus,
} from '../../redux/slices/productsSlice/productsSlice';
import { Status } from '../../redux/slices/authSlice/types';

interface IProductsProps {
  isGrid: boolean;
}

const Products = (props: IProductsProps) => {
  const products = useSelector(selectProducts);
  const productsStatus = useSelector(selectProductsStatus);
  const isLoading = productsStatus === Status.LOADING;
  const { isGrid } = props;

  return (
    <div className="flex gap-6 md:flex-wrap justify-center">
      <div className="w-full h-full flex items-center justify-center">
        <GridLoader color="#c2410c" loading={isLoading} className="mt-7" />
      </div>
      {products.map((product) => {
        if (isGrid) {
          return <ProductsItemGrid key={product.id} {...product} />;
        } else {
          return <ProductsItemList key={product.id} {...product} />;
        }
      })}
    </div>
  );
};

export default Products;
