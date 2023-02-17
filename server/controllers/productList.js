import PurchasedItems from "../models/purchasedItems.js";
// import mongoose from "mongoose";



export const getProductList = async (req, res) => {
    try {
        const productList = await PurchasedItems.find();
        res.status(200).json(productList);
    } catch (error) {
        res.status(404).json({message:error.message});
    }
};



export const createProductlist = async (req, res) => { 

    try {
        const { modelNo, productType, productBrand, qty,
            description, image, company,
            purchasePrice, sellingPrice, retailPrice,storedDate } = req.body;
        let form = new PurchasedItems({
            modelNo, productType, productBrand, qty,
            description, image, company,
            purchasePrice, sellingPrice, retailPrice,storedDate,qtyRemaining:qty,
        });

        form = await form.save();
        // console.log("My form data is:", form);
        res.status(201).send(form);
    } catch (error) {
        res.status(409).send({message:error.message});
    }
};