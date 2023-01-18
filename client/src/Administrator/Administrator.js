import React from 'react';
import "./administrator.css";
import AdminNavBar from '../adminComponents/adminNavBar/AdminNavBar';
import AdminSideBar from '../adminComponents/AdminSideBar/AdminSideBar';
import AdminHome from '../adminPages/adminHome/AdminHome';



const Administrator = () => {
  return (
    <React.Fragment>
      <AdminNavBar/>
      <div className='container'>
        <AdminSideBar/>
        <div className="others">
          <AdminHome />
        </div>
      </div>
    </React.Fragment>
  )
}

export default Administrator