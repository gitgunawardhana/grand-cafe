import mongoose from "mongoose";
const { Schema } = mongoose;

const favouriteSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    favourite: {
      type: Schema.Types.ObjectId,
      ref: "Products",
      required: true,
    },
  },
  { timestamps: true }
);

// Export the Product model as a named export
export default mongoose.model("Favourite", favouriteSchema);
