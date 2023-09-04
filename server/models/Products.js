import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    image:String,
    quantity: Number
});

// Export the Product model as a named export
export default mongoose.model("Products", productSchema);