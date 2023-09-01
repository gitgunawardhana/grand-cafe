import express from 'express';
import Product from '../models/Products.js';
const router = express.Router();



export const view = async (req, res, next) => {
    try {
        const products = await Product.find();
        res.status(200).json({data:products , messege: 'Success'});
    
      } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
      }
    // res.json("Sucess");
  };

// router.get('/products', async (req, res) => {

// res.json("Sucess");
// });


