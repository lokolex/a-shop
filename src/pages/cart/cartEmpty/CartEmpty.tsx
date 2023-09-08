import { useNavigate } from 'react-router-dom';
import cartEmptyImg from './cart-empty.png';

const CartEmpty = () => {
  const navigate = useNavigate();

  return (
    <div className="p-7 flex flex-col justify-center items-center gap-3">
      <img className="w-64" src={cartEmptyImg} alt="cart empty" />
      <h3 className="text-xl font-semibold">В корзине пока пусто</h3>
      <p>Загляните на главную, чтобы выбрать товары</p>
      <button
        onClick={() => navigate('/')}
        className="bg-orange-600 py-2 px-5 rounded text-white hover:bg-orange-700"
      >
        Перейти на главную
      </button>
    </div>
  );
};

export default CartEmpty;
