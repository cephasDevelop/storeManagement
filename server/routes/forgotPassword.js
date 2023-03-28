import express from 'express';

import {
    forgotPassword, changePassword
} from '../controllers/forgotPassword.js';

const router = express.Router();

// router.patch('/:id', updateUserStatus);
// router.post('/', login);
router.post('/', forgotPassword);
// router.put('/', changePassword);



export default router;