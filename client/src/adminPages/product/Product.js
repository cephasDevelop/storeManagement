import { Link, useLocation } from "react-router-dom";
import "./product.css";
// import {productData} from "../../dummyData"
import { Publish } from "@mui/icons-material";
// import Chart from "../../adminComponents/adminChart/Chart";
import AdminNavBar from "../../adminComponents/adminNavBar/AdminNavBar";
import AdminSideBar from "../../adminComponents/AdminSideBar/AdminSideBar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchItems } from "../../features/items/itemSlice";

const Product = () => {

    const items = useSelector(state => state.item.items);  

    const dispatch = useDispatch();
    const location = useLocation();

    const currentId = location.pathname.split("/")[2];

    useEffect(() => { 
        dispatch(fetchItems());
    },[dispatch]);

    const handleEdit = (id) => {
       return items.filter((item) => item.id == id)

  };


    const datas = handleEdit(currentId);

//     console.log("items is: ", items);

//   console.log("data is: ", datas[0]);

  return (
    <>
        <AdminNavBar />
        <div className="adminProduct">
            <AdminSideBar />
        <div className="product">
            <div className="productTitleContainer">
                <h1 className="productTitle">Product</h1>
                <Link to="/newproduct">
                <button className="productAddButton">Create New Product</button>
                </Link>
            </div>
            <div className="productTop">
                <div className="productTopLeft">
                    {/* <Chart data={productData} dataKey="Sales" title="Sales Performance"/> */}
                    <div className="productInfoTop">
                        <span className="productName">Description</span>
                    </div>
                    <div className="productInfoBottom">
                        {datas[0].description ? datas[0].description : ""}
                    </div>
                    
                </div>
                <div className="productTopRight">
                    <div className="productInfoTop">
                        <img src={datas[0].image} alt="" className="productInfoImg" />
                        <span className="productName">{`${datas[0].productName} ${datas[0].productType}`}</span>
                    </div>
                    <div className="productInfoBottom">
                        <div className="productInfoItem">
                            <span className="productInfoKey">id:</span>
                            <span className="productInfoValue">{`${datas[0].id}`}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">Purchase Price (ETB):</span>
                            <span className="productInfoValue">{`${datas[0].purchasePrice}`}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">Selling Price (ETB):</span>
                            <span className="productInfoValue">{`${datas[0].sellingPrice}`}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">In stock:</span>
                            <span className="productInfoValue">{datas[0].qty ? "yes" : "no"}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="productBottom">
                <form className="productForm">
                    <div className="productFormLeft">
                        <label>Product Name</label>
                        <input type="text" placeholder={`${datas[0].productName}`} />
                        <label>Product Type</label>
                        <input type="text" placeholder={`${datas[0].productType}`} />
                        <label>Selling Price</label>
                        <input type="text" placeholder={`${datas[0].sellingPrice}`} />                        
                        <label>In Stock</label>
                        <select name="inStock" id="idStock">
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                        <label>Active</label>
                        <select name="active" id="active">
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                    </div>
                    <div className="productFormRight">
                        <div className="productUpload">
                            <img src={datas[0].image} alt="" className="productUploadImg" />
                            <label htmlFor="file">
                                <Publish/>
                            </label>
                            <input type="file" id="file" style={{display:"none"}} />
                        </div>
                        <button className="productButton">Update</button>
                    </div>
                </form>
            </div>
            </div>
                </div>
        
    </>
    
  );
}

export default Product