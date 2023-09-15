import express from "express";
import Cart from "../models/Cart.js";

// Add items to the cart

export const addToCart = async (req, res, next) => {
  try {
      console.log('Request Body:', req.body); // Check if you're receiving the correct data
      const { id, name, u_id, price, image, quantity, category } = req.body;

      // Check if the item with the same _id and u_id is already in the cart
      const existingItem = await Cart.findOne({ id, u_id });
      if (existingItem) {
          return res.status(400).json({ message: 'Item already in cart. You can update the quantity from the cart.' });
      }

      const newItem = new Cart({
          id,
          name,
          u_id,
          price,
          category,
          image,
          quantity,
      });

      console.log('New Item:', newItem); // Check the newItem object
      await newItem.save();
      res.status(201).json({ message: 'Item added to cart' });
  } catch (error) {
      console.error('Error:', error); // Check if there are any errors
      res.status(500).json({ message: 'Error adding item to cart', error: error.message });
  }
};


// get added items from the cart

export const getCart = async (req, res, next) => {
  try {
    const { u_id } = req.params; // Extract the u_id from the URL parameters
    const cart = await Cart.find({ u_id }); // Query the database to find cart items with the specified u_id
    res.status(200).json({ data: cart, message: "Success" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
// delete item from the cart

export const deleteCartItem = async (req, res) => {
  const itemId = req.params.itemId;

  try {
    const deletedItem = await Cart.findByIdAndDelete(itemId);
    if (!deletedItem) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting item", error: error.message });
  }
};

// update cart
export const updateCartItemQuantity = async (req, res) => {
  const itemId = req.params.itemId;
  const newQuantity = req.body.quantity;

  try {
    const updatedItem = await Cart.findByIdAndUpdate(
      itemId,
      { quantity: newQuantity },
      { new: true } // Return the updated item
    );

    if (!updatedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.status(200).json({ message: 'Quantity updated successfully', updatedItem });
  } catch (error) {
    console.error('Error updating quantity:', error);
    res.status(500).json({ error: 'An error occurred while updating quantity' });
  }
};

//cleAR CART
export const clearCart = async (req, res, next) => {
  try {
    const { userId } = req.body;

    // Delete cart items for the specified userId
    await Cart.deleteMany({ u_id: userId });

    // Respond with a success message
    res.status(200).json({ message: 'Cart data cleared successfully' });
  } catch (error) {
    console.error('Error clearing cart data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
