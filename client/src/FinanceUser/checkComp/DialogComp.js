import React, {
     useState,
    // useEffect
} from 'react';
import {
  Button, Dialog, DialogActions, DialogContent,
  DialogContentText, DialogTitle, Slide, Typography,
//   Radio,RadioGroup,FormControlLabel,FormControl,FormLabel, TextField
} from '@mui/material';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide({obj,deposited}) {
  
  const [open, setOpen] = useState(false);
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    // clearRequest();
    setOpen(false);
  };
  
 
  const handleAgree = () => {
    deposited(obj._id);
    setOpen(false);
  };

  return (
    <div>
      <button className="productListEdit" onClick={handleClickOpen}>Deposite</button>:
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle  align='center' style={{fontWeight:'bold'}}>{`DEPOSITE CHECK`}</DialogTitle>
        <DialogContent  align='center'>
          <DialogContentText id="alert-dialog-slide-description">
            {`Are you sure, the check is deposited.`}
          </DialogContentText>
        </DialogContent>
        <div>
        <Typography align='center'> <span style={{ fontWeight:'bold' }}>{ `Payer Name `}</span>{ `: ${obj.payerName}`}</Typography>
        <Typography align='center'> <span style={{ fontWeight:'bold' }}>{ `Invoice No. `}</span>{ `: ${obj.invoiceNo}`}</Typography>
        <Typography align='center'> <span style={{ fontWeight:'bold' }}>{ `Check No.`}</span>{`: ${obj.checkNo}`}</Typography>
        <Typography align='center'> <span style={{ fontWeight:'bold' }}>{ `Amount `}</span>{ `: ${(Number(obj.priceUsed)*Number(obj.paidQty)).toFixed(2)} ETB`}</Typography>
        
            <DialogActions>
              <Button onClick={handleClose}>Disagree</Button>
              <Button onClick={handleAgree}>Agree</Button>
            </DialogActions>
          
        </div>
      </Dialog>
    </div>
  );
}