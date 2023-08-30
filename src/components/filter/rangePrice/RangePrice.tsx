import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { priceFormatingToRus } from '../../../utils/priceFormatingToRus';
import { selectMaxPrice, setMaxPrice } from '../../../redux/slices/filterSlice/filterSlice';

import styles from './RangePrice.module.css';

interface IRangePriceProps {
  isResetFilters: boolean;
  setIsResetFilters: React.Dispatch<React.SetStateAction<boolean>>;
}

const RangePrice = (props: IRangePriceProps) => {
  const { isResetFilters, setIsResetFilters } = props;
  const maxPrice = useSelector(selectMaxPrice);
  const [maxPriceValue, setMaxPriceValue] = useState(maxPrice);
  const [debouncePrice, setDebouncePrice] = useState(maxPrice);
  const [isChange, setIsChange] = useState(false);

  const dispatch = useDispatch();

  //to avoid a large number of requests.
  useEffect(() => {
    if (isChange) {
      setDebouncePrice(maxPriceValue);
    }
    setIsChange(false);
    // eslint-disable-next-line
  }, [isChange]);

  useEffect(() => {
    if (isResetFilters) {
      setMaxPriceValue(150000);
      setDebouncePrice(150000);
      setIsResetFilters(false);
    }
    // eslint-disable-next-line
  }, [isResetFilters]);

  useEffect(() => {
    dispatch(setMaxPrice(debouncePrice));
    // eslint-disable-next-line
  }, [debouncePrice]);

  return (
    <>
      <p>{priceFormatingToRus(maxPriceValue)}₽</p>
      <div className="mb-4">
        <input
          name="price"
          value={maxPriceValue}
          multiple
          onChange={(e) => setMaxPriceValue(+e.target.value)}
          onMouseUp={() => setIsChange(true)}
          onKeyUp={() => setIsChange(true)}
          type="range"
          min={0}
          max={150000}
          step={100}
          className={styles.price}
        />
      </div>
    </>
  );
};

export default RangePrice;