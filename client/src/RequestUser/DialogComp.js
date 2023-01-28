import React, { useState} from 'react';
import {
  Button, Dialog, DialogActions, DialogContent,
  DialogContentText, DialogTitle, Slide, TextField,
} from '@mui/material';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide(
  {
  item, idPassed,status,
  comment, changeStatus,
  }
) {
  
  const [open, setOpen] = useState(false);
  const [request, setRequest] = useState({requestQty:'',clientName:''});

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    clearRequest();
    setOpen(false);
  };
  
  const clearRequest = () => {
    setRequest({requestQty:'',clientName:''});
  };
 
  const handleAgreeCancel = ({selfId,fromMongoId}) => {
    changeStatus(selfId,fromMongoId);
    clearRequest();
    setOpen(false);
  };
  const handleAgree = (e) => {
    e.preventDefault();
    changeStatus(idPassed, request.requestQty,request.clientName, {item});

    clearRequest();
    setOpen(false);
  };

    
 
  return (
    <div>
      {status==='REQUEST'?
      <button className="productListEdit" onClick={handleClickOpen}>make request</button>:
      <button className="productListEdit" onClick={handleClickOpen} style={{color:'red'}}>cancel</button>
      }       
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{status==='REQUEST'?" MAKE REQUEST ? ":'CANCEL REQUEST ?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {status === 'UPDATE' ? " Please Enter the Requested Qty and Client Name ? " :
              "Are you sure you want to cancel the request ?"
            }
          </DialogContentText>
        </DialogContent>
        {status==='REQUEST'&&<div>
          <form autoComplete='off' noValidate onSubmit={(e) => handleAgree(e)}>
            <TextField type='number' name='requestQty' variant='outlined'
              label='Qty requested' xs={12} sm={12} fullWidth
              value={request.requestQty} onChange={(e) => setRequest({ ...request, requestQty: e.target.value })} />
            <TextField type='text' name='clientName' variant='outlined'
              label='Client Name' xs={12} sm={12} fullWidth
              value={request.clientName} onChange={(e) => setRequest({ ...request, clientName: e.target.value })} />
            {(request.requestQty > item.qty) &&
              <p style={{ color: 'red' }}><em>{comment}</em></p>
            }
            <DialogActions>
              <Button onClick={handleClose}>Disagree</Button>
              <Button type='submit'>Agree</Button>
            </DialogActions>
          </form>
        </div>}
        {status==='CANCEL'&& <DialogActions>
              <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={() => handleAgreeCancel({selfId:idPassed,fromMongoId:item.mongoId})}>Agree</Button>
        </DialogActions>
        }
      </Dialog>
    </div>
  );
}