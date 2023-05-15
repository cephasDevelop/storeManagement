import React, { useEffect} from 'react';
import {Container, Grow, Grid, CircularProgress} from '@mui/material';
import Item from '../Home/Item/Item.js';

import { useDispatch, useSelector } from 'react-redux';
import { fetchItems } from '../features/items/itemSlice.js';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const items = useSelector(state => state.item.items);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => { 
        dispatch(fetchItems());        
    },[dispatch]);
    
    const handleClick = (id) => {
      navigate(`product/productdetail/${id}`);
      console.log(id);
    }
  return (
    <Container style={{marginTop:'57px',padding:"0%", minHeight: '90vh', minWidth: '100vw'}}>
        <Grow in>
          <Grid container justify='space-between' spacing={3} style={{ paddingLeft: '20px', paddingRight: '20px'} }>
                        {!items.length ? <CircularProgress/>:(items.map((item,idx) => (
                        // <Grid key={item._id} item justify="space-between" xs={6} sm={ 3} style={{backgroundColor: 'blue'} }>
                          <Item key={idx} item={item} handleClick = {handleClick}/>
                        // </Grid>
                        )))}
          </Grid>
        </Grow>
    </Container>
  )
}

export default Home;
