import express from 'express';

import {
    login, getUsers
    // , updateUserStatus
} from '../controllers/users.js';

const router = express.Router();

// router.patch('/:id', updateUserStatus);
router.post('/', login);
router.get('/', getUsers);



export default router;
