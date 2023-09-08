import { FC } from 'react';
import { IProduct } from '../redux/slices/productsSlice/types';
import { useDispatch } from 'react-redux';
import { addItemCart } from '../redux/slices/cartSlice/cartSlice';

export const withCartFunctional = (Component: FC<any>) => (props: any) => {
  const dispatch = useDispatch();

  const handleAddCart = (item: IProduct) => {
    dispatch(addItemCart(item));
  };

  return <Component {...props} handleAddCart={handleAddCart} />;
};
