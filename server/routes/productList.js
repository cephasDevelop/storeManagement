import express from 'express';

import { createProductlist, getProductList } from '../controllers/productList.js';
import { deleteProducts } from '../controllers/perCompanyProducts.js';
// import loginMiddle from '../middleware/login.js';

const router = express.Router();

router.post('/', createProductlist);
router.get('/', getProductList);
router.put('/:id',deleteProducts);



export default router;
