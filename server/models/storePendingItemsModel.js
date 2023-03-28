import mongoose from 'mongoose';

const StorePendingSchema = mongoose.Schema({
    
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
    datePaid:Date,
    
    qtyToWithdraw: String,
    storeActivity: [
        {
            storeName: String,
            qtyOut: String,
            dateOut: Date,
            storeFormNo:String,
        },
    ],
    
});

const StorePendingData = mongoose.model('StorePendingData', StorePendingSchema);

export default StorePendingData;