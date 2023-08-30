import { CategoriesProduct } from '../productsSlice/types';

export interface IFilterState {
  searchValue: string;
  categoriesFilter: CategoriesProduct;
  currentPage: number;
  pageSize: number;
  maxPrice: number;
  minPrice: number;
}
