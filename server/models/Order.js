import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    email: String,
    amount: Number,
    status: String,
});

// Export the Product model as a named export
export default mongoose.model("Order", orderSchema);