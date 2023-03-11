import "./adminSideBar.css";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
// import StoreIcon from '@mui/icons-material/Store';
import UpdateIcon from '@mui/icons-material/Update';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import AssuredWorkloadIcon from '@mui/icons-material/AssuredWorkload';
import {

  LineStyle,
  // Timeline,
  // TrendingUp,
  PermIdentity,
  Storefront,
  AttachMoney,
  BarChart,
  Logout,
  // MailOutline,
  // DynamicFeed,
  // ChatBubbleOutline,
  // WorkOutline,
  // Report,
  Password,

} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";

const AdminSideBar = () => {

  const navigate = useNavigate();
  const handleLogout = ()=>{
    localStorage.removeItem('profile');
    navigate('/');
  };

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/admin" className="link">
            <li className="sidebarListItem active">
              <LineStyle className="sidebarIcon" />
              Home
            </li>
            </Link>            
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Employee Menu</h3>
          <ul className="sidebarList">
            {/* <Link to="/users" className="link"> */}
            <li className="sidebarListItem" onClick={() => navigate('/admin/employees')}>
                <PermIdentity className="sidebarIcon" />
                Users
              </li>
            {/* </Link> */}
            <Link to="/products" className="link">
              <li className="sidebarListItem">
                <Storefront className="sidebarIcon" />
                Products
              </li>
            </Link>
            <Link to="/admin/editProducts" className="link">
              <li className="sidebarListItem">
                <UpdateIcon className="sidebarIcon" />
                Edit Prod.
              </li>
            </Link>
            
            {/* <li className="sidebarListItem">
              <AttachMoney className="sidebarIcon" />
              Transactions
            </li> */}
            
            <Link to="/request" className="link">
              <li className="sidebarListItem">
                <AddShoppingCartIcon className="sidebarIcon" />
                Request
              </li>
            </Link>
            <Link to="/finance" className="link">
              <li className="sidebarListItem">
                <AttachMoney className="sidebarIcon" />
                Finance
              </li>
            </Link>
            <Link to="/finance-pending" className="link">
              <li className="sidebarListItem">
                <AssuredWorkloadIcon className="sidebarIcon" />
                Check-Pending
              </li>
            </Link>
            <Link to="/store" className="link">
              <li className="sidebarListItem">
                <RemoveShoppingCartIcon className="sidebarIcon" />
                Store-Active
              </li>
            </Link>
            
            <li className="sidebarListItem">
              <BarChart className="sidebarIcon" />
              Reports
            </li>
          </ul>
        </div>
        {/* <div className="sidebarMenu">
          <h3 className="sidebarTitle">Notifications</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <MailOutline className="sidebarIcon" />
              Mail
            </li>
            <li className="sidebarListItem">
              <DynamicFeed className="sidebarIcon" />
              Feedback
            </li>
            <li className="sidebarListItem">
              <ChatBubbleOutline className="sidebarIcon" />
              Messages
            </li>
          </ul>
        </div> */}
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">User</h3>
          <ul className="sidebarList">
            {/* <li className="sidebarListItem">
              <WorkOutline className="sidebarIcon" />
              Profile
            </li> */}
            <li className="sidebarListItem" onClick={() => navigate('/change-password')}>
              <Password className="sidebarIcon" />
              Change Password
            </li>
            <li className="sidebarListItem" onClick={handleLogout}>
              <Logout className="sidebarIcon" />
              Logout
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AdminSideBar;