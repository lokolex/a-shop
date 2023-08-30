import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../../axios';
import { IProduct } from '../../redux/slices/productsSlice/types';
import { priceFormatingToRus } from '../../utils/priceFormatingToRus';
import { BiArrowBack } from 'react-icons/bi';
import { AiOutlineMinusSquare, AiOutlinePlusSquare } from 'react-icons/ai';
import { MdOutlineAddShoppingCart } from 'react-icons/md';
import { shortText } from '../../utils/shortText';

import styles from './ProductPage.module.css';

const ProductPage = () => {
  const [isShortDescr, setIsShortDescr] = useState(true);
  const [product, setProduct] = useState<IProduct | null>(null);
  const { productId } = useParams();
  const navigate = useNavigate();

  const isLongDescr = product?.description && product?.description.length > 350;

  useEffect(() => {
    (async function () {
      try {
        const { data } = await axios.get(`/products/${productId}`);
        setProduct(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [productId]);

  const description = isShortDescr ? shortText(product?.description, 350) : product?.description;

  return (
    <div className={`container ${styles.main}`}>
      <div className="max-w-[480px]">
        <img className="w-full" src={product?.imageUrl} alt={product?.title} />
      </div>
      <div>
        <h2 className="font-semibold text-2xl text-gray-800">{product?.title}</h2>
        <h3 className="font-semibold text-2xl text-gray-800">{product?.brand}</h3>

        <p className="mt-2 text-gray-800">{description}</p>

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
        <button className={styles['button-to-cart']}>
          <MdOutlineAddShoppingCart className="inline-block" size={21} /> <span>В корзину</span>
        </button>
        <div className="flex items-center gap-1 mt-2">
          <AiOutlineMinusSquare className="cursor-pointer" size={21} />
          <span className="text-lg">0</span>
          <AiOutlinePlusSquare className="cursor-pointer" size={21} />
        </div>

        <button onClick={() => navigate(-1)} className={styles['button-back']}>
          <BiArrowBack className="inline-block mr-1" />
          <span>Назад</span>
        </button>
      </div>
    </div>
  );
};

export default ProductPage;
