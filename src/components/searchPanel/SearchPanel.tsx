import { BsFillGrid3X3GapFill } from 'react-icons/bs';
import { FaThList } from 'react-icons/fa';
import { MdFilterAlt } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { selectTotalProductCount } from '../../redux/slices/productsSlice/productsSlice';
import Search from './search/Search';
import Sort from './sort/Sort';

import styles from './SearchPanel.module.css';

interface ISearchPanelProps {
  isGrid: boolean;
  isShowFilter: boolean;
  setIsGrid: React.Dispatch<React.SetStateAction<boolean>>;
  setIsShowFilter: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchPanel = ({ isGrid, isShowFilter, setIsGrid, setIsShowFilter }: ISearchPanelProps) => {
  const totalProducts = useSelector(selectTotalProductCount);

  const handleClickOnGrid = () => {
    setIsGrid(true);
    const value = true;
    window.localStorage.setItem('isGrid', JSON.stringify(value));
  };

  const handleClickOnList = () => {
    setIsGrid(false);
    const value = false;
    window.localStorage.setItem('isGrid', JSON.stringify(value));
  };

  return (
    <div className="bg-white p-4 rounded shadow-white shadow flex items-center justify-between lg:flex-wrap lg:gap-3">
      <div className="flex items-center gap-3">
        <BsFillGrid3X3GapFill
          onClick={handleClickOnGrid}
          className={isGrid ? `${styles.icons} ${styles['icons-active']}` : styles.icons}
          size={18}
        />
        <FaThList
          onClick={handleClickOnList}
          className={isGrid ? styles.icons : `${styles.icons} ${styles['icons-active']}`}
          size={18}
        />
        <div className="text-gray-500">Всего товаров: {totalProducts}</div>
      </div>
      <Search />
      <div className="flex gap-2 items-center">
        <button className="hidden xl:block" onClick={() => setIsShowFilter(!isShowFilter)}>
          <MdFilterAlt size={30} color="#c2410c" />
        </button>
        <div className="text-gray-500 sm:hidden">Сортировка:</div>
        <Sort />
      </div>
    </div>
  );
};

export default SearchPanel;
