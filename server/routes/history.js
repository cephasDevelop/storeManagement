import express from 'express';

import { makeHistory } from '../controllers/history.js';

const router = express.Router();


router.post('/', makeHistory);



export default router;
