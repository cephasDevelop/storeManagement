import React, { useEffect } from 'react'
import NavBar from '../NavBar/NavBar';
import { fetchItems } from '../features/items/itemSlice';
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from 'react-router-dom';
import "./productDetail.css";

const ProductDetail = () => {

  const dispatch = useDispatch();
  const location = useLocation();

  const productsList = useSelector(state => state.item.items);

  useEffect(() => { 
    dispatch(fetchItems());        
  },[dispatch]);

  const currentId = location.pathname.split("/")[3];

  const singleProduct = productsList.filter(product => product._id === currentId)

  // console.log(currentId);

  // console.log(singleProduct);


  return (
    <>
      <NavBar />
      <div className="product">
        <div className="productTitleContainer">
                <Link to="/">
                <button className="productAddButton">Back to Home</button>
                </Link>
            </div>
            
            <div className="productTop">
                <div className="productTopLeft">
                    <div className="productInfoTop">
                        <span className="productName">Description</span>
                    </div>
                    <div className="productInfoBottom">
                              {singleProduct[0].description.split('\n').map((val, idx) => (<p key={idx} style={{fontSize:'12px',padding:'0px',margin:'0px'}}>{val }</p>))}
                    </div>
                    
                </div>
                <div className="productTopRight">
                    <div className="productInfoTop">
                        <span className="productName">{`${singleProduct[0]?.productBrand} - ${singleProduct[0]?.productType}`}</span>
                    </div>
                    <div className="productInfoBottom">
                        <div className="productInfoItem">
                            <span className="productInfoKey">Model No.</span>
                            <span className="productInfoValue" style={{fontSize:'12px',fontWeight:'bold'}}>{`${singleProduct[0].modelNo}`}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">Company:</span>
                            <span className="productInfoValue" style={{fontSize:'12px',fontWeight:'bold'}}>{`${singleProduct[0]?.company}`}</span>
                        </div>
                       
                        <div className="productInfoItem">
                            <span className="productInfoKey"> Price (ETB):</span>
                            <span className="productInfoValue" style={{fontSize:'12px',fontWeight:'bold'}}>{`${singleProduct[0].sellingPrice}`}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">In Stock:</span>
                            <span className="productInfoValue" style={{fontSize:'12px',fontWeight:'bold'}}>{singleProduct[0].qty > 0 ? "Available" : "Out of Stock"}</span>
                        </div>
                       
                    </div>
                </div>
            </div>
            <div className="productBottom">
              <img src={singleProduct[0].image} alt="" className="productUploadImg" />    
            </div>
            </div>
    </>
  )
}

export default ProductDetail