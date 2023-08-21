import { useState } from 'react';
import { priceFormatingToRus } from '../../utils/priceFormatingToRus';

import styles from './Filter.module.css';

const categories = ['Все', 'Телефоны', 'Одежда', 'Электроника', 'Ноутбуки'];

const Filter = () => {
  const [price, setPrice] = useState(150000);
  const [brand, setBrand] = useState('all');
  const [categoryActive, setCategoryActive] = useState(0);

  const resetFilters = () => {
    setCategoryActive(0);
    setPrice(150000);
    setBrand('all');
  };

  return (
    <div className="bg-white w-3/4 p-4 rounded shadow-white shadow mt-6">
      <h4 className="text-lg font-semibold">Категория</h4>
      <div className="mb-4">
        {categories.map((category, i) => (
          <button
            onClick={() => setCategoryActive(i)}
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
      <p>{priceFormatingToRus(price)}₽</p>
      <div className="mb-4">
        <input
          name="price"
          value={price}
          onChange={(e) => setPrice(+e.target.value)}
          type="range"
          min={100}
          max={150000}
          step={100}
          className={styles.price}
        />
      </div>
      <button onClick={resetFilters} type="button" className={`bg-danger ${styles.reset}`}>
        Сбросить всё
      </button>
    </div>
  );
};

export default Filter;
