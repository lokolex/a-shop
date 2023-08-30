import Header from '../header/Header';
import { Outlet } from 'react-router-dom';
import Footer from '../footer/Footer';
import { ToastContainer } from 'react-toastify';

const MyLayout = (): JSX.Element => {
  return (
    <div className="relative min-h-screen overflow-hidden flex flex-col">
      <div className="flex-none">
        <Header />
      </div>
      <div className="grow">
        <Outlet />
      </div>
      <div className="flex-none">
        <Footer />
      </div>
      <ToastContainer autoClose={2000} theme="colored" position="top-left" />
    </div>
  );
};

export default MyLayout;
