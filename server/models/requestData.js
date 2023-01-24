import mongoose from 'mongoose';

const RequestSchema = mongoose.Schema({
    mongoId: String,
    productType: String,
    modelNo: String,
    productName: String,
    productId: String,
    purchasePrice: String,
    sellingPrice: Number,
    storeQty: Number,

    clientName:String,
    requestDate: String,
    storedDate: String,
    
    requestStatus: {
        type: String,
        default:'true'
    },
    requestQty: {
        type: Number,
        default:0
    },
    requestedBy: {
        type: String,
        default:'request-dpmt'
    },
    requestedDate: {
        type: String,
        default: new Date().toISOString(),
    },


    paidQty: {
        type: Number,
        default:0
    },
    paymentStatus: {
        type: String,
        default:''
    },
    invoiceNumber: {
        type: String,
        default:''
    },
    datePaid: {
        type: String,
        default:''
    },
    amountRecieved: {
        type: Number,
        default:0
    },
    cashOrCheck: {
        type: String,
        default:''
    },
    checkExpireDate: {
        type: String,
        default:''
    }

});

const RequestData = mongoose.model('RequestData', RequestSchema);

export default RequestData;