import express from 'express';

import {
    resetPasswordLink, resetPassword, changePassword
} from '../controllers/forgotPassword.js';

const router = express.Router();

// router.patch('/:id', updateUserStatus);
// router.post('/', login);
// router.post('/', forgotPassword);
router.get('/:id/:token', resetPasswordLink);
router.post('/:id/:token', resetPassword);
// router.put('/', changePassword);



export default router;