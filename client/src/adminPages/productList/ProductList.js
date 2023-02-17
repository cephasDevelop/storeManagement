import "./productList.css";
import { DataGrid } from "@mui/x-data-grid";
// import { DeleteOutline } from "@mui/icons-material";
// import {CircularProgress,Box} from '@mui/material';


// import { productRows } from "../../dummyData";
import { Link } from "react-router-dom";
import {
  useEffect,
  // useState
} from "react";
import AdminNavBar from "../../adminComponents/adminNavBar/AdminNavBar";
import AdminSideBar from "../../adminComponents/AdminSideBar/AdminSideBar";
import { useDispatch, useSelector } from "react-redux";
// import { fetchItems } from "../../features/items/itemSlice";

// import { getKkgwItems } from '../../features/companySlice/kkgwSlice.js';
// import { getKmikedemItems } from '../../features/companySlice/kmikedemSlice.js';

import { getAllCompanyItems } from '../../features/companySlice/companySlice.js';

const ProductList = () => {
  const dispatch = useDispatch();

  // const items = useSelector(state => state.item.items);

  // const kkgwItems = useSelector(state => state.kkgwItem.kkgwItems);
  // const kkgwItemsLoading = useSelector(state => state.kkgwItem.loading);

  const companyItems = useSelector(state => {
    console.log('all Comapny Items @ selector = ',state.totalCompanyItems.allCompanyItems);
    return state.totalCompanyItems.allCompanyItems;
  });
  
  // kmikedemItemsLoading,kkgwItemsLoading
  // const [data, setData] = useState(items);
  // const [data, setData] = useState([...kkgwItems,...kmikedemItems]);

  useEffect(() => { 
    // dispatch(fetchItems());
    // dispatch(getKmikedemItems());
    // dispatch(getKkgwItems());

    dispatch(getAllCompanyItems());
    // if (kmikedemItems) {console.log("kmikedemItems useEffect= ",kmikedemItems) };
  },[dispatch]);



  // console.log("items ID is: ", items);


  // const handleDelete = (id) => {
  //   console.log('hadle delete clicked!');
  //   // setData(data.filter((item) => item.id !== id));
  // };

  const columns = [
    // { field: "id", headerName: "Product ID", width: 90 },
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
      field: "purchasePrice",
      headerName: "Purchased @ (ETB)",
      width: 100,
    },
    {
      field: "sellingPrice",
      headerName: "Selling @ (ETB)",
      width: 100,
    },
    {
      field: "retailPrice",
      headerName: "Retail @ (ETB)",
      width: 100,
    },
    {
      field: "qty",
      headerName: "Qty",
      width: 80,
    },
    // {
    //   field: "action",
    //   headerName: "Action",
    //   width: 150,
    //   renderCell: (params) => {
    //     return (
    //       <>
    //         <Link to={"/product/" + params.row._id}>
    //           <button className="productListEdit">Edit</button>
    //         </Link>
    //         <DeleteOutline
    //           className="productListDelete"
    //           onClick={() => handleDelete(params.row._id)}
    //         />
    //       </>
    //     );
    //   },
    // },
  ];

  return (
    <>
      <AdminNavBar />
      <div className="adminProductList">
        <AdminSideBar />         
      <div className="productList">
        <div className="productTitleContainer">
          <h1 className="productTitle">Products List</h1>
          <Link to="/newproduct">
            <button className="productAddButton">Add</button>
          </Link>
          </div>
          
            <DataGrid
                rows={companyItems.map((value,idx) => { 
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

export default ProductList