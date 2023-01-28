import express from 'express';

import { getItems,createItems,requestItem } from '../controllers/items.js';
// import loginMiddle from '../middleware/login.js';

const router = express.Router();

router.get('/', getItems);
router.post('/', createItems);
router.patch('/:id', requestItem);

export default router;
