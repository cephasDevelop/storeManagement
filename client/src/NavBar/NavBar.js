import React, { useState} from 'react';
import { Box, AppBar, Toolbar, IconButton, Typography} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { Search, SearchIconWrapper, StyledInputBase } from '../styleApp.js';

import '../App.css';
import { useNavigate } from 'react-router-dom';
import logo from '../images/sisayLogoOnly.jpg';

const NavBar = () => {
  
  const navigate = useNavigate();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  console.log('user in localStorage',user);
  // useEffect(() => {
  //   const token = user?.token;
  //   setUser(JSON.parse(localStorage.getItem('profile')));
  // }, [user?.token]);
  
  const handleLogin = () => {
      navigate('/login');    
  }
  
  return (
    <Box sx={{ flexGrow: 1 }} className='nav-container' >
      <AppBar position="static" style={{backgroundColor:"#2c1838"}}>
        <Toolbar>
          <IconButton size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }} onClick={()=>navigate('/') }>
            <MenuIcon  />
          </IconButton>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }} onClick={() => navigate('/')}
          >
            <img className="logo-img" alt="K.Mikedem-logo" src={logo } />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            K.Mikedem 
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <button className='btn-login' onClick={handleLogin}>
            Log-in
          </button>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default NavBar;
