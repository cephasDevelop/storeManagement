import React, { useEffect} from 'react';
import {Container, Grow, Grid, CircularProgress} from '@mui/material';
import Item from '../Home/Item/Item.js';

import { useDispatch, useSelector } from 'react-redux';
import { fetchItems } from '../features/items/itemSlice.js'; 

const Home = () => {
    const items = useSelector(state => state.item.items);
    const dispatch = useDispatch();

    useEffect(() => { 
        dispatch(fetchItems());        
    },[dispatch]);
    
  return (
    <Container style={{marginTop:'30px'}}>
        <Grow in>
          <Grid container justify='space-between' spacing={1} style={{minHeight:'100vh'} }>
                        {!items.length ? <CircularProgress/>:(items.map((item,idx) => (
                        <Grid key={item._id} item justify="space-between" xs={6} sm={ 3}>
                          <Item key={idx} item={item} />
                        </Grid>
                        )))}
          </Grid>
        </Grow>
    </Container>
  )
}

export default Home;
