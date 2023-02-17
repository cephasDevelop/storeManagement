import HistoryData from "../models/requestData.js";
import PurchasedItems from '../models/purchasedItems.js';
import KmikedemData from '../models/kmikedemModel.js';
import KkgwData from '../models/kkgwModel.js';
import ItemData from "../models/itemData.js";
import RequestData from '../models/requestData.js';

// import mongoose from "mongoose";
// import Joi from 'joi';

// if (!mongoose.Types.ObjectId.isValid(singleProduct._id)) {
            //     console.log("ID NOT MONGOOSE BREAK");
            //     continue;
            // };

export const individualPayments = async (req, res) => {
    try {
        const body = req.body;
        console.log('Individual Payments = ');
        const listOfproducts = await PurchasedItems.find({ modelNo: body.modelNo, company: body.company });
        if (!listOfproducts) return res.status(404).send('No product is found');

        let totalPaidQty = Number(body.paidQty);
        let singleProduct, paymentArray, qtyRemainingForSale, obj;
        let companyObj, itemObj, reqObj;
        
        for (let idx = 0; idx < listOfproducts.length; idx++) {
            console.log("--------------------------------------------------");
            console.log("For loop number = ",idx);
            singleProduct = listOfproducts[idx];
            // TO:DO  HERE WE CAN INSERT A MONGO ID CHECK
            if (Number(singleProduct.qtyRemaining) > 0) {
                console.log("singleProduct.qtyRemaining) > 0  and LoopStep = ",idx);
                paymentArray = {
                    payerName: body.payerName, financeName: body.paymentProcessedBy,
                    paymentType: body.paymentType,
                    invoiceNo: body.invoiceNo, requestNumber: body.requestNumber,
                    requestedBy: body.requestedBy, priceUsed: body.priceUsed,
                    datePaid: body.paymentdate,
                };
                if (body.paymentType === 'check') {
                    paymentArray = {...paymentArray, checkNo: body.checkNo, checkExpiresAt: body.checkExpiresAt};
                };
                if (Number(singleProduct.qtyRemaining) <= totalPaidQty) {
                    qtyRemainingForSale = "0";
                    paymentArray = { ...paymentArray, qtyPaid: singleProduct.qtyRemaining };
                    totalPaidQty = totalPaidQty - Number(singleProduct.qtyRemaining);
                } else { 
                    qtyRemainingForSale = String(Number(singleProduct.qtyRemaining) - totalPaidQty);
                    paymentArray = { ...paymentArray, qtyPaid: String(totalPaidQty) };
                    totalPaidQty = 0;
                };
                obj = {
                    modelNo: singleProduct.modelNo, productType: singleProduct.productType,
                    productBrand: singleProduct.productBrand, qty: singleProduct.qty, description: singleProduct.description,
                    image: singleProduct.image, company: singleProduct.company, purchasePrice: singleProduct.purchasePrice,
                    sellingPrice:singleProduct.sellingPrice,retailPrice:singleProduct.retailPrice,
                    qtyRemaining: qtyRemainingForSale,
                    paymentsMade: [...singleProduct.paymentsMade, paymentArray]
                };
                await PurchasedItems.findOneAndReplace({_id:singleProduct._id}, {...obj}, { new: true });
                console.log("replaced the ", idx, " th item");
            };// end of the if statement //

            if (totalPaidQty === 0) break; 
            console.log("===========================================================");
        }// end for loop //

        // For the requested dataBase
        const requestedObj = await RequestData.findOne({ _id: body._id });
        if (requestedObj) {
            reqObj = {
                modelNo: requestedObj.modelNo,productType: requestedObj.productType,productBrand: requestedObj.productBrand,
                image: requestedObj.image,company: requestedObj.company,purchasePrice: requestedObj.purchasePrice,
                sellingPrice: requestedObj.sellingPrice,retailPrice: requestedObj.retailPrice,
                storedDate: requestedObj.storedDate,qty: requestedObj.qty,
                clientName: requestedObj.clientName,requestNumber: requestedObj.requestNumber,
                requestQty: requestedObj.requestQty,requestedBy: requestedObj.requestedBy,
                requestStatus: requestedObj.requestStatus,requestDate: requestedObj.requestDate,
                    
                paidQty:body.paidQty,
                paymentStatus: 'paid',
                storeStatus: 'pending',
            };
            await RequestData.findOneAndReplace({ _id: body._id }, { ...reqObj }, { new: true });
        }
        // If the req.body.company == "KMikedem"
        if (body.company === 'KMikedem') {
            const objKMikedem = await KmikedemData.findOne({ modelNo: body.modelNo});
            if (objKMikedem) {
                companyObj = {
                    modelNo: objKMikedem.modelNo, productType: objKMikedem.productType, productBrand: objKMikedem.productBrand,
                    description: objKMikedem.description, image: objKMikedem.image, company: objKMikedem.company,
                    purchasePrice: objKMikedem.purchasePrice, sellingPrice: objKMikedem.sellingPrice,
                    retailPrice: objKMikedem.retailPrice, storedDate: objKMikedem.storedDate,
                    qty:String(Number(objKMikedem.qty)-Number(body.paidQty))
                };
                await KmikedemData.findOneAndReplace({ modelNo: body.modelNo}, { ...companyObj }, { new: true });
            }
        };
        // If the req.body.company == "KKGW"
        if (body.company === 'KKGW') {
            const objKkgw = await KkgwData.findOne({ modelNo: body.modelNo});
            if (objKkgw) {
                companyObj = {
                    modelNo: objKkgw.modelNo, productType: objKkgw.productType, productBrand: objKkgw.productBrand,
                    description: objKkgw.description, image: objKkgw.image, company: objKkgw.company,
                    purchasePrice: objKkgw.purchasePrice, sellingPrice: objKkgw.sellingPrice,
                    retailPrice: objKkgw.retailPrice, storedDate: objKkgw.storedDate,
                    qty:String(Number(objKkgw.qty)-Number(body.paidQty))
                };
                await KkgwData.findOneAndReplace({ modelNo: body.modelNo}, {...companyObj}, { new: true });
            }
        };
        const itemDb = await ItemData.findOne({ modelNo: body.modelNo});
        if (itemDb) {
            itemObj = { ...companyObj, qty: String(Number(itemDb.qty)-Number(body.paidQty)) };
            await ItemData.findOneAndReplace({ modelNo: body.modelNo }, {...itemObj}, { new: true });
        };

        console.log("payments info is written");
        res.status(201).send("payment made for each item");
    } catch (error) {
        console.log('Error Individual Payments');
        res.status(409).send({message:error.message});
    }
};

export const makeHistory = async (req, res) => { 
    try {
        const payload = req.body;
        console.log('MakeHistory Controller Payload = ');
        console.log(payload);
        let recordedData = new HistoryData({...payload});
        recordedData = await recordedData.save();
        console.log(recordedData);
        res.status(201).send(recordedData);
    } catch (error) {
        res.status(409).send({message:error.message});
    }
};
// read on the status codes @ https://www.restapitutorial.com/httpstatuscodes.html