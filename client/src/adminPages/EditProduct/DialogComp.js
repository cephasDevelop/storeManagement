import React, { useState} from 'react';
import {
  Button, Dialog, DialogActions, DialogContent,
  DialogContentText, DialogTitle, Slide,
  // TextField,
} from '@mui/material';
import {DeleteOutline} from '@mui/icons-material';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide({item, handleDelete}) {
  
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  const handleAgree = (e) => {
    e.preventDefault();
    handleDelete(item);
    setOpen(false);
  };

  return (
    <div>
      
      <DeleteOutline style={{color:'red',cursor:'pointer'}} onClick={handleClickOpen}>make request</DeleteOutline>
  
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{'DELETE REQUEST ?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {
              "Are you sure you want to Delete ?"
            }
          </DialogContentText>
        </DialogContent>
          
        <DialogActions>
              <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleAgree}>Agree</Button>
        </DialogActions>
        
      </Dialog>
    </div>
  );
}

