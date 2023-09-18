import { useDispatch } from 'react-redux';
import { ISlider } from './assets/data-slider';
import {
  MAX_PRICE,
  setBrands,
  setCategoriesFilter,
  setMaxPrice,
  setSearchValue,
} from '../../redux/slices/filterSlice/filterSlice';

import styles from './MySlider.module.css';
import { EBrands } from '../../redux/slices/filterSlice/types';
import { CategoriesProduct } from '../../redux/slices/productsSlice/types';
import { useNavigate } from 'react-router-dom';

interface IMySliderItem extends ISlider {
  productsRef: React.RefObject<HTMLDivElement>;
}

const MySliderItem = (props: IMySliderItem) => {
  const { title, descr, imageURL, categories, brands, productsRef, id } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    if (categories) {
      dispatch(setBrands(EBrands.ALL));
      dispatch(setSearchValue(''));
      dispatch(setMaxPrice(MAX_PRICE));

      dispatch(setCategoriesFilter(categories));
    }

    if (brands) {
      dispatch(setCategoriesFilter(CategoriesProduct.EMPTY));
      dispatch(setSearchValue(''));
      dispatch(setMaxPrice(MAX_PRICE));

      dispatch(setBrands(brands));
    }

    if (id) {
      navigate(`products/${id}`);
    }

    if (productsRef && productsRef.current && (categories || brands)) {
      productsRef.current.scrollIntoView({ block: 'start', behavior: 'smooth' });
    }
  };

  return (
    <div className="w-screen relative mb-6">
      <div className="w-full">
        <img
          className="h-[500px] min-w-full object-cover md:h-[380px]"
          src={imageURL}
          alt={title}
        />
      </div>
      <div className={styles.card}>
        <h3 className="text-center font-bold text-2xl uppercase md:text-base">{title}</h3>
        <p className="mt-3 text-xl md:text-sm">{descr}</p>
        <div className="w-full flex justify-end mt-5">
          <button
            onClick={handleClick}
            className="bg-primary-600 rounded py-2 px-4 uppercase text-sm font-bold 
            hover:bg-primary-700"
          >
            Перейти
          </button>
        </div>
      </div>
    </div>
  );
};

export default MySliderItem;
