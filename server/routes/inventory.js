import express from 'express';
const router = express.Router();
import {view , addProduct , deleteProduct, updateProduct } from '../controllers/inventory.js';

// Use the imported productsController
router.use('/viewinventory', view);
router.use('/addInventory', addProduct);
router.use('/deleteInventory/:inventoryId', deleteProduct);
router.use('/updateInventory/:inventoryId', updateProduct);

export default router;
