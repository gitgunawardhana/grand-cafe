import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    item: String,
    description: String,
    unit_price: Number,
    quantity: Number,
});

// Export the Product model as a named export
export default mongoose.model("Inventory", productSchema);
