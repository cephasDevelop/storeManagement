import React from 'react';
import { Box, AppBar, Toolbar, IconButton, Typography} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { Search, SearchIconWrapper, StyledInputBase } from '../styleApp.js';

// import { NavLink } from 'react-router-dom';
// import logo from '../../public/images/someItemPhotos/logo-2.png';
// import logo from '../images/someItemPhotos/logo-2.png';
import '../App.css';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  const logo = '#';
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
   }
  return (
    <Box sx={{ flexGrow: 1 }} className='nav-container'>
      <AppBar position="static">
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
            <img className="logo-img" alt="Medea-logo" src={logo } />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Medea Products.Plc
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
          <button className='btn-login' onClick={handleLogin }>Log-In</button>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default NavBar;
