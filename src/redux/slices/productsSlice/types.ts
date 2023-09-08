import { Status } from '../authSlice/types';

export enum CategoriesProduct {
  EMPTY = '',
  PHONES = 'phones',
  GARMENT = 'garment',
  ELECTRONICS = 'electronics',
  LAPTOPS = 'laptops',
}

export interface IPostProductArgs {
  title: string;
  brand: string;
  categories: CategoriesProduct | string;
  price: number;
  description: string;
  imageUrl: string;
}

export interface IEditProductArgs extends IPostProductArgs {
  id?: number;
}

export interface IProduct extends IPostProductArgs {
  createdAt: string;
  updatedAt: string;
  id: number;
}

export interface IProductsState {
  products: IProduct[];
  status: Status;
  totalProductCount: number;
}

export interface IGetProductArgs {
  searchValue?: string;
  categories?: string;
  currentPage: number;
  pageSize?: number;
  minPrice?: number;
  maxPrice?: number;
  brand?: string;
  sort?: string;
}

export interface IGetProductsResult {
  data: IProduct[];
  totalCount: number;
}

export interface IDeleteProductArgs {
  id: number;
  title: string;
}
