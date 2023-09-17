import mongoose from "mongoose";
const { Schema } = mongoose;


const favouriteSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    favourite: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
  },
  { timestamps: true }
);


// Export the Product model as a named export
export default mongoose.model("Favourite", favouriteSchema);
