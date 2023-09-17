import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    rate: [Number],
    image:String,
    category:String,
});

// Export the Product model as a named export
export default mongoose.model("Products", productSchema);
