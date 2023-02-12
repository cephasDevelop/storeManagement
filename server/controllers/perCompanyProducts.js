import KmikedemData from '../models/kmikedemModel.js';
import KkgwData from '../models/kkgwModel.js';
import ItemData from '../models/itemData.js';
import PurchasedItems from '../models/purchasedItems.js';

import mongoose from "mongoose";



export const getAllProducts = async (req, res) => {
    try {
        const kmikedemItems = await KmikedemData.find();
        const kkgwItems = await KkgwData.find();
        res.status(200).json([...kmikedemItems,...kkgwItems]);
    } catch (error) {
        res.status(404).json({message:error.message});
    }
};


export const editProducts = async (req, res) => { 
    try {
        const { modelNo, productType, productBrand, qty,
            description,company,changeCompany,diff,
            image, purchasePrice, sellingPrice, 
            retailPrice, storedDate 
        } = req.body;
        const id = req.params.id;

        const baseObj = {
            modelNo, productType, productBrand, qty,
            description, company, image, purchasePrice,
            sellingPrice, retailPrice, storedDate
        };
        
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('Not a valid id');

        if(changeCompany){
            // WHEN THE COMPANY OF ORIGIN IS CHANGED
            const prevCompany = (company === "KKGW") ? "KMikedem" : "KKGW";

            // update from purchased products
            const updatedPurchasedProduct = await PurchasedItems.findOneAndReplace(
                { _id: id },
                {...baseObj},
                { new: true }
            );
            // update from the previous company item
            let dataFromOneCompany;
            let updatedPreviousCompanyItem;
            if (company === "KKGW") {                
                dataFromOneCompany = await KmikedemData.findOne({ modelNo: modelNo});
                if (!dataFromOneCompany) return res.status(404).send('one or more file is missing');
                updatedPreviousCompanyItem = await KmikedemData.findOneAndReplace(
                    { modelNo: modelNo, company: prevCompany },
                    { ...baseObj, company: prevCompany, qty: String(Number(dataFromOneCompany.qty) - Number(diff)) },
                    { new: true }
                );

            } else { 
                dataFromOneCompany = await KkgwData.findOne({ modelNo: modelNo, company: prevCompany });
                if (!dataFromOneCompany) return res.status(404).send('one or more file is missing');
                updatedPreviousCompanyItem = await KkgwData.findOneAndReplace(
                    { modelNo: modelNo, company: prevCompany },
                    { ...baseObj, company: prevCompany, qty: String(Number(dataFromOneCompany.qty) - Number(diff)) },
                    { new: true }
                );
            }

            res.status(201).send('success with campany change');

        }else{
            // COMPANY OF ORIGIN IS NOT CHANGED
            let companyItem;
            let updatedItem;
            if(company==='KKGW'){
                companyItem = await KkgwData.findOne({ modelNo: modelNo});
                if (companyItem) {
                    updatedItem = await KkgwData.findOneAndReplace(
                        { modelNo: modelNo },
                        { ...baseObj, qty: String(Number(companyItem.qty) + Number(diff)) },
                        { new: true }
                    );
                    // res.status(201).send(updatedItem);
                } else { 
                    const form = new KkgwData({...baseObj});
                    form = await form.save();
                    // res.status(201).send(form);
                }
            }else{
                companyItem = await KmikedemData.findOne({ modelNo: modelNo});
                if (companyItem) {
                    updatedItem = await KmikedemData.findOneAndReplace(
                        { modelNo: modelNo },
                        { ...baseObj, qty: String(Number(companyItem.qty) + Number(diff)) },
                        { new: true }
                    );
                    // res.status(201).send(updatedItem);
                } else { 
                    const form = new KmikedemData({...baseObj});
                    form = await form.save();
                    // res.status(201).send(form);
                }
            }
            // Update the purchased item data
            const purchasedItem = await PurchasedItems.findOneAndReplace({ _id: id }, { ...baseObj }, { new: true });
            // Update the the home item data, i.e ItemData
            const homeItem = await ItemData.findOne({ modelNo: modelNo });
            if (homeItem) {
                const toShowAtHomePageItem = await ItemData.findOneAndReplace(
                    { modelNo: modelNo },
                    { ...baseObj, qty: String(Number(homeItem.qty) + Number(diff)) },
                    { new: true }
                );                
            };
            
            res.status(201).send('success with No campany change');
        }
    } catch (error) {
        res.status(404).send({message:error.message});
    }
};

export const deleteProducts = async (req, res) => {
    try {
        const {modelNo,company,qty } = req.body;
        const id = req.params.id;
        let updatedCompanyItem;
        let baseObj;
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('Not a valid id');

        if (company === "KKGW") {
            console.log('company is = ',company);
            const kkgwItem = await KkgwData.findOne({ modelNo: modelNo });
            console.log(`item from ${company}`, kkgwItem);
            baseObj = {
                modelNo:kkgwItem.modelNo, productType:kkgwItem.productType, productBrand:kkgwItem.productBrand,
                description:kkgwItem.description, company:kkgwItem.company, image:kkgwItem.image,
                purchasePrice:kkgwItem.purchasePrice, sellingPrice:kkgwItem.sellingPrice, retailPrice:kkgwItem.retailPrice,
                storedDate:kkgwItem.storedDate
            };
            if (kkgwItem) { 
                updatedCompanyItem = await KkgwData.findOneAndReplace(
                    { modelNo: modelNo },
                    {...baseObj,qty:String(Number(kkgwItem.qty)-Number(qty))},
                    { new: true });
                console.log(`${company} item updated`);
            };
            
        } else {
            console.log('company is = ',company);
            const kmikedemItem = await KmikedemData.findOne({ modelNo: modelNo });
            console.log(`item from ${company}`, kmikedemItem);
            baseObj = {
                modelNo:kmikedemItem.modelNo, productType:kmikedemItem.productType, productBrand:kmikedemItem.productBrand,
                description:kmikedemItem.description, company:kmikedemItem.company, image:kmikedemItem.image,
                purchasePrice:kmikedemItem.purchasePrice, sellingPrice:kmikedemItem.sellingPrice, retailPrice:kmikedemItem.retailPrice,
                storedDate:kmikedemItem.storedDate
            };
            if (kmikedemItem) { 
                updatedCompanyItem = await KmikedemData.findOneAndReplace(
                    { modelNo: modelNo },
                    {...baseObj,qty:String(Number(kmikedemItem.qty)-Number(qty))},
                    { new: true });
            console.log(`${company} item updated`);
            };
        }
        await PurchasedItems.findByIdAndDelete({ _id: id });
        console.log("item removed from purchsed product list");


        const homeItem = await ItemData.findOne({ modelNo: modelNo });
            if (homeItem) {
                const toShowAtHomePageItem = await ItemData.findOneAndReplace(
                    { modelNo: modelNo },
                    { ...baseObj, qty: String(Number(homeItem.qty) - Number(qty)) },
                    { new: true }
                );
            };

        res.status(200).send('deletion success');
    } catch (error) {
        res.status(404).json({message:error.message});
    }
};














export const getKmikedemProducts = async (req, res) => {
    try {
        const kmikedemItems = await KmikedemData.find();
        res.status(200).json(kmikedemItems);
    } catch (error) {
        res.status(404).json({message:error.message});
    }
};
export const createKmikedemProduct = async (req, res) => { 

    try {
        const { modelNo, productType, productBrand, qty, description,company,
            image, purchasePrice, sellingPrice, retailPrice, storedDate } = req.body;
        console.log('creating KMikedem Item Controller');
        console.log('req.body = ',req.body);
        
        const item = await KmikedemData.findOne({ modelNo:modelNo });
        if (item) {
            console.log("kmikedem item dataBase = ", item);
            const toUpdate = {
                modelNo, productType, productBrand, qty: String(Number(qty) + Number(item.qty)),
                description,company, image:image.length?image:item.image, purchasePrice, sellingPrice, retailPrice,storedDate
            };
            const updatedItem = await KmikedemData.findOneAndReplace({ modelNo: item.modelNo }, { ...toUpdate }, { new: true });
            res.status(201).send(updatedItem);
        };
        if(!item){ 
            console.log('No item in kmikedem the data base creating new');
            const form = new KmikedemData({
                modelNo: modelNo, productType: productType, productBrand: productBrand, qty: qty,
                description: description,company:company, image: image, purchasePrice: purchasePrice,
                sellingPrice: sellingPrice, retailPrice:retailPrice, storedDate:storedDate
            });
            form = await form.save();
            console.log('saved kmikdem item');
            console.log(form);
            res.status(201).send(form);
        };
    } catch (error) {
        res.status(409).send({message:error.message});
    }
};



export const createKkgwProduct = async (req, res) => { 

    try {
        const { modelNo, productType, productBrand, qty, description,company,
            image, purchasePrice, sellingPrice, retailPrice, storedDate } = req.body;
        console.log('creating KKGW Item Controller');
        console.log('req.body = ',req.body);
        const item = await KkgwData.findOne({ modelNo:modelNo });
        if (item) {
            console.log("kkgw item id dataBase = ", item);
            const toUpdate = {
                modelNo, productType, productBrand, qty: String(Number(qty) + Number(item.qty)),
                description,company, image:image.length?image:item.image, purchasePrice, sellingPrice, retailPrice,storedDate
            };
            const updatedItem = await KkgwData.findOneAndReplace({ modelNo: item.modelNo }, { ...toUpdate }, { new: true });
            res.status(201).send(updatedItem);
        };
        if(!item){ 
            console.log('No item in kkgw base creating new');
            const form = new KkgwData({
                modelNo, productType, productBrand, qty, description,company,
                image:image, purchasePrice, sellingPrice, retailPrice, storedDate
            });
            form = await form.save();
            console.log('kkgw item saved = ',form);
            res.status(201).send(form);
        }
    } catch (error) {
        res.status(409).send({message:error.message});
    }
};

export const getKkgwProducts = async (req, res) => {
    try {
        const items = await KkgwData.find();
        res.status(200).json(items);
    } catch (error) {
        res.status(404).json({message:error.message});
    }
};
