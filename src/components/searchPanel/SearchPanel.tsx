import { BsFillGrid3X3GapFill } from 'react-icons/bs';
import { FaThList } from 'react-icons/fa';
import Search from './search/Search';
import Sort from './sort/Sort';

import styles from './SearchPanel.module.css';

interface ISearchPanelProps {
  isGrid: boolean;
  setIsGrid: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchPanel = ({ isGrid, setIsGrid }: ISearchPanelProps) => {
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
    <div className="bg-white p-4 rounded shadow-white shadow flex items-center justify-between">
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
      </div>
      <Search />
      <Sort />
    </div>
  );
};

export default SearchPanel;
