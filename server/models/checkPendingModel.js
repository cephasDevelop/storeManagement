import mongoose from 'mongoose';

const CheckPendingSchema = mongoose.Schema({
    
    modelNo: String,
    company: String,
    productType: String,
    productBrand: String,
    
    requestNumber:String,
    requestedBy: String,
    requestDate:String,
    
    payerName: String,
    paymentProcessedBy:String,
    paymentType:String,
    checkNo:String,
    checkExpiresAt:String,
    invoiceNo:String,
    invoiceDate:String,
    priceUsed: String,
    paidQty: {type:String,default:''},
    datePaid:String,
    isDeposited: {type:String,default:"false"},
    
});

const CheckPendingData = mongoose.model('CheckPendingData', CheckPendingSchema);

export default CheckPendingData;