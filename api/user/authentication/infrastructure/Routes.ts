import express from 'express';
import { checkAuth } from '../../../../middleware/auth';
import { authenticationController } from './IoC';


const router = express.Router();

router.post('/signup', authenticationController.signUp);
router.post('/signin', authenticationController.signIn);
router.get(
    '/validate/view-access', 
    checkAuth, 
    authenticationController.validateViewAccess
);

export default router; 