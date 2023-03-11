import express from 'express';

import { fetchStoreItems,issueFromStore } from '../controllers/storeController.js';
import { fetchCheckPendings,deposite } from '../controllers/checkControllers.js';

// import loginMiddle from '../middleware/login.js';



const router = express.Router();


router.get('/', fetchCheckPendings);
router.delete('/:id',deposite);


export default router;
