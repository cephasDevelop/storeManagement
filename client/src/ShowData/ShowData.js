import React, { useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, Stack, Box } from '@mui/material';
// import { styled } from '@mui/material/styles';

import { useDispatch, useSelector } from 'react-redux';
import { fetchItems } from '../features/items/itemSlice.js';

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CreateIcon from '@mui/icons-material/Create';

import Checkbox from '@mui/material/Checkbox';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


const ShowData = () => {
    const navigate = useNavigate();
    const items = useSelector(state => state.item.items);
    const dispatch = useDispatch();
    useEffect(() => { 
        dispatch(fetchItems());
    },[dispatch]);
  return (
      <Box sx={{ width: '100%' }}>
          <Button onClick={()=>navigate('/data-in') }>Enter Data</Button>
          <Stack spacing={2}>
              <tabel >
                  <thead>
                      <tr>
                        <th>id</th>
                        <th>Name</th>
                        <th>Quantity</th>
                        <th>Purchased-Price</th>
                          <th>Selling-Price</th>
                          <th>delete</th>
                          <th>edit</th>
                          
                      </tr>
                  </thead>
                  <tbody>
                      {items.length ?
                  items.map((item) => (<tr key={item._id} display='flex'>
                      <td><Checkbox {...label}/></td>
                      <td>{ item.name}</td>
                      <td>{ item.qty}</td>
                      <td>{ item.purchasedPrice}</td>
                      <td>{item.sellingPrice}</td>
                      <td><DeleteOutlineIcon/></td>
                      <td><CreateIcon/></td>
                  </tr>))                  
               : null} 
                      
                  </tbody>
              </tabel>
          </Stack>
    </Box>
  )
}

export default ShowData;



// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: 'space-between',
//   color: theme.palette.text.secondary,
// }));