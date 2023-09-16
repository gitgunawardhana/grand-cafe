import express from 'express';
const router = express.Router();
import {addUserDetails,view,getAddressByID} from '../controllers/unreg.js';


// Use the imported productsController
router.use('/addAddress', addUserDetails);
router.use('/view/:userCode', view);
router.use('/getAddressByID', getAddressByID);


export default router;