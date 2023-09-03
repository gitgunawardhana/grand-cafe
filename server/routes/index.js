import express from 'express';
import authRoutes from './auth.js';
import productsController from './products.js';
import cartController from './cart.js';


const router = express.Router();

router.use('/auth', authRoutes);

router.use('/products', productsController);

router.use('/add_cart', cartController);

export default router;
