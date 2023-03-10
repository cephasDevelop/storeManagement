import React, { useState} from 'react';
import {
  Container, Grow, Grid, Paper, Typography, Button, TextField,
  OutlinedInput, IconButton, InputAdornment, InputLabel  
} from '@mui/material';

import {Visibility,VisibilityOff} from '@mui/icons-material';


import { useDispatch} from 'react-redux';

// import { useNavigate } from 'react-router-dom';

import { change } from '../features/userInfo/signUpInSlice';

const ChangePassword = () => {

  const [data, setData] = useState({ email:'', oldPassword: '', newPassword:'', confirmNewPassword: '' });
  const [visible, setVisible] =useState(false);
  const [showPassword, setShowPassword] = useState(false);


  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((showPassword) => !showPassword);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };


  const handleClearInfo = () => setData({email:'', oldPassword: '', newPassword:'', confirmNewPassword: '' });
  
  const handleChange = (e) => {
    setData(prev=> ({...prev, [e.target.name]: e.target.value}) );
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if(data.newPassword !== data.confirmNewPassword) {
      setVisible(true);      
      return
    };
    // console.log("login: ", loginData);
    dispatch(change(data));
    handleClearInfo();
    // setVisible(true);
  }
  
  return (
  
    <Container>
      <Grow in>
        <Container>
          <Grid container justify='space-between' spacing={ 3} style={{minHeight:'100vh'} }>
            <Grid item justify="space-between" xs={12} sm={6} >
             <Paper>
                <form autoComplete='off' noValidate onSubmit={handleSubmit}>
                  <Typography variant='h6' align='center' color='primary'>Change Password</Typography>
          
                  {/* <TextField name='oldpassword' variant='outlined' label='Old password' fullWidth
                    value={data.oldPassword} onChange={handleChange} />
                  <TextField name='newpassword' variant='outlined' label='New Password' fullWidth
                    value={data.newPassword} onChange={handleChange} /> */}
                  {/* <TextField name='email' variant='outlined' label='Email' fullWidth
                    value={data.email} onChange={handleChange} /> */}
                  <InputLabel htmlFor="email">Email</InputLabel>
                    <OutlinedInput name='email' variant='outlined' label='email' fullWidth type='email'
                      value={data.email} onChange={handleChange}
                      id="email"                        
                    />
                  <InputLabel htmlFor="oldpassword">Old Password</InputLabel>
                    <OutlinedInput name='oldPassword' variant='outlined' label='oldPassword' fullWidth type={showPassword ? 'text' : 'password'}
                      value={data.oldPassword} onChange={handleChange}
                      id="oldpassword"
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }  
                    />
                  <InputLabel htmlFor="newpassword">New Password</InputLabel>
                    <OutlinedInput name='newPassword' variant='outlined' label='New Password' fullWidth type={showPassword ? 'text' : 'password'}
                      value={data.newPassword} onChange={handleChange}
                      id="newpassword"
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }  
                    />
                  <InputLabel htmlFor="contirmnewpassword">Confirm New Password</InputLabel>
                    <OutlinedInput name='confirmNewPassword' variant='outlined' label='Confirm New Password' fullWidth type={showPassword ? 'text' : 'password'}
                      value={data.confirmNewPassword} onChange={handleChange}
                      id="confirmnewpassword"
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }  
                    />
                  <Button variant='outlined' color='secondary' size='large' type='submit' fullWidth>Submit</Button>
                </form>
              </Paper> 
              {/* :
              <div>                 */}
                <p id='incorrect' style={{display: visible ? 'block' : 'none', color: 'red', textAlign: 'center'}}>Passwords do not match....</p> 
               {/* <Button variant='outlined' color='secondary' size='small' onClick={() =>navigate('/')} fullWidth>Back to home</Button>
              </div>
             } */}
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container> 

    
  
  )
}

export default ChangePassword;
