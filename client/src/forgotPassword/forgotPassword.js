import React, { useState} from 'react';
import {
  Container, Grow, Grid, Paper, Typography, TextField, Button
} from '@mui/material';

import { useDispatch} from 'react-redux';

import { useNavigate } from 'react-router-dom';

import { forgot } from '../features/userInfo/signUpInSlice';

const ForgotPassword = () => {

  const [data, setData] = useState({ email: '' });
  const [visible, setVisible] =useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleClearInfo = () => setData({ email: '' });
  
  const handleChange = (e) => {
    setData(prev=> ({...prev, [e.target.name]: e.target.value}) );
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("login: ", loginData);
    dispatch(forgot(data));
    handleClearInfo();
    setVisible(true);
  }
  
  return (
  
    <Container>
      <Grow in>
        <Container>
          <Grid container justify='space-between' spacing={ 3} style={{minHeight:'100vh'} }>
            <Grid item justify="space-between" xs={12} sm={6} >
             {!visible ? <Paper>
                <form autoComplete='off' noValidate onSubmit={handleSubmit}>
                  <Typography variant='h6' align='center' color='primary'>Forgot Password</Typography>
          
                  <TextField name='email' variant='outlined' label='email' fullWidth
                    value={data.email} onChange={handleChange} />
                  <Button variant='outlined' color='secondary' size='large' type='submit' fullWidth>Submit</Button>
                </form>
              </Paper> :
              <div>                
                <p id='incorrect' style={{display: visible ? 'block' : 'none', textAlign: 'center'}}>A link has been sent to your Email....</p> 
               <Button variant='outlined' color='secondary' size='small' onClick={() =>navigate('/')} fullWidth>Back to home</Button>
              </div>
             }
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container> 

    
  
  )
}

export default ForgotPassword;
