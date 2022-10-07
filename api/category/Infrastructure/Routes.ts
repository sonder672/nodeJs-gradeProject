import express from 'express';
import { categoryController } from './IoC';

const router = express.Router();

router.get('/', categoryController.getAllCategories);
router.post('/', categoryController.saveUser);
router.put('/:uuid', categoryController.updateUser);

export default router; 