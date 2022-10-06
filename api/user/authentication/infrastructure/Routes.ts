import express from 'express';
import { authenticationController } from './IoC';

const router = express.Router();

router.post('/signup', authenticationController.signUp);
router.post('/signin', authenticationController.signIn);

export default router; 