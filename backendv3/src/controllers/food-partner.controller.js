const foodModel = require("../models/food.model");
const foodPartnerModel = require("../models/foodpartner.model");

const getFoodPartnerId = async (req, res) => {
  const foodPartnerId = req.params.id;
  const userId = req.user?._id;

  const foodPartner = await foodPartnerModel.findById(foodPartnerId);
  const foodReels = await foodModel.find({ foodPartner: foodPartnerId });

  if (!foodPartner) {
    return res.status(404).json({ message: "Food Partner not found" });
  }

  const isFollowing = userId ? foodPartner.followers.includes(userId) : false;

  // Add isLiked and isSaved flags for the current user
  const foodReelsWithUserData = foodReels.map((item) => ({
    ...item.toObject(),
    isLiked: userId ? item.likedBy.includes(userId) : false,
    isSaved: userId ? item.savedBy.includes(userId) : false,
  }));

  res.status(200).json({
    message: "Food Partner fetched successfully",
    foodPartner,
    foodReels: foodReelsWithUserData,
    isFollowing,
  });
};

module.exports = { getFoodPartnerId };
