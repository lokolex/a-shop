import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IFilterState } from './types';
import { RootState } from '../../store';
import { CategoriesProduct } from '../productsSlice/types';

const initialState: IFilterState = {
  searchValue: '',
  categoriesFilter: CategoriesProduct.EMPTY,
  currentPage: 0,
  pageSize: 6,
  maxPrice: 150000,
  minPrice: 0,
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;

      if (action.payload) {
        state.currentPage = 0;
      }
    },
    setCategoriesFilter: (state, action: PayloadAction<CategoriesProduct>) => {
      state.categoriesFilter = action.payload;

      if (action.payload) {
        state.currentPage = 0;
      }
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setMaxPrice: (state, action: PayloadAction<number>) => {
      state.maxPrice = action.payload;

      if (action.payload !== 150000) {
        state.currentPage = 0;
      }
    },
  },
});

export const { setSearchValue, setCategoriesFilter, setCurrentPage, setMaxPrice } =
  filterSlice.actions;

export const selectSearchvalue = (state: RootState) => state.filter.searchValue;
export const selectCategoriesFilter = (state: RootState) => state.filter.categoriesFilter;
export const selectCurrentPage = (state: RootState) => state.filter.currentPage;
export const selectPageSize = (state: RootState) => state.filter.pageSize;
export const selectMaxPrice = (state: RootState) => state.filter.maxPrice;
export const selectMinPrice = (state: RootState) => state.filter.minPrice;

export default filterSlice.reducer;
