import express from 'express';
const router = express.Router();
import {addToCart} from '../controllers/cart.js';
import {getCart} from '../controllers/cart.js';
import {deleteCartItem} from '../controllers/cart.js';
import {updateCartItemQuantity} from '../controllers/cart.js';

// Use the imported productsController
router.use('/cart', addToCart);
router.use('/getCart', getCart);
router.delete('/deleteItem/:itemId', deleteCartItem);
router.put('/updateCartItem/:itemId', updateCartItemQuantity);

export default router;