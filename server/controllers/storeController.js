// import RequestData from "../models/requestData.js";
import StorePendingData from "../models/storePendingItemsModel.js";
// import Joi from 'joi';

export const issueFromStore = async (req, res) => {
    try {
        const body = req.body;
        // console.log("store withdraw req.body - ",req.body);
        const storeItem = await StorePendingData.findOne({ _id: body.id });
        
        if (!storeItem) return res.status(404).send('No store item found');

        // console.log("----------------------------");
        // console.log("The store Item = ", storeItem);
        // console.log("----------------------------");

        const qtyToWithdraw = String(Number(storeItem.qtyToWithdraw)-Number(body.qtyOut));
        // console.log("qty to withdraw = ", qtyToWithdraw);
        if (qtyToWithdraw === '0') {
            await StorePendingData.findOneAndDelete({ _id: body.id });
        } else { 
            const acitivityObj = {
                storeName: body.storeName,
                qtyOut: body.qtyOut,
                dateOut: body.dateOut,
                storeFormNo:body.storeFormNo,
            };
            const newObj = {
                ...storeItem,
                qtyToWithdraw: qtyToWithdraw,
                storeActivity: [
                    ...storeItem.storeActivity,
                    acitivityObj
                ]
            };
            await StorePendingData.findOneAndReplace(
                { _id: body.id },
                { ...newObj },
                { new: true });
        }
        console.log("withdraw controller finished");
        res.status(200).send("withdrawn from store");
    } catch (error) {
        res.status(404).json({message:error.message});
    }
};


export const fetchStoreItems = async (req, res) => {
    try {
        const storeItems = await StorePendingData.find();
        if (!storeItems) return res.status(404).send('No store item found');
        console.log("fetching store Items finished");
        res.status(200).json(storeItems);
    } catch (error) {
        res.status(404).json({message:error.message});
    }
};
