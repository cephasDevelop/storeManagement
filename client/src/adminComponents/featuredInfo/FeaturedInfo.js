import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";


// import { useDispatch, useSelector } from 'react-redux';
// import { getListOfPurchasedProducts } from '../../features/companySlice/productListSlice.js';
// import { useEffect } from "react";



export default function FeaturedInfo({ obj,objCheck,month }) {
  // const revenue = obj.reduce((acc, item) => { 
  //   return acc + (item.paymentsMade.reduce((inc, val) => { 
  //     return inc + (Number(val.qtyPaid)*Number(val.priceUsed));
  //   },0));
  // }, 0);
  const pendingRevenue = objCheck.reduce((acc, val) => { 
    return acc + (Number(val.paidQty)*Number(val.priceUsed))
  },0);
  const sales = obj.reduce((acc, item) => { 
    return acc + (item.paymentsMade.reduce((inc, val) => { 
      return inc + (Number(val.qtyPaid)*Number(val.priceUsed));
    },0));
  }, 0);
  const cost = obj.reduce((acc, item) => { 
    return acc + Number(item.qty) * Number(item.purchasePrice)
  },0);

  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Revenue</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">$ { sales-pendingRevenue}</span>
          <span className="featuredMoneyRate">
            -11.4 <ArrowDownward  className="featuredIcon negative"/>
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Sales</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">${sales }</span>
          <span className="featuredMoneyRate">
            -1.4 <ArrowDownward className="featuredIcon negative"/>
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Cost</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">${ cost}</span>
          <span className="featuredMoneyRate">
            +2.4 <ArrowUpward className="featuredIcon"/>
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
    </div>
  );
}