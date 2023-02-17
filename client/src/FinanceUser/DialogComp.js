import React, { useState,useEffect} from 'react';
import {
  Button, Dialog, DialogActions, DialogContent,
  DialogContentText, DialogTitle, Slide, TextField, Typography,
  Radio,RadioGroup,FormControlLabel,FormControl,FormLabel
} from '@mui/material';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide(
  {
  item, idPassed,
  changePaymentStatus,user
  }
) {
  
  const [open, setOpen] = useState(false);
  const [paymentInfo, setPaymentInfo] = useState(
    {
      payerName:'',
      paymentType: 'check',
      invoiceNo: '',
      checkNo: '',
      priceUsed:'',
      qtyPaid:'',
      paymentProcessedBy:`${user.result.firstName} ${user.result.lastName}`,
      invoiceDate: '',
      amount: "",
      checkExpiresAt:'',
    }
  );
  useEffect(() => { 
    if (paymentInfo.qtyPaid !== '' && paymentInfo.priceUsed !== '') { 
      setPaymentInfo({...paymentInfo,amount:`${(Number(paymentInfo.qtyPaid) * Number(paymentInfo.priceUsed)).toFixed(2)}`});
    }
  },[paymentInfo]);
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    clearRequest();
    setOpen(false);
  };
  
  const clearRequest = () => {
    setPaymentInfo({
      payerName: '',
      paymentType: '',
      invoiceNo: '',
      checkNo: '',
      priceUsed:'',
      qtyPaid: '',
      paymentProcessedBy: '',
      invoiceDate: '',
      amount: '',
      checkExpiresAt: ''
    });
  };
 
  const handleAgree = (e) => {
    e.preventDefault();
    changePaymentStatus(
      idPassed,
      {...paymentInfo},
      { ...item });

    clearRequest();
    setOpen(false);
  };

  return (
    <div>
      <button className="productListEdit" onClick={handleClickOpen}>payment</button>:
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle  align='center' style={{fontWeight:'bold'}}>{`MAKE PAYMENT`}</DialogTitle>
        <DialogContent  align='center'>
          <DialogContentText id="alert-dialog-slide-description">
            {`Please check the given information and insert the required boxes.`}
          </DialogContentText>
        </DialogContent>
        <div>
          <form autoComplete='off' noValidate onSubmit={(e) => handleAgree(e)}>
            <Typography align='center'> <span style={{ fontWeight:'bold' }}>{ `Client Name `}</span>{ `: ${item.clientName}`}</Typography>
            <Typography align='center'> <span style={{ fontWeight:'bold' }}>{ `Minimum Sellling Price `}</span>{ `: ${Number(item.sellingPrice).toFixed(2)} ETB`}</Typography>
            <Typography align='center'> <span style={{ fontWeight:'bold' }}>{ `The Requested Qty `}</span>{`: ${item.requestQty} Pcs`}</Typography>
            <Typography align='center'> <span style={{ fontWeight:'bold' }}>{ `Expected Amount `}</span>{ `: ${(Number(item.sellingPrice)*Number(item.requestQty)).toFixed(2)} ETB`}</Typography>
            
            <TextField type='text' name='payerName' variant='outlined'
              label='payer Name' xs={12} sm={12} fullWidth
              value={paymentInfo.payerName} onChange={(e) => setPaymentInfo({ ...paymentInfo, payerName: e.target.value })} />
            <TextField type='text' name='invoiceNo' variant='outlined'
              label='invoice No.' xs={12} sm={12} fullWidth
              value={paymentInfo.invoiceNo} onChange={(e) => setPaymentInfo({ ...paymentInfo, invoiceNo: e.target.value })} />
            
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">Payment Type</FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="check"
                name="paymentType"
                onChange={(e) => setPaymentInfo(prevState => { 
                  return e.target.value === 'cash' ?
                    { ...prevState, paymentType: e.target.value, checkNo: '', checkExpiresAt: '' }
                    : {...prevState, paymentType: e.target.value};
                })
                }>
                <span>
                <FormControlLabel value="cash" control={<Radio />} label="Cash" />
                <FormControlLabel value="check" control={<Radio />} label="Check" />
                  {/* <FormControlLabel value="other" control={<Radio />} label="Other" /> */}
                </span>
              </RadioGroup>
            </FormControl>
            {paymentInfo.paymentType === 'check' &&
            <div>
              <TextField type='text' name='checkNo' variant='outlined'
              label='check No.' xs={12} sm={12} fullWidth
              value={paymentInfo.checkNo} onChange={(e) => setPaymentInfo({ ...paymentInfo, checkNo: e.target.value })} />
  
                <p>check expiration date</p>
              <TextField type='date' name='checkExpiresAt' variant='outlined'
               xs={12} sm={12} fullWidth
                value={paymentInfo.checkExpiresAt} onChange={(e) => setPaymentInfo({ ...paymentInfo, checkExpiresAt: e.target.value })} /></div>
            }
            <TextField type='text' name='priceUsed' variant='outlined'
              label='priceUsed' xs={12} sm={12} fullWidth
              value={paymentInfo.priceUsed} onChange={(e) => setPaymentInfo({ ...paymentInfo, priceUsed: e.target.value })} />
            <TextField type='number' name='qtyPaid' variant='outlined'
              label='qtyPaid' xs={12} sm={12} fullWidth
              value={paymentInfo.qtyPaid} onChange={(e) => setPaymentInfo({ ...paymentInfo, qtyPaid: String(e.target.value) })} />
            {/* <TextField type='text' name='amount' variant='outlined'
              label='amount recieved' xs={12} sm={12} fullWidth
              value={paymentInfo.amount} onChange={(e) => setPaymentInfo({ ...paymentInfo, amount: e.target.value })} /> */}
            <p>invoice date</p>
            <TextField type='date' name='invoiceDate' variant='outlined'
               xs={12} sm={12} fullWidth
              value={paymentInfo.invoiceDate} onChange={(e) => setPaymentInfo({ ...paymentInfo, invoiceDate: e.target.value })} />
            <p>Amount Recieved: {(paymentInfo.qtyPaid !== '' && paymentInfo.priceUsed !== '') ?
              <span style={{ color: 'red' }}>{` ${(Number(paymentInfo.qtyPaid) * Number(paymentInfo.priceUsed)).toFixed(2)}`}</span>
              : <span style={{ color: 'red' }}>{ `Please fill the qtyPaid and the priceUsed boxes`}</span>}</p>
            <DialogActions>
              <Button onClick={handleClose}>Disagree</Button>
              <Button type='submit'>Agree</Button>
            </DialogActions>
          </form>
        </div>
      </Dialog>
    </div>
  );
}