import React, { useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import GoogleMapReact from 'google-map-react';
import { styled } from '@mui/material/styles';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MailIcon from '@mui/icons-material/Mail';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';

const Container = styled("div")({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'row',
  flexWrap: 'wrap',
  padding: '24px',
  boxSizing: 'border-box',
});

const ContactInfoContainer = styled('div')({
  boxSizing: 'border-box',
  display: 'flex',
  justifyContent: 'center',
  // alignItems: 'center',
  flexDirection: 'column',
  flexWrap: 'wrap',
  width: '30%',
  // paddingRight: '16px',
});


// const Text = styled("p")({
//   margin: "8px",
// });

const Form = styled("form")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
});

const StyledTextField = styled(TextField)({
  margin: "8px",
  width: "45ch",
});

const StyledButton = styled(Button)({
  margin: "8px",
  fontSize: "18px",
  width: "200px",
  height: "65px",
  borderRadius: "50px",
});


const Contact = () => {

  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {  // TODO: API request must be submitted
    e.preventDefault();
    // axios
    //   .post("/api/contact", { name, subject, email, message })
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //   });
  };

  const location = {
    lat: 9.022736,
    lng: 38.746799,
  };

  const zoomLevel = 12;

  return (
    <>
      <NavBar />
      <Typography variant="h4" sx={{ mb: 2, mt: 7, textAlign:'center' }}>
        Contact Us
      </Typography>
      <Container>        
        <ContactInfoContainer>
          <div style={{display: 'flex', alignItems: 'center', height: '150px', paddingRight: '30px'}}>
            <LocationOnIcon color="primary" sx={{display: 'inline'}} />
            <Typography variant="body2" gutterBottom sx={{display: 'inline', ml: 1}}>
              22 Mazoria, Haile G/Silasie St. H&M Building 4th Floor, Addis Ababa, Ethiopia
            </Typography>
          </div>          
          <div style={{display: 'flex', alignItems: 'center', marginBottom: '10px', height: '30px', paddingRight:'30px'}}>
            <MailIcon color="primary" sx={{display: 'inline'}}/>
            <Typography variant="body2" gutterBottom sx={{display: 'inline', ml: 1, mb: 0}}>
            info@kmikedem.com
            </Typography>
          </div>          
          <div style={{display: 'flex', alignItems: 'center', marginBottom: '10px', height: '30px'}}>
            <PhoneAndroidIcon color="primary" sx={{display: 'inline'}}/>
            <Typography variant="body2" gutterBottom sx={{display: 'inline', ml: 1}}>
              +251912024599
            </Typography>
          </div>         
        </ContactInfoContainer>
        
        <Form onSubmit={handleSubmit}>
          <StyledTextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <StyledTextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <StyledTextField
            label="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
          <StyledTextField
            label="Message"
            multiline
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
          <StyledButton variant="contained" color="primary" type="submit">
            Send Message
          </StyledButton>
        </Form>
      </Container>
      <Box sx={{ p: 4 }}>
        <Box sx={{ height: '400px', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.GOOGLE_MAP_API }}
          defaultCenter={location}
          defaultZoom={zoomLevel}
        >
          <div
            lat={location.lat}
            lng={location.lng}
            style={{
              height: '40px',
              width: '40px',
              backgroundColor: '#f00',
              borderRadius: '50%',
            }}
          />
        </GoogleMapReact>
      </Box>
    </Box>
    <Footer />
    </>
    
  );
};

export default Contact;
