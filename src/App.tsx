import { Suspense, lazy, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAppDispatch } from './redux/store';
import { fetchAuthMe } from './redux/slices/authSlice/authSlice';
import { RingLoader } from 'react-spinners';

const MyLayout = lazy(() => import('./components/MyLayout/MyLayout'));
const Home = lazy(() => import('./pages/home/Home'));
const About = lazy(() => import('./pages/about/About'));
const Cart = lazy(() => import('./pages/cart/Cart'));
const PrivateRoute = lazy(() => import('./components/privateRoute/PrivateRoute'));
const Admin = lazy(() => import('./pages/admin/Admin'));
const ProductPage = lazy(() => import('./pages/productPage/ProductPage'));
const NewProduct = lazy(() => import('./pages/admin/newProduct/NewProduct'));
const Login = lazy(() => import('./pages/login/Login'));
const Register = lazy(() => import('./pages/register/Register'));
const NotFound = lazy(() => import('./pages/notFound/NotFound'));

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const userId = window.localStorage.getItem('userId');
    if (userId) {
      dispatch(fetchAuthMe(+userId));
    }
    // eslint-disable-next-line
  }, []);

  return (
    <Suspense
      fallback={
        <div className="relative h-screen">
          <RingLoader
            size={100}
            color="#c2410c"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          />
        </div>
      }
    >
      <Routes>
        <Route path="/" element={<MyLayout />}>
          <Route index path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart />} />
          <Route
            path="/admin"
            element={
              <PrivateRoute>
                <Admin />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/newProduct/:id"
            element={
              <PrivateRoute>
                <NewProduct />
              </PrivateRoute>
            }
          />
          <Route path="/products/:productId" element={<ProductPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
