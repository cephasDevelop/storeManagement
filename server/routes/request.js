import express from 'express';

import { createRequest,fetchRequestedItems,cancelRequest } from '../controllers/request.js';
// import loginMiddle from '../middleware/login.js';

const router = express.Router();

router.post('/', createRequest);
router.get('/', fetchRequestedItems);
router.delete('/:id', cancelRequest);


export default router;
