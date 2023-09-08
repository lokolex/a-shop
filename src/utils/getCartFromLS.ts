import { ICartState } from '../redux/slices/cartSlice/types';

export const getCartFromLS = (): ICartState => {
  const data = window.localStorage.getItem('cart');
  if (data) {
    const cartState: ICartState = JSON.parse(data);
    return cartState;
  } else {
    return {
      items: [],
      totalPrice: 0,
      totalCount: 0,
    };
  }
};
