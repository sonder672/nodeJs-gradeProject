import express from 'express';
import { cartController } from './IoC';

const router = express.Router();

router.post('/', cartController.saveCartContent);

export default router; 