import express from 'express';
const router = express.Router();
import {view , addProduct , deleteProduct } from '../controllers/products.js';

// Use the imported productsController
router.use('/product', view);
router.use('/addProduct', addProduct);
router.use('/deleteProduct', deleteProduct);

export default router;
