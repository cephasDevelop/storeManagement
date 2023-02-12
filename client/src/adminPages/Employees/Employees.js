import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid } from "@mui/x-data-grid";

import UserAvatar from './UserAvatar';
import DialogComp from './DialogComp';
import "./employees.css";

import AdminNavBar from "../../adminComponents/adminNavBar/AdminNavBar";
import AdminSideBar from "../../adminComponents/AdminSideBar/AdminSideBar";
import { fetchUsers,updateUser, deleteUserInfo} from '../../features/userInfo/allUsersSlice';



const UPDATE = 'UPDATE';
const DELETE = 'DELETE';

const Employees = () => {
  const dispatch = useDispatch();

  const allUsers = useSelector(state => state.users.allUsers);
 
  useEffect(() => { 
      dispatch(fetchUsers());
  }, [dispatch,allUsers]);

  const handleDelete = (mongoId) => {
    console.log('TO:DO - Delete user accessed!,=id= ',mongoId);
    dispatch(deleteUserInfo({id:mongoId}));
  };

  const changeStatus = (mongoId) => { 
    const selectedUser = allUsers.filter((item) => item._id === mongoId)[0];
    if (selectedUser.active === 'true') {
      dispatch(updateUser({ id: mongoId, active: false }));
    } else { 
      dispatch(updateUser({ id: mongoId, active: true }));
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 20 },
    {
      field: "product", headerName: "Full Name", width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <UserAvatar name={`${params.row.firstName} ${params.row.lastName}`}/>&nbsp;&nbsp;
            {`${params.row.firstName} ${params.row.lastName}`}
          </div>
        );
      },
    },
    {
      field: "stock", headerName: "Dept", width: 50,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {`${params.row.department}`}
          </div>
        );
      },
    },
    {
      field: "company", headerName: "Company", width: 80,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {`${params.row.company}`}
          </div>
        );
      },
    },
    {
      field: "status", headerName: "Status", width: 60,
      renderCell: (params) => {
        return (
              <div className="productListItem" style={{color:`${params.row.active === 'true'?'black':'red'}`}}>
                {params.row.active === 'true'?'Active':'Suspended'}
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
        const propId = params.row._id;
        return (
          <>
            {params.row.department !== 'admin'&&
              <>
              <DialogComp idPassed={propId} changeStatus={changeStatus} status={ UPDATE}></DialogComp>
              <DialogComp idPassed={propId} handleDelete={handleDelete} status={ DELETE}></DialogComp>
              </>
            }
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
