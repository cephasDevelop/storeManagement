import React from 'react'
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import "./employees.css";

import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@mui/icons-material";
import { productRows } from "../../dummyData";

import UserAvatar from './UserAvatar';
import AdminNavBar from "../../adminComponents/adminNavBar/AdminNavBar";
import AdminSideBar from "../../adminComponents/AdminSideBar/AdminSideBar";
import { fetchUsers } from '../../features/userInfo/allUsers';

const Employees = () => {
  const allUsers = useSelector(state => state.users.allUsers);
  console.log('Selector allUsers - ',allUsers);
  const dispatch = useDispatch();
  useEffect(() => { 
      dispatch(fetchUsers());
  }, [dispatch]);
  
  // const [data, setData] = useState(productRows);
  const [data, setData] = useState(allUsers);
  console.log('useState allUsers - ',data);


  const handleDelete = (mongoId,id) => {
    setData(allUsers.filter((item) => item.id !== id));
    // TO:DO dispatch delete
  };
  const changeStatus = (id) => { 
    // setData(data.map((item) => { 
    //   if (item.id === id) {
    //     return item.status === 'active' ? 'not-active' : "active";
    //   }
    // }))
  };

  const columns = [
    { field: "id", headerName: "ID", width: 20 },
    {
      field: "product", headerName: "Full Name", width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {/* <img className="productListImg" src={params.row.img} alt="" /> */}
            <UserAvatar name={`${params.row.firstName} ${params.row.lastName}`}/>&nbsp;&nbsp;
            {`${params.row.firstName} ${params.row.lastName}`}
          </div>
        );
      },
    },
    {
      field: "stock", headerName: "Department", width: 100,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {/* <img className="productListImg" src={params.row.img} alt="" /> */}
            {`${params.row.department}`}
          </div>
        );
      },
    },
    {
      field: "status", headerName: "Status", width: 100,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {params.row.active?'Active':'Suspended'}
          </div>
        );
      },
    },
    {
      field: "email", headerName: "Email", width: 200,
      renderCell: (params) => {
        return (
          <p className="productListItem">
            {params.row.email}
          </p>
        );
      },
    },
    {
      field: "action", headerName: "Action", width: 200,
      renderCell: (params) => {
        return (
          <>
            <button className="productListEdit" onClick={()=>changeStatus(params.row._id) }>Change Status</button>
            <DeleteOutline className="productListDelete" onClick={() => handleDelete(params.row._id,params.row.id)}/>
          </>
        );
      },
    },
  ];

  return (
    <>
      <AdminNavBar />
      <div className="adminProductList">
        <AdminSideBar />       
        
      <div className="productList">
        <div className="productTitleContainer">
          <h2 className="productTitle">Users' List</h2>
          <Link to="newEmployee">
            <button className="productAddButton">Create New User</button>
          </Link>
        </div>
        <DataGrid
            rows={allUsers.map((value,idx) => { 
              let id = idx + 1;
              return {...value,id};
            })}
          disableSelectionOnClick
          columns={columns}
          pageSize={5}
          // checkboxSelection
        />
      </div>
      </div>   
      
    </>
  );
}

export default Employees;
