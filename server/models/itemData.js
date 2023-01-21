import mongoose from 'mongoose';

const ItemSchema = mongoose.Schema({
    idNumber: String,
    productName: {
        type: String,
        required: true,
        min:2,
        max:100,
    },
    productType: {
        type: String,
        min:2,
        max:100,
    },
    image: {
        type: String,
        default:"",
    },
    storedDate: {
        type: Date,
        default: new Date()
    },
    description: {
        type: String,
        default:"",
    },
    productID: Number,
    modelNo: Number,
    purchasePrice: Number,
    sellingPrice: Number,
    qty: Number,
    requestedQty: Number,
    paidQty: Number,
    storeBalance:Number
});

const ItemData = mongoose.model('ItemData', ItemSchema);

export default ItemData;