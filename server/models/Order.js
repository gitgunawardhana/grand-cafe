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
    payment: {
      type: String,
      required: false,
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
    // Find the highest orderCode in the collection
    const highestOrder = await this.constructor.findOne().sort("-orderCode").exec();

    // If there are no existing documents, start with #OD001
    if (!highestOrder || !highestOrder.orderCode) {
      this.orderCode = "#OD001";
    } else {
      // Extract the numeric part of the highest orderCode and increment it
      const matchResult = highestOrder.orderCode.match(/\d+/);
      const highestNumber = matchResult ? parseInt(matchResult[0]) : 0;
      const nextNumber = highestNumber + 1;

      // Pad the number with leading zeros to always have three digits
      const nextUserCode = `#OD${nextNumber.toString().padStart(3, "0")}`;
      this.orderCode = nextUserCode;

      console.log("Highest Order:", highestOrder.orderCode);
      console.log("Next Number:", nextNumber);
      console.log("Next Order Code:", nextUserCode);
    }
  }

  next();
});

// Export the Product model as a named export
export default mongoose.model("Order", orderSchema);
