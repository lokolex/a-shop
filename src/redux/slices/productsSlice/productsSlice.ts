import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../../axios';
import { Status } from '../authSlice/types';
import { IPostProductArgs, IProduct, IProductsState } from './types';
import { RootState } from '../../store';

// async thunks---------------------------------
export const getProducts = createAsyncThunk<IProduct[]>('products/getProducts', async () => {
  const { data } = await axios.get<IProduct[]>('/products');
  return data;
});

export const postProduct = createAsyncThunk<IProduct, IPostProductArgs>(
  'products/postProduct',
  async (params) => {
    const { data } = await axios.post<IProduct>('/products', params);
    return data;
  }
);

const initialState: IProductsState = {
  products: [],
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
        state.products = action.payload;
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
        state.products.push(action.payload);
        state.status = Status.SUCCESS;
      })
      .addCase(postProduct.rejected, (state) => {
        state.status = Status.ERROR;
      });
  },
});

export const selectProducts = (state: RootState) => state.products.products;
export const selectProductsStatus = (state: RootState) => state.products.status;

export default productsSlice.reducer;
