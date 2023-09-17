import express from "express";
import Product from "../models/Products.js";
const router = express.Router();

export const view = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.status(200).json({ data: products, messege: "Success" });
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
    const { name, description, rate, price, image, category } = req.body;

    const newItem = new Product({
      name,
      description,
      price,
      rate,
      image,
      category,
    });

    console.log("New Item:", newItem); // Check the newItem object
    await newItem.save();
    res.status(201).json({ message: "Product added to the system" });
  } catch (error) {
    console.error("Error:", error); // Check if there are any errors
    res
      .status(500)
      .json({
        message: "Error adding product to system",
        error: error.message,
      });
  }
};

export const deleteProduct = async (req, res) => {
  const itemId = req.params.ProductId;

  try {
    const deletedItem = await Product.findByIdAndDelete(itemId);
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
    const productId = req.params.ProductId;
    const { name, description, rate, price, image, category } = req.body;

    const existingProduct = await Product.findOne({ _id: productId });

    if (!existingProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    existingProduct.name = name;
    existingProduct.description = description;
    existingProduct.rate = rate;
    existingProduct.price = price;
    existingProduct.image = image;
    existingProduct.category = category;

    await existingProduct.save();

    res.status(200).json({ message: "Product updated successfully" });
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ message: "Error updating product", error: error.message });
  }
};


export const updateRate = async (req,res)=>{
  try {
    const {_id, rate } = req.body;
console.log("id cham",_id);
    // Check if the rateValue is valid (between 0 and 5)
    if (rate >= 0 && rate <= 5) {
      // Find the product by its ID
      const product = await Product.findById(_id);

      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      // Calculate the new overall average rating across all users' ratings
      const existingRatings = product.rate || []; // Use an array to store all ratings
      existingRatings.push(rate); // Add the new rating to the array
      const newAverageRating =
        existingRatings.reduce((sum, rate) => sum + rate, 0) /
        existingRatings.length;

      // Update the product's ratings array in the database
      const updatedProduct = await Product.findByIdAndUpdate(
        _id,
        { rate: newAverageRating },
        { new: true }
      );

      return res.status(200).json({
        data: updatedProduct,
        message: "Rate updated successfully",
      });
    } else {
      return res
        .status(400)
        .json({ error: "Invalid rate value. Rate must be between 0 and 5." });
    }
  } catch (error) {
    console.error("Error updating rate:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};