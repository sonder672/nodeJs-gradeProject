import express from 'express';
import { productController } from './IoC';

const router = express.Router();

router.get('/', productController.getAllProducts);
router.get('/active', productController.getAllActiveProducts);
router.post('/', productController.createProduct);
router.put('/:uuid', productController.updateProduct);

export default router; 