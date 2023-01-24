import ItemData from "../models/itemData.js";
import mongoose from "mongoose";
// import Joi from 'joi';

export const getItems = async (req, res) => {
    try {
        const items = await ItemData.find();
        res.status(200).json(items);
    } catch (error) {
        res.status(404).json({message:error.message});
    }
};

export const createItems = async (req, res) => { 

    try {
        const { productName, productType, productId,modelNo,
    description,purchasePrice,sellingPrice,qty,image} = req.body;
        let form = new ItemData({
            productName, productType,
            productId, modelNo,
            description, purchasePrice,
            sellingPrice, qty, image
        });
        form = await form.save();
        res.status(201).send(form);
    } catch (error) {
        res.status(409).send({message:error.message});
    }
};

export const requestItem = async (req, res) => { 
    try {
        console.log('request.params = ',req.params);
        console.log('request.body = ',req.body);
        const id = req.params.id;
        const { requestQty,requestStatus} = req.body;
        
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No item with that id');

        const updatedItem = await ItemData.findByIdAndUpdate({_id:id}, {requestQty,requestStatus}, { new: true });
        console.log('Updated Used Data - ',updatedItem)
        res.status(200).json(updatedItem);        
    } catch (error) {
        res.status(404).json({message:error.message});
    }
    
};

// read on the status codes @ https://www.restapitutorial.com/httpstatuscodes.html