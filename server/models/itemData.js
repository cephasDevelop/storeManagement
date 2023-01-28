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
    id: {
        type: String,
        // required: true,
        min:1,
        max:20,
    },
    // productId: {
    //     type: String,
    //     // required: true,
    //     min:1,
    //     max:20,
    // },
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
});

const ItemData = mongoose.model('ItemData', ItemSchema);

export default ItemData;