// itemSales.model.js
import mongoose from "mongoose";

const { Schema } = mongoose;

const itemSalesSchema = new Schema({
  itemId: {
    type: Schema.Types.ObjectId,
    ref: "Cart", // Reference to the CartItem model
    required: true,
  },
  itemName: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  totalQuantitySold: {
    type: Number,
    default: 0,
  },
},
{ timestamps: true }
);

export default mongoose.model("ItemSales", itemSalesSchema);
