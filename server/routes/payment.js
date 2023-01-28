import express from 'express';

import { paymentRequest } from '../controllers/request.js';
// import loginMiddle from '../middleware/login.js';

const router = express.Router();

router.put('/:id', paymentRequest);


export default router;
