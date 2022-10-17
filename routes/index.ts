import express from 'express';
import authenticationRoutes from '../api/user/authentication/infrastructure/Routes';
import categoryRoutes from '../api/category/infrastructure/Routes';
import productRoutes from '../api/product/infrastructure/Routes';
import cartRoutes from '../api/cart/infrastructure/Routes';

const router = express.Router();

router.use('/user', authenticationRoutes);
router.use('/category', categoryRoutes);
router.use('/product', productRoutes);
router.use('/cart', cartRoutes);

export default router; 