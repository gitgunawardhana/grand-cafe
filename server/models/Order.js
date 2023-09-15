import mongoose from "mongoose";
const { Schema } = mongoose;

const orderItemSchema = new mongoose.Schema({
  item: {
    type: Schema.Types.ObjectId,
    ref: "Cart", // Reference to the CartItem model
  },
  category: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});


const orderSchema = new mongoose.Schema(
  {
    orderCode: {
      type: String,
      required: false,
    },
    id: {
      type: String,
      required: true,
    },
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

orderSchema.pre("save", async function (next) {
  // Check if the document is new (not an update)
  if (this.isNew) {
    // Find the highest userCode in the collection
    const highestOrder = await this.constructor.findOne()
      .sort("-orderCode")
      .exec();

    // If there are no existing documents, start with UNREG01
    if (!highestOrder || !highestOrder.orderCode) {
      this.orderCode = "#OD01";
    } else {
      // Extract the numeric part of the highest userCode and increment it
      const highestNumber = parseInt(highestOrder.orderCode.match(/\d+/)[0]);
      const nextNumber = highestNumber + 1;
      // Pad the number with leading zeros if necessary
      const nextUserCode = `#OD${nextNumber.toString().padStart(2, "0")}`;
      this.orderCode = nextUserCode;
    }
  }

  next();
});

// Export the Product model as a named export
export default mongoose.model("Order", orderSchema);
