import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import Home from '../pages/Home';
import ListingPage from '../pages/ListingPage';
import ProductDetail from '../pages/ProductDetail';

const App: React.FC = () => {
  return (
    <>
       <Sidebar />
      <Header />
   
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/listing" element={<ListingPage />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
