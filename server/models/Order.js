import mongoose from "mongoose";
const { Schema } = mongoose;

const orderItemSchema = new mongoose.Schema({
  item: {
    type: Schema.Types.ObjectId,
    ref: "Cart", // Reference to the CartItem model
  },
  quantity: {
    type: Number,
    required: true,
  },
});


const orderSchema = new mongoose.Schema(
  {
    user: {
      type: Schema.Types.String,
      ref: "User",
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    name: {
        type: String,
        required: false,
      },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    items: [orderItemSchema],
  },
  { timestamps: true }
);

// Export the Product model as a named export
export default mongoose.model("Order", orderSchema);
