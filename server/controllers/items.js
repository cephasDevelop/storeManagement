import ItemData from "../models/itemData.js";
// import Joi from 'joi';

export const getItems = async (req, res) => {
    try {
        const items = await ItemData.find();
        // console.log(items);
        res.status(200).json(items);
        // res.status(200).send(items);
    } catch (error) {
        res.status(404).json({message:error.message});
    }
};

export const createItems = async (req, res) => { 

    try {
        const { name, purchasedPrice, sellingPrice, qty, image } = req.body;
        let form = new ItemData({ name, purchasedPrice, sellingPrice, qty, image });
        form = await form.save();
        res.status(201).send(form);
    } catch (error) {
        res.status(409).send({message:error.message});
    }
};
// read on the status codes @ https://www.restapitutorial.com/httpstatuscodes.html