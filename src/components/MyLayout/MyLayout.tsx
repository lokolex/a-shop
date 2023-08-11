import React from 'react';
import Header from '../header/Header';
import { Outlet } from 'react-router-dom';
import Footer from '../footer/Footer';

const MyLayout = (): JSX.Element => {
  return (
    <div className="min-h-screen overflow-hidden flex flex-col">
      <div className="flex-none">
        <Header />
      </div>
      <div className="grow">
        <Outlet />
      </div>
      <div className="flex-none">
        <Footer />
      </div>
    </div>
  );
};

export default MyLayout;
