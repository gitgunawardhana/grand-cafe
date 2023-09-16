import Category from "../models/Category.js";
import ItemSales from "../models/ItemSales.js";

// Define a function to get sold quantity by category
export const getSoldQuantityByCategory = async (req, res) => {
  try {
    // First, fetch all categories
    const categories = await Category.find();

    // Create an object to store category names and their sold quantities
    const categorySoldData = {};

    // Initialize the categorySoldData object with category names and initial sold quantity of 0
    categories.forEach((category) => {
      categorySoldData[category.category] = 0;
    });
    console.log(categorySoldData);

    // Aggregate to get sold quantities
    const soldQuantityByCategory = await ItemSales.aggregate([
      {
        $group: {
          _id: "$category",
          soldQuantity: { $sum: "$totalQuantitySold" },
        },
      },
    ]);

    // Update the categorySoldData object with sold quantities
    soldQuantityByCategory.forEach((item) => {
      categorySoldData[item._id] = item.soldQuantity;
    });

    // Convert the categorySoldData object to an array of objects
    const result = Object.entries(categorySoldData).map(
      ([category, soldQuantity]) => ({
        category,
        soldQuantity,
      })
    );

    // Find the most sold category
    let mostSoldCategory = "";
    let highestSoldQuantity = 0;

    Object.entries(categorySoldData).forEach(([category, soldQuantity]) => {
      if (soldQuantity > highestSoldQuantity) {
        mostSoldCategory = category;
        highestSoldQuantity = soldQuantity;
      }
    });

    res
      .status(200)
      .json({ data: result, mostSoldCategory, message: "Success" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};


