import { toast } from 'react-toastify';

const Cart = () => {
  return (
    <div className="container">
      <h1 className="uppercase font-semibold">Cart</h1>
      <button
        onClick={() => toast.success('Hello World!')}
        className="bg-orange-600 rounded px-2 py-1 mt-7"
      >
        Toast go!
      </button>
    </div>
  );
};

export default Cart;
