import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminProducts from './adminProducts/AdminProducts';
import { useSelector } from 'react-redux';
import {
  getProducts,
  selectProductsStatus,
  selectTotalProductCount,
} from '../../redux/slices/productsSlice/productsSlice';
import { Status } from '../../redux/slices/authSlice/types';
import { GridLoader } from 'react-spinners';
import Pagination from '../../components/pagination/Pagination';
import {
  selectCurrentPage,
  selectPageSize,
  setCurrentPage,
} from '../../redux/slices/filterSlice/filterSlice';
import { useAppDispatch } from '../../redux/store';

import styles from './Admin.module.css';

const Admin = () => {
  const productsStatus = useSelector(selectProductsStatus);
  const isLoadingProducts = productsStatus === Status.LOADING;
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
    dispatch(getProducts({ pageSize, currentPage }));
    // eslint-disable-next-line
  }, [currentPage, pageSize]);

  return (
    <div className="container">
      <Link to={'newProduct/add'}>
        <button type="button" className={`bg-info ${styles['button-add']}`}>
          Добавить продукт
        </button>
      </Link>
      <hr className="my-5 h-[1px] border-t-0 bg-neutral-300 opacity-90 dark:opacity-50" />
      <h2 className="text-center text-2xl font-bold">Товары</h2>
      {isLoadingProducts ? (
        <div className="text-center mt-14">
          <GridLoader color="#c2410c" />
        </div>
      ) : (
        <AdminProducts
          currentPage={currentPage}
          pageSize={pageSize}
          totalElements={totalElements}
        />
      )}
      {!isLoadingProducts && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          handleClickOnPage={handleClickOnPage}
        />
      )}
    </div>
  );
};

export default Admin;
