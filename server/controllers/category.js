import express from 'express';
import Category from '../models/Category.js';
const router = express.Router();



export const view = async(req, res, next) => {
    try {
        const category = await Category.find();
        res.status(200).json({data:category , messege: 'Success'});
    
      } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
      }
    
  };



export const addCategory = async (req, res, next) => {
  try {
      console.log('Request Body:', req.body); // Check if you're receiving the correct data
      const { category } = req.body;

      const newItem = new Category({
          category,
      });

      console.log('New Category:', newItem); // Check the newItem object
      await newItem.save();
      res.status(201).json({ message: 'Category added to the system' });
  } catch (error) {
      console.error('Error:', error); // Check if there are any errors
      res.status(500).json({ message: 'Error adding Category to system', error: error.message });
  }
};


export const deleteCategory = async (req, res) => {
  const itemId = req.params.CategoryId;

  try {
    const deletedItem = await Category.findByIdAndDelete(itemId);
    if (!deletedItem) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting Category", error: error.message });
  }
};


