import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { priceFormatingToRus } from '../../../utils/priceFormatingToRus';
import {
  selectMaxPrice,
  setMaxPrice,
  MAX_PRICE,
  MIN_PRICE,
} from '../../../redux/slices/filterSlice/filterSlice';

import styles from './RangePrice.module.css';

interface IRangePriceProps {
  isResetFilters: boolean;
  setIsResetFilters: React.Dispatch<React.SetStateAction<boolean>>;
  setIsShowFilter: React.Dispatch<React.SetStateAction<boolean>>;
}

const RangePrice = (props: IRangePriceProps) => {
  const { isResetFilters, setIsResetFilters, setIsShowFilter } = props;
  const maxPrice = useSelector(selectMaxPrice);
  const [maxPriceValue, setMaxPriceValue] = useState(MAX_PRICE);
  const [isChange, setIsChange] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    setMaxPriceValue(maxPrice);
  }, [maxPrice]);

  useEffect(() => {
    if (isResetFilters) {
      setMaxPriceValue(MAX_PRICE);
      setIsResetFilters(false);
    }
    // eslint-disable-next-line
  }, [isResetFilters]);

  useEffect(() => {
    if (isChange) {
      dispatch(setMaxPrice(maxPriceValue));
      setIsShowFilter(false);
    }
    setIsChange(false);
    // eslint-disable-next-line
  }, [isChange]);

  return (
    <>
      <p>{priceFormatingToRus(maxPriceValue)}₽</p>
      <div className="mb-4">
        <input
          name="price"
          value={maxPriceValue}
          multiple
          onChange={(e) => setMaxPriceValue(+e.target.value)}
          onTouchEnd={() => setIsChange(true)}
          onTouchCancel={() => setIsChange(true)}
          onMouseUp={() => setIsChange(true)}
          onKeyUp={() => setIsChange(true)}
          type="range"
          min={MIN_PRICE}
          max={MAX_PRICE}
          step={100}
          className={styles.price}
        />
      </div>
    </>
  );
};

export default RangePrice;
