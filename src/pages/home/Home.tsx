import { useEffect } from 'react';
import { useAppDispatch } from '../../redux/store';
import { getProducts } from '../../redux/slices/productsSlice/productsSlice';

import MySlider from '../../components/slider/MySlider';
import Filter from '../../components/filter/Filter';
import Products from '../../components/products/Products';

const Home = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getProducts());
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <MySlider />
      <div className="container md:max-w-full">
        <div className="flex gap-4 my-5">
          <div className="basis-1/4">
            <Filter />
          </div>
          <div className="basis-3/4">
            <Products />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
