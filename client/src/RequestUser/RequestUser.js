import React,{useState,useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";

import { fetchItems } from '../features/items/itemSlice.js';
import { deleteRequest,requestThis,getRequestedItems } from '../features/requestSlice/requestSlice.js';

import AdminNavBar from "../adminComponents/adminNavBar/AdminNavBar";
import AdminSideBar from "../adminComponents/AdminSideBar/AdminSideBar";


import DialogComp from './DialogComp';

// import { fetchUsers, updateUser, deleteUserInfo } from '../../features/userInfo/allUsersSlice';


const REQUEST = 'REQUEST';
const CANCEL = 'CANCEL';

const RequestUser = () => {

  const dispatch = useDispatch();
  const items = useSelector(state => state.item.items);
  const requestedItems = useSelector(state => state.requested.requestedItems);

  const [comment,setComment] = useState(''); 
 
  useEffect(() => { 
    dispatch(getRequestedItems());
    dispatch(fetchItems());
  }, [dispatch,items]);

  
  
  const cancelRequest = (selfId,fromMongoId) => {
    dispatch(deleteRequest({selfId,fromMongoId}));
  };

  const makeRequest = (mongoId, requestQty,clientName, { item }) => {
    const date = new Date();
    // TO DO : correction shall be made to the requestedBy property //
    dispatch(requestThis({
      mongoId, requestQty, requestStatus: 'true',
      requestedBy: '', requestDate: date.toISOString(),
      modelNo: item.modelNo, purchasePrice: item.purchasePrice,
      sellingPrice: item.sellingPrice, storeQty: item.qty,
      productType: item.productType, productName: item.productName,
      productId:item.productId,clientName,storedDate:item.storedDate
    }));
  };
  // COLUMNS FOR REQUESTED ITEMS
  const requestedColumns = [
    { field: "id", headerName: "ID", width: 15 },
    {
      field: "product type", headerName: "type", width: 70,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {`${params.row.productType}`}
          </div>
        );
      },
      },
    {
      field: "model", headerName: "model No.", width: 130,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {`${params.row.modelNo}`}
          </div>
        );
      },
    },
    {
      field: "stock", headerName: "stock", width: 50,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {`${params.row.storeQty}`}
          </div>
        );
      },
    },
    {
      field: "reqStatus", headerName: "requested", width: 80,
      renderCell: (params) => {
        return (
              <div className="productListItem" style={{color:`${(params.row.requestStatus === 'true')?'red':'black'}`}}>
                {(!params.row.requestStatus === 'true')?'No':'Yes'}
              </div>
        );
      },
      },
    {
      field: "reqQty", headerName: "req.Qty", width: 80,
      renderCell: (params) => {
        return (
              <div className="productListItem" style={{color:`${(params.row.requestStatus === 'true')?'red':'black'}`}}>
                {params.row.requestQty}
              </div>
        );
      },
    },
    {
      field: "action", headerName: "Action", width: 200,
      renderCell: (params) => {
        const propId = params.row._id;
        const requestedElement = params.row;
        return (
              <DialogComp idPassed={propId} changeStatus={cancelRequest}
                status={CANCEL} comment={comment} setComment={setComment} item={requestedElement }
              ></DialogComp>
        );
      },
      },
    {
      field: "requestedBy", headerName: "requestedBy", width: 100,
      renderCell: (params) => {
        return (
          <p className="productListItem">
                {params.row.requestedBy}
          </p>
        );
      },
    },
    {
      field: "clientName", headerName: "clientName", width: 100,
      renderCell: (params) => {
        return (
          <p className="productListItem">
                {params.row.clientName}
          </p>
        );
      },
    },
  ];
  // COLUMNS FOR WHOLE ITEMS
  const columns = [
    { field: "id", headerName: "ID", width: 15 },
    {
      field: "product type", headerName: "type", width: 70,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {`${params.row.productType}`}
          </div>
        );
      },
      },
    {
      field: "model", headerName: "model No.", width: 130,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {`${params.row.modelNo}`}
          </div>
        );
      },
    },
    {
      field: "stock", headerName: "stock", width: 50,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {`${params.row.qty}`}
          </div>
        );
      },
    },
    {
      field: "action", headerName: "Action", width: 200,
      renderCell: (params) => {
        const propId = params.row._id;
        const item = params.row;
        return (
          <>
            {params.row.department !== 'admin'&&
              <>
              <DialogComp idPassed={propId} changeStatus={makeRequest}
                status={REQUEST} comment={comment} setComment={setComment} item={item }
              ></DialogComp>
              {/* <DialogComp idPassed={propId} handleDelete={cancelRequest}
                status={CANCEL}
              ></DialogComp> */}
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
        
      <div className="productList"  style={{height:"100vh"}}>
        <div className="productTitleContainer">
            <h2 className="productTitle">Requested Items</h2>
          {/* <Link to="newEmployee">
            <button className="productAddButton">Create New User</button>
          </Link> */}
          </div>
          <DataGrid
            style={{height:'50vh'}}
            rows={requestedItems.map((value,idx) => { 
              let id = idx + 1;
              return {...value,id};
            })}
          disableSelectionOnClick
          columns={requestedColumns}
          pageSize={3}
          // checkboxSelection
          />
          <div className="productTitleContainer">
            <h2 className="productTitle">Items list</h2>
          </div>
          <DataGrid
            style={{height:'60vh'}}
            rows={items.map((value,idx) => { 
              let id = idx + 1;
              return {...value,id};
            })}
          disableSelectionOnClick
          columns={columns}
          pageSize={4}
          // checkboxSelection
        />
      </div>
      </div>   
      
    </>
  );
}

export default RequestUser;
