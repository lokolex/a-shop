import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IProduct } from '../../redux/slices/productsSlice/types';
import { priceFormatingToRus } from '../../utils/priceFormatingToRus';
import { BiArrowBack } from 'react-icons/bi';
import { AiOutlineMinusSquare, AiOutlinePlusSquare } from 'react-icons/ai';
import { MdOutlineAddShoppingCart } from 'react-icons/md';
import { shortText } from '../../utils/shortText';
import { GridLoader } from 'react-spinners';
import { useSelector } from 'react-redux';
import {
  addItemCart,
  minusItemCart,
  selectCartItems,
} from '../../redux/slices/cartSlice/cartSlice';
import { useAppDispatch } from '../../redux/store';

import styles from './ProductPage.module.css';
import {
  getProduct,
  selectOneProduct,
  selectStatusOneProduct,
} from '../../redux/slices/oneProductSlice/oneProductSlice';
import { Status } from '../../redux/slices/authSlice/types';

const ProductPage = () => {
  const product = useSelector(selectOneProduct);
  const statusOneProduct = useSelector(selectStatusOneProduct);
  const isLoadingProduct = statusOneProduct === Status.LOADING;
  const isError = statusOneProduct === Status.ERROR;
  const [isShortDescr, setIsShortDescr] = useState(true);
  const { productId } = useParams();
  // const [isError, setIsError] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const cartItems = useSelector(selectCartItems);

  const cartItem = cartItems.find((item) => item.id === product?.id);

  const isLongDescr = product?.description && product?.description.length > 350;

  useEffect(() => {
    if (!productId) return;
    dispatch(getProduct(+productId));
    // eslint-disable-next-line
  }, [productId]);

  const handleAddCart = (item: IProduct | null) => {
    if (!item) return;
    dispatch(addItemCart(item));
  };

  const handleMinusCart = (id: number | undefined) => {
    if (!id || !cartItem) return;
    dispatch(minusItemCart(id));
  };

  const description = isShortDescr ? shortText(product?.description, 350) : product?.description;

  const errorContent = isError && !isLoadingProduct && (
    <div className="my-5 h-[calc(100vh-280px)] text-center">
      <h2 className="text-center text-2xl font-semibold text-gray-800">Продукт не найден</h2>
    </div>
  );

  //w-full h-screen flex items-center justify-center

  const loadContent = isLoadingProduct && !isError && (
    <div className="w-full h-[calc(100vh-240px)] flex items-center justify-center">
      <GridLoader color="#c2410c" loading={isLoadingProduct} />
    </div>
  );

  const mainContent = !isLoadingProduct && !isError && (
    <>
      <div className="max-w-[480px] md:max-w-[320px]">
        <img className="w-full" src={product?.imageUrl} alt={product?.title} />
      </div>
      <div>
        <h2 className="font-semibold text-2xl text-gray-800 sm:text-xl">{product?.title}</h2>
        <h3 className="font-semibold text-2xl text-gray-800 uppercase">{product?.brand}</h3>

        <p className="mt-2 text-gray-800 sm:text-sm">{description}</p>

        {isLongDescr && (
          <span
            onClick={() => setIsShortDescr(!isShortDescr)}
            className="cursor-pointer text-blue-600"
          >
            {isShortDescr ? 'Развернуть' : 'Свернуть'}
          </span>
        )}

        <h3 className="font-semibold text-xl text-gray-800 mt-5">
          {product ? priceFormatingToRus(product?.price) : ''}₽
        </h3>
        <button onClick={() => handleAddCart(product)} className={styles['button-to-cart']}>
          <MdOutlineAddShoppingCart className="inline-block" size={21} /> <span>В корзину</span>
        </button>
        {cartItem && cartItem?.count > 0 ? (
          <div className="flex items-center gap-1 mt-2">
            <button onClick={() => handleMinusCart(product?.id)}>
              <AiOutlineMinusSquare size={21} />
            </button>
            <span className="text-lg">{cartItem ? cartItem?.count : 0}</span>
            <button onClick={() => handleAddCart(product)}>
              <AiOutlinePlusSquare size={21} />
            </button>
          </div>
        ) : null}

        <button onClick={() => navigate(-1)} className={styles['button-back']}>
          <BiArrowBack className="inline-block mr-1" />
          <span>Назад</span>
        </button>
      </div>
    </>
  );

  return (
    <div className="bg-white">
      <div className="container md:max-w-full">
        <div className={styles.main}>
          {errorContent}
          {loadContent}
          {mainContent}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
