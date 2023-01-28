import React, { useState} from 'react';
import { Paper, Typography, TextField, Button } from '@mui/material';
import {Container, Grow, Grid} from '@mui/material';
import FileBase from 'react-file-base64';

import { postItem } from '../features/itemForm/itemFormSlice.js';
import { useDispatch } from 'react-redux';

const FormItem = () => {
  const dispatch = useDispatch();

  const [postItems, setPostItems] = useState({
    productName: '',
    productType: '',
    id: '',
    modelNo: '',
    description: '',
    purchasePrice: '',
    sellingPrice: '',
    qty: '',
    image: ''
  });
  

  const handleChange = (e) => {
    setPostItems(prevState => ({...prevState, [e.target.name]:e.target.value}));
  }
  
  const handleClear = () => {
    setPostItems({
      productName: '',
      productType: '',
      id: '',
      modelNo: '',
      description: '',
      purchasePrice: '',
      sellingPrice: '',
      qty: '',
      image: ''
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    // alert(JSON.stringify(postItems));
    dispatch(postItem(postItems));
    handleClear();
  }
  // const handleFile = (e) => {
  //   const file = e.target.files[0];
  //   const reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.addEventListener('load', () => {
  //     setPostItems({...postItems,image:reader.result});
  //   });
  // }
  
  return (
    <Container>
      <Grow in>
        <Container>
          <Grid container justify='space-between' spacing={ 3}>
            <Grid item justify="space-between" xs={6} sm={6} >
              <Paper>
                <form autoComplete='off' noValidate onSubmit={handleSubmit}>
                  <Typography variant='h6'>Enter Item Data</Typography>
                  
                  <TextField name='productType' variant='outlined' label='product type' fullWidth
                    value={postItems.productType} onChange={(e) => handleChange(e)} style={{marginBottom:'10px'}} />
                  <TextField name='modelNo' variant='outlined' label='model No.' fullWidth
                    value={postItems.modelNo} onChange={(e)=>handleChange(e)} style={{marginBottom:'10px'}}/>
                  <TextField name='productName' variant='outlined' label='product name' fullWidth
                    value={postItems.productName} onChange={(e)=>handleChange(e)} style={{marginBottom:'10px'}} />
                  <TextField name='id' variant='outlined' label='product Id' fullWidth
                    value={postItems.productId} onChange={(e)=>handleChange(e)} style={{marginBottom:'10px'}} />
                  <TextField name='purchasePrice' variant='outlined' label='purchase Price' fullWidth
                    value={postItems.purchasePrice} onChange={(e)=>handleChange(e)} style={{marginBottom:'10px'}} />
                  <TextField name='sellingPrice' variant='outlined' label='selling Price' fullWidth
                    value={postItems.sellingPrice} onChange={(e)=>handleChange(e)} style={{marginBottom:'10px'}} />
                  <TextField name='qty' variant='outlined' label='Quantity' fullWidth
                    value={postItems.qty} onChange={(e)=>handleChange(e)} style={{marginBottom:'10px'}}/>
                  <TextField name='description' variant='outlined' label='description' fullWidth
                    value={postItems.description} onChange={(e)=>handleChange(e)} style={{marginBottom:'10px'}} />
                  
                  {/* <input type='file' id='fileInput' multiple={false} onChange={ handleFile} /> */}
                  <div style={{marginBottom:'10px'}}><FileBase type='file' multiple={false} onDone={({ base64 }) => setPostItems({...postItems,image:base64})} /></div>

                  <Button variant='contained' color='secondary' size='large' fullWidth onClick={handleClear }>Clear Data</Button>
                  <Button variant='contained' color='primary' size='large' type='submit' fullWidth>Enter Data</Button>
                </form>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  )
}

export default FormItem;

// <div>  
//         <FileBase
//             type='file'
//             multiple={false}
//             onDone={({ base64 }) =>setPostItems({ ...postItem, image: base64.split(',')[1] })}
//           />
//         </div>