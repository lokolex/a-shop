import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../redux/store';
import {
  getProducts,
  selectProducts,
  selectProductsStatus,
  selectTotalProductCount,
} from '../../redux/slices/productsSlice/productsSlice';
import { useSelector } from 'react-redux';
import {
  selectCategoriesFilter,
  selectCurrentPage,
  selectMaxPrice,
  selectMinPrice,
  selectPageSize,
  selectSearchvalue,
  setCurrentPage,
} from '../../redux/slices/filterSlice/filterSlice';
import { CategoriesProduct, IGetProductArgs } from '../../redux/slices/productsSlice/types';

import MySlider from '../../components/slider/MySlider';
import Filter from '../../components/filter/Filter';
import Products from '../../components/products/Products';
import SearchPanel from '../../components/searchPanel/SearchPanel';
import Pagination from '../../components/pagination/Pagination';
import { Status } from '../../redux/slices/authSlice/types';

const Home = () => {
  const [isGrid, setIsGrid] = useState(true);
  const dispatch = useAppDispatch();
  const searchValue = useSelector(selectSearchvalue);
  const categoriesFilter = useSelector(selectCategoriesFilter);
  const products = useSelector(selectProducts);
  const maxPrice = useSelector(selectMaxPrice);
  const minPrice = useSelector(selectMinPrice);
  const productsStatus = useSelector(selectProductsStatus);
  const isLoading = productsStatus === Status.LOADING;

  //pagination data
  const currentPage = useSelector(selectCurrentPage);
  const pageSize = useSelector(selectPageSize);
  const totalElements = useSelector(selectTotalProductCount);
  const totalPages = Math.ceil(totalElements / pageSize);

  const handleClickOnPage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  useEffect(() => {
    if (!window.localStorage.getItem('isGrid')) return;
    const value = JSON.parse(window.localStorage.getItem('isGrid') || '');
    setIsGrid(value);
  }, []);

  useEffect(() => {
    const categories =
      categoriesFilter === CategoriesProduct.EMPTY ? '' : `categories=${categoriesFilter}`;
    const params: IGetProductArgs = {
      searchValue,
      categories,
      currentPage,
      pageSize,
      minPrice,
      maxPrice,
    };
    dispatch(getProducts(params));
    // eslint-disable-next-line
  }, [searchValue, categoriesFilter, currentPage, minPrice, maxPrice, pageSize]);

  return (
    <>
      {/* <MySlider /> */}
      <div className="container md:max-w-full">
        <div className="flex gap-4 my-5">
          <div className="basis-1/4">
            <Filter />
          </div>
          <div className="basis-3/4">
            <SearchPanel isGrid={isGrid} setIsGrid={setIsGrid} />

            {!products.length && !isLoading && (
              <h1 className="mt-6 font-semibold text-center">Товары не найдены</h1>
            )}

            <Products isGrid={isGrid} />

            {products.length ? (
              <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                handleClickOnPage={handleClickOnPage}
              />
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
