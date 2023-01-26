import RequestData from "../models/requestData.js";
import mongoose from "mongoose";
// import Joi from 'joi';

export const fetchRequestedItems = async (req, res) => {
    try {
        const requestedItems = await RequestData.find();
        res.status(200).json(requestedItems);
    } catch (error) {
        res.status(404).json({message:error.message});
    }
};


// mongoId, requestQty, requestStatus, requestedBy,
//             requestDate, modelNo, purchasePrice, sellingPrice,
//             storeQty, productType, productName, productId,
//             clientName, storedDate
export const createRequest = async (req, res) => { 
    try {
        const payload = req.body;
        let requestedData = new RequestData({...payload});
        requestedData = await requestedData.save();
        console.log(requestedData);
        res.status(201).send(requestedData);
    } catch (error) {
        res.status(409).send({message:error.message});
    }
};

export const cancelRequest = async (req, res) => {
    try {
        console.log('Delete Request Function Controllers');
        console.log('req.params = ', req.params);
        const id = req.params.id;
        
        if (!mongoose.Types.ObjectId.isValid(id)) {
            // console.log('id not from mongodb');
            return res.status(404).send('No item with that id');
        }
        // console.log('id is from mongodb');
        const requestedItem = await RequestData.find({ _id: id });
        
        if (!requestedItem) {
            // console.log('found existing user');
            return res.status(400).json({ message: 'Item does not exists.' });
        }

        const deletedRequest = await RequestData.findByIdAndRemove({ _id: id });
        console.log('The deleted item - ', deletedRequest);
        
        res.status(200).json('Requested item deleted');
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const paymentRequest = async (req, res) => {
    console.log("processing payment");
    try {
        const id = req.params.id;
        const payload = req.body;
        
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No Item with that id');

        const paidItem = await RequestData.findByIdAndUpdate({_id:id}, {...payload}, { new: true });
        console.log('Paid Item - ',paidItem)
        res.status(200).json(paidItem);        
    } catch (error) {
        res.status(404).json({message:error.message});
    }
 };
// TO DO : UPDATE REQUEST //

// export const requestItem = async (req, res) => { 
//     try {
//         console.log('request.params = ',req.params);
//         console.log('request.body = ',req.body);
//         const id = req.params.id;
//         const { requestQty,requestStatus} = req.body;
        
//         if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No item with that id');

//         const updatedItem = await ItemData.findByIdAndUpdate({_id:id}, {requestQty,requestStatus}, { new: true });
//         console.log('Updated Used Data - ',updatedItem)
//         res.status(200).json(updatedItem);        
//     } catch (error) {
//         res.status(404).json({message:error.message});
//     }
    
// };

// read on the status codes @ https://www.restapitutorial.com/httpstatuscodes.html