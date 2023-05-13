// import React, { useState} from 'react';
// import {
//   // Box, Toolbar,
//   AppBar, IconButton, Typography, InputBase, Button
// } from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';
// import SearchIcon from '@mui/icons-material/Search';
// // import { Search, SearchIconWrapper, StyledInputBase } from '../styleApp.js';
// import { StyledToolBar, Search } from './StyledNav.js';

// import { createTheme, ThemeProvider } from '@mui/material/styles';
// // import { purple } from '@mui/material/colors';

// import '../App.css';
// import { useNavigate } from 'react-router-dom';
// import logo from '../images/sisayLogoOnly.jpg';

// const NavBar = () => {
  
//   const navigate = useNavigate();
//   const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
//   console.log('user in localStorage',user);
//   // useEffect(() => {
//   //   const token = user?.token;
//   //   setUser(JSON.parse(localStorage.getItem('profile')));
//   // }, [user?.token]);
  
//   const handleLogin = () => {
//       navigate('/login');    
//   }

//   const theme = createTheme({
//   palette: {
//     primary: {
//       // Purple and green play nicely together.
//       // main: purple[500],
//       main: '#fff',
//     },
//     secondary: {
//       // This is green.A700 as hex.
//       main: '#11cb5f',
//     },
//   },
// });
  
//   return (

//     // <Box sx={{ flexGrow: 1 }} className='nav-container'>
//       <AppBar position="static">
//         <StyledToolBar>

//           <IconButton size="large"
//             edge="start"
//             color="inherit"
//             aria-label="menu"
//             sx={{display:{xs:"block", sm:"none"}}} onClick={()=>navigate('/') }>
//             <MenuIcon  />
//           </IconButton>
//           <IconButton
//             size="large"
//             edge="start"
//             color="inherit"
//             aria-label="menu"
//             // sx={{ display:"flex", justifyContent: "space-around" }}
//             onClick={() => navigate('/')}
//           >
//             <img className="logo-img" alt="K.Mikedem-logo" src={logo} />
//             <Typography variant="h6" sx={{display:{xs:"none", sm:"block"}, ml: 2}}>
//               K.Mikedem 
//             </Typography>
//           </IconButton>
          
//           {/* <Search> */}
//             <Search>
//               <InputBase placeholder='search...' sx={{ width: "90%"}}/>
//               <SearchIcon color="primary" />
//             </Search>
//             {/* <StyledInputBase
//               placeholder="Search…"
//               inputProps={{ 'aria-label': 'search' }}
//             />
//           </Search> */}
//           <ThemeProvider theme={theme}>
//             <Button variant='contained' size='small' className='btn-login' disableElevation onClick={handleLogin}>
//               Log-in
//             </Button>
//           </ThemeProvider>
          
//         </StyledToolBar>
//       </AppBar>
//   //  </Box>
//   )
// }

// export default NavBar;

import {React, useState, useEffect} from 'react';
import { styled, alpha, createTheme, ThemeProvider } from '@mui/material/styles';
import PropTypes from 'prop-types';
import InputBase from '@mui/material/InputBase'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import { Hidden } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import logo from '../images/sisayLogoOnly.jpg';

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root:  {
            backgroundColor: '#fff',
            color: '#1769aa',  
            height: '30px',
            width: '90px',
            borderRadius: '15px',          
        },
      },
    },
  },
});

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const drawerWidth = 240;
const navItems = ['Home', 'About', 'Contact'];

function NavBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const navigate = useNavigate();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

  console.log('user in localStorage',user);
  
  useEffect(() => {
    const token = user?.token;
    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [user?.token]);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleMenuNavigation = (idx) => {
    if (idx === 0) {
      navigate('/');
    } else if (idx === 1) {
      navigate('/about');
    } else {
      navigate('/contact');
    }
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <img className="logo-img" alt="K.Mikedem-logo" src={logo} style={{height: '30px', borderRadius: '100%', marginRight: '10px', marginTop: '20px'}}/>
      <Typography variant="h6" sx={{ my: 2 }}>
        K.Mikedem
      </Typography>      
      <Divider />
      <List>
        {navItems.map((item, idx) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }} onClick={() => {handleMenuNavigation(idx)}}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  const handleLogin = () => {
      navigate('/login');    
  }

  return (
    <Box sx={{ display: 'flex', my: 4 }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Hidden smDown>
            <a href='/'>
              <img className="logo-img" alt="K.Mikedem-logo" src={logo} style={{height: '30px', borderRadius: '100%', marginRight: '10px'}}/>
            </a>
          </Hidden>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
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
          <Box sx={{ display: { xs: 'none', md:'block' } }}>
            {navItems.map((item, idx) => (
              <Button key={item} sx={{ color: '#fff', mx: {xs: 0 }}} onClick={() => {handleMenuNavigation(idx)}}>
                {item}
              </Button>
            ))}
          </Box>
          <ThemeProvider theme={theme}>
            <Button color='inherit' onClick={handleLogin}>Login</Button>
          </ThemeProvider>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { sm: 'block', md:'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>  
      </Box> 
    </Box>
  );
}

NavBar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default NavBar;