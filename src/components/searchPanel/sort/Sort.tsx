import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectSort, setSort } from '../../../redux/slices/filterSlice/filterSlice';
import { ESortValue } from '../../../redux/slices/filterSlice/types';

const Sort = () => {
  const sort = useSelector(selectSort);
  const [selectValue, setSelectValue] = useState<string>('');
  const dispatch = useDispatch();

  useEffect(() => {
    setSelectValue(sort);
  }, [sort]);

  const onChangeSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (!value) {
      setSelectValue('');
      dispatch(setSort(''));
    } else {
      setSelectValue(value);
      dispatch(setSort(value));
    }
  };

  return (
    <select className="outline-0 border-b-2" onChange={onChangeSort} value={selectValue}>
      <option value={ESortValue.NEW}>Сначала новые</option>
      <option value={ESortValue.OLD}>Сначала старые</option>
      <option value={ESortValue.CHEAP}>Сначала дешёвые</option>
      <option value={ESortValue.COSTLY}>Сначала дорогие</option>
      <option value={ESortValue.CATEGORY_ASC}>Категории(A-Z)</option>
      <option value={ESortValue.CATEGORY_DESC}>Категории(Z-A)</option>
    </select>
  );
};

export default Sort;
