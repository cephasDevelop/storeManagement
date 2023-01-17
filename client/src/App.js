import React from 'react';
import './App.css';

import { Routes, Route } from 'react-router-dom';

import Footer from './Footer/Footer.js';
import Home from './Home/Home.js';
import NavBar from './NavBar/NavBar.js';
import Form from './FormItem/FormItem.js';
import Login from './Login/Login.js';
import ShowData from './ShowData/ShowData';
import SignUp from './SignUp/SignUp';
import Administrator from './Administrator/Administrator.js';

function App() {
  return (
    <React.Fragment>
    <NavBar />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='admin' element={<Administrator />}/>
        <Route path='data-in' element={<Form />} />
        <Route path='login' element={<Login />} />
        <Route path='show-data' element={<ShowData />} />
        <Route path='signUp' element={ <SignUp/>}/>
      </Routes>
    <Footer />
    </React.Fragment>
  );
}

export default App;
