import Chart from "../../adminComponents/adminChart/Chart";
import FeaturedInfo from "../../adminComponents/featuredInfo/FeaturedInfo";
import "./adminHome.css";
import { userData } from "../../dummyData";
import WidgetLg from "../../adminComponents/widgetLg/widgetLg";

const AdminHome = () => {
  return (
    <div className="home">
      <FeaturedInfo />
      <Chart data={userData} title="User Analytics" grid dataKey="Active User"/>
      <div className="homeWidgets">
        <WidgetLg/>
      </div>
    </div>
  );
}

export default AdminHome