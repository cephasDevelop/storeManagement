import React, { useState} from 'react';
import {Container,Grow,Grid,Paper,Typography,TextField,Button } from '@mui/material';

import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [loginData,setLoginData] = useState({
        name:'',
        department: '',
        email: '',
        password:''
    });
    const handleSubmit = (e) => { 
        e.preventDefault();
        navigate('/admin');
    }
  return (
    <Container>
      <Grow in>
        <Container>
          <Grid container justify='space-between' spacing={ 3}>
            <Grid item justify="space-between" xs={12} sm={8} >
              <Paper>
                <form autoComplete='off' noValidate onSubmit={handleSubmit}>
                  <Typography variant='h6'>SIGN-IN</Typography>
                  <TextField name='name' variant='outlined' label='Name' fullWidth
                    value={loginData.name} onChange={(e) => setLoginData({ ...loginData, name: e.target.value })} />
                  <TextField name='department' variant='outlined' label='Department' fullWidth
                    value={loginData.department} onChange={(e) => setLoginData({ ...loginData, qty: e.target.value })} />
                  <TextField name='email' variant='outlined' label='email' fullWidth
                    value={loginData.email} onChange={(e) => setLoginData({ ...loginData, purchasedPrice: e.target.value })} />
                  <TextField name='password' variant='outlined' label='password' fullWidth
                    value={loginData.password} onChange={(e) => setLoginData({ ...loginData, sellingPrice: e.target.value })} />
                  <Button variant='contained' color='primary' size='large' fullWidth onClick={()=>navigate('/show-data') }>SignIn</Button>
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
