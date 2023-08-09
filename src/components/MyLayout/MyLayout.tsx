import React from 'react';
import Header from '../header/Header';
import { Outlet } from 'react-router-dom';
import Footer from '../footer/Footer';

const MyLayout = () => {
  return (
    <>
      <Header />
      <div className="container px-3">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default MyLayout;
