import express from 'express';
const router = express.Router();
import {view , addProduct , deleteProduct, updateProduct } from '../controllers/products.js';

// Use the imported productsController
router.use('/product', view);
router.use('/addProduct', addProduct);
router.use('/deleteProduct/:ProductId', deleteProduct);
router.use('/updateProduct/:ProductId', updateProduct);

export default router;
