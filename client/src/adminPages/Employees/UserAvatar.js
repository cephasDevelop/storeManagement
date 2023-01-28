import React from 'react';
import {Avatar,Stack} from '@mui/material';

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
};
function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${String(name.split(' ')[0][0]).toLocaleUpperCase()}${String(name.split(' ')[1][0]).toLocaleUpperCase()}`,
  };
}

const UserAvatar = ({ name}) => {
  return (
    <Stack direction="row" spacing={2} style={{width:"50%",marginLeft:'2px'}}>
      <Avatar {...stringAvatar(name)} />
      {/* <Avatar {...stringAvatar('Jed Watson')} />
      <Avatar {...stringAvatar('Tim Neutkens')} /> */}
    </Stack>
  )
}

export default UserAvatar;
