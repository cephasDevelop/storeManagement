// import React from 'react';
// import "./footer.css";

// function Footer() {
//   return (
//       <div className="footer" style={{position:'sticky',top:'100%'}}>
//           <div className="sites">
//               <p>company facebook</p>
//               <p>company telegram</p>
//           </div>
//           <div className="address">
//               <p>company address</p>
//               <p>company telephone</p>
//           </div>
//     </div>
//   )
// }

// export default Footer;

import React from 'react';
import { Box, Container, Grid, Typography, Link } from '@mui/material';

const Footer = () => {
  return (
    <Box sx={{ bgcolor: '#f5f5f5', py: 3 }}>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4} textAlign="center">
            <Typography variant="h6" gutterBottom>
              About Us
            </Typography>
            <Typography variant="body2" gutterBottom>
              Kmikedem is an export and import company that was established in 1995 with paid up Capital of ETB 10 million & registered investment of ETB 45 million. It is located in Addis Ababa.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4} textAlign="center">
            <Typography variant="h6" gutterBottom>
              Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Link href="/" color="textSecondary" underline="hover" gutterBottom>
                Home
              </Link>
              <Link href="/about" color="textSecondary" underline="hover" gutterBottom>
                About
              </Link>
              <Link href="/contact" color="textSecondary" underline="hover" gutterBottom>
                Contact
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12} md={4} textAlign="center">
            <Typography variant="h6" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body2" gutterBottom>
              22 Mazoria, Haile G/Silasie St. H&M Building 4th Floor
            </Typography>
            <Typography variant="body2" gutterBottom>
              Addis Ababa, Ethiopia
            </Typography>
            <Link href="mailto:info@kmikedem.com" color="textSecondary" underline="hover" gutterBottom>
              info@kmikedem.com
            </Link>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;

