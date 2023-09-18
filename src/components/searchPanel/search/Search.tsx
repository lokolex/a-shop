import React, { useEffect, useState } from 'react';
import { AiOutlineSearch, AiOutlineClose } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { selectSearchvalue, setSearchValue } from '../../../redux/slices/filterSlice/filterSlice';

const Search = () => {
  const search = useSelector(selectSearchvalue);
  const [inputValue, setInputValue] = useState('');
  const [debounceValue, setDebounceValue] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    setInputValue(search);
  }, [search]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceValue(inputValue);
    }, 500);

    return () => clearTimeout(timer);
    // eslint-disable-next-line
  }, [inputValue]);

  useEffect(() => {
    if (search !== debounceValue) {
      dispatch(setSearchValue(debounceValue));
    }
    // eslint-disable-next-line
  }, [debounceValue]);

  return (
    <div className="relative">
      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="outline-none border-b-2 px-6 w-[300px] sm:w-[200px]"
        type="text"
        placeholder="Поиск по товарам"
      />
      {inputValue && (
        <AiOutlineClose
          onClick={() => setInputValue('')}
          color="red"
          size={20}
          className="absolute top-1 right-0 cursor-pointer"
        />
      )}
      <AiOutlineSearch color="grey" size={20} className="absolute top-1 left-0" />
    </div>
  );
};

export default React.memo(Search);
