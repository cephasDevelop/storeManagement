import { Link, useLocation } from "react-router-dom";
import "./product.css";
// import {productData} from "../../dummyData"
// import { FileBase } from 'react-file-base64';
// import { Publish } from "@mui/icons-material";
// import Chart from "../../adminComponents/adminChart/Chart";
import AdminNavBar from "../../adminComponents/adminNavBar/AdminNavBar";
import AdminSideBar from "../../adminComponents/AdminSideBar/AdminSideBar";
import { useDispatch, useSelector } from "react-redux";
import { useState,useEffect } from "react";
// import { fetchItems } from "../../features/items/itemSlice";
import { getListOfPurchasedProducts } from '../../features/companySlice/productListSlice.js';
import { editProduct } from '../../features/companySlice/productListSlice.js';

const Product = () => {
    const dispatch = useDispatch();
    const location = useLocation();

  
    const purchasedProductsList = useSelector(state => state.purchasedProductsList.allProductsList);

    const [formData, setFormData] = useState({
        modelNo: '', productType: '', productBrand: '',
        qty: '', description: '', image: '', company:'',
        purchasePrice: '', sellingPrice: '', retailPrice: '',
    });
    useEffect(() => { 
      dispatch(getListOfPurchasedProducts());  
    }, [dispatch]);
    


    const clearData = () => { 
        setFormData({
            modelNo: '', productType: '', productBrand: '',
            qty: '', description: '', image: '', company:'',
            purchasePrice: '', sellingPrice: '', retailPrice: '',
        });
    }
    const handleFile = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.addEventListener('load', () => {
            setFormData({ ...formData, image: reader.result });
        });
    }

    const handleEdit = (id) => {
        const ans = purchasedProductsList.filter((item) => item._id === id);
        // if(!formData) setFormData({...ans[0]});
        return ans[0];
    };
    const currentId = location.pathname.split("/")[2];
    const datas = handleEdit(currentId);
    // ----------------------------------------
    // ---------- EDITING ACTIONS -------------
    const handleSubmit = (e) => {
        e.preventDefault();
        const toUpdateObj = {
            ...formData, storedDate:datas.storedDate,
            purchasePrice: String(Number(formData.purchasePrice).toFixed(2)),
            sellingPrice: String(Number(formData.sellingPrice).toFixed(2)),
            retailPrice: String(Number(formData.retailPrice).toFixed(2))
        };
        // Compare quantity and dispatch only the difference
        // the diffrence that will be dispatched for every database (negative or positive) as qty;
        let diff = String(Number(toUpdateObj.qty) - Number(datas.qty));
        let changeCompany = !(toUpdateObj.company === datas.company) && (toUpdateObj.company!=='');
        console.log("difference = ", diff);
        console.log("company is changed = ", changeCompany);
        let objToDispatch;
        if (changeCompany) {
            // need to delete the current data and post a new purchased product
            let company = toUpdateObj.company === 'KKGW' ? "KKGW" : "KMikedem";
            objToDispatch = { ...toUpdateObj, company, qty: formData.qty,diff:datas.qty,changeCompany:true,id:datas._id };
        } else { 
            // update the corresponding data base
            objToDispatch = {...toUpdateObj,qty: formData.qty,diff,changeCompany:false,id:datas._id};
        }
        dispatch(editProduct({...objToDispatch}));
        clearData();
    };



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
                              {datas.description.split('\n').map((val, idx) => (<p key={idx} style={{fontSize:'12px',padding:'0px',margin:'0px'}}>{val }</p>))}
                    </div>
                    
                </div>
                <div className="productTopRight">
                    <div className="productInfoTop">
                        {/* <img src={datas.image} alt={ datas.productType} className="productInfoImg" /> */}
                        <span className="productName">{`${datas.productBrand} - ${datas.productType}`}</span>
                    </div>
                    <div className="productInfoBottom">
                        <div className="productInfoItem">
                            <span className="productInfoKey">Model No.</span>
                            <span className="productInfoValue" style={{fontSize:'12px',fontWeight:'bold'}}>{`${datas.modelNo}`}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">From Company:</span>
                            <span className="productInfoValue" style={{fontSize:'12px',fontWeight:'bold'}}>{`${datas.company}`}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">Purchase Price (ETB):</span>
                            <span className="productInfoValue" style={{fontSize:'12px',fontWeight:'bold'}}>{`${datas.purchasePrice}`}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">Selling Price (ETB):</span>
                            <span className="productInfoValue" style={{fontSize:'12px',fontWeight:'bold'}}>{`${datas.sellingPrice}`}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">Qty (pcs):</span>
                            <span className="productInfoValue" style={{fontSize:'12px',fontWeight:'bold'}}>{datas.qty}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">Stored Date:</span>
                            <span className="productInfoValue" style={{fontSize:'12px',fontWeight:'bold'}}>{datas.storedDate}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="productBottom">
                      <form className="productForm" onSubmit={handleSubmit }>
                    <div className="productFormLeft">
                        <label>Model No.</label>
                              <input type="text" name='modelNo' value={formData.modelNo} onChange={(e) => setFormData({...formData,modelNo:(e.target.value).toUpperCase()})} placeholder={`${datas.modelNo}`} />
                        <label>Product Type</label>
                        <input type="text" name='productType' value={ formData.productType} onChange={(e) => setFormData({...formData,productType:(e.target.value).toUpperCase()})} placeholder={`${datas.productType}`} />
                        <label>Product Brand</label>
                        <input type="text" name='productBrand' value={ formData.productBrand} onChange={(e) => setFormData({...formData,productBrand:(e.target.value).toUpperCase()})} placeholder={`${datas.productBrand}`} />
                        <label>Company</label>
                        <select name="company" type='text' id="idCompany" value={ formData.company} onChange={(e) => setFormData({...formData,company:e.target.value})}>
                            <option value="">select company</option>                                 
                            <option value="KMikedem">KMikedem</option>
                            <option value="KKGW">KKGW</option>
                        </select>
                        <label>Purchase Price</label>
                        <input type="text" name='purchasePrice' value={ formData.purchasePrice} onChange={(e) => setFormData({...formData,purchasePrice:e.target.value})} placeholder={`${datas.purchasePrice}`} />                       
                        <label>Selling Price</label>
                        <input type="text" name='sellingPrice' value={ formData.sellingPrice} onChange={(e) => setFormData({...formData,sellingPrice:e.target.value})} placeholder={`${datas.sellingPrice}`} />
                        <label>Retail Price</label>
                        <input type="text" name='retailPrice' value={ formData.retailPrice} onChange={(e) => setFormData({...formData,retailPrice:e.target.value})} placeholder={`${datas.retailPrice}`} />
                        {/* <label>Qty</label>
                        <input type="text" placeholder={`${datas.qty}`} />
                        <label>Description</label>
                        <input type="text" placeholder={`${datas.description}`} /> */}
                    </div>
                    <div className="productFormRight">
                      <div className="productUpload">
                            <div  className="productFormLeft" style={{display:'flex',flexDirection:'column', width:'25vw'}}>
                            <label>Qty</label>
                            <input type="number" name='qty' value={ formData.qty} onChange={(e) => setFormData({...formData,qty:Number(e.target.value)})} placeholder={`${datas.qty}`} />
                            <label>Description</label>
                                      <textarea type="text" name='description' value={ formData.description} onChange={(e) => setFormData({...formData,description:e.target.value})} placeholder={`${datas.description}`} style={{marginBottom:'2.5em'}} />
                            <img src={datas.image} alt="" className="productUploadImg" />
                            <label style={{ marginTop: '2em' }}>Image</label>
                            <input type='file' id='fileInput' multiple={false} onChange={ handleFile} />
                            {/* <input type="file" id="file" value={postItems.image} onChange={(e) => setPostItems({ ...postItems, image: e.target.value })}/> */}
                            {/* <div><FileBase type='file' multiple={false} onDone={({ base64 }) => setFormData({...formData,image:base64})} /></div> */}
                            {/* <label htmlFor="file">
                                <Publish/>Upload image
                            </label>
                                      <div style={{ display: "none" }}>
                                          <FileBase type='file' multiple={false} onDone={({ base64 }) => setFormData({ ...formData, image: base64 })} />
                                      </div> */}
                            </div>
                            </div>
                              {/* <input type="file" id="file" name='image' value={ formData.image} onChange={(e) => setFormData({...formData,[e.target.name]:e.target.value})} style={{ display: "none" }} /> */}
                        <button className="productButton" type='submit'>Update Data</button>
                    </div>
                </form>
            </div>
            </div>
                </div>
        
    </>
    
  );
}

export default Product;