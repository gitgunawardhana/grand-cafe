import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    id : String,
    name: String,
    u_id:String,
    price: Number,
    category:String,
    image: String,
    quantity: Number,
    rate: Number
});

// Export the Product model as a named export
export default mongoose.model("Cart", cartSchema);