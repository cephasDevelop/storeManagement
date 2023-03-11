import React, {
  useState,
  // useEffect
} from 'react';
import {
  Button, Dialog, DialogActions,
  // DialogContent,
  // DialogContentText,
  DialogTitle, Slide,
  // TextField, Typography,
  // Radio,RadioGroup,FormControlLabel,FormControl,FormLabel
} from '@mui/material';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide({ item, idPassed, changeStatus}) {
  
  const [open, setOpen] = useState(false);
  const [request, setRequest] = useState({clearedQty:'',storeFormNo:''});

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    clearRequest();
    setOpen(false);
  };
  
  const clearRequest = () => {
    setRequest({clearedQty:'',storeFormNo:''});
  };
  const handleChange = (e) => {
    setRequest({...request,[e.target.name]:e.target.value});
  };
  
  const handleAgree = (e) => {
    e.preventDefault();

    changeStatus(idPassed, request, { item });
    clearRequest();
    setOpen(false);
    
  };

    
  return (
    <div>
      {item.qtyToWithdraw?
      <button className="productListEdit" onClick={handleClickOpen}>Withdraw Items</button>:
      <p style={{color:'red'}}>OUT</p>
      }       
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"WITHDRAW FROM STORE"}</DialogTitle>
        <div>
          <form autoComplete='off' noValidate onSubmit={(e) => handleAgree(e)}>
            <div style={{margin:'0.5em'}}>
            <input id='clearedQty' type='text' name='clearedQty' variant='outlined'
              placeholder='Qty cleared' xs={12} sm={12} style={{width:'50vw',height:'2em'}}
              value={request.clearedQty} onChange={handleChange} />
            </div>
            <div style={{margin:'0.5em'}}>
            <input id='storeFormNo' type='text' name='storeFormNo' variant='outlined'
              placeholder='storeFormNo.' xs={12} sm={12} style={{width:'50vw',height:'2em'}}
              value={request.storeFormNo} onChange={handleChange} />
            </div>
              
            <DialogActions>
              <Button onClick={handleClose}>Disagree</Button>
              <Button type='submit'>Agree</Button>
            </DialogActions>
            {/* <p style={{marginTop:0,fontSize:'14px'}}><em>You can request up to <span style={{fontWeight:'bold',color:'red'}}>{ Number(item.qty)-Number(totalReqQty(item.company,item.modelNo))}</span> items.</em></p> */}
          </form>
        </div>        
      </Dialog>
    </div>
  );
}
