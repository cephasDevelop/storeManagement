import AdminNavBar from "../../adminComponents/adminNavBar/AdminNavBar";
import AdminSideBar from "../../adminComponents/AdminSideBar/AdminSideBar";
import "./newProduct.css";
import FileBase from 'react-file-base64';

import { postItem } from '../../features/itemForm/itemFormSlice.js';
import { useDispatch } from 'react-redux';
import { useState } from "react";

const NewProduct = () => {
  const dispatch = useDispatch();

  const [postItems, setPostItems] = useState({
    productID:'', productType:'', productName:'', modelNo:'', description:'', purchasePrice:'', sellingPrice:'', qty:'', image:'', stock:""
  });
  

  const handleClear = () => { setPostItems({productID:'', productType:'', productName:'', modelNo:'', description:'', purchasePrice:'', sellingPrice:'', qty:'', image:'', stock: ''}) }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // alert(JSON.stringify(postItems));
    dispatch(postItem(postItems));
    handleClear();
  }

  return (
    <>
    <AdminNavBar />
    <div className="adminNewProduct">
      <AdminSideBar />
      <div className="productWrapper">
        <div className="newProduct">
        <h1 className="addProductTitle">New Product</h1>
        <form className="addProductForm" onSubmit={handleSubmit}>
          <div className="addProductItem">
            <label>Image</label>
            {/* <input type="file" id="file" value={postItems.image} onChange={(e) => setPostItems({ ...postItems, image: e.target.value })}/> */}
            <div><FileBase type='file' multiple={false} onDone={({ base64 }) => setPostItems({...postItems,image:base64})} /></div>
          </div>
          <div className="addProductItem">
            <label>Product ID</label>
            <input type="text" placeholder="Product ID..." value={postItems.productID} onChange={(e) => setPostItems({ ...postItems, productID: e.target.value })}/>
          </div>
          <div className="addProductItem">
            <label>Product Type</label>
            <input type="text" placeholder="Type of product..." value={postItems.productType} onChange={(e) => setPostItems({ ...postItems, productType: e.target.value })}/>
          </div>
          <div className="addProductItem">
            <label>Product Name</label>
            <input type="text" placeholder="Name of product..." value={postItems.productName} onChange={(e) => setPostItems({ ...postItems, productName: e.target.value })}/>
          </div>
          <div className="addProductItem">
            <label>Model Number</label>
            <input type="text" placeholder="Model No" value={postItems.modelNo} onChange={(e) => setPostItems({ ...postItems, modelNo: e.target.value })}/>
          </div>
          <div className="addProductItem">
            <label>Description</label>
            <textarea type="text" placeholder="Enter product description..." value={postItems.description} onChange={(e) => setPostItems({ ...postItems, description: e.target.value })}/>
          </div>
          <div className="addProductItem">
            <label>Purchase Price</label>
            <input type="text" placeholder="Price" value={postItems.purchasePrice} onChange={(e) => setPostItems({ ...postItems, purchasePrice: e.target.value })}/>
          </div>
          <div className="addProductItem">
            <label>Selling Price</label>
            <input type="text" placeholder="Price" value={postItems.sellingPrice} onChange={(e) => setPostItems({ ...postItems, sellingPrice: e.target.value })}/>
          </div>
          <div className="addProductItem">
            <label>Quantity</label>
            <input type="text" placeholder="123.." value={postItems.qty} onChange={(e) => setPostItems({ ...postItems, qty: e.target.value })}/>
          </div>
          <div className="addProductItem">
            <label>In Stock</label>
            <select name="active" id="active">
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          <button type="submit" className="addProductButton">Add</button>
        </form>
      </div>

      </div>
    </div>    
    </>
    
    
  );
}

export default NewProduct