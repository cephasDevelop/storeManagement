import express from 'express';

import { signUpAdmin } from '../controllers/users.js';

const router = express.Router();

router.post('/',signUpAdmin);

export default router;