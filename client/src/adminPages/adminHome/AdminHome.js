import Chart from "../../adminComponents/adminChart/Chart";
import FeaturedInfo from "../../adminComponents/featuredInfo/FeaturedInfo";
import "./adminHome.css";
import { userData } from "../../dummyData";
import WidgetTransaction from "../../adminComponents/widgetTransaction/WidgetTransaction";
import WidgetUsers from "../../adminComponents/widgetUsers/WidgetUsers";
import AdminNavBar from "../../adminComponents/adminNavBar/AdminNavBar";
import AdminSideBar from "../../adminComponents/AdminSideBar/AdminSideBar";
import { useState } from "react";

const AdminHome = () => {
  const [visibility, setVisibility] = useState(true);
  
   return (
    <>
      <AdminNavBar visibility = {visibility} setVisibility={setVisibility}/>
      <div className="adminHome">        
        {visibility && <AdminSideBar />}
        <div className="home">        
          <FeaturedInfo />
          <Chart data={userData} title="User Analytics" grid dataKey="Active User"/>
          <div className="homeWidgets">
            <WidgetUsers />
            <WidgetTransaction/>
          </div>
        </div>
      </div>
    </>
    
    
  );
}

export default AdminHome