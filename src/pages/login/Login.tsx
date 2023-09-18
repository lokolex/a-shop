import React from 'react';
import { TEInput, TERipple } from 'tw-elements-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, Navigate } from 'react-router-dom';
import { useAppDispatch } from '../../redux/store';
import { useSelector } from 'react-redux';
import { fetchLogin, selectAuthStatus, selectIsAuth } from '../../redux/slices/authSlice/authSlice';
import { IFetchLoginArgs, IDataAxios, Status } from '../../redux/slices/authSlice/types';

import loginImg from './login-img.webp';

import styles from './Login.module.css';
import Spinner from '../../components/UI/spinner/Spinner';

const Login = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useAppDispatch();
  const authStatus = useSelector(selectAuthStatus);
  const isStatus = authStatus === Status.LOADING;

  const handleSubmit = async (values: IFetchLoginArgs) => {
    const data = await dispatch(fetchLogin(values));

    if (!data.payload) {
      return;
    }

    if ('accessToken' in (data.payload as IDataAxios)) {
      window.localStorage.setItem('token', (data.payload as IDataAxios).accessToken);
      window.localStorage.setItem('userId', (data.payload as IDataAxios).user.id.toString());
    }
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },

    validationSchema: Yup.object({
      email: Yup.string().email('Невалидный email').required('Обязательное поле'),
      password: Yup.string().min(6, 'Введите не менее 6 символов').required('Обязательное поле'),
    }),
    onSubmit: (values, { resetForm }) => {
      handleSubmit(values);
      resetForm();
    },
  });

  if (isStatus) {
    return <Spinner />;
  }

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <section className="py-5">
      <div className="container lg:flex-wrap md:max-w-full">
        <div className="h-full">
          {/* <!-- Left column container with background--> */}
          <div className="gap-6 flex items-center justify-between md:flex-wrap lg:justify-center">
            <div className={styles['wrapper-img']}>
              <img src={loginImg} className="w-full" alt="Login" />
            </div>

            {/* <!-- Right column container --> */}
            <div className="basis-4/12 lg:basis-9/12">
              <form onSubmit={formik.handleSubmit}>
                {/* <!-- Email input --> */}
                <TEInput
                  type="email"
                  name="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  label="Email*"
                  size="lg"
                  className="mb-6"
                ></TEInput>
                {formik.touched.email && formik.errors.email ? (
                  <div className={styles.error}>{formik.errors.email}</div>
                ) : null}

                {/* <!--Password input--> */}
                <TEInput
                  type="password"
                  name="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  label="Password*"
                  className="mb-6"
                  size="lg"
                ></TEInput>
                {formik.touched.password && formik.errors.password ? (
                  <div className={styles.error}>{formik.errors.password}</div>
                ) : null}

                {/* <!-- Login button --> */}
                <div className="text-center lg:text-left">
                  <TERipple rippleColor="light" className="xl:w-full">
                    <button type="submit" className={`bg-primary ${styles['button-login']}`}>
                      Войти
                    </button>
                  </TERipple>

                  {/* <!-- Register link --> */}
                  <p className="mb-0 mt-2 pt-1 text-sm text-center font-semibold">
                    У Вас нет аккаунта?{' '}
                    <Link
                      to="/register"
                      className="text-danger transition duration-150 ease-in-out hover:text-danger-600 
                        focus:text-danger-600 active:text-danger-700 text-base"
                    >
                      Зарегистрироваться
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
