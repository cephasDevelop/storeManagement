import * as React from 'react';
import {
    Button, Dialog, DialogActions, DialogContent,
    DialogContentText, DialogTitle, Slide
} from '@mui/material';
import { DeleteOutline } from '@mui/icons-material';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
// {idPassed, changeStatus, status}
export default function AlertDialogSlide(props) {
  const [open, setOpen] = React.useState(false);
    
  const handleClickOpen = () => {
    setOpen(true);
  };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAgree = () => {
        if (props.status === 'UPDATE') {
            props.changeStatus(props.idPassed);
        } else if (props.status === 'DELETE') {
            props.handleDelete(props.idPassed);
        }
        setOpen(false);
  };

    
 
  return (
      <div>
          {props.status==='UPDATE'?
            // <Button style={{border: 'none',padding: '5px 10px',backgroundColor: '#3bb077',color: 'white',cursor: 'pointer',marginRight: '20px' }}
            //         //   variant="outlined"
            //     onClick={handleClickOpen}>Change Status
            //   </Button>
              <button className="productListEdit" onClick={handleClickOpen}>Change Status</button>
              :
              <DeleteOutline className="productListDelete" onClick={handleClickOpen}>
              </DeleteOutline>
          }
       
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{props.status==='UPDATE'?" UPDATE USER ? ":" DELETE USER ? "}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {props.status === 'UPDATE' ?
              " Are you sure you want to update the user ? "
              : " Are you sure you want to delete the user ? "}
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