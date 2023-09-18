import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AiFillHome } from 'react-icons/ai';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { GiHamburgerMenu } from 'react-icons/gi';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectUser,
  logout,
  selectAuthStatus,
  selectIsAuth,
} from '../../redux/slices/authSlice/authSlice';
import { checkAdmin } from '../../utils/checkAdmin';
import { Status } from '../../redux/slices/authSlice/types';
import { BeatLoader } from 'react-spinners';
import {
  selectCartItems,
  selectTotalCount,
  selectTotalPrice,
} from '../../redux/slices/cartSlice/cartSlice';

import styles from './Header.module.css';

const Header = () => {
  const [isShow, setIsShow] = useState<boolean>(false);
  const user = useSelector(selectUser);
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const authStatus = useSelector(selectAuthStatus);
  const isLoading = authStatus === Status.LOADING;
  const totalCount = useSelector(selectTotalCount);
  const totalPrice = useSelector(selectTotalPrice);
  const cartItems = useSelector(selectCartItems);

  const isAdmin = checkAdmin(user?.email);

  useEffect(() => {
    const cartObj = { items: cartItems, totalCount, totalPrice };
    const json = JSON.stringify(cartObj);
    window.localStorage.setItem('cart', json);
  }, [cartItems, totalCount, totalPrice]);

  useEffect(() => {
    if (isShow) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isShow]);

  const handleHide = () => {
    setIsShow(false);
  };

  const handleLogout = () => {
    if (window.confirm('Вы действительно хотите выйти?')) {
      dispatch(logout());
      window.localStorage.removeItem('token');
      window.localStorage.removeItem('userId');
    }
  };

  const avatarIcon = user?.avatarUrl ? (
    <img src={user?.avatarUrl} className="w-7 rounded-full ml-2" alt={user?.firstName} />
  ) : (
    <div className="ml-2 rounded-full bg-white flex justify-center items-center p-1">
      <FaUser className="text-blue-950" />
    </div>
  );

  const userNameContent = (
    <span className="flex gap-1 items-center">
      Привет,
      {avatarIcon}
      {user?.firstName}
    </span>
  );

  return (
    <div className="relative">
      <header className="bg-blue-950 py-5 relative">
        <div className="container md:max-w-full">
          <div className={styles.wrapper}>
            <div className={styles.logo}>
              <Link to="/">
                <p className={styles['logo-text']}>
                  <span>a</span>-shop
                </p>
              </Link>
            </div>

            {isAdmin && (
              <Link to="/admin">
                <button
                  onClick={handleHide}
                  type="button"
                  className={`bg-info ${styles['admin-button']}`}
                >
                  Admin
                </button>
              </Link>
            )}

            <div className={styles.hamburger}>
              <GiHamburgerMenu
                onClick={() => {
                  setIsShow(true);
                }}
              />
            </div>
            <div
              className={
                isShow ? `${styles['wrap-right']} ${styles.show}` : `${styles['wrap-right']}`
              }
            >
              {<BeatLoader color="#c2410c" loading={isLoading} size={12} />}
              {isLoading ? null : (
                <div className="text-white">{user ? userNameContent : 'Привет, гость'}</div>
              )}

              <nav>
                <ul className={styles['wrap-ul']}>
                  <li>
                    <NavLink onClick={handleHide} className={styles['wrap-ul-link']} to="/">
                      <AiFillHome className="text-2xl" />
                    </NavLink>
                  </li>
                  {isAuth && (
                    <li>
                      <NavLink
                        onClick={handleHide}
                        className={styles['wrap-ul-link']}
                        to="/myOrders"
                      >
                        Мои заказы
                      </NavLink>
                    </li>
                  )}
                  <li>
                    {user ? (
                      <button
                        onClick={() => {
                          handleLogout();
                          handleHide();
                        }}
                        type="button"
                        className={`bg-danger ${styles['logout-button']}`}
                      >
                        Выйти
                      </button>
                    ) : (
                      <NavLink onClick={handleHide} className={styles['wrap-ul-link']} to="/login">
                        Войти
                      </NavLink>
                    )}
                  </li>
                  <li className="relative">
                    <NavLink onClick={handleHide} className={styles['wrap-ul-link']} to="/cart">
                      <FaShoppingCart className="text-2xl" />
                    </NavLink>
                    <div className={styles.badge}>
                      <span>{totalCount}</span>
                    </div>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </header>
      <div
        onClick={handleHide}
        className={isShow ? `${styles.overlay} ${styles['overlay-show']}` : `${styles.overlay}`}
      ></div>
    </div>
  );
};

export default Header;
