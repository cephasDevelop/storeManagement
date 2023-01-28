import mongoose from 'mongoose';

const historySchema = mongoose.Schema({
    mongoId: String,
    productType: String,
    modelNo: String,
    productName: String,
    productId: String,
    purchasePrice: String,
    sellingPrice: Number,
    storeQty: Number,
    clientName: String,
    storedDate: String,
    requestStatus: {
        type: String,
        default:'true'
    },
    requestQty: {
        type: Number,
        default:0
    },
    requestedBy: String,
    requestDate:String,
    payerName: {
        type: String,
        default:''
    },
    paymentProcessedBy:{
        type: String,
        default:''
    },
    paymentType:{
        type: String,
        default:''
    },
    checkNo:{
        type: String,
        default:''
    },
    checkExpiresAt: {
        type: String,
        default:''
    },
    invoiceNo: {
        type: String,
        default:''
    },
    invoiceDate: {
        type: String,
        default:''
    },
    priceUsed: {
        type: String,
        default:''
    },
    paidQty: {
        type: String,
        default:''
    },
    paymentStatus: {
        type: String,
        default:''
    },
    amountRecieved: {
        type: String,
        default:''
    },
    storeManName: {
        type: String,
        default:''
    },
    dateOut: {
        type: String,
        default:''
    },
    storeStatus: {
        type: String,
        default:''
    },
});

const HistoryData = mongoose.model('HistoryData', historySchema);

export default HistoryData;