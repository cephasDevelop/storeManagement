import mongoose from 'mongoose';

const ItemSchema = mongoose.Schema({
    idNumber: String,
    productType: {
        type: String,
        // required: true,
        min:1,
        max:20,
    },
    modelNo: {
        type: String,
        // required: true,
        min:1,
        max:20,
    },
    productName: {
        type: String,
        // required: true,
        min:1,
        max:20,
    },
    productId: {
        type: String,
        // required: true,
        min:1,
        max:20,
    },
    purchasePrice: {
        type: Number,
        default: 0
    },
    sellingPrice: {
        type: Number,
        default:0
    },
    qty: {
        type: Number,
        default:0
    },
    description: {
        type: String,
        default:"",
    },
    image: {
        type: String,
        default:"",
    },
    storedDate: {
        type: Date,
        default: new Date()
    },
    
    
    requestStatus: {
        type: String,
        default:''
    },
    requestQty: {
        type: Number,
        default:0
    },
    requestedBy: {
        type: String,
        default:''
    },
    requestedDate: {
        type: String,
        default:''
    },


    paidQty: {
        type: Number,
        default:0
    },
    storeBalance: {
        type: Number,
        default:0
    }
});

const ItemData = mongoose.model('ItemData', ItemSchema);

export default ItemData;