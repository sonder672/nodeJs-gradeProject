import express from 'express';
import { checkAuth } from '../../../middleware/auth';
import { productController } from './IoC';

const router = express.Router();

router.get('/', productController.getAllProducts);
router.get('/active', productController.getAllActiveProducts);
router.post('/', checkAuth, productController.createProduct);
router.put('/:uuid', checkAuth, productController.updateProduct);
router.get('/:categoryUuid', productController.getProductsByCategory);

export default router; 