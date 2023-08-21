import { TEInput, TERipple } from 'tw-elements-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IFetchRegisterArgs, IDataAxios } from '../../redux/slices/authSlice/types';
import { fetchRegister, selectIsAuth } from '../../redux/slices/authSlice/authSlice';
import { useAppDispatch } from '../../redux/store';

import registerImg from './register-img.svg';

import styles from './Register.module.css';

const Register = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useAppDispatch();

  const handleSubmit = async (values: IFetchRegisterArgs) => {
    const data = await dispatch(fetchRegister(values));

    if (!data.payload) {
      return alert('Не удалось зарегистрироваться!');
    }

    if ('accessToken' in (data.payload as IDataAxios)) {
      window.localStorage.setItem('token', (data.payload as IDataAxios).accessToken);
      window.localStorage.setItem('userId', (data.payload as IDataAxios).user.id.toString());
    }
  };

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      avatarUrl: '',
    },

    validationSchema: Yup.object({
      firstName: Yup.string().min(2, 'Не менее 2 символов').required('Обязательное поле'),
      lastName: Yup.string().min(2, 'Не менее 2 символов').required('Обязательное поле'),
      email: Yup.string().email('Невалидный email').required('Обязательное поле'),
      password: Yup.string().min(6, 'Не менее 6 символов').required('Обязательное поле'),
      avatarUrl: Yup.string().url('Введите корректный URL'),
    }),
    onSubmit: (values, { resetForm }) => {
      handleSubmit(values);
      resetForm();
    },
  });

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <section className="my-10">
      <div className="container h-full px-6 py-5 lg:max-w-full">
        <div className="g-6 flex h-full flex-wrap items-center justify-center">
          {/* <!-- Left column container with background--> */}
          <div className="mb-12 w-7/12 md:w-10/12">
            <img src={registerImg} className="w-full" alt="Registration" />
          </div>

          {/* <!-- Right column container with form --> */}
          <div className="md:w-10/12 lg:ml-6 lg:w-5/12">
            <form onSubmit={formik.handleSubmit}>
              {/* Fist name input */}
              <TEInput
                type="text"
                name="firstName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.firstName}
                label="Имя*"
                size="lg"
                className="mb-6"
              ></TEInput>
              {formik.touched.firstName && formik.errors.firstName ? (
                <div className={styles.error}>{formik.errors.firstName}</div>
              ) : null}

              {/* Last name input */}
              <TEInput
                type="text"
                name="lastName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lastName}
                label="Фамилия*"
                size="lg"
                className="mb-6"
              ></TEInput>
              {formik.touched.lastName && formik.errors.lastName ? (
                <div className={styles.error}>{formik.errors.lastName}</div>
              ) : null}

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

              {/* URL avatar input */}
              <TEInput
                type="text"
                name="avatarUrl"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.avatarUrl}
                label="URL адрес avatar"
                size="lg"
                className="mb-6"
              ></TEInput>
              {formik.touched.avatarUrl && formik.errors.avatarUrl ? (
                <div className={styles.error}>{formik.errors.avatarUrl}</div>
              ) : null}

              {/* <!-- Submit button --> */}
              <TERipple rippleColor="light" className="w-full">
                <button type="submit" className={`bg-primary ${styles.button}`}>
                  Зарегистрироваться
                </button>
              </TERipple>
              {/* <!-- Login link --> */}
              <p className="mb-0 mt-2 pt-1 text-sm text-center font-semibold">
                У Вас уже есть аккаунт?{' '}
                <Link
                  to="/login"
                  className="text-danger transition duration-150 ease-in-out hover:text-danger-600 focus:text-danger-600 active:text-danger-700"
                >
                  Войти
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
