import mongoose from "mongoose";

const { Schema } = mongoose;

const generatedRecipeSchema = new Schema(
  {
    seatBooking: {
      type: Schema.Types.ObjectId,
      ref: "SeatBooking",
      required: true,
      unique: true,
    },
    recipe: {
      type: String,
      required: true,
    },
    state: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("GeneratedRecipe", generatedRecipeSchema);
