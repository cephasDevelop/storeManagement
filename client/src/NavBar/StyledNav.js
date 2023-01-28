import { Box, AppBar, Toolbar, IconButton, Typography, styled} from '@mui/material';

export const StyledToolBar = styled(Toolbar) ({
  display: "flex",
  justifyContent: "space-between"
});

export const Search = styled("div") ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  backgroundColor: "white",
  padding: "0 10px",
  borderRadius: "10px",
  width: "40%"
})