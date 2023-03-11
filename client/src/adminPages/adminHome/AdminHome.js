import Chart from "../../adminComponents/adminChart/Chart";
import FeaturedInfo from "../../adminComponents/featuredInfo/FeaturedInfo";
import "./adminHome.css";
import { userData } from "../../dummyData";
import WidgetTransaction from "../../adminComponents/widgetTransaction/WidgetTransaction";
import WidgetUsers from "../../adminComponents/widgetUsers/WidgetUsers";
import AdminNavBar from "../../adminComponents/adminNavBar/AdminNavBar";
import AdminSideBar from "../../adminComponents/AdminSideBar/AdminSideBar";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getListOfPurchasedProducts } from '../../features/companySlice/productListSlice.js';
import { getPendingChecks } from '../../features/checkPending/checkPendingSlice';

const AdminHome = () => {
  const dispatch = useDispatch();
  const [visibility, setVisibility] = useState(true);
  const date = new Date();
  const purchasedItems = useSelector(state => state.purchasedProductsList.allProductsList);
  const checkPendings = useSelector(state => state.check.checkPendings);
  
  
  useEffect(() => { 
    dispatch(getListOfPurchasedProducts());
    dispatch(getPendingChecks());
    dispatch();
  },[dispatch]);
  
   return (
    <>
      <AdminNavBar visibility = {visibility} setVisibility={setVisibility}/>
      <div className="adminHome">
        {visibility && <AdminSideBar />}
        <div className="home">
           <FeaturedInfo obj={purchasedItems} month={date.getMonth()} objCheck={ checkPendings} />
          <Chart data={userData} title="User Analytics" grid dataKey="Active User"/>
          <div className="homeWidgets">
             <WidgetUsers />
             {/* <h1>Length={ purchasedItems.length}</h1> */}
            <WidgetTransaction/>
          </div>
        </div>
      </div>
    </>
    
    
  );
}

export default AdminHome