import express from 'express';

import { createKmikedemProduct,getKmikedemProducts } from '../controllers/perCompanyProducts.js';
// import loginMiddle from '../middleware/login.js';

const router = express.Router();

router.get('/', getKmikedemProducts);
router.post('/', createKmikedemProduct);


export default router;