import Favourite from "../models/Favourite.js";

export const addFavourite = async (req, res) => {
  try {
    const { email, productId } = req.body;
    console.log("Ai j", email);

    // Check if the product is already in the user's favorites
    const existingFavorite = await Favourite.findOne({
      email,
      favourite: productId,
    });

    if (existingFavorite) {
      return res.status(400).json({ error: "Product already in favorites" });
    }

    // Create a new favorite entry
    const newFavorite = new Favourite({ email, favourite: productId });

    // Save the new favorite entry
    await newFavorite.save();

    return res.status(201).json({ message: "Product added to favorites" });
  } catch (error) {
    console.error("Error adding to favorites:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const view = async (req, res, next) => {
  try {
     const { email } = req.body; // Get the email from the request body

    // // Find the user based on the email
    // const user = await User.findOne({ email });

    // if (!user) {
    //   return res.status(404).json({ error: "User not found" });
    // }

    // Find favorites associated with the user and populate the product details
    const favorites = await Favourite.find({email}).populate("favourite");
    // console.log(favourites);
    res.status(200).json({ data: favorites, message: "Success" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};


export const deleteFavourite = async (req, res) => {
  const favouriteId = req.params.favouriteId;

  try {
    const deletedItem = await Favourite.findByIdAndDelete(favouriteId);
    if (!deletedItem) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting Product", error: error.message });
  }
};