import mongoose from 'mongoose';

const ItemSchema = mongoose.Schema({
    idNumber: String,
    name: {
        type: String,
        required: true,
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
    purchasedPrice: Number,
    sellingPrice: Number,
    qty: Number,
    requestedQty: Number,
    paidQty: Number,
    storeBalance:Number
});

const ItemData = mongoose.model('ItemData', ItemSchema);

export default ItemData;