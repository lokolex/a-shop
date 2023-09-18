import { useSelector } from 'react-redux';
import {
  addItemCart,
  clearCart,
  deleteItemCart,
  minusItemCart,
  selectCartItems,
  selectTotalCount,
  selectTotalPrice,
} from '../../redux/slices/cartSlice/cartSlice';
import { BiMinus, BiPlus } from 'react-icons/bi';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { priceFormatingToRus } from '../../utils/priceFormatingToRus';
import CartEmpty from './cartEmpty/CartEmpty';
import { selectProducts } from '../../redux/slices/productsSlice/productsSlice';
import { selectOneProduct } from '../../redux/slices/oneProductSlice/oneProductSlice';
import { useAppDispatch } from '../../redux/store';
import { IPostOrderArgs } from '../../redux/slices/ordersSlice/types';
import { postOrder } from '../../redux/slices/ordersSlice/ordersSlice';
import { selectIsAuth, selectUser } from '../../redux/slices/authSlice/authSlice';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const products = useSelector(selectProducts);
  const oneProduct = useSelector(selectOneProduct);
  const totalCount = useSelector(selectTotalCount);
  const cartItems = useSelector(selectCartItems);
  const totalPrice = useSelector(selectTotalPrice);
  const isAuth = useSelector(selectIsAuth);
  const user = useSelector(selectUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleAddCart = (id: number) => {
    if (cartItems.length) {
      const item = cartItems.find((product) => product.id === id);
      if (item) {
        dispatch(addItemCart(item));
      }
    } else if (oneProduct && oneProduct.id === id) {
      dispatch(addItemCart(oneProduct));
    } else {
      const item = products.find((product) => product.id === id);
      if (item) {
        dispatch(addItemCart(item));
      }
    }
  };

  const handleMinusCart = (id: number) => {
    dispatch(minusItemCart(id));
  };

  const handleDeleteItemCart = (id: number) => {
    dispatch(deleteItemCart(id));
  };

  const handleCreateOrder = () => {
    const args: IPostOrderArgs = {
      items: cartItems,
      totalCount,
      totalPrice,
      userId: user?.id,
    };
    dispatch(postOrder(args));

    if (isAuth) {
      dispatch(clearCart());
      navigate('/');
    }
  };

  const contentCart = (
    <div className="block w-2/3 my-0 mx-auto py-7 overflow-auto lg:w-full">
      <h1 className="text-xl font-semibold">Корзина ({totalCount})</h1>
      <div className="mt-7 flex flex-col gap-6">
        {cartItems &&
          cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between md:flex-wrap gap-4 border-b-2 pb-3"
            >
              <div className="flex items-center basis-7/12 sm:basis-full">
                <div className="w-[60px] h-[60px] mr-2">
                  <img
                    className="w-full h-full object-cover object-center"
                    src={item.imageUrl}
                    alt={item.title}
                  />
                </div>
                <p>{item.title}</p>
              </div>

              <div className="flex gap-2 justify-center items-center basis-2/12">
                <button onClick={() => handleMinusCart(item.id)} className="border border-black">
                  <BiMinus size={18} />
                </button>
                <div>{item.count}</div>
                <button onClick={() => handleAddCart(item.id)} className="border border-black">
                  <BiPlus size={18} />
                </button>
              </div>

              <div className="flex justify-end items-center gap-2 basis-2/12 sm:basis-3/12">
                <p>{priceFormatingToRus(item.totalCost)}₽</p>
                <button onClick={() => handleDeleteItemCart(item.id)}>
                  <AiOutlineCloseCircle size={20} color="red" />
                </button>
              </div>
            </div>
          ))}
      </div>
      <div className="mt-7 font-semibold text-2xl text-end">
        <p>
          Общая сумма: <span>{priceFormatingToRus(totalPrice)}₽</span>
        </p>
      </div>
      <div className="mt-7 text-end">
        <button
          onClick={handleCreateOrder}
          className="rounded bg-orange-600 py-2 px-4 text-white hover:bg-orange-700"
        >
          Заказать
        </button>
      </div>
    </div>
  );

  return (
    <div className="container md:max-w-full">{totalCount === 0 ? <CartEmpty /> : contentCart}</div>
  );
};

export default Cart;
