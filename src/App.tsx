import { Routes, Route } from 'react-router-dom';

import MyLayout from './components/MyLayout/MyLayout';
import Home from './pages/home/Home';
import About from './pages/about/About';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MyLayout />}>
        <Route index path="/" element={<Home />} />
        <Route index path="/about" element={<About />} />
      </Route>
    </Routes>
  );
}

export default App;
