import React,{useState,useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
// import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";

// import { fetchItems } from '../features/items/itemSlice.js';
import { deleteRequest,requestThis,getRequestedItems } from '../features/requestSlice/requestSlice.js';
import { getAllCompanyItems } from '../features/companySlice/companySlice.js'; 


import AdminNavBar from "../adminComponents/adminNavBar/AdminNavBar";
import AdminSideBar from "../adminComponents/AdminSideBar/AdminSideBar";


import DialogComp from './DialogComp';

const REQUEST = 'REQUEST';
const CANCEL = 'CANCEL';
let user;

const RequestUser = () => {

  const dispatch = useDispatch();
  // const items = useSelector(state => state.item.items);
  const bothCompanyItems = useSelector(state => state.totalCompanyItems.allCompanyItems);
  const requestedItems = useSelector(state => state.requested.requestedItems);

  const [comment,setComment] = useState(''); 

  useEffect(() => {
    user = JSON.parse(localStorage.getItem('profile'));
  },[]);

  useEffect(() => { 
    dispatch(getRequestedItems());
    dispatch(getAllCompanyItems()); 
  }, [dispatch]);

  const cancelRequest = (selfId,fromMongoId) => {
    dispatch(deleteRequest({selfId,fromMongoId}));
  };

  const makeRequest = (mongoId, requestQty,requestNumber,clientName, { item }) => {
    const date = new Date();
    // TO DO : correction shall be made to the requestedBy property //
    dispatch(requestThis({
      mongoId,

      modelNo: item.modelNo, productType: item.productType, productBrand: item.productBrand,
      qty: item.qty, image: item.image, company:item.company,
      purchasePrice: item.purchasePrice, sellingPrice: item.sellingPrice, retailPrice:item.retailPrice,
      storedDate: item.storedDate,

      clientName:clientName.toUpperCase(),
      requestNumber,
      requestQty,
      requestedBy: `${user.result.firstName} .${String((user.result.lastName)[0]).toUpperCase()}`,
      requestStatus: 'true',
      requestDate: date.toISOString(),
    
      paymentStatus:'pending',
      storeStatus: 'pending'
    }));
  };
  // COLUMNS FOR REQUESTED ITEMS
  const requestedColumns = [
    { field: "id", headerName: "ID", width: 10 },
    {
      field: "productType", headerName: "type", width: 80,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {`${params.row.productType}`}
          </div>
        );
      },
      },
    {
      field: "model", headerName: "model No.", width: 80,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {`${params.row.modelNo}`}
          </div>
        );
      },
    },
    {
      field: "company", headerName: "from.", width: 80,
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
    // {
    //   field: "reqStatus", headerName: "req.stat", width: 65,
    //   renderCell: (params) => {
    //     return (
    //           <div className="productListItem" style={{color:`${(params.row.requestStatus === 'true')?'red':'black'}`}}>
    //             {(!params.row.requestStatus === 'true')?'No':'Yes'}
    //           </div>
    //     );
    //   },
    //   },
    {
      field: "reqQty", headerName: "req.Qty", width: 60,
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
                {`${Number(params.row.retailPrice).toFixed(2)}`}
              </div>
        );
      },
    },
    {
      field: "action", headerName: "Action", width: 80,
      renderCell: (params) => {
        const propId = params.row._id;
        const requestedElement = params.row;
        return (
          <div>
            {params.row.paymentStatus !=="paid"?
              <DialogComp idPassed={propId} changeStatus={cancelRequest}
                status={CANCEL} comment={comment} setComment={setComment} item={requestedElement }
              ></DialogComp> :
              <p style={{color:'green'}}>paid</p>
            }
            
          </div>
              
        );
      },
    },
      {
      field: "time", headerName: "Requested Time", width: 130,
      renderCell: (params) => {
        return (
          <p className="productListItem" style={{color:'red'}}>
                {moment(params.row.requestDate).fromNow()}
          </p>
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
      field: "company", headerName: "from", width: 100,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {
              params.row.company === "KMikedem" ?
                <span style={{ fontWeight: "bold", color: "green" }}>{`${params.row.company}`}</span>
                :<span style={{ fontWeight: "bold", color: "blue" }}>{`${params.row.company}`}</span>
            }
          </div>
        );
      },
    },
    {
      field: "stock", headerName: "stock", width: 50,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {
              params.row.company === "KMikedem" ?
                <span style={{ fontWeight: "bold", color: "green" }}>{`${params.row.qty}`}</span>
                :<span style={{ fontWeight: "bold", color: "blue" }}>{`${params.row.qty}`}</span>
            }
          </div>
        );
      },
    },
    {
      field: "sellingPrice", headerName: "retailPrice", width: 100,
      renderCell: (params) => {
        return (
              <div className="productListItem">
                {`${Number(params.row.retailPrice).toFixed(2)}`}
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
            {params.row.department !== 'admin'&&// DEPARTMENT SHALL BE CONVERTED TO 'teller'
              <>
              <DialogComp idPassed={propId} changeStatus={makeRequest}
                status={REQUEST} comment={comment} item={item } itemRequested={requestedItems}
              ></DialogComp>
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
  );
}

export default RequestUser;
