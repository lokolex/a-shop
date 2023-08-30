import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CategoriesProduct } from '../../redux/slices/productsSlice/types';
import {
  selectCategoriesFilter,
  setCategoriesFilter,
  setCurrentPage,
  setMaxPrice,
} from '../../redux/slices/filterSlice/filterSlice';

import styles from './Filter.module.css';
import RangePrice from './rangePrice/RangePrice';

type TCategoriesFilter = [
  CategoriesProduct.EMPTY,
  CategoriesProduct.PHONES,
  CategoriesProduct.GARMENT,
  CategoriesProduct.ELECTRONICS,
  CategoriesProduct.LAPTOPS
];

const categories = ['Все', 'Телефоны', 'Одежда', 'Электроника', 'Ноутбуки'];
const categotiesFilter: TCategoriesFilter = [
  CategoriesProduct.EMPTY,
  CategoriesProduct.PHONES,
  CategoriesProduct.GARMENT,
  CategoriesProduct.ELECTRONICS,
  CategoriesProduct.LAPTOPS,
];

const Filter = () => {
  const [brand, setBrand] = useState('all');
  const category = useSelector(selectCategoriesFilter);
  const index = categotiesFilter.indexOf(category);
  const [categoryActive, setCategoryActive] = useState(index);
  const [isResetFilters, setIsResetFilters] = useState(false);
  const dispatch = useDispatch();

  const handleClickOnCategory = (index: number) => {
    setCategoryActive(index);
    dispatch(setCategoriesFilter(categotiesFilter[index]));
  };

  const resetFilters = () => {
    setIsResetFilters(true);
    setCategoryActive(0);
    setBrand('all');
    dispatch(setCategoriesFilter(CategoriesProduct.EMPTY));
    dispatch(setCurrentPage(0));
    dispatch(setMaxPrice(150000));
  };

  return (
    <div className="bg-white w-3/4 p-4 rounded shadow-white shadow">
      <h4 className="text-lg font-semibold">Категория</h4>
      <div className="mb-4">
        {categories.map((category, i) => (
          <button
            onClick={() => handleClickOnCategory(i)}
            key={category}
            className={
              categoryActive === i
                ? `${styles.category} ${styles['category-active']}`
                : styles.category
            }
          >
            {category}
          </button>
        ))}
      </div>
      <h4 className="text-lg font-semibold">Брэнд</h4>
      <div className="mb-4">
        <select
          onChange={(e) => setBrand(e.target.value)}
          value={brand}
          name="brand"
          className="border w-full"
        >
          <option value="all">Все</option>
          <option value="apple">Apple</option>
          <option value="lenovo">Lenovo</option>
          <option value="toshiba">Toshiba</option>
        </select>
      </div>
      <h4 className="text-lg font-semibold">Цена</h4>

      <RangePrice isResetFilters={isResetFilters} setIsResetFilters={setIsResetFilters} />

      <button onClick={resetFilters} type="button" className={`bg-danger ${styles.reset}`}>
        Сбросить всё
      </button>
    </div>
  );
};

export default Filter;
