import express from 'express';

import { signUpAdmin,updateUserStatus } from '../controllers/users.js';

const router = express.Router();

router.post('/', signUpAdmin);
// router.patch('/', updateUserStatus);
router.patch('/', updateUserStatus);

export default router;