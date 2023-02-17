import { DataGrid } from "@mui/x-data-grid";
import moment from 'moment';
import { Link } from "react-router-dom";
import {
  useEffect,
  // useState
} from "react";
import AdminNavBar from "../../adminComponents/adminNavBar/AdminNavBar";
import AdminSideBar from "../../adminComponents/AdminSideBar/AdminSideBar";
import { useDispatch, useSelector } from "react-redux";
import DialogComp from './DialogComp.js';

import { getListOfPurchasedProducts, deletePurchasedProduct } from '../../features/companySlice/productListSlice.js';
const EditProducts = () => {
  const dispatch = useDispatch();

    const purchasedProducts = useSelector(state=>state.purchasedProductsList.allProductsList);
  
  useEffect(() => {       
      dispatch(getListOfPurchasedProducts());  
  },[dispatch]);


  const handleDelete = (obj) => {
    // note mongodb id = _id
    console.log('hadle delete clicked!');
    const deleteParameters = {
      modelNo: obj.modelNo,
      company: obj.company,
      qty: obj.qty,
      id: obj._id
    };
    dispatch(deletePurchasedProduct({...deleteParameters}));
  };

  const columns = [
    { field: "id", headerName: "ID", width: 15 },
    {
      field: "product",
      headerName: "Product",
      width: 120,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.image} alt={`${params.row.productType}`} />
            {params.row.productType}
          </div>
        );
      },
    },
    { field: "modelNo", headerName: "Model No", width: 80 },
    { field: "company", headerName: "From", width: 100 },
    {
      field: "storedDate", headerName: "Date", width: 160,
      renderCell: (params) => {
        return (
          <div className="productListItem">{moment(params.row.storedDate).calendar()}</div>
        );
      },
    },
    {
      field: "purchasePrice",
      headerName: "Purchased P.",
      width: 100,
    },
    {
      field: "sellingPrice",
      headerName: "Selling P.",
      width: 100,
    },
    {
      field: "retailPrice",
      headerName: "Retail P.",
      width: 100,
    },
    {
      field: "qty",
      headerName: "Qty",
      width: 60,
    },
    {
      field: "action",
      headerName: "Action",
      width: 100,
      renderCell: (params) => {
        return (
          <>
            
            <Link to={"/product/" + params.row._id}>
              <button className="productListEdit">Edit</button>
            </Link>
            {/* <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row)}
            /> */}
            <DialogComp handleDelete={handleDelete} item={params.row}></DialogComp>
            
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
          <h1 className="productTitle">Purchased Product List</h1>
          {/* <Link to="/newproduct">
            <button className="productAddButton">Add</button>
          </Link> */}
          </div>
          
            <DataGrid
                rows={purchasedProducts.map((value,idx) => { 
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

export default EditProducts;
