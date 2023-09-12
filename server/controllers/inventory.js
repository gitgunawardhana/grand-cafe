import express from "express";
import Inventory from "../models/Inventory.js";
const router = express.Router();

export const view = async (req, res, next) => {
  try {
    const itmes = await Inventory.find();
    res.status(200).json({ data: itmes, messege: "Success" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
  // res.json("Sucess");
};

// router.get('/products', async (req, res) => {

// res.json("Sucess");
// });

export const addProduct = async (req, res, next) => {
  try {
    console.log("Request Body:", req.body); // Check if you're receiving the correct data
    const { item, description, unit_price, quantity } = req.body;

    const newItem = new Inventory({
      item,
      description,
      unit_price,
      quantity,
    });

    console.log("New Item:", newItem); // Check the newItem object
    await newItem.save();
    res.status(201).json({ message: "Product added to the system" });
  } catch (error) {
    console.error("Error:", error); // Check if there are any errors
    res.status(500).json({
      message: "Error adding product to system",
      error: error.message,
    });
  }
};

export const deleteProduct = async (req, res) => {
  const itemId = req.params.inventoryId;

  try {
    const deletedItem = await Inventory.findByIdAndDelete(itemId);
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

export const updateProduct = async (req, res) => {
  try {
    const productId = req.params.inventoryId;
    const { item, description, unit_price, quantity } = req.body;
    const existingProduct = await Inventory.findOne({ _id: productId });

    if (!existingProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    existingProduct.item = item;
    existingProduct.description = description;
    existingProduct.unit_price = unit_price;
    existingProduct.quantity = quantity;

    await existingProduct.save();

    res.status(200).json({ message: "Product updated successfully" });
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ message: "Error updating product", error: error.message });
  }
};
