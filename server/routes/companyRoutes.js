import express from 'express';

import { getAllProducts,editProducts } from '../controllers/perCompanyProducts.js';
// import loginMiddle from '../middleware/login.js';

const router = express.Router();

router.get('/', getAllProducts);
router.put('/:id', editProducts);


export default router;