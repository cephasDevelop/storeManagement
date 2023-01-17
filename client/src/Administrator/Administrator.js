import React from 'react';
import "./administrator.css";
import AdminNavBar from "../AdminComponents/AdminNavBar/AdminNavBar.js";
import AdminSideBar from "../AdminComponents/AdminSideBar/AdminSideBar.js";


const Administrator = () => {
  return (
    <React.Fragment>
      <AdminNavBar/>
      <div className='container'>
        <AdminSideBar />
        <div className="others">
          Other pages
        </div>
      </div>
    </React.Fragment>
  )
}

export default Administrator