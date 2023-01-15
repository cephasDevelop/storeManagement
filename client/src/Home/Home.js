import React, { useEffect} from 'react';
import {Container, Grow, Grid, CircularProgress} from '@mui/material';
// import FormItem from '../FormItem/FormItem.js';
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
    <Container>
        <Grow in>
            <Container>
                <Grid container justify='space-between' spacing={ 3}>
                      <Grid item display='flex' justify="space-between" xs={12} sm={12} >
                        {!items.length ? <CircularProgress/>:(items.map((item) => (
                            <Item key={item._id} item={item} />
                        )))}
                    </Grid>
                      {/* <Grid item xs={12} sm={3}>
                        <FormItem/>
                    </Grid> */}
                </Grid>
            </Container>
        </Grow>
    </Container>
  )
}

export default Home;
