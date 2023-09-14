import express from "express";
import Cart from "../models/Cart.js";
import Order from "../models/Order.js";
import User from "../models/User.js";
const router = express.Router();

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
  const { email, amount, items, status } = req.body;
  const user = await User.findOne({ email });

  let fName = "";

  if (email == "unregistered@gmail.com") {
    fName = "Unreg";
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
        quantity: item.quantity,
      });
    }

    // Create a new Order document with the order items
    const newOrder = new Order({
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

// Define a function to get orders for the current month
export const getOrdersForCurrentMonth = async (req, res) => {
  try {
    const startOfMonth = new Date();
    startOfMonth.setDate(1);

    const endOfMonth = new Date();
    endOfMonth.setMonth(endOfMonth.getMonth() + 1);
    endOfMonth.setDate(1);

    const orders = await Order.find({
      createdAt: {
        $gte: startOfMonth,
        $lt: endOfMonth,
      },
    });

    res.status(200).json({ data: orders, message: "Success" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Define a function to get orders count for each month
export const getOrdersCountByCurrentMonth = async (req, res) => {
  try {
    const ordersByMonth = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
            $lt: new Date(
              new Date().getFullYear(),
              new Date().getMonth() + 1,
              1
            ),
          },
        },
      },
      {
        $group: {
          _id: { $month: "$createdAt" },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          month: {
            $switch: {
              branches: [
                { case: { $eq: ["$_id", 1] }, then: "jan" },
                { case: { $eq: ["$_id", 2] }, then: "feb" },
                { case: { $eq: ["$_id", 3] }, then: "mar" },
                { case: { $eq: ["$_id", 4] }, then: "apr" },
                { case: { $eq: ["$_id", 5] }, then: "may" },
                { case: { $eq: ["$_id", 6] }, then: "jun" },
                { case: { $eq: ["$_id", 7] }, then: "jul" },
                { case: { $eq: ["$_id", 8] }, then: "aug" },
                { case: { $eq: ["$_id", 9] }, then: "sep" },
                { case: { $eq: ["$_id", 10] }, then: "oct" },
                { case: { $eq: ["$_id", 11] }, then: "nov" },
                { case: { $eq: ["$_id", 12] }, then: "dec" },
              ],
              default: "unknown",
            },
          },
          noOfOrders: "$count",
        },
      },
    ]);

    res.status(200).json({ data: ordersByMonth, message: "Success" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const allMonths = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

// Define a function to get orders count for each month
export const getOrdersCountByMonth = async (req, res) => {
  try {
    const ordersByMonth = await Order.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          month: {
            $switch: {
              branches: [
                { case: { $eq: ["$_id", 1] }, then: "Jan" },
                { case: { $eq: ["$_id", 2] }, then: "Feb" },
                { case: { $eq: ["$_id", 3] }, then: "Mar" },
                { case: { $eq: ["$_id", 4] }, then: "Apr" },
                { case: { $eq: ["$_id", 5] }, then: "May" },
                { case: { $eq: ["$_id", 6] }, then: "Jun" },
                { case: { $eq: ["$_id", 7] }, then: "July" },
                { case: { $eq: ["$_id", 8] }, then: "Aug" },
                { case: { $eq: ["$_id", 9] }, then: "Sep" },
                { case: { $eq: ["$_id", 10] }, then: "Oct" },
                { case: { $eq: ["$_id", 11] }, then: "Nov" },
                { case: { $eq: ["$_id", 12] }, then: "Dec" },
              ],
              default: "unknown",
            },
          },
          noOfOrders: "$count",
        },
      },
    ]);

    // Generate an object to store counts for each month
    const countsByMonth = {};
    ordersByMonth.forEach((item) => {
      countsByMonth[item.month] = item.noOfOrders;
    });

    // Fill in months with no orders and set noOfOrders to 0
    allMonths.forEach((month) => {
      if (!countsByMonth.hasOwnProperty(month)) {
        countsByMonth[month] = 0;
      }
    });

    // Create an array of objects in the desired format
    const result = allMonths.map((month) => ({
      month,
      noOfOrders: countsByMonth[month],
    }));

    const currentMonthIndex = new Date().getMonth();
    const currentMonth = allMonths[currentMonthIndex];
    const noOfOrdersForThisMonth = countsByMonth[currentMonth] || 0;

    res
      .status(200)
      .json({ data: result, noOfOrdersForThisMonth, message: "Success" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Define a function to get sales for each month
export const getSalesByMonth = async (req, res) => {
  try {
    const ordersByMonth = await Order.aggregate([
      {
        $group: {
          _id: {
            month: { $month: "$createdAt" },
            year: { $year: "$createdAt" },
          },
          totalSales: { $sum: "$amount" },
        },
      },
    ]);

    // Generate an object to store sales for each month
    const salesByMonth = {};
    ordersByMonth.forEach((item) => {
      const month = item._id.month;
      const year = item._id.year;
      const monthKey = `${year}-${month.toString().padStart(2, "0")}`;
      salesByMonth[monthKey] = item.totalSales;
    });

    // Fill in months with no sales and set noOfSales to 0
    allMonths.forEach((month, index) => {
      const monthKey = `${new Date().getFullYear()}-${(index + 1)
        .toString()
        .padStart(2, "0")}`;
      if (!salesByMonth.hasOwnProperty(monthKey)) {
        salesByMonth[monthKey] = 0;
      }
    });

    // Create an array of objects in the desired format
    const result = allMonths.map((month, index) => {
      const monthKey = `${new Date().getFullYear()}-${(index + 1)
        .toString()
        .padStart(2, "0")}`;
      return {
        month,
        noOfSales: salesByMonth[monthKey],
      };
    });

    // Calculate the sales for the current month
    const currentMonthKey = `${new Date().getFullYear()}-${(
      new Date().getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}`;
    const thisMonthSales = salesByMonth[currentMonthKey] || 0;

    res.status(200).json({ data: result, thisMonthSales, message: "Success" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
