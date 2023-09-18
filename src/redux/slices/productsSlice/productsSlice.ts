import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../../axios';
import { Status } from '../authSlice/types';
import {
  CategoriesProduct,
  IDeleteProductArgs,
  IEditProductArgs,
  IGetProductArgs,
  IGetProductsResult,
  IPostProductArgs,
  IProduct,
  IProductsState,
} from './types';
import { RootState } from '../../store';
import { toast } from 'react-toastify';
import { EBrands } from '../filterSlice/types';
import { MAX_PRICE } from '../filterSlice/filterSlice';

// async thunks---------------------------------
export const getProducts = createAsyncThunk<IGetProductsResult, IGetProductArgs>(
  'products/getProducts',
  async ({
    searchValue = '',
    categories = CategoriesProduct.EMPTY,
    currentPage,
    pageSize = 6,
    minPrice = 0,
    maxPrice = MAX_PRICE,
    brand = EBrands.ALL,
    sort,
  }) => {
    const response = await axios.get<IProduct[]>(
      `/products?_page=${
        currentPage + 1
      }&_limit=${pageSize}&${categories}&${brand}&${sort}&q=${searchValue}&price_gte=${minPrice}&price_lte=${maxPrice}`
    );
    const totalCount = +response.headers['x-total-count'];
    const result = {
      data: response.data,
      totalCount,
    };
    return result;
  }
);

export const postProduct = createAsyncThunk<IProduct, IPostProductArgs>(
  'products/postProduct',
  async (params) => {
    const { data } = await axios.post<IProduct>('/products', params);
    return data;
  }
);

export const deleteProduct = createAsyncThunk<IDeleteProductArgs, IDeleteProductArgs>(
  'products/deleteProduct',
  async ({ id, title }) => {
    await axios.delete(`/products/${id}`);
    return { id, title };
  }
);

export const editProduct = createAsyncThunk<IProduct, IEditProductArgs>(
  'products/editProduct',
  async (params) => {
    const { id } = params;
    delete params.id;
    const { data } = await axios.patch<IProduct>(`/products/${id}`, params);
    return data;
  }
);

//productsSlice--------------------------------------

const initialState: IProductsState = {
  products: [],
  totalProductCount: 0,
  status: Status.SUCCESS,
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //Get products
      .addCase(getProducts.pending, (state) => {
        state.products = [];
        state.status = Status.LOADING;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.products = action.payload.data;
        state.totalProductCount = action.payload.totalCount;
        state.status = Status.SUCCESS;
      })
      .addCase(getProducts.rejected, (state) => {
        state.products = [];
        state.status = Status.ERROR;
      })
      // POST Product
      .addCase(postProduct.pending, (state) => {
        state.status = Status.LOADING;
      })
      .addCase(postProduct.fulfilled, (state, action) => {
        state.status = Status.SUCCESS;
        toast.success(`${action.payload.title} добавлен в магазин!`);
      })
      .addCase(postProduct.rejected, (state, action) => {
        state.status = Status.ERROR;
        toast.error(action.error.message);
      })
      // Delete Product
      .addCase(deleteProduct.pending, (state) => {
        state.status = Status.LOADING;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        const { id, title } = action.payload;
        state.products = state.products.filter((product) => product.id !== id);
        state.status = Status.SUCCESS;
        toast.success(`${title} удален из магазина!`);
      })
      .addCase(deleteProduct.rejected, (state) => {
        state.status = Status.ERROR;
      })
      // Edit Product
      .addCase(editProduct.pending, (state) => {
        state.status = Status.LOADING;
      })
      .addCase(editProduct.fulfilled, (state, action) => {
        state.status = Status.SUCCESS;
        const array = Array.from(state.products);
        const index = array.findIndex((p) => {
          return p.id === action.payload.id;
        });
        state.products = state.products.map((p, i) => (i === index ? { ...action.payload } : p));
        toast.success(`${action.payload.title} изменен!`);
      })
      .addCase(editProduct.rejected, (state, action) => {
        state.status = Status.ERROR;
        toast.error(action.error.message);
      });
  },
});

export const selectProducts = (state: RootState) => state.products.products;
export const selectProductsStatus = (state: RootState) => state.products.status;
export const selectTotalProductCount = (state: RootState) => state.products.totalProductCount;

export default productsSlice.reducer;
