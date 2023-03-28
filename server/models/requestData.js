import mongoose from 'mongoose';

const RequestSchema = mongoose.Schema({
    mongoId: String,
    
    modelNo: String,
    productType: String,
    productBrand: String,
    qty: String,
    description: String,
    image: String,
    company: String,
    purchasePrice: String,
    sellingPrice: String,
    retailPrice: String,
    storedDate: String,
    
    
    clientName: String,
    requestNumber:String,
    requestQty: String,
    requestedBy: String,
    requestStatus: String,
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
    paymentStatus: {type:String,default:''},
    amountRecieved:String,
    
    
    storeStatus: {
        type: String,
        default:''
    },
    
    inStoreQty:String,
    storeDetail: [
        {
            storePerson: String,
            outQty: String,
            outDate: Date,
            storeFormNo:String,
        }
    ],
});

const RequestData = mongoose.model('RequestData', RequestSchema);

export default RequestData;