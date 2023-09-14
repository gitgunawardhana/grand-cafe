import express from "express";
import Order from "../models/Order.js";
const router = express.Router();
import User from "../models/User.js";
import Cart from "../models/Cart.js";
import ItemSales from "../models/ItemSales.js";

export const viewOrder = async (req, res, next) => {
  try {
    const products = await Order.find();
    res.status(200).json({ data: products, messege: "Success" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// ? add order

export const addOrder = async (req, res) => {
  const { email, id, amount, items, status } = req.body;
  const user = await User.findOne({ email });

  let fName = "";

  if (email == "unregistered@gmail.com") {
    fName = "User";
  } else {
    fName = user.firstName;
  }

  try {
    // Create an array to store the order items with quantities
    const orderItems = [];

    for (const item of items) {
      const cartItem = await Cart.findById(item._id); // Assuming you have a CartItem model

      if (!cartItem) {
        return res.status(400).json({ error: "CartItem not found" });
      }

      // Add the item and quantity to the orderItems array
      orderItems.push({
        
        item: cartItem._id,
        category:cartItem.category,
        quantity: item.quantity,
      });

      let itemSales = await ItemSales.findOne({ itemId: cartItem._id });

      if (!itemSales) {
        itemSales = new ItemSales({
          itemId: cartItem._id,
          itemName: cartItem.name, // Make sure to use the correct field
          category: cartItem.category, // Make sure to use the correct field
          totalQuantitySold: 0, // Initialize to 0
        });
      }

      // Update the totalQuantitySold
      itemSales.totalQuantitySold += item.quantity;
      await itemSales.save();

    }

    // Create a new Order document with the order items
    const newOrder = new Order({
      id,
      user: fName,
      items: orderItems, // Include the order items array
      email,
      amount,
      status,
    });

    const saveOrder = await newOrder.save();

    res.status(200).json(saveOrder);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};


// export const addOrde = async (req, res, next) => {
//   try {
//     console.log("Request Body:", req.body); 
//     const { email, amount, status } = req.body;

//     const newItem = new Order({
//       email,
//       amount,
//       status,
     
//     });

//     console.log("New Item:", newItem); // Check the newItem object
//     await newItem.save();
//     res.status(201).json({ message: "Order added to the system" });
//   } catch (error) {
//     console.error("Error:", error); // Check if there are any errors
//     res
//       .status(500)
//       .json({
//         message: "Error adding order to system",
//         error: error.message,
//       });
//   }
// };


export const updateOrder = async (req, res) => {
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
