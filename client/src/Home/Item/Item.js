import React from 'react';

import { Card, CardContent, CardMedia, Typography } from '@mui/material';

const Item = ({item}) => {
  return (
    <Card elevation={ 6} xs={6} sm={3} style={{margin:0, maxHeight:220}}>
      <CardMedia
              component="img"
              alt={ item.ProductName}
              style={{height:140}}
              image={ item.image}
      />
      <CardContent>
        <Typography gutterBottom variant="body2" color="text.secondary">{`${item.modelNo}` }</Typography>
        {/* <Typography gutterBottom variant="body2" color="text.secondary">{`${item.productName}` }</Typography> */}
        <Typography variant="body2" color="red">{ `ETB ${item.sellingPrice}`}</Typography>
      </CardContent>
    </Card>
  )
}

export default Item;


