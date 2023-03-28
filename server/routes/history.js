import express from 'express';

import { makeHistory,individualPayments } from '../controllers/payments.js';

const router = express.Router();


router.post('/', makeHistory);
router.put('/',individualPayments);



export default router;
