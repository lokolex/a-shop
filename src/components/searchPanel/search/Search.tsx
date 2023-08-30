import { useEffect, useState } from 'react';
import { AiOutlineSearch, AiOutlineClose } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { selectSearchvalue, setSearchValue } from '../../../redux/slices/filterSlice/filterSlice';

const Search = () => {
  const search = useSelector(selectSearchvalue);
  const [inputValue, setValue] = useState(search);
  const [debounceValue, setDebounceValue] = useState(search);
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceValue(inputValue);
    }, 500);

    return () => clearTimeout(timer);
  }, [inputValue]);

  useEffect(() => {
    dispatch(setSearchValue(debounceValue));
    // eslint-disable-next-line
  }, [debounceValue]);

  return (
    <div className="relative">
      <input
        value={inputValue}
        onChange={(e) => setValue(e.target.value)}
        className="outline-none border-b-2 px-6 w-[300px]"
        type="text"
        placeholder="Поиск по товарам"
      />
      {inputValue && (
        <AiOutlineClose
          onClick={() => setValue('')}
          color="red"
          size={20}
          className="absolute top-1 right-0 cursor-pointer"
        />
      )}
      <AiOutlineSearch color="grey" size={20} className="absolute top-1 left-0" />
    </div>
  );
};

export default Search;
