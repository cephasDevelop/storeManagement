import React, {
  // useState,
  useEffect
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";

// import { individualPayments } from '../features/companySlice/productListSlice.js';
import { withdrawItems } from '../features/storePending/storePendingSlice.js';
import { getStorePendingItems } from '../features/storePending/storePendingSlice.js';

import AdminNavBar from "../adminComponents/adminNavBar/AdminNavBar";
import AdminSideBar from "../adminComponents/AdminSideBar/AdminSideBar";
import DialogComp from './DialogComp';

let user;

const Store = () => {

  const dispatch = useDispatch();
  
  const storeItems = useSelector(state => state.atStore.storePending);

  useEffect(() => {
    dispatch(getStorePendingItems());
  }, [dispatch]);

  useEffect(() => {
    user = JSON.parse(localStorage.getItem('profile'));
  }, []);

  // request => {clearedQty:'',storeFormNo:''}
  // changeStatus(idPassed, {request.requestQty, request.requestNumber}, { item });
  const makePayment = (idPassed, info, item) => {
    const outDate = new Date().toISOString();
    const storeObj = {
      id: idPassed,
      modelNo: item.modelNo,company: item.company,
      productType: item.productType,productBrand: item.productBrand,
      requestNumber:item.requestNumber,requestedBy: item.requestedBy,requestDate:item.requestDate,

      payerName: item.payerName,
      paymentProcessedBy:item.paymentProcessedBy,paymentType:item.paymentType,
      checkNo:item.checkNo,checkExpiresAt:item.checkExpiresAt,
      invoiceNo:item.invoiceNo,invoiceDate:item.invoiceDate,
      priceUsed: item.priceUsed,paidQty: item.paidQty,
      datePaid:item.datePaid,qtyToWithdraw: item.qtyToWithdraw,

      storeName: `${user.firstName} ${user.lastName}`,
      qtyOut: info.clearedQty,
      dateOut: outDate,
      storeFormNo: info.storeFormNo,
    };
    dispatch(withdrawItems({...storeObj }));
  }

  // COLUMNS FOR REQUESTED ITEMS
  const requestedColumns = [
    { field: "id", headerName: "ID", width: 15 },
    {
      field: "requestNo.", headerName: "requestNo.", width: 100,
      renderCell: (params) => {
        return (<div className="productListItem">{`${params.row.requestNumber}`}</div>);
      },
    },
    {
      field: "productType", headerName: "type", width: 70,
      renderCell: (params) => {
        return (<div className="productListItem">{`${params.row.productType}`}</div>);
      },
    },
    {
      field: "model", headerName: "model No.", width: 100,
      renderCell: (params) => {
        return (<div className="productListItem">{`${params.row.modelNo}`}</div>);
      },
    },
    
    {
      field: "company", headerName: "from", width: 80,
      renderCell: (params) => {
        return (<div className="productListItem" style={{ fontWeight:'bold'}}>{params.row.company }</div>);
      },
    },
    {
      field: "requestedBy", headerName: "requestedBy", width: 100,
      renderCell: (params) => {
        return (<p className="productListItem">{params.row.requestedBy}</p>);
      },
    },
    {
      field: "payerName", headerName: "payerName", width: 100,
      renderCell: (params) => {
        return (<p className="productListItem">{params.row.payerName}</p>);
      },
    },
    //------------------------------------------------------
    {
      field: "paidQty", headerName: "paidQty", width: 70,
      renderCell: (params) => {
        return (
          <p className="productListItem" style={{fontWeight:'bold',color:'red'}}>{params.row.paidQty}</p>
        );
      },
    },
    {
      field: "still-In-Store", headerName: "still-In-Store", width: 100,
      renderCell: (params) => {
        return (
          <p className="productListItem" style={{fontWeight:'bold',color:'green'}}>{params.row.qtyToWithdraw}</p>
        );
      },
    },
    {
      field: "action", headerName: "Action", width: 130,
      renderCell: (params) => {
        const propId = params.row._id;
        const requestedElement = params.row;
        return (
          <div>
              <DialogComp
                idPassed={propId}
                changeStatus={makePayment}
                item={requestedElement}
               ></DialogComp> 
          </div>
        );
      },
    },
  ];
  

  return (
    <>
      <AdminNavBar />
      <div className="adminProductList">
        <AdminSideBar />

        <div className="productList" style={{ height: "100vh" }}>
          <div className="productTitleContainer">
            <h2 className="productTitle">Active Items @ Store</h2>
          </div>
          <DataGrid
            style={{ height: '100vh' }}
            rows={storeItems.map((value, idx) => {
              let id = idx + 1;
              return { ...value, id };
            })}
            disableSelectionOnClick
            columns={requestedColumns}
            pageSize={3}
          />
        </div>
      </div>

    </>
  )
}


export default Store;
