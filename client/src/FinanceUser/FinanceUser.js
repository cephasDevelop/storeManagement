import React, {
  // useState,
  useEffect
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";

// import { fetchItems } from '../features/items/itemSlice.js';
import { getAllCompanyItems } from '../features/companySlice/companySlice.js'; 
import {
  getRequestedItems,
  // makingPayment
} from '../features/requestSlice/requestSlice.js';
import { individualPayments } from '../features/companySlice/productListSlice.js';
// import { makeHistory } from '../features/historySlice/historySlice.js';
import AdminNavBar from "../adminComponents/adminNavBar/AdminNavBar";
import AdminSideBar from "../adminComponents/AdminSideBar/AdminSideBar";
import DialogComp from './DialogComp';

let user;
const FinanceUser = () => {

  const dispatch = useDispatch();
  // const items = useSelector(state => state.item.items);
  // const requestedItems = useSelector(state => state.requested.requestedItems);

  const bothCompanyItems = useSelector(state => state.totalCompanyItems.allCompanyItems);
  const requestedItems = useSelector(state => state.requested.requestedItems);


  useEffect(() => {
    dispatch(getRequestedItems());
    dispatch(getAllCompanyItems());
  }, [dispatch]);

  useEffect(() => {
    user = JSON.parse(localStorage.getItem('profile'));
  }, []);

  const makePayment = (idPassed, paymentInfo, item) => {
    const paymentDate = new Date().toISOString();
    console.log("date of payment = ",paymentDate);

    const financeObj = {
      id: idPassed,
      payerName: paymentInfo.payerName,
      paymentType: paymentInfo.paymentType,
      invoiceNo: paymentInfo.invoiceNo,
      checkNo: paymentInfo.checkNo,
      priceUsed: paymentInfo.priceUsed,
      paidQty: paymentInfo.qtyPaid,
      paymentProcessedBy: paymentInfo.paymentProcessedBy,
      invoiceDate: paymentInfo.invoiceDate,
      amountRecieved: paymentInfo.amount,
      checkExpiresAt: paymentInfo.checkExpiresAt,
      paymentDate,
      paymentStatus: 'paid',
      storeStatus: 'pending'
    };
    // dispatch(makingPayment({ ...item, ...financeObj }));
    dispatch(individualPayments({ ...item, ...financeObj }));


    // dispatch(makeHistory({ ...obj}));  
  }

  // const storeHistory = (obj) => {
  //   dispatch(makeHistory({ ...obj}));
  // };


  // COLUMNS FOR REQUESTED ITEMS
  const requestedColumns = [
    { field: "id", headerName: "ID", width: 15 },
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
      field: "stock", headerName: "stock", width: 50,
      renderCell: (params) => {
        return (<div className="productListItem">{`${params.row.qty}`}</div>);
      },
    },
    {
      field: "company", headerName: "from", width: 80,
      renderCell: (params) => {
        return (<div className="productListItem" style={{ fontWeight:'bold'}}>{params.row.company }</div>);
      },
    },
    {
      field: "reqQty", headerName: "req.Qty", width: 80,
      renderCell: (params) => {
        return (
          <div className="productListItem" style={{ color: `${(params.row.requestStatus === 'pending') ? 'red' : 'black'}` }}>
            {params.row.requestQty}
          </div>
        );
      },
    },
    {
      field: "price", headerName: "price", width: 100,
      renderCell: (params) => {
        return (<div className="productListItem">{`${params.row.sellingPrice}`}</div>);
      },
    },
    {
      field: "action", headerName: "Action", width: 100,
      renderCell: (params) => {
        const propId = params.row._id;
        const requestedElement = params.row;
        return (
          <div>
            {params.row.paymentStatus === 'pending' ?
              <DialogComp idPassed={propId} changePaymentStatus={makePayment} item={requestedElement} user={user}
              ></DialogComp> :
              <p style={{ color: 'green' }}>paid</p>
            }
          </div>
        );
      },
    },
    {
      field: "requestedBy", headerName: "requestedBy", width: 100,
      renderCell: (params) => {
        return (<p className="productListItem">{params.row.requestedBy}</p>);
      },
    },
    {
      field: "clientName", headerName: "clientName", width: 100,
      renderCell: (params) => {
        return (<p className="productListItem">{params.row.clientName}</p>);
      },
    },
    //------------------------------------------------------
    {
      field: "paidQty", headerName: "paidQty", width: 70,
      renderCell: (params) => {
        return (
          <p className="productListItem" style={{ fontWeight: `${params.row.paidQty && 'bold'}` }}>
            {params.row.paidQty ? params.row.paidQty : 'pending'}
          </p>
        );
      },
    },
    {
      field: "payment", headerName: "payment", width: 70,
      renderCell: (params) => {
        return (
          <p className="productListItem" style={{ color: `${params.row.paymentStatus === 'paid' ? 'green' : 'red'}` }}>
            {params.row.paymentStatus !== 'paid' ? 'pending' : 'paid'}
          </p>
        );
      },
    },
    {
      field: "withdrawal", headerName: "withdrawal", width: 100,
      renderCell: (params) => {
        return (
          <p className="productListItem" style={{ color: `${params.row.storeStatus === 'out' ? 'green' : 'red'}` }}>
            {params.row.storeStatus !== '' ? 'pending' : 'out'}
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
      field: "model", headerName: "model No.", width: 100,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {`${params.row.modelNo}`}
          </div>
        );
      },
    },
    {
      field: "company", headerName: "company", width: 100,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {`${params.row.company}`}
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
      field: "sellingPrice", headerName: "sellingPrice", width: 100,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {`${params.row.sellingPrice}`}
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
            <h2 className="productTitle">Active Items</h2>
          </div>
          <DataGrid
            style={{ height: '50vh' }}
            rows={requestedItems.map((value, idx) => {
              let id = idx + 1;
              return { ...value, id };
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
            style={{ height: '60vh' }}
            rows={bothCompanyItems.map((value, idx) => {
              let id = idx + 1;
              return { ...value, id };
            })}
            disableSelectionOnClick
            columns={columns}
            pageSize={4}

          // checkboxSelection
          />
        </div>
      </div>

    </>
  )
}

export default FinanceUser;
