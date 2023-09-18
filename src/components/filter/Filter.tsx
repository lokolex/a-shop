import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CategoriesProduct } from '../../redux/slices/productsSlice/types';
import {
  MAX_PRICE,
  selectBrands,
  selectCategoriesFilter,
  setBrands,
  setCategoriesFilter,
  setCurrentPage,
  setMaxPrice,
} from '../../redux/slices/filterSlice/filterSlice';

import styles from './Filter.module.css';
import RangePrice from './rangePrice/RangePrice';
import { EBrands } from '../../redux/slices/filterSlice/types';

type TCategoriesFilter = [
  CategoriesProduct.EMPTY,
  CategoriesProduct.PHONES,
  CategoriesProduct.GARMENT,
  CategoriesProduct.ELECTRONICS,
  CategoriesProduct.LAPTOPS
];

const categories = ['Все', 'Телефоны', 'Одежда', 'Электроника', 'Ноутбуки'];
const categoriesFilter: TCategoriesFilter = [
  CategoriesProduct.EMPTY,
  CategoriesProduct.PHONES,
  CategoriesProduct.GARMENT,
  CategoriesProduct.ELECTRONICS,
  CategoriesProduct.LAPTOPS,
];

interface IFilter {
  setIsShowFilter: React.Dispatch<React.SetStateAction<boolean>>;
}

const Filter = ({ setIsShowFilter }: IFilter) => {
  const category = useSelector(selectCategoriesFilter);
  const brandFilter = useSelector(selectBrands);
  const [index, setIndex] = useState(0);
  const [categoryActive, setCategoryActive] = useState(0);
  const [isResetFilters, setIsResetFilters] = useState(false);
  const [brand, setBrand] = useState(EBrands.ALL);
  const dispatch = useDispatch();

  useEffect(() => {
    setBrand(brandFilter);
  }, [brandFilter]);

  useEffect(() => {
    setIndex(categoriesFilter.indexOf(category));
    setCategoryActive(index);
  }, [category, index]);

  const handleClickOnCategory = (index: number) => {
    setCategoryActive(index);
    dispatch(setCategoriesFilter(categoriesFilter[index]));
    setIsShowFilter(false);
  };

  const handleChangeBrand = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setBrand(value as EBrands);
    dispatch(setBrands(value as EBrands));
    setIsShowFilter(false);
  };

  const resetFilters = () => {
    setIsResetFilters(true);
    setCategoryActive(0);
    setBrand(EBrands.ALL);
    dispatch(setCategoriesFilter(CategoriesProduct.EMPTY));
    dispatch(setCurrentPage(0));
    dispatch(setMaxPrice(MAX_PRICE));
    dispatch(setBrands(EBrands.ALL));
    setIsShowFilter(false);
  };

  return (
    <div className="bg-white w-3/4 p-4 rounded shadow-white shadow xl:w-[280px] xl:z-50">
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
        <select onChange={handleChangeBrand} value={brand} name="brand" className="border w-full">
          {Object.values(EBrands).map((value) => (
            <option key={value} value={value}>
              {value === 'All' ? 'Все' : value}
            </option>
          ))}
        </select>
      </div>
      <h4 className="text-lg font-semibold">Цена</h4>

      <RangePrice
        isResetFilters={isResetFilters}
        setIsResetFilters={setIsResetFilters}
        setIsShowFilter={setIsShowFilter}
      />

      <button onClick={resetFilters} type="button" className={`bg-danger ${styles.reset}`}>
        Сбросить всё
      </button>
    </div>
  );
};

export default Filter;
