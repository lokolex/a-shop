import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { store } from './redux/store';
import App from './App';

import 'tw-elements-react/dist/css/tw-elements-react.min.css';
import './components/slider/assets/slick-slider/css/slick.css';
import './components/slider/assets/slick-slider/css/slick-theme.css';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <BrowserRouter basename="/ashop">
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
