import mongoose from 'mongoose';

const KmikedemSchema = mongoose.Schema({
    // idNumber: String,
    modelNo: {
        type: String,
        // required: true,
        min:1,
        max:20,
    },
    productType: {
        type: String,
        // required: true,
        min:1,
        max:20,
    },
    productBrand: {
        type: String,
        // required: true,
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

const KmikedemData = mongoose.model('KmikedemData', KmikedemSchema);

export default KmikedemData;