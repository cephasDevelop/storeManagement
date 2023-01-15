import express from 'express';

import { getItems,createItems } from '../controllers/items.js';

const router = express.Router();

router.get('/', getItems);
router.post('/', createItems);

export default router;
