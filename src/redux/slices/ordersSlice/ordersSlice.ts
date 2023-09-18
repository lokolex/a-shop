import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../../axios';
import { RootState } from '../../store';
import { IOrder, IOrdersState, IPostOrderArgs } from './types';
import { Status } from '../authSlice/types';
import { toast } from 'react-toastify';

//Async thank--------------
export const postOrder = createAsyncThunk<IOrder, IPostOrderArgs>(
  'orders/postOrder',
  async (args) => {
    const { userId, ...order } = args;
    if (!userId) {
      throw new Error('Войдите или зарегистрируйтесь чтобы оформить заказ!');
    }
    const { data } = await axios.post<IOrder>(`/users/${userId}/orders`, order);
    return data;
  }
);

export const getOrders = createAsyncThunk<IOrder[], number>('orders/getOrders', async (userId) => {
  if (!userId) {
    throw new Error('Невозможно получить список заказов');
  }
  const { data } = await axios.get<IOrder[]>(`/users/${userId}/orders`);
  return data;
});

//--------------------------------

const initialState: IOrdersState = {
  orders: [],
  status: Status.SUCCESS,
};

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //post order
      .addCase(postOrder.pending, (state) => {
        state.status = Status.LOADING;
      })
      .addCase(postOrder.fulfilled, (state, action) => {
        state.status = Status.SUCCESS;
        state.orders.push(action.payload);
        toast.success(
          'Заказ успешно сформирован. С Вами свяжется наш менеджер по поводу оплаты и доставки.'
        );
      })
      .addCase(postOrder.rejected, (state, action) => {
        state.status = Status.ERROR;
        toast.error(action.error.message);
      })
      //get orders
      .addCase(getOrders.pending, (state) => {
        state.status = Status.LOADING;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.status = Status.SUCCESS;
        state.orders = action.payload;
      })
      .addCase(getOrders.rejected, (state) => {
        state.status = Status.ERROR;
      });
  },
});

export const selectOrders = (state: RootState) => state.orders.orders;
export const selectOrdersStatus = (state: RootState) => state.orders.status;

export default ordersSlice.reducer;
