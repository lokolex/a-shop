import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Pagination from '../../components/pagination/Pagination';
import {
  selectCurrentPage,
  selectPageSize,
  selectSort,
  setBrands,
  setCategoriesFilter,
  setCurrentPage,
  setMaxPrice,
  setSearchValue,
} from '../../redux/slices/filterSlice/filterSlice';
import { EBrands } from '../../redux/slices/filterSlice/types';
import {
  getProducts,
  selectTotalProductCount,
} from '../../redux/slices/productsSlice/productsSlice';
import { CategoriesProduct } from '../../redux/slices/productsSlice/types';
import { useAppDispatch } from '../../redux/store';
import AdminProducts from './adminProducts/AdminProducts';
import Sort from '../../components/searchPanel/sort/Sort';

import styles from './Admin.module.css';

const Admin = () => {
  const sort = useSelector(selectSort);
  const dispatch = useAppDispatch();

  //pagination data
  const currentPage = useSelector(selectCurrentPage);
  const pageSize = useSelector(selectPageSize);
  const totalElements = useSelector(selectTotalProductCount);
  const totalPages = Math.ceil(totalElements / pageSize);

  const handleClickOnPage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  useEffect(() => {
    dispatch(setSearchValue(''));
    dispatch(setCategoriesFilter(CategoriesProduct.EMPTY));
    dispatch(setCurrentPage(0));
    dispatch(setMaxPrice(150000));
    dispatch(setBrands(EBrands.ALL));
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const sortArr = sort.split(',');
    const sortvalue = sortArr.length < 2 ? '' : `_sort=${sortArr[0]}&_order=${sortArr[1]}`;
    dispatch(getProducts({ pageSize, currentPage, sort: sortvalue }));
    // eslint-disable-next-line
  }, [currentPage, pageSize, sort]);

  return (
    <div className="container py-6">
      <div className="flex justify-between">
        <Link to={'newProduct/add'}>
          <button type="button" className={`bg-info ${styles['button-add']}`}>
            Добавить продукт
          </button>
        </Link>
        <div className="flex gap-2 items-center">
          <div>Сортировка:</div>
          <Sort />
        </div>
      </div>
      <hr className="my-5 h-[1px] border-t-0 bg-neutral-300 opacity-90 dark:opacity-50" />
      <h2 className="text-center text-2xl font-bold">Товары</h2>

      <AdminProducts currentPage={currentPage} pageSize={pageSize} totalElements={totalElements} />

      {!!totalElements && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          handleClickOnPage={handleClickOnPage}
        />
      )}
    </div>
  );
};

export default Admin;
