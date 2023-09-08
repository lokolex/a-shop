import { CategoriesProduct } from '../productsSlice/types';

export enum EBrands {
  ALL = 'All',
  XIAOMI = 'Xiaomi',
  REEBOK = 'Reebok',
  LG = 'LG',
  LENOVO = 'Lenovo',
  APPLE = 'Apple',
  ADIDAS = 'Adidas',
  SAMSUNG = 'Samsung',
  SONY = 'Sony',
}

export enum ESortValue {
  CHEAP = 'price,asc',
  COSTLY = 'price,desc',
  NEW = 'createdAt,desc',
  OLD = 'createdAt,asc',
  CATEGORY_ASC = 'categories,asc',
  CATEGORY_DESC = 'categories,desc',
}

export interface IFilterState {
  searchValue: string;
  categoriesFilter: CategoriesProduct;
  currentPage: number;
  pageSize: number;
  maxPrice: number;
  minPrice: number;
  brands: EBrands;
  sort: ESortValue | string;
}
