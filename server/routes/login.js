import express from 'express';

import { login,getUsers} from '../controllers/users.js';

const router = express.Router();

router.post('/', login);
// router.post('/', signUpAdmin);
router.get('/', getUsers);


export default router;
