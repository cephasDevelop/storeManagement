import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./administrator.css";
import AdminNavBar from '../adminComponents/adminNavBar/AdminNavBar';
import AdminSideBar from '../adminComponents/AdminSideBar/AdminSideBar';
import AdminHome from '../adminPages/adminHome/AdminHome';
// import NewProduct from '../adminPages/NewProducts/NewProduct';
// import ProductList from '../adminPages/productList/ProductList';
// import Product from '../adminPages/product/Product';



const Administrator = () => {
  return (
    <>
      <AdminNavBar/>
      <div className='container'>
        <AdminSideBar/>
        {/* <div className="others"> */}
        <AdminHome />
        {/* <NewProduct />
        <ProductList />
        <Product /> */}
        {/* </div> */}
      </div>
    </>
  )
}

export default Administrator