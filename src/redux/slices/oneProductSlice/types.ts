import { Status } from '../authSlice/types';
import { IProduct } from '../productsSlice/types';

export interface IOneProductState {
  oneProduct: IProduct | null;
  status: Status;
}
