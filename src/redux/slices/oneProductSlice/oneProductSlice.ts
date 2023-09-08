import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Status } from '../authSlice/types';
import { IOneProductState } from './types';
import { IProduct } from '../productsSlice/types';
import axios from '../../../axios';
import { RootState } from '../../store';

// async thank
export const getProduct = createAsyncThunk<IProduct, number>('product/getProduct', async (id) => {
  const { data } = await axios.get<IProduct>(`/products/${id}`);
  return data;
});

//One Product slice
const initialState: IOneProductState = {
  oneProduct: null,
  status: Status.LOADING,
};

export const oneProductSlice = createSlice({
  name: 'oneProduct',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get Product
      .addCase(getProduct.pending, (state) => {
        state.oneProduct = null;
        state.status = Status.LOADING;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.oneProduct = action.payload;
        state.status = Status.SUCCESS;
      })
      .addCase(getProduct.rejected, (state) => {
        state.oneProduct = null;
        state.status = Status.ERROR;
      });
  },
});

export const selectOneProduct = (state: RootState) => state.oneProduct.oneProduct;
export const selectStatusOneProduct = (state: RootState) => state.oneProduct.status;

export default oneProductSlice.reducer;
