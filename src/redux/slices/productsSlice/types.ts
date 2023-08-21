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
  categories: CategoriesProduct;
  price: number;
  description: string;
  imageUrl: string;
}

export interface IProduct extends IPostProductArgs {
  createdAt: string;
  updatedAt: string;
  id: number;
}

export interface IProductsState {
  products: IProduct[];
  status: Status;
}
