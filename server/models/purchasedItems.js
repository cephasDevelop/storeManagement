import mongoose from 'mongoose';

const PurchasedItemsSchema = mongoose.Schema({
    modelNo: {
        type: String,
        min:1,
        max:20,
    },
    productType: {
        type: String,
        min:1,
        max:20,
    },
    productBrand: {
        type: String,
        min:1,
        max:20,
    },

    qty: {
        type: String,
        default:''
    },
    description: {
        type: String,
        default:"",
    },
    image: {
        type: String,
        default:"",
    },
    company: {
        type:String,
    },
    
    purchasePrice: {
        type: String,
        default: ""
    },
    sellingPrice: {
        type: String,
        default:""
    },
    retailPrice: {
        type: String,
        default:""
    },


    qtyRemaining:String,// follow the qty remain to be sold
    paymentsMade: [
        {
            payerName: String,
            financeName: String,
            paymentType: String,// check or cash
            checkExpiresAt: String,// Date of check expiration
            invoiceNo: String,
            checkNo: String,
            // checkDiposited:String,// when money is recieved it will be true, else false
            requestNumber: String,
            requestedBy:String,
            
            qtyPaid: String,
            priceUsed: String,
            amountRecieved: String,
            amountPurchased:String,
            datePaid: String,
        },
    ],
    storedDate: {
        type: Date,
    }
});

const PurchasedItems = mongoose.model('PurchasedItems', PurchasedItemsSchema);

export default PurchasedItems;