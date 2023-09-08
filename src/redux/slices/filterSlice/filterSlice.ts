import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { EBrands, ESortValue, IFilterState } from './types';
import { RootState } from '../../store';
import { CategoriesProduct } from '../productsSlice/types';

const initialState: IFilterState = {
  searchValue: '',
  categoriesFilter: CategoriesProduct.EMPTY,
  currentPage: 0,
  pageSize: 6,
  maxPrice: 150000,
  minPrice: 0,
  brands: EBrands.ALL,
  sort: ESortValue.NEW,
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
    setBrands: (state, action: PayloadAction<EBrands>) => {
      state.brands = action.payload;

      if (action.payload !== EBrands.ALL) {
        state.currentPage = 0;
      }
    },
    setSort: (state, action: PayloadAction<ESortValue | string>) => {
      state.sort = action.payload;
    },
    setFilters: (state, action: PayloadAction<IFilterState>) => {
      const {
        brands,
        categoriesFilter,
        currentPage,
        maxPrice,
        minPrice,
        pageSize,
        searchValue,
        sort,
      } = action.payload;
      state.sort = sort;
      state.searchValue = searchValue;
      state.categoriesFilter = categoriesFilter;
      state.brands = brands;
      state.currentPage = currentPage - 1;
      state.maxPrice = maxPrice;
      state.minPrice = minPrice;
      state.pageSize = pageSize;
    },
  },
});

export const {
  setSearchValue,
  setCategoriesFilter,
  setCurrentPage,
  setMaxPrice,
  setBrands,
  setSort,
  setFilters,
} = filterSlice.actions;

export const selectSearchvalue = (state: RootState) => state.filter.searchValue;
export const selectCategoriesFilter = (state: RootState) => state.filter.categoriesFilter;
export const selectCurrentPage = (state: RootState) => state.filter.currentPage;
export const selectPageSize = (state: RootState) => state.filter.pageSize;
export const selectMaxPrice = (state: RootState) => state.filter.maxPrice;
export const selectMinPrice = (state: RootState) => state.filter.minPrice;
export const selectBrands = (state: RootState) => state.filter.brands;
export const selectSort = (state: RootState) => state.filter.sort;

export default filterSlice.reducer;
