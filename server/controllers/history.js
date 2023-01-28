import HistoryData from "../models/requestData.js";
// import mongoose from "mongoose";
// import Joi from 'joi';

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