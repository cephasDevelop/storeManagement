
import CheckPendingData from '../models/checkPendingModel.js';

export const deposite = async (req, res) => {
    try {
        const body = req.params;
        console.log("deposite req.params - ",req.params);
        const item = await CheckPendingData.findOne({ _id: body.id });
        
        if (!item) return res.status(404).send('No store item found');

        await CheckPendingData.findOneAndDelete({_id:body.id});
    
        console.log("deposite controller finished");
        res.status(200).send("withdrawn from store");
    } catch (error) {
        res.status(404).json({message:error.message});
    }
};


export const fetchCheckPendings = async (req, res) => {
    console.log("fetching CHECK PENGING in progress");
    try {
        const checkItems = await CheckPendingData.find();
        if (!checkItems) return res.status(404).send('No store item found');

        res.status(200).json(checkItems);
    } catch (error) {
        res.status(404).json({message:error.message});
    }
};
