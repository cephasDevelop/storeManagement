import express from 'express';

import { login,signUpAdmin } from '../controllers/users.js';

const router = express.Router();

router.get('/', login);
router.post('/',signUpAdmin);

export default router;
