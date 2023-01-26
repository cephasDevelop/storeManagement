import express from 'express';

import { createRequest,fetchRequestedItems,cancelRequest,paymentRequest } from '../controllers/request.js';
// import loginMiddle from '../middleware/login.js';

const router = express.Router();

router.post('/', createRequest);
router.get('/', fetchRequestedItems);
router.delete('/:id', cancelRequest);
router.patch('/:id', paymentRequest);


export default router;
