import express from 'express';
import { checkAuth } from '../../../middleware/auth';
import { colorController } from './IoC';

const router = express.Router();

router.get('/', colorController.getAllColors);
router.post('/', checkAuth, colorController.saveColor);

export default router; 