import React from 'react';

import { Card, CardContent, CardMedia, Typography } from '@mui/material';

const Item = ({item}) => {
  return (
    <Card elevation={ 6} xs={6} sm={4} sx={{maxWidth: 200, margin:1}}>
      <CardMedia
              component="img"
              alt={ item.name}
        style={{height:140}}
              image={ item.image}
      />
      <CardContent>
        <Typography gutterBottom variant="body2" color="text.secondary">{`Item: ${item.name}` }</Typography>
        <Typography variant="body2" color="text.secondary">{ `Price: ${item.sellingPrice} ETB`}</Typography>
      </CardContent>
    </Card>
  )
}

export default Item;


