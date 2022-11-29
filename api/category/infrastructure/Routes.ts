import express from 'express';
import { checkAuth } from '../../../middleware/auth';
import { categoryController } from './IoC';

const router = express.Router();

router.get('/', categoryController.getAllCategories);
router.get('/match', categoryController.getCategoriesToMatch);
router.post('/', checkAuth, categoryController.saveCategory);
router.put('/:uuid', checkAuth, categoryController.updateUser);

export default router;