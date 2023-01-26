import React from 'react';
import './App.css';

import { Routes, Route } from 'react-router-dom';

// import Footer from './Footer/Footer.js';
import Home from './Home/Home.js';
import NavBar from './NavBar/NavBar.js';
import Form from './FormItem/FormItem.js';
import Login from './Login/Login.js';

import ShowData from './ShowData/ShowData.js';
import SignUp from './SignUp/SignUp.js';
// import Admin from './Admin/Admin.js';

// import Administrator from './Administrator/Administrator.js';
import AdminHome from './adminPages/adminHome/AdminHome';
import ProductList from './adminPages/productList/ProductList';
import NewProduct from './adminPages/NewProducts/NewProduct';
import Product from './adminPages/product/Product';
import Employees from './adminPages/Employees/Employees';
import NewEmployee from './adminPages/Employees/NewEmployee';
// import FormItem from './FormItem/FormItem.js';
import RequestUser from './RequestUser/RequestUser';
import FinanceUser from './FinanceUser/FinanceUser';

function App() {
  return (
    <div style={{minHeight:'100vh'}}>
    <NavBar />
      <Routes>
        <Route path='/' element={<Home />}/>
        {/* <Route path='admin' element={<Administrator />}/> */}
        <Route path='data-in' element={<Form />} />
        <Route path='login' element={<Login />} />
        <Route path='show-data' element={<ShowData />} />
        <Route path='signUp' element={ <SignUp/>}/>

        {/* <Route path='adminPage' element={ <Admin/>}/> */}

        <Route path='products' element={ <ProductList/>}/>
        <Route path='product/:productId' element={ <Product/>}/>
        <Route path='newProduct' element={ <NewProduct/>}/>

        <Route path="admin" element={<AdminHome />} />
        <Route path='admin/employees/newEmployee' element={ <NewEmployee/>}/>
        <Route path="admin/employees" element={<Employees />} />
        <Route path="request" element={<RequestUser />} />
        <Route path="finance" element={<FinanceUser />} />

      </Routes>
    {/* <Footer /> */}
    </div>
  );
}

export default App;
