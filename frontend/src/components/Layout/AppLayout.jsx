import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../components/UI/Header';
import Footer from '../../components/UI/Footer';

const AppLayout = () => {
  return (
    <>
    <Header/>
    <Outlet/>
    <Footer/>
    </>
  );
};

export default AppLayout;