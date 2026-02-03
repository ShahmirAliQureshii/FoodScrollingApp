const userModel = require("../models/user.model");
const foodPartnerModel = require("../models/foodpartner.model");
const foodModel = require("../models/food.model");

const getProfile = async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Get saved items details
    const savedItems = await foodModel.find({
      _id: { $in: req.user.savedBy || [] } // Error in model research? savedBy is on food items.
    }).populate("foodPartner");
    
    // Correction: saved items are food items where user ID is in savedBy array
    const actualSavedItems = await foodModel.find({
      savedBy: user._id
    }).populate("foodPartner");

    res.status(200).json({ user, savedItems: actualSavedItems });
  } catch (error) {
    res.status(500).json({ message: "Error fetching profile", error: error.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { fullName, email } = req.body;
    const user = await userModel.findByIdAndUpdate(
      req.user._id,
      { fullName, email },
      { new: true }
    ).select("-password");

    res.status(200).json({ message: "Profile updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Error updating profile", error: error.message });
  }
};

const followPartner = async (req, res) => {
  try {
    const { partnerId } = req.params;
    const userId = req.user._id;

    const partner = await foodPartnerModel.findById(partnerId);
    if (!partner) {
      return res.status(404).json({ message: "Food Partner not found" });
    }

    // Add to user's following list
    await userModel.findByIdAndUpdate(userId, {
      $addToSet: { following: partnerId }
    });

    // Add to partner's followers list
    await foodPartnerModel.findByIdAndUpdate(partnerId, {
      $addToSet: { followers: userId }
    });

    res.status(200).json({ message: "Followed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error following partner", error: error.message });
  }
};

const unfollowPartner = async (req, res) => {
  try {
    const { partnerId } = req.params;
    const userId = req.user._id;

    // Remove from user's following list
    await userModel.findByIdAndUpdate(userId, {
      $pull: { following: partnerId }
    });

    // Remove from partner's followers list
    await foodPartnerModel.findByIdAndUpdate(partnerId, {
      $pull: { followers: userId }
    });

    res.status(200).json({ message: "Unfollowed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error unfollowing partner", error: error.message });
  }
};

module.exports = { getProfile, updateProfile, followPartner, unfollowPartner };
