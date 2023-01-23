import express from 'express';

import { updateUserStatus,userDelete } from '../controllers/users.js';

const router = express.Router();

router.patch('/:id', updateUserStatus);
router.delete('/:id', userDelete);


export default router;