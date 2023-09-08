import { useEffect, useRef, useState } from 'react';
import qs from 'qs';
import { useAppDispatch } from '../../redux/store';
import {
  getProducts,
  selectProducts,
  selectProductsStatus,
  selectTotalProductCount,
} from '../../redux/slices/productsSlice/productsSlice';
import { useSelector } from 'react-redux';
import {
  selectBrands,
  selectCategoriesFilter,
  selectCurrentPage,
  selectMaxPrice,
  selectMinPrice,
  selectPageSize,
  selectSearchvalue,
  selectSort,
  setCurrentPage,
  setFilters,
} from '../../redux/slices/filterSlice/filterSlice';
import { CategoriesProduct, IGetProductArgs } from '../../redux/slices/productsSlice/types';

import MySlider from '../../components/slider/MySlider';
import Filter from '../../components/filter/Filter';
import Products from '../../components/products/Products';
import SearchPanel from '../../components/searchPanel/SearchPanel';
import Pagination from '../../components/pagination/Pagination';
import { Status } from '../../redux/slices/authSlice/types';
import { EBrands, ESortValue, IFilterState } from '../../redux/slices/filterSlice/types';
import { useLocation, useNavigate } from 'react-router-dom';

const Home = () => {
  const [isGrid, setIsGrid] = useState(true);
  const dispatch = useAppDispatch();
  const searchValue = useSelector(selectSearchvalue);
  const categoriesFilter = useSelector(selectCategoriesFilter);
  const products = useSelector(selectProducts);
  const maxPrice = useSelector(selectMaxPrice);
  const minPrice = useSelector(selectMinPrice);
  const brand = useSelector(selectBrands);
  const sort = useSelector(selectSort);
  const productsStatus = useSelector(selectProductsStatus);
  const isLoading = productsStatus === Status.LOADING;
  const productsRef = useRef<HTMLDivElement>(null);

  //pagination data
  const currentPage = useSelector(selectCurrentPage);
  const pageSize = useSelector(selectPageSize);
  const totalElements = useSelector(selectTotalProductCount);
  const totalPages = Math.ceil(totalElements / pageSize);

  const handleClickOnPage = (page: number) => {
    dispatch(setCurrentPage(page));
    if (productsRef && productsRef.current) {
      productsRef.current.scrollIntoView({ block: 'start', behavior: 'smooth' });
    }
  };

  // Запрос продуктов, работа со строкой запроса и редакс//////////////////////////////////
  const isSelected = useRef(false);
  const navigate = useNavigate();
  const location = useLocation();

  const funcGetProducts = async () => {
    const categories =
      categoriesFilter === CategoriesProduct.EMPTY ? '' : `categories=${categoriesFilter}`;
    const brands = brand === EBrands.ALL ? '' : `brand=${brand}`;
    const sortArr = sort.split(',');
    const sortvalue = `_sort=${sortArr[0]}&_order=${sortArr[1]}`;

    const params: IGetProductArgs = {
      searchValue,
      categories,
      currentPage,
      pageSize,
      minPrice,
      maxPrice,
      brand: brands,
      sort: sortvalue,
    };
    dispatch(getProducts(params));
  };

  useEffect(() => {
    //Устанавливаем из строки запроса в редакс
    if (location.search) {
      const searchParams = qs.parse(location.search.substring(1));
      const newFilterObj: IFilterState = {
        searchValue: String(searchParams.q),
        categoriesFilter: String(searchParams.categories) as CategoriesProduct,
        currentPage: Number(searchParams._page),
        pageSize: Number(searchParams._limit),
        maxPrice: Number(searchParams.price_lte),
        minPrice: Number(searchParams.price_gte),
        brands: String(searchParams.brand) as EBrands,
        sort: searchParams._order ? searchParams._sort + ',' + searchParams._order : '',
      };

      dispatch(setFilters(newFilterObj));

      isSelected.current = true;

      //Сравниваем строку запроса с initialState, для получения продуктов при перезагрузке страницы
      if (
        newFilterObj.sort === ESortValue.NEW &&
        newFilterObj.searchValue === '' &&
        newFilterObj.categoriesFilter === CategoriesProduct.EMPTY &&
        newFilterObj.currentPage === 1 &&
        newFilterObj.pageSize === 6 &&
        newFilterObj.maxPrice === 150000 &&
        newFilterObj.minPrice === 0 &&
        newFilterObj.brands === EBrands.ALL
      ) {
        funcGetProducts();
      }
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    //Устанавливаем из редакса в строку запроса
    const arrSort = sort.split(',');

    const searchParams = {
      _page: currentPage + 1,
      _limit: pageSize,
      categories: categoriesFilter,
      brand: brand,
      _sort: arrSort[0],
      _order: arrSort[1],
      q: searchValue,
      price_gte: minPrice,
      price_lte: maxPrice,
    };

    const searchParamsStr = qs.stringify(searchParams);

    navigate(`?${searchParamsStr}`);
  }, [
    brand,
    categoriesFilter,
    currentPage,
    maxPrice,
    minPrice,
    navigate,
    pageSize,
    searchValue,
    sort,
  ]);

  useEffect(() => {
    //Получаем продукты
    if (!isSelected.current) {
      funcGetProducts();
    }

    isSelected.current = false;

    // eslint-disable-next-line
  }, [searchValue, categoriesFilter, currentPage, minPrice, maxPrice, pageSize, brand, sort]);

  ////////////////////////////////////////////////////////////////////

  useEffect(() => {
    if (!window.localStorage.getItem('isGrid')) return;
    const value = JSON.parse(window.localStorage.getItem('isGrid') || '');
    setIsGrid(value);
  }, []);

  return (
    <>
      {/* <MySlider /> */}
      <div className="bg-gray-100 py-8">
        <div className="container md:max-w-full">
          <div className="flex gap-4">
            <div className="basis-1/4">
              <Filter />
            </div>
            <div className="basis-3/4">
              <div ref={productsRef}>
                <SearchPanel isGrid={isGrid} setIsGrid={setIsGrid} />
              </div>

              {!products.length && !isLoading && (
                <h1 className="mt-6 font-semibold text-center">Товары не найдены</h1>
              )}

              <Products isGrid={isGrid} />

              {!!totalElements && (
                <Pagination
                  totalPages={totalPages}
                  currentPage={currentPage}
                  handleClickOnPage={handleClickOnPage}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
