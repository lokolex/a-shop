import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectAuthStatus, selectIsAuth, selectUser } from '../../redux/slices/authSlice/authSlice';
import { Status } from '../../redux/slices/authSlice/types';
import { useAppDispatch } from '../../redux/store';
import {
  getOrders,
  selectOrders,
  selectOrdersStatus,
} from '../../redux/slices/ordersSlice/ordersSlice';
import { GridLoader } from 'react-spinners';
import { dateFormatingToRus } from '../../utils/dateFormatingToRus';
import { priceFormatingToRus } from '../../utils/priceFormatingToRus';

const About = () => {
  const isAuth = useSelector(selectIsAuth);
  const authStatus = useSelector(selectAuthStatus);
  const user = useSelector(selectUser);
  const orders = useSelector(selectOrders);
  const ordersStatus = useSelector(selectOrdersStatus);
  const isLoading = ordersStatus === Status.LOADING;
  const isError = ordersStatus === Status.ERROR;
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!user) return;
    dispatch(getOrders(user?.id));
    // eslint-disable-next-line
  }, [user]);

  if (authStatus !== Status.LOADING && !isAuth) {
    return <Navigate to="/" />;
  }

  const loadContent = isLoading && !isError && (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <GridLoader color="#c2410c" loading={isLoading} />
    </div>
  );

  const errorContent = isError && !isLoading && (
    <div className="text-center">Не удалось загрузить Ваши заказы</div>
  );

  const notOrders = !isError && !isLoading && authStatus !== Status.LOADING && !orders.length && (
    <h2 className="text-center mt-8 font-semibold text-xl">У Вас пока нет заказов!</h2>
  );

  const mainContent = !isError && !isLoading && (
    <div className="my-14">
      {authStatus !== Status.LOADING && !!orders.length && (
        <h1 className="mb-5 text-center text-xl font-bold uppercase">Мои заказы</h1>
      )}

      <ul>
        {orders.map((order) => (
          <li key={order.id} className="mb-3">
            <div
              className="w-1/2 my-0 mx-auto  block rounded-lg bg-white p-7 
              shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] 
              dark:bg-neutral-700 xl:w-2/3 lg:w-full"
            >
              <h2 className="font-semibold">Заказ №{order.id}</h2>
              <ol className="list-decimal pl-4">
                {order.items.map((item) => (
                  <li key={item.id}>
                    <div className="flex gap-3 text-sm sm:flex-wrap sm:gap-1 sm:justify-between">
                      <p className="basis-7/12 sm:basis-full">{item.title}</p>
                      <p className="basis-2/12 sm:basis-1/2">{item.count} шт.</p>
                      <p className="basis-3/12 text-end">{priceFormatingToRus(item.totalCost)}₽</p>
                    </div>
                  </li>
                ))}
              </ol>
              <div className="flex justify-between mt-4 gap-4 sm:flex-wrap sm:gap-1">
                <p className="italic">{dateFormatingToRus(order.createdAt)}</p>
                <p className="font-semibold uppercase">
                  Сумма заказа: {priceFormatingToRus(order.totalPrice)}₽
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <section className="container md:max-w-full">
      {notOrders}
      {loadContent}
      {errorContent}
      {mainContent}
    </section>
  );
};

export default About;
