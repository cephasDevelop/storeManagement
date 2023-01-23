import express from 'express';

import { signUpAdmin,updateUserStatus,userDelete } from '../controllers/users.js';

const router = express.Router();

router.post('/', signUpAdmin);
// router.patch('/', updateUserStatus);
// router.delete('/', userDelete);


export default router;