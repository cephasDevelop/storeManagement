import "./productList.css";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@mui/icons-material";
// import { productRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import AdminNavBar from "../../adminComponents/adminNavBar/AdminNavBar";
import AdminSideBar from "../../adminComponents/AdminSideBar/AdminSideBar";
import { useDispatch, useSelector } from "react-redux";
import { fetchItems } from "../../features/items/itemSlice";

const ProductList = () => {

  const items = useSelector(state => state.item.items);

  
  const [data, setData] = useState(items);

  const dispatch = useDispatch();
    useEffect(() => { 
        dispatch(fetchItems());
    },[dispatch]);



  // console.log("items ID is: ", items);


  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const columns = [
    { field: "id", headerName: "Product ID", width: 90 },
    {
      field: "product",
      headerName: "Product",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.image} alt="" />
            {params.row.productName}
          </div>
        );
      },
    },
    { field: "productType", headerName: "Product Type", width: 120 },
    { field: "modelNo", headerName: "Model No", width: 120 },
    {
      field: "purchasePrice",
      headerName: "Purchase Price (ETB)",
      width: 150,
    },
    {
      field: "sellingPrice",
      headerName: "Selling Price (ETB)",
      width: 150,
    },
    {
      field: "qty",
      headerName: "Quantity",
      width: 150,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/product/" + params.row.id}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
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
          <h1 className="productTitle">Products List</h1>
          <Link to="/newproduct">
            <button className="productAddButton">Add</button>
          </Link>
        </div>
        <DataGrid
          rows={items}
          disableSelectionOnClick
          columns={columns}
          pageSize={8}
          checkboxSelection
        />
      </div>
      </div>   
      
    </>
  );
}

export default ProductList