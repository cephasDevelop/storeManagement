import React, { useCallback, useEffect, useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import "./adminNavBar.css";
// import { NotificationsNone, Language, Settings } from "@mui/icons-material";
import { Menu, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import UserAvatar from "../../adminPages/Employees/UserAvatar";

let fullName;
const AdminNavBar = ({visibility, setVisibility}) => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const sidebarVisibility = () => {
    setVisibility(!visibility);
  };
  const handleLogout = ()=>{
    localStorage.removeItem('profile');
    navigate('/');
  };

  // const getNameForAvatar = () => {
  //   const name = JSON.parse(localStorage.getItem("profile"));
  //   console.log(name.result);
  //   return name.result;
  // } 

  // const name =  getNameForAvatar();

  // let name = '';

  // useEffect(() => {
  //   // name = getNameForAvatar();
    
  // }, []);
  const name = JSON.parse(localStorage.getItem("profile")).result;
    fullName = `${name?.firstName} ${name?.lastName}`;

  
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <MenuIcon style={{cursor: 'pointer', fontSize: '30px', color: 'darkblue'}} onClick={sidebarVisibility}/>
          <span className="logo">{name.department}</span>
        </div>
        <div className="topRight" onClick={(e) => setOpen(true)}>
          <span className="userName">{ `Hello, ${name.firstName}`}</span>
          <UserAvatar name={fullName}/>
        </div>
        <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        // anchorEl={anchorEl}
        open={open}
        onClose={(e) => setOpen(false)}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        {/* <MenuItem>Profile</MenuItem> */}
        <MenuItem >Change Password</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
      </div>
    </div>
  );
}

export default AdminNavBar;