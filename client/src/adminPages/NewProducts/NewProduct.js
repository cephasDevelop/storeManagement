import AdminNavBar from "../../adminComponents/adminNavBar/AdminNavBar";
import AdminSideBar from "../../adminComponents/AdminSideBar/AdminSideBar";
import "./newProduct.css";
import FileBase from 'react-file-base64';

import { purchasedItem} from '../../features/itemForm/itemFormSlice.js';
import { postKMikedem} from '../../features/companySlice/kmikedemSlice.js';
import { postKKGW} from '../../features/companySlice/kkgwSlice.js';
import { postItem } from '../../features/itemForm/itemFormSlice.js';

import { useDispatch } from 'react-redux';
import { useState } from "react";

const NewProduct = () => {
  const dispatch = useDispatch();

  const [postItems, setPostItems] = useState({
    modelNo: '', productType: '', productBrand: '',
    qty: '', description: '', image: '', company:'',
    purchasePrice: '', sellingPrice: '', retailPrice: '',
  });
  
  const handleClear = () => {
    setPostItems({
      modelNo: '', productType: '', productBrand: '',
      qty: '', description: '', image: '', company:'',
      purchasePrice: '', sellingPrice: '', retailPrice: '',
    })
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const storedDate = new Date().toISOString();
    const dataToDispatch = {
      ...postItems, storedDate,
      purchasePrice:String(Number(postItems.purchasePrice).toFixed(2)),
      sellingPrice:String(Number(postItems.sellingPrice).toFixed(2)),
      retailPrice: String(Number(postItems.retailPrice).toFixed(2))
    };

    
    if (postItems.company === 'KMikedem') { 
      //dispatch to KMikedem
      dispatch(postKMikedem({...dataToDispatch}));
    };
    
    if (postItems.company === 'KKGW') { 
      // dispatch to KKGW
      dispatch(postKKGW({...dataToDispatch}));
    };

    dispatch(postItem({...dataToDispatch}));
    dispatch(purchasedItem({...dataToDispatch}));
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
            <label>Model No.</label>
            <input type="text" placeholder="Model No." required value={postItems.modelNo} onChange={(e) => setPostItems({ ...postItems, modelNo: (e.target.value).toUpperCase() })}/>
          </div>
          <div className="addProductItem">
            <label>Product Type</label>
            <input type="text" placeholder="Type of product..." value={postItems.productType} onChange={(e) => setPostItems({ ...postItems, productType: (e.target.value).toUpperCase() })}/>
          </div>
          <div className="addProductItem">
            <label>Brand</label>
            <input type="text" placeholder="Product Brand..." value={postItems.productBrand} onChange={(e) => setPostItems({ ...postItems, productBrand: (e.target.value).toUpperCase() })}/>
          </div>
          <div className="addProductItem">
            <label>Company</label>
               <select type="text" placeholder="Model No" value={postItems.company} onChange={(e) => setPostItems({ ...postItems, company: e.target.value })}>
                <option value=''>Select Company</option>  
                <option value='KMikedem'>KMikedem</option>  
                <option value='KKGW'>KKGW</option>  
               </select>
          </div>
              
          <div className="addProductItem">
            <label>Description</label>
            <textarea type="text" placeholder="Enter product description..." value={postItems.description} onChange={(e) => setPostItems({ ...postItems, description: e.target.value })}/>
          </div>
          <div className="addProductItem">
            <label>Purchase Price</label>
            <input type="text" placeholder="Purchase Price" value={postItems.purchasePrice} onChange={(e) => setPostItems({ ...postItems, purchasePrice: e.target.value })}/>
          </div>
          <div className="addProductItem">
            <label>Selling Price</label>
            <input type="text" placeholder="Selling Price" value={postItems.sellingPrice} onChange={(e) => setPostItems({ ...postItems, sellingPrice: e.target.value })}/>
          </div>
          <div className="addProductItem">
            <label>Retail Price</label>
            <input type="text" placeholder="Retail Price" value={postItems.retailPrice} onChange={(e) => setPostItems({ ...postItems, retailPrice: e.target.value })}/>
          </div>
          <div className="addProductItem">
            <label>Quantity</label>
            <input type="number" placeholder="Quantity in number" value={postItems.qty} onChange={(e) => setPostItems({ ...postItems, qty: String(e.target.value) })}/>
          </div>
          {/* <div className="addProductItem">
            <label>In Stock</label>
            <select name="active" id="active">
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div> */}
          <button type="submit" className="addProductButton" style={{width:"100%"}}>Add</button>
        </form>
      </div>

      </div>
    </div>    
    </>
    
    
  );
}

export default NewProduct