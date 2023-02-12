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
    
    storedDate: {
        type: Date,
    }
});

const PurchasedItems = mongoose.model('PurchasedItems', PurchasedItemsSchema);

export default PurchasedItems;