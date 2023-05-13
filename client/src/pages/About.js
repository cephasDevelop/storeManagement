// import React from 'react';
// import NavBar from '../NavBar/NavBar';

// const About = () => {
//   return (
//     <>
//       <NavBar />
//       <div>About</div>
//     </>
//   )
// }

// export default About;
import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { purple } from '@mui/material/colors';
import Button from '@mui/material/Button';
import NavBar from '../NavBar/NavBar';

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root:  {
            backgroundColor: '#fff',
            color: '#444444',            
        },
      },
    },
  },
});


export default function About() {
  return (
    // <ThemeProvider theme={theme}>
    <>    
      <NavBar />
      <ThemeProvider theme={theme}>
        <Button>Primary</Button>
      </ThemeProvider>
      <Button color="secondary">Secondary</Button>
    </>
  );
}