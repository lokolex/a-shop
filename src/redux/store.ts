import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import authReducer from './slices/authSlice/authSlice';
import productsReducer from './slices/productsSlice/productsSlice';
import filterReducer from './slices/filterSlice/filterSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    filter: filterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
