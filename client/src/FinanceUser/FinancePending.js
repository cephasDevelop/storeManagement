import React, {
  // useState,
  useEffect
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";

import { getPendingChecks } from '../features/checkPending/checkPendingSlice.js';

// import { individualPayments } from '../features/companySlice/productListSlice.js';
import { depositeCheck } from '../features/checkPending/checkPendingSlice.js';
import AdminNavBar from "../adminComponents/adminNavBar/AdminNavBar";
import AdminSideBar from "../adminComponents/AdminSideBar/AdminSideBar";
import DialogComp from './checkComp/DialogComp';

let user;

const FinancePending = () => {

  const dispatch = useDispatch();
  const checkItems = useSelector(state => state.check.checkPendings);

  useEffect(() => {
    dispatch(getPendingChecks());
  }, [dispatch]);

  useEffect(() => {
    user = JSON.parse(localStorage.getItem('profile'));
  }, []);

  const makePayment = (idPassed) => {
    console.log("dispatch to check recieved !! id = ", idPassed);
    dispatch(depositeCheck(idPassed));
  }


  // COLUMNS FOR CHECK PENDING ITEMS
  const columns = [
    { field: "id", headerName: "ID", width: 15 },
    {
      field: "productType", headerName: "Type", width: 70,
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
      field: "requestNo", headerName: "invoiceNo.", width: 100,
      renderCell: (params) => {
        return (<div className="productListItem" style={{ color:'red'}}>{`${params.row.invoiceNo}`}</div>);
      },
    },
    {
      field: "checkNo", headerName: "checkNo.", width: 100,
      renderCell: (params) => {
        return (<div className="productListItem" style={{ color:'red'}}>{`${params.row.checkNo}`}</div>);
      },
    },
    {
      field: "payerName", headerName: "payerName", width: 150,
      renderCell: (params) => {
        return (<div className="productListItem" style={{ fontWeight:'bold'}}>{params.row.payerName }</div>);
      },
    },
    {
      field: "amount", headerName: "Amount", width: 130,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {(Number(params.row.priceUsed) *Number(params.row.paidQty)).toFixed(2) }
          </div>
        );
      },
    },
    {
      field: "company", headerName: "From", width: 80,
      renderCell: (params) => {
        return (<div className="productListItem" style={{ color:'red'}} >{`${params.row.company}`}</div>);
      },
    },
    {
      field: "action", headerName: "Action", width: 100,
      renderCell: (params) => {
        const item = params.row;
        return (
          <div>
            {params.row.isDeposited === 'false' ?
              <DialogComp obj={item}
                deposited={makePayment}>
              </DialogComp> :
              <p style={{ color: 'green' }}>deposited</p>
            }
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
            <h2 className="productTitle">Pending Checks : <span style={{fontSize:".75em"}}>#{ checkItems.length}</span></h2>
          </div>
          <DataGrid
            style={{ height: '100vh' }}
            rows={checkItems.map((value, idx) => {
              let id = idx + 1;
              return { ...value, id };
            })}
            disableSelectionOnClick
            columns={columns}
            pageSize={3}

          // checkboxSelection
          />
          
        </div>
      </div>

    </>
  )
}
export default FinancePending;
