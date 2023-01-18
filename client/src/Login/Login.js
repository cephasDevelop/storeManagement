import React, { useState} from 'react';
import {
  Container, Grow, Grid, Paper, Typography, TextField, Button,
  OutlinedInput, Select, MenuItem, IconButton, InputAdornment, InputLabel,
  FormControl  
} from '@mui/material';

import {Visibility,VisibilityOff} from '@mui/icons-material';

import { useNavigate } from 'react-router-dom';

const departmentNames = [
  'admin',
  'finance',
  'teller',
  'store',
  'user'
];


const Login = () => {
  const navigate = useNavigate();
  const [loginData,setLoginData] = useState({
      name:'',
      department: '',
      email: '',
      password:''
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((showPassword) => !showPassword);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  
  const handleSubmit = (e) => { 
      e.preventDefault();
      navigate('/signUp');
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
                  
                  <FormControl fullWidth>
                    <InputLabel id="select-label">select department</InputLabel>                      
                    <Select
                      labelId="select-label"
                      fullWidth
                      displayEmpty
                      value={loginData.department}
                      onChange={(e) => setLoginData({ ...loginData, department: e.target.value })}
                      input={<OutlinedInput />}
                      renderValue={(selected) => {
                        if (selected.length === 0) {
                          return <em></em>;
                        }
                        return selected;
                      }}
                      // MenuProps={MenuProps}
                      inputProps={{ 'aria-label': 'Without label' }}
                    >
                      <MenuItem disabled value="">
                        <em>select department</em>
                      </MenuItem>
                      {departmentNames.map((name) => (
                        <MenuItem
                          key={name}
                          value={name}
                          // style={getStyles(name, personName, theme)}
                        >
                          {name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>


                  {/* <TextField name='department' variant='outlined' label='Department' fullWidth
                    value={loginData.department} onChange={(e) => setLoginData({ ...loginData, qty: e.target.value })} />
                   */}
                  
                  
                  <TextField name='first name' variant='outlined' label='first name' fullWidth
                    value={loginData.name} onChange={(e) => setLoginData({ ...loginData, name: e.target.value })} />
          
                  <TextField name='email' variant='outlined' label='email' fullWidth
                    value={loginData.email} onChange={(e) => setLoginData({ ...loginData, email: e.target.value })} />
                  
                  <FormControl
                    // sx={{ m: 1, width: '25ch' }}
                    fullWidth
                    variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">password</InputLabel>
                    <OutlinedInput name='password' variant='outlined' label='password' fullWidth type={showPassword ? 'text' : 'password'}
                      value={loginData.password} onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
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
                  
                  <Button variant='contained' color='primary' size='large' fullWidth onClick={() => navigate('/show-data')}>SignIn</Button>
                  <Button variant='outlined' color='secondary' size='large' type='submit' fullWidth>SignUp</Button>
                </form>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  )
}

export default Login;
