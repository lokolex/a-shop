import { Routes, Route } from 'react-router-dom';

import MyLayout from './components/MyLayout/MyLayout';
import Home from './pages/home/Home';
import About from './pages/about/About';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Cart from './pages/cart/Cart';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MyLayout />}>
        <Route index path="/" element={<Home />} />
        <Route index path="/about" element={<About />} />
        <Route index path="/login" element={<Login />} />
        <Route index path="/register" element={<Register />} />
        <Route index path="/cart" element={<Cart />} />
      </Route>
    </Routes>
  );
}

export default App;
