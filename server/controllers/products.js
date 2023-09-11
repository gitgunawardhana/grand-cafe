import express from 'express';
import Product from '../models/Products.js';
const router = express.Router();



export const view = async(req, res, next) => {
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

export const addProduct = async (req, res, next) => {
  try {
      console.log('Request Body:', req.body); // Check if you're receiving the correct data
      const { name, description, rate, price, image, category } = req.body;

      const newItem = new Product({
          name,
          description,
          price,
          rate,
          image,
          category,
      });

      console.log('New Item:', newItem); // Check the newItem object
      await newItem.save();
      res.status(201).json({ message: 'Product added to the system' });
  } catch (error) {
      console.error('Error:', error); // Check if there are any errors
      res.status(500).json({ message: 'Error adding product to system', error: error.message });
  }
};


export const deleteProduct = async (req, res) => {
  const itemId = req.params.itemId;

  try {
    const deletedItem = await Cart.findByIdAndDelete(itemId);
    if (!deletedItem) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting Product", error: error.message });
  }
};
