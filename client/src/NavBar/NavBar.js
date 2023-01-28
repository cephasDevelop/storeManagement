import React, { useState} from 'react';
import { Box, AppBar, Toolbar, IconButton, Typography, InputBase, Button} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
// import { Search, SearchIconWrapper, StyledInputBase } from '../styleApp.js';
import { StyledToolBar, Search } from './StyledNav.js';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { purple } from '@mui/material/colors';

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

  const theme = createTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      // main: purple[500],
      main: '#fff',
    },
    secondary: {
      // This is green.A700 as hex.
      main: '#11cb5f',
    },
  },
});
  
  return (
    // <Box sx={{ flexGrow: 1 }} className='nav-container'>
      <AppBar position="static">
        <StyledToolBar>
          <IconButton size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{display:{xs:"block", sm:"none"}}} onClick={()=>navigate('/') }>
            <MenuIcon  />
          </IconButton>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            // sx={{ display:"flex", justifyContent: "space-around" }}
            onClick={() => navigate('/')}
          >
            <img className="logo-img" alt="K.Mikedem-logo" src={logo} />
            <Typography variant="h6" sx={{display:{xs:"none", sm:"block"}, ml: 2}}>
              K.Mikedem 
            </Typography>
          </IconButton>
          
          {/* <Search> */}
            <Search>
              <InputBase placeholder='search...' sx={{ width: "90%"}}/>
              <SearchIcon color="primary" />
            </Search>
            {/* <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search> */}
          <ThemeProvider theme={theme}>
            <Button variant='contained' size='small' className='btn-login' disableElevation onClick={handleLogin}>
              Log-in
            </Button>
          </ThemeProvider>
          
        </StyledToolBar>
      </AppBar>
  //  </Box>
  )
}

export default NavBar;
