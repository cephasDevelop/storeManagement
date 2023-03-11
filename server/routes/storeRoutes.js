import express from 'express';

import { fetchStoreItems,issueFromStore } from '../controllers/storeController.js';
// import loginMiddle from '../middleware/login.js';

const router = express.Router();


router.get('/', fetchStoreItems);
router.post('/',issueFromStore);


export default router;
