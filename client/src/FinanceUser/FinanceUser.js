import React, {
  // useState,
  useEffect
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";

import { fetchItems } from '../features/items/itemSlice.js';
import { getRequestedItems,makingPayment } from '../features/requestSlice/requestSlice.js';
import { makeHistory } from '../features/historySlice/historySlice.js';
import AdminNavBar from "../adminComponents/adminNavBar/AdminNavBar";
import AdminSideBar from "../adminComponents/AdminSideBar/AdminSideBar";
import DialogComp from './DialogComp';

let user;
const FinanceUser = () => {
    
    const dispatch = useDispatch();
    const items = useSelector(state => state.item.items);
    const requestedItems = useSelector(state => state.requested.requestedItems);

    // const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    useEffect(() => { 
        dispatch(getRequestedItems());
        dispatch(fetchItems());
    }, [dispatch]);

    useEffect(() => {
        user = JSON.parse(localStorage.getItem('profile'));
        
    }, []);
  
    const makePayment = (idPassed,paymentInfo,item) => { 
      // console.log('payment in progress ... ');
      // console.log('idPassed = ',idPassed);
      // console.log('paymentInfo = ',paymentInfo);
      // console.log('item = ', item);

      const financeObj = {
        id:idPassed,
        payerName: paymentInfo.payerName,
        paymentType: paymentInfo.paymentType,
        invoiceNo: paymentInfo.invoiceNo,
        checkNo: paymentInfo.checkNo,
        priceUsed: paymentInfo.priceUsed,
        paidQty: paymentInfo.qtyPaid,
        paymentProcessedBy: paymentInfo.paymentProcessedBy,
        invoiceDate: paymentInfo.invoiceDate,
        amountRecieved:paymentInfo.amount,
        checkExpiresAt: paymentInfo.checkExpiresAt,
        paymentStatus: 'paid',
        storeStatus:'pending'
      };
      dispatch(makeHistory({...item,...financeObj}));
      dispatch(makingPayment({...item,...financeObj}));
    }
    
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
      field: "price", headerName: "price", width: 100,
      renderCell: (params) => {
        return (
              <div className="productListItem">
                {`${Number(params.row.sellingPrice).toFixed(2)}`}
              </div>
        );
      },
    },
    {
      field: "action", headerName: "Action", width: 100,
      renderCell: (params) => {
        const propId = params.row._id;
        const requestedElement = params.row;
        return (
          <div>
            {params.row.paymentStatus!=='paid'?
              <DialogComp idPassed={propId} changePaymentStatus={makePayment} item={requestedElement } user={user}
              ></DialogComp> :
              <p style={{color:'green'}}>paid</p>
            }
            
            </div>
            //   params.row.paymentStatus!=='paid'?'pending':'paid'
              
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
    //------------------------------------------------------
    {
      field: "paidQty", headerName: "paidQty", width: 70,
      renderCell: (params) => {
        return (
          <p className="productListItem" style={{fontWeight:`${params.row.paidQty&&'bold'}`}}>
                {params.row.paidQty?params.row.paidQty:'pending'}
          </p>
        );
      },
    },
    {
      field: "payment", headerName: "payment", width: 70,
      renderCell: (params) => {
        return (
          <p className="productListItem" style={{color:`${params.row.paymentStatus==='paid'?'green':'red'}`}}>
                {params.row.paymentStatus!=='paid'?'pending':'paid'}
          </p>
        );
      },
    },
    {
      field: "withdrowal", headerName: "withdrowal", width: 100,
      renderCell: (params) => {
        return (
          <p className="productListItem" style={{color:`${params.row.storeStatus==='out'?'green':'red'}`}}>
                {params.row.storeStatus!==''?'pending':'out'}
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
      field: "sellingPrice", headerName: "sellingPrice", width: 100,
      renderCell: (params) => {
        return (
              <div className="productListItem">
                {`${Number(params.row.sellingPrice).toFixed(2)}`}
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
        
      <div className="productList"  style={{height:"100vh"}}>
        <div className="productTitleContainer">
            <h2 className="productTitle">Active Items</h2>
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
  )
}

export default FinanceUser;
