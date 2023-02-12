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
        const { modelNo, productType, productBrand, qty, description,
            image, purchasePrice, sellingPrice, retailPrice, storedDate } = req.body;
        console.log("A Home Page Items req.body = ",req.body)
        const item = await ItemData.findOne({ modelNo:modelNo });
        if (item) {
            console.log("the item id dataBase = ", item);
            const toUpdate = {
                modelNo, productType, productBrand, qty: String(Number(qty) + Number(item.qty)),
                description, image, purchasePrice, sellingPrice, retailPrice,storedDate
            };
            const updatedItem = await ItemData.findOneAndReplace({ modelNo: item.modelNo }, { ...toUpdate }, { new: true });
            res.status(201).send(updatedItem);
        } else { 
            console.log('No item in the data base creating new');
            const form = new ItemData({
                modelNo, productType, productBrand, qty, description,
                image, purchasePrice, sellingPrice, retailPrice, storedDate
            });
            form = await form.save();
            res.status(201).send(form);
        }
        console.log("Item for the home page finished");
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