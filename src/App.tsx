import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import { useAppDispatch } from './redux/store';
import { fetchAuthMe } from './redux/slices/authSlice/authSlice';

import MyLayout from './components/MyLayout/MyLayout';
import Home from './pages/home/Home';
import About from './pages/about/About';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Cart from './pages/cart/Cart';
import Admin from './pages/admin/Admin';
import PrivateRoute from './components/privateRoute/PrivateRoute';
import NewProduct from './pages/admin/newProduct/NewProduct';
import NotFound from './pages/notFound/NotFound';

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
    <Routes>
      <Route path="/" element={<MyLayout />}>
        <Route index path="/" element={<Home />} />
        <Route index path="/about" element={<About />} />
        <Route index path="/login" element={<Login />} />
        <Route index path="/register" element={<Register />} />
        <Route index path="/cart" element={<Cart />} />
        <Route
          index
          path="/admin"
          element={
            <PrivateRoute>
              <Admin />
            </PrivateRoute>
          }
        />
        <Route
          index
          path="/admin/newProduct"
          element={
            <PrivateRoute>
              <NewProduct />
            </PrivateRoute>
          }
        />
        <Route index path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
