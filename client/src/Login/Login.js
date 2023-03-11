import React, { useState} from 'react';
import {
  Container, Grow, Grid, Paper, Typography, TextField, Button,
  OutlinedInput, Select, MenuItem, IconButton, InputAdornment, InputLabel,
  FormControl
} from '@mui/material';
import {Visibility,VisibilityOff} from '@mui/icons-material';

import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { loginUser } from '../features/userInfo/signUpInSlice.js';


const departmentNames = [
  'admin',
  'finance',
  'teller',
  'store',
  'user'
];
// const companyNames = ['KMikedem','KKGW'];


const Login = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const visible = useSelector(state => state.userAdded.incorrect);

  const [loginData, setLoginData] = useState({ firstName: '', department: '',company:'', email: '', password: '' });

  const [showPassword, setShowPassword] = useState(false);

  // const [incorrectPassword, setIncorrectPassword] = useState(false);

  const handleClearInfo = () => setLoginData({ firstName: '', department: '',company:'', email: '', password: '' });
  
  const handleClickShowPassword = () => setShowPassword((showPassword) => !showPassword);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChange = (e) => {
    setLoginData(prev=> ({...prev, [e.target.name]: e.target.value}) );
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({loginData,navigate}));
    handleClearInfo();
  }
  
  return (
    <Container>
      <Grow in>
        <Container>
          <Grid container justify='space-between' spacing={ 3} style={{minHeight:'100vh'} }>
            <Grid item justify="space-between" xs={12} sm={6} >
              <Paper>
                <form autoComplete='off' noValidate onSubmit={handleSubmit}>
                  <Typography variant='h6' align='center' color='primary'>Log in</Typography>
                  {/* <FormControl fullWidth>
                    <InputLabel id="select-company">select company name</InputLabel>                      
                    <Select
                      name='company'
                      labelId="select-company"
                      fullWidth
                      displayEmpty
                      value={loginData.company}
                      onChange={handleChange}
                      input={<OutlinedInput />}
                      renderValue={(selected) => {
                        if (selected.length === 0) {
                          return <em></em>;
                        }
                        return selected;
                      }}
                      inputProps={{ 'aria-label': 'Without label' }}
                    >
                      <MenuItem disabled value="">select company name</MenuItem>
                      <MenuItem value="KMikedem">KMikedem</MenuItem>
                      <MenuItem value="KKGW">KKGW</MenuItem>
                    </Select>
                  </FormControl> */}
                  {/* <label htmlFor="select company name">select company name:</label> */}
                  <select name="company" style={{width:"100%",height:"3.5rem"}}
                    id="select company name"
                    onChange={handleChange}>
                      <option value="" style={{color:'red',height:"3rem"}}>--select company name--</option>
                      <option value="KMikedem">KMikedem</option>
                      <option value="KKGW">KKGW</option>
                  </select>

                  
                  <FormControl fullWidth>
                    <InputLabel id="select-label">select department</InputLabel>                      
                    <Select
                      name='department'
                      labelId="select-label"
                      fullWidth
                      displayEmpty
                      value={loginData.department}
                      onChange={handleChange}
                      input={<OutlinedInput />}
                      renderValue={(selected) => {
                        if (selected.length === 0) {
                          return <em></em>;
                        }
                        return selected;
                      }}
                      inputProps={{ 'aria-label': 'Without label' }}
                    >
                      <MenuItem disabled value="">
                        <em>select department</em>
                      </MenuItem>
                      {departmentNames.map((name) => (
                        <MenuItem
                          key={name}
                          value={name}
                        >
                          {name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <TextField name='firstName' variant='outlined' label='first name' fullWidth
                    value={loginData.firstName} onChange={handleChange} />
          
                  <TextField name='email' variant='outlined' label='email' fullWidth
                    value={loginData.email} onChange={handleChange} />
                  
                  <FormControl
                    fullWidth
                    variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">password</InputLabel>
                    <OutlinedInput name='password' variant='outlined' label='password' fullWidth type={showPassword ? 'text' : 'password'}
                      value={loginData.password} onChange={handleChange}
                      id="outlined-adornment-password"
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
                  </FormControl>
                  {/* <Button variant='contained' color='primary' size='large' fullWidth onClick={() => navigate('/show-data')}>Navigate Data</Button> */}
                  <Button variant='outlined' color='secondary' size='large' type='submit' fullWidth>Sign-In</Button>
                  <div className='forgot-password'>
                  <Typography variant='body1' align='center' color='primary'
                    style={{ paddingTop: '5px', paddingBottom: '5px', fontSize: '14px' }}
                    onClick={() => navigate('/forgotpassword')}>forgot password ?
                  </Typography>
                  </div>
                </form>
              </Paper>
                <p id='incorrect' style={{display: visible ? 'block' : 'none', color:'red', textAlign: 'center'}}>Wrong Password</p>
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  )
}

export default Login;
