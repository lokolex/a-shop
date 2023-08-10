import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AiFillHome } from 'react-icons/ai';
import { FaShoppingCart } from 'react-icons/fa';
import { GiHamburgerMenu } from 'react-icons/gi';

import styles from './Header.module.css';

const Header = () => {
  const [isShow, setIsShow] = useState<boolean>(false);

  const handleHide = () => {
    setIsShow(false);
  };

  return (
    <div className="relative">
      <header className="bg-blue-950 py-5 relative">
        <div className="container">
          <div className={styles.wrapper}>
            <div className={styles.logo}>
              <Link to="/">
                <p className={styles['logo-text']}>
                  <span>a</span>-shop
                </p>
              </Link>
            </div>
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
              <p className="text-white">Привет, User</p>
              <nav>
                <ul className={styles['wrap-ul']}>
                  <li>
                    <NavLink onClick={handleHide} className={styles['wrap-ul-link']} to="/">
                      <AiFillHome className="text-2xl" />
                    </NavLink>
                  </li>
                  <li>
                    <NavLink onClick={handleHide} className={styles['wrap-ul-link']} to="/about">
                      О нас
                    </NavLink>
                  </li>
                  <li>
                    <NavLink onClick={handleHide} className={styles['wrap-ul-link']} to="/login">
                      Войти
                    </NavLink>
                  </li>
                  <li className="relative">
                    <NavLink onClick={handleHide} className={styles['wrap-ul-link']} to="/cart">
                      <FaShoppingCart className="text-2xl" />
                    </NavLink>
                    <div className={styles.badge}>
                      <span>0</span>
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
