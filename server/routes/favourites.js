import express from 'express';
const router = express.Router();
import { addFavourite , view , deleteFavourite }  from '../controllers/favourites.js';

// Use the imported productsController
router.use('/addFavourites', addFavourite);
router.use('/viewFavourites', view);
router.use('/deleteFavourites/:favouriteId', deleteFavourite);
export default router;
