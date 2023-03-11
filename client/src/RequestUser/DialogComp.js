import React, { useState} from 'react';
import "./requestStyle.css";
import {
  Button, Dialog, DialogActions, DialogContent,
  DialogContentText, DialogTitle, Slide,
  // TextField,
} from '@mui/material';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide({item, idPassed,status,comment, changeStatus,itemRequested}) {
  
  const [open, setOpen] = useState(false);
  const [request, setRequest] = useState({requestQty:'',clientName:'',requestNumber:''});

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    clearRequest();
    setOpen(false);
  };
  
  const clearRequest = () => {
    setRequest({requestQty:'',clientName:'',requestNumber:''});
  };
 
  const handleAgreeCancel = ({selfId,fromMongoId}) => {
    changeStatus(selfId,fromMongoId);
    clearRequest();
    setOpen(false);
  };


  const sumOfRequestedItems = (companyName,model) => { 
    let sumOfPreviousRequest;
    const arr = itemRequested.filter(value => value.modelNo ===model && value.company===companyName && value.paymentStatus==='pending');
    if (arr) {
      sumOfPreviousRequest = arr.reduce((acc, value) => acc + Number(value.requestQty), 0);
    } else {
      sumOfPreviousRequest = 0;
    }
    return sumOfPreviousRequest;
  };

  const handleClientName = (e) => {
    // const clientName = document.getElementById(`clientName`);
    // clientName.style.border = '1px solid black';
    setRequest({...request,[e.target.name]:e.target.value});
  };
  const handleRequestNumber = (e) => {
    // const requestNo = document.getElementById(`requestNumber`);
    // requestNo.style.border = '1px solid black';
    setRequest({...request,[e.target.name]:e.target.value});
  };
  const handleRequestQty = (e) => {
    // const requestQty = document.getElementById(`requestQty`);
    // requestQty.style.border = '1px solid black';
    setRequest({...request,[e.target.name]:e.target.value});
  };

  const isOkToSubmit = () => {
    const regexQty = /^[1-9]\d*/g;
    // const requestQty = document.getElementById(`requestQty`);
    // const requestNo = document.getElementById(`requestNumber`);
    // const clientName = document.getElementById(`clientName`);
    let [reqQty, reqNo, cliName] = [true, true, true];
    const previousRequestNumber = sumOfRequestedItems(item.company,item.modelNo);
    if (
      !(regexQty.test(request.requestQty))
    ) {
      // requestQty.style.border = '1px solid red';
      reqQty = false;
    }else if (((Number(request.requestQty) + Number(previousRequestNumber)) > Number(item.qty))) { 
      // requestQty.style.border = '1px solid red';
      reqQty = false;
    };
    if (request.requestNumber==='') {
      // requestNo.style.border = '1px solid red';
      reqNo = false;
    };
    if (request.clientName==='') {
      // clientName.style.border = '1px solid red';
      cliName = false;
    };
    return (reqQty && reqNo && cliName);
  }
  
  const handleAgree = (e) => {
    e.preventDefault();
    // const requestQty = document.getElementById(`requestQty`);
    // const requestNo = document.getElementById(`requestNumber`);
    // const clientName = document.getElementById(`clientName`);

    const submit = isOkToSubmit();
    if (submit) {// IF IT IS OKTO SUBMIT THE DATA ENTERED
      changeStatus(idPassed, request.requestQty, request.requestNumber, request.clientName, { item });
      // clientName.style.border = '1px solid black';
      // requestNo.style.border = '1px solid black';
      // requestQty.style.border = '1px solid black';
      clearRequest();
      setOpen(false);
    };
  };

  const totalReqQty = (companyName, model) => { 
    return sumOfRequestedItems(companyName, model);
  }

    
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
            {status === 'REQUEST' ? " Please Enter the Request Form. " :
              "Are you sure you want to cancel the Request ?"
            }
          </DialogContentText>
        </DialogContent>
        {status === 'REQUEST' && <div>
          <form autoComplete='off' noValidate onSubmit={(e) => handleAgree(e)}>
            <div style={{margin:'0.5em'}}>
            <input id='requestQty' type='text' name='requestQty' variant='outlined'
              placeholder='Qty requested' xs={12} sm={12} style={{width:'50vw',height:'2em'}}
              value={request.requestQty} onChange={handleRequestQty} />
            </div>
            <div style={{margin:'0.5em'}}>
            <input id='requestNumber' type='text' name='requestNumber' variant='outlined'
              placeholder='Request No.' xs={12} sm={12} style={{width:'50vw',height:'2em'}}
              value={request.requestNumber} onChange={handleRequestNumber} />
            </div>
            <div style={{margin:'0.5em'}}>
            <input id='clientName' type='text' name='clientName' variant='outlined'
              placeholder='Client Name' xs={12} sm={12} style={{width:'50vw',height:'2em'}}
              value={request.clientName} onChange={handleClientName} />
            </div>
              {(request.requestQty > item.qty) &&
              <p style={{ color: 'red' }}><em>{comment}</em></p>
            }
            <DialogActions>
              <Button onClick={handleClose}>Disagree</Button>
              <Button type='submit'>Agree</Button>
            </DialogActions>
            <p style={{marginTop:0,fontSize:'14px'}}><em>You can request up to <span style={{fontWeight:'bold',color:'red'}}>{ Number(item.qty)-Number(totalReqQty(item.company,item.modelNo))}</span> items.</em></p>

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
