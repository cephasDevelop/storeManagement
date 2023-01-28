import React, { useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import "./adminNavBar.css";
// import { NotificationsNone, Language, Settings } from "@mui/icons-material";
import { Menu, MenuItem } from "@mui/material";

const AdminNavBar = ({visibility, setVisibility}) => {

  const [open, setOpen] = useState(false);

  const sidebarVisibility = () => {
    setVisibility(!visibility);
  }

  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <MenuIcon style={{cursor: 'pointer', fontSize: '30px', color: 'darkblue'}} onClick={sidebarVisibility}/>
          <span className="logo">Admin</span>
        </div>
        <div className="topRight" onClick={(e) => setOpen(true)}>
          {/* <div className="topbarIconContainer">
            <NotificationsNone />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Language />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Settings />
          </div> */}
          <img src="https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" className="topAvatar" />
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
        <MenuItem>Logout</MenuItem>
      </Menu>
      </div>
    </div>
  );
}

export default AdminNavBar;