import express from 'express';

import {
   renderPage
} from '../controllers/forgotPassword.js';

const router = express.Router();

// router.patch('/:id', updateUserStatus);
// router.post('/', login);

router.get('/', renderPage);



export default router;