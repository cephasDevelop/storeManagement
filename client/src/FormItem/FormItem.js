import React, { useState} from 'react';
import { Paper, Typography, TextField, Button } from '@mui/material';
import {Container, Grow, Grid} from '@mui/material';
import FileBase from 'react-file-base64';

import { postItem } from '../features/itemForm/itemFormSlice.js';
import { useDispatch } from 'react-redux';

const FormItem = () => {
  const dispatch = useDispatch();

  const [postItems, setPostItems] = useState({
    name:'', purchasedPrice:'', sellingPrice:'', qty:'', image:''
  });
  

  const handleClear = () => { setPostItems({name: '', purchasedPrice: '', sellingPrice: '', qty: '', image:''}) }
  const handleSubmit = (e) => {
    e.preventDefault();
    // alert(JSON.stringify(postItems));
    dispatch(postItem(postItems));
    handleClear();
  }
  const handleFile = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener('load', () => {
      setPostItems({...postItems,image:reader.result});
    });
  }
  
  return (
    <Container>
      <Grow in>
        <Container>
          <Grid container justify='space-between' spacing={ 3}>
            <Grid item justify="space-between" xs={6} sm={6} >
              <Paper>
                <form autoComplete='off' noValidate onSubmit={handleSubmit}>
                  <Typography variant='h6'>Enter Item Data</Typography>
                  <TextField name='name' variant='outlined' label='Item Name' fullWidth
                    value={postItems.name} onChange={(e) => setPostItems({ ...postItems, name: e.target.value })} />
                  <TextField name='qty' variant='outlined' label='Quantity' fullWidth
                    value={postItems.qty} onChange={(e) => setPostItems({ ...postItems, qty: e.target.value })} />
                  <TextField name='purchasedPrice' variant='outlined' label='Purchased Price' fullWidth
                    value={postItems.purchasedPrice} onChange={(e) => setPostItems({ ...postItems, purchasedPrice: e.target.value })} />
                  <TextField name='sellingPrice' variant='outlined' label='Selling Price' fullWidth
                    value={postItems.sellingPrice} onChange={(e) => setPostItems({ ...postItems, sellingPrice: e.target.value })} />
                  {/* <input type='file' id='fileInput' multiple={false} onChange={ handleFile} /> */}
                  <div><FileBase type='file' multiple={false} onDone={({ base64 }) => setPostItems({...postItems,image:base64})} /></div>

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