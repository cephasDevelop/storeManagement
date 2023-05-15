import React from 'react';

import { Card, CardContent, CardMedia, Typography, Grid } from '@mui/material';

const Item = ({item, handleClick}) => {
  return (
  <Grid item xs={6} sm={3} lg={2} style={{padding:"1%"}}>

    <Card elevation={6} xs={6} sm={3} style={{margin:0, maxHeight:270}} onClick={() => handleClick(item._id)}>
      <CardMedia
              component="img"
              alt={ item.ProductName}
              style={{height:200}}
              image={ item.image}
      />
      <CardContent>

        <Typography gutterBottom variant="body2" color="text.secondary">{`${item.modelNo}` }</Typography>
        <Typography variant="body2" color="red">{ `ETB ${item.retailPrice}`}</Typography>

      </CardContent>
    </Card>
   </Grid>

  )
}

export default Item;


