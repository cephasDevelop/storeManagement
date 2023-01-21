import React, { useState} from 'react';

import AdminNavBar from "../../adminComponents/adminNavBar/AdminNavBar";
import AdminSideBar from "../../adminComponents/AdminSideBar/AdminSideBar";
import "./employees.css";

import {
    Container,TextField,Grid,
    Button, Paper,OutlinedInput,InputLabel,
    Select, MenuItem, FormControl
//    , IconButton, InputAdornment,Typography,
    
} from '@mui/material';

// import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// import action
import { signupUser } from '../../features/userInfo/signupSlice.js';



const departmentNames = [
  'finance',
  'teller',
  'store',
  'user'
];

const NewEmployee = () => {

    const dispatch = useDispatch();

    const [createUser, setCreateUser] = useState({
        firstName: '', lastName: '',confirmPassword:'',
        department: '', email: '', password: ''
    });

    const handleClearInfo = () => setCreateUser({
        firstName: '', lastName: '',confirmPassword:'',
        department: '', email: '', password: ''
    });

    const handleChange = (e) => {
    setCreateUser(prev=> ({...prev, [e.target.name]: e.target.value}) );
    }

    const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signupUser(createUser));
    handleClearInfo();
    }
  
  return (
    <>
    <AdminNavBar />
    <div className="adminNewProduct">
      <AdminSideBar />
      <div className="productWrapper">
        <div className="newProduct">
        <h2 className="productTitle">Enter New User</h2>
                      
        <Container>
          <Grid container justify='space-between' spacing={ 3} style={{minHeight:'100vh'} }>
            <Grid item justify="space-between" xs={12} sm={9} >
              <Paper>
                <form autoComplete='off' noValidate onSubmit={handleSubmit}>                  
                  <FormControl fullWidth>
                    <InputLabel id="select-label">select department</InputLabel>                      
                    <Select
                      name='department'
                      labelId="select-label"
                      fullWidth
                      displayEmpty
                      value={createUser.department}
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
                <span style={{display:'flex',justifyContent:'space-between'}}>
                  <TextField name='firstName' variant='outlined' label='first name' xs={12} sm={4}
                                              value={createUser.firstName} onChange={handleChange} />
                  <TextField name='lastName' variant='outlined' label='last name' xs={12} sm={4}
                                              value={createUser.lastName} onChange={handleChange} />
                </span>
          
                  <TextField name='email' variant='outlined' label='email' fullWidth
                    value={createUser.email} onChange={handleChange} />
                  
                  <FormControl
                    fullWidth
                    variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">password</InputLabel>
                    <OutlinedInput name='password' variant='outlined' label='password' fullWidth type='text'
                      value={createUser.password} onChange={handleChange}
                      id="outlined-adornment-password"  
                    />
                    </FormControl>
                    <FormControl
                    fullWidth
                    variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-confirmPassword">confirm password</InputLabel>
                    <OutlinedInput name='confirmPassword' variant='outlined' label='confirm password' fullWidth type='text'
                      value={createUser.confirmPassword} onChange={handleChange}
                      id="outlined-adornment-confirmPassword"  
                    />
                  </FormControl>
                 <Button variant='outlined' style={{backgroundColor:'#4d015c',color:'white',fontWeight:'bold'}} size='large' type='submit' fullWidth>Create-User</Button>
                </form>
              </Paper>
            </Grid>
          </Grid>
        </Container>
           
      </div>
      </div>
    </div>    
    </>
  );
}

export default NewEmployee;