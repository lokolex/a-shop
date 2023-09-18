import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { ICartItem, ICartState } from './types';
import { IProduct } from '../productsSlice/types';
import { toast } from 'react-toastify';
import { getCartFromLS } from '../../../utils/getCartFromLS';

const initialState: ICartState = getCartFromLS();

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemCart: (state, action: PayloadAction<IProduct>) => {
      const index = state.items.findIndex((item) => item.id === action.payload.id);
      if (index >= 0) {
        state.items[index].totalCost = state.items[index].totalCost + action.payload.price;
        state.items[index].count += 1;
        state.totalCount = state.items.reduce((prev, curr) => prev + curr.count, 0);
        state.totalPrice = state.items.reduce((prev, curr) => prev + curr.totalCost, 0);
      } else {
        const newItem: ICartItem = {
          ...action.payload,
          count: 1,
          totalCost: action.payload.price,
        };
        state.items.push(newItem);
        state.totalCount = state.items.reduce((prev, curr) => prev + curr.count, 0);
        state.totalPrice = state.items.reduce((prev, curr) => prev + curr.totalCost, 0);
        toast.success(`Товар: ${action.payload.title} добавлен в корзину`);
      }
    },
    minusItemCart: (state, action: PayloadAction<number>) => {
      if (action.payload) {
        const index = state.items.findIndex((item) => item.id === action.payload);
        if (state.items[index].count > 1) {
          state.items[index].count -= 1;
          state.items[index].totalCost -= state.items[index].price;
          state.totalCount = state.items.reduce((prev, curr) => prev + curr.count, 0);
          state.totalPrice = state.items.reduce((prev, curr) => prev + curr.totalCost, 0);
        } else {
          toast.warning(`Товар: ${state.items[index].title} удален из корзины`);
          state.items.splice(index, 1);
          state.totalCount = state.items.reduce((prev, curr) => prev + curr.count, 0);
          state.totalPrice = state.items.reduce((prev, curr) => prev + curr.totalCost, 0);
        }
      }
    },
    deleteItemCart: (state, action: PayloadAction<number>) => {
      if (action.payload) {
        const index = state.items.findIndex((item) => item.id === action.payload);
        toast.warning(`Товар: ${state.items[index].title} удален из корзины`);
        state.items = state.items.filter((item) => item.id !== action.payload);
        state.totalCount = state.items.reduce((prev, curr) => prev + curr.count, 0);
        state.totalPrice = state.items.reduce((prev, curr) => prev + curr.totalCost, 0);
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.totalCount = 0;
      state.totalPrice = 0;
    },
  },
});

export const { addItemCart, minusItemCart, deleteItemCart, clearCart } = cartSlice.actions;

export const selectTotalCount = (state: RootState) => state.cart.totalCount;
export const selectCartItems = (state: RootState) => state.cart.items;
export const selectTotalPrice = (state: RootState) => state.cart.totalPrice;

export default cartSlice.reducer;
