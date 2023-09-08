import { IProduct } from '../productsSlice/types';

export interface ICartItem extends IProduct {
  count: number;
  totalCost: number;
}

export interface ICartState {
  items: ICartItem[];
  totalPrice: number;
  totalCount: number;
}
