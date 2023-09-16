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

// Add a pre-remove middleware to delete the related GeneratedRecipe document
generatedRecipeSchema.pre("remove", async function (next) {
  try {
    // Use this to delete the related GeneratedRecipe document
    await this.model("GeneratedRecipe").deleteOne({ _id: this._id });
    next();
  } catch (error) {
    next(error);
  }
});

export default mongoose.model("GeneratedRecipe", generatedRecipeSchema);
