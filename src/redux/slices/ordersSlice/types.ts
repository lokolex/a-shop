import { Status } from '../authSlice/types';
import { ICartItem } from '../cartSlice/types';

export interface IOrder {
  items: ICartItem[];
  totalCount: number;
  totalPrice: number;
  createdAt: number;
  updatedAt: number;
  userId: string;
  id: number;
}

export interface IOrdersState {
  orders: IOrder[];
  status: Status;
}

export interface IPostOrderArgs {
  items: ICartItem[];
  totalCount: number;
  totalPrice: number;
  userId: number | undefined;
}
