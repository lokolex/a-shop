import { useDispatch, useSelector } from 'react-redux';
import {
  addItemCart,
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

const Cart = () => {
  const products = useSelector(selectProducts);
  const oneProduct = useSelector(selectOneProduct);
  const totalCount = useSelector(selectTotalCount);
  const cartItems = useSelector(selectCartItems);
  const totalPrice = useSelector(selectTotalPrice);
  const dispatch = useDispatch();

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

  const contentCart = (
    <div className="block w-2/3 my-0 mx-auto py-7 overflow-auto lg:w-full">
      <h1 className="text-xl font-semibold">Корзина ({totalCount})</h1>
      <table className="min-w-full overflow-visible mt-7">
        <thead className="border-b text-sm">
          <tr>
            <th scope="col" className="text-left pb-2 font-light">
              Товар
            </th>
            <th scope="col" className="pb-2 font-light">
              Цена
            </th>
            <th scope="col" className="pb-2 font-light">
              Количество
            </th>
            <th scope="col" className="text-right pb-2 font-light">
              Сумма
            </th>
          </tr>
        </thead>
        <tbody>
          {cartItems &&
            cartItems.map((item) => (
              <tr key={item.id} className="border-b text-sm">
                <td className="px-2 py-4">
                  <div className="flex items-center">
                    <img
                      className="w-[60px] h-[60px] object-cover"
                      src={item.imageUrl}
                      alt={item.title}
                    />
                    <p>{item.title}</p>
                  </div>
                </td>
                <td className="px-2 py-4 text-center whitespace-nowrap">
                  <p>{priceFormatingToRus(item.price)}₽</p>
                </td>
                <td className="px-2 py-4 text-center whitespace-nowrap">
                  <div className="flex gap-2 justify-center items-center">
                    <button
                      onClick={() => handleMinusCart(item.id)}
                      className="border border-black"
                    >
                      <BiMinus size={18} />
                    </button>
                    <div>{item.count}</div>
                    <button onClick={() => handleAddCart(item.id)} className="border border-black">
                      <BiPlus size={18} />
                    </button>
                  </div>
                </td>
                <td className="py-4 text-right whitespace-nowrap">
                  <div className="flex justify-end items-center gap-2">
                    <p>{priceFormatingToRus(item.totalCost)}₽</p>
                    <button onClick={() => handleDeleteItemCart(item.id)}>
                      <AiOutlineCloseCircle size={17} color="red" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className="mt-7 font-semibold text-2xl text-end">
        <p>
          Общая сумма: <span>{priceFormatingToRus(totalPrice)}₽</span>
        </p>
      </div>
      <div className="mt-7 text-end">
        <button className="rounded bg-orange-600 py-2 px-4 text-white hover:bg-orange-700">
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
