import express from 'express';

import { makeHistory,individualPayments } from '../controllers/history.js';

const router = express.Router();


router.post('/', makeHistory);
router.put('/',individualPayments);



export default router;
