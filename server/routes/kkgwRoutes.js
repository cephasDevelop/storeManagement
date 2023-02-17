import express from 'express';

import { createKkgwProduct,getKkgwProducts } from '../controllers/perCompanyProducts.js';
// import loginMiddle from '../middleware/login.js';

const router = express.Router();

router.get('/', getKkgwProducts);
router.post('/', createKkgwProduct);

export default router;