import React from 'react';
import { Link } from 'react-router-dom';
import AdminProducts from './adminProducts/AdminProducts';
import { useSelector } from 'react-redux';
import { selectProductsStatus } from '../../redux/slices/productsSlice/productsSlice';
import { Status } from '../../redux/slices/authSlice/types';
import { GridLoader } from 'react-spinners';

import styles from './Admin.module.css';

const Admin = () => {
  const productsStatus = useSelector(selectProductsStatus);
  const isLoadingProducts = productsStatus === Status.LOADING;
  // const isLoadingProducts = true;

  return (
    <div className="container">
      <Link to={'newProduct'}>
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
        <AdminProducts />
      )}
    </div>
  );
};

export default Admin;
