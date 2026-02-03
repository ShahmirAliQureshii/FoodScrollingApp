const foodModel = require("../models/food.model");
const userModel = require("../models/user.model");
const storageServices = require("../services/storage.service");
const { v4: uuid } = require("uuid");

const createFood = async (req, res) => {
  const fileUploadResult = await storageServices.uploadFile(
    req.file.buffer,
    uuid()
  );

  const foodItem = await foodModel.create({
    name: req.body.name,
    description: req.body.description,
    video: fileUploadResult.url,
    foodPartner: req.foodPartner._id,
  });

  res
    .status(201)
    .json({ message: "Food created successfully", food: foodItem });
};

const getFoodItems = async (req, res) => {
  try {
    const foodItems = await foodModel.find({}).populate("foodPartner");
    const userId = req.user?._id;
    
    // Get user's following list to check follow status
    let followingList = [];
    if (userId) {
      const user = await userModel.findById(userId);
      followingList = user?.following || [];
    }

    // Add isLiked, isSaved, and isFollowing flags
    const foodItemsWithUserData = foodItems.map((item) => {
      const itemObj = item.toObject();
      return {
        ...itemObj,
        isLiked: userId ? item.likedBy.some(id => id.toString() === userId.toString()) : false,
        isSaved: userId ? item.savedBy.some(id => id.toString() === userId.toString()) : false,
        isFollowing: userId && item.foodPartner ? followingList.some(id => id.toString() === item.foodPartner._id.toString()) : false,
      };
    });

    res.status(200).json({ 
      message: "Food Items Fetched Successfully", 
      foodItems: foodItemsWithUserData 
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching food items", error: error.message });
  }
};

const toggleLike = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const foodItem = await foodModel.findById(id);

    if (!foodItem) {
      return res.status(404).json({ message: "Food item not found" });
    }

    const hasLiked = foodItem.likedBy.includes(userId);

    if (hasLiked) {
      // Unlike: remove user from likedBy array and decrement likes
      foodItem.likedBy = foodItem.likedBy.filter(
        (id) => id.toString() !== userId.toString()
      );
      foodItem.likes = Math.max(0, foodItem.likes - 1);
    } else {
      // Like: add user to likedBy array and increment likes
      foodItem.likedBy.push(userId);
      foodItem.likes += 1;
    }

    await foodItem.save();

    res.status(200).json({
      message: hasLiked ? "Unliked successfully" : "Liked successfully",
      likes: foodItem.likes,
      isLiked: !hasLiked,
    });
  } catch (error) {
    res.status(500).json({ message: "Error toggling like", error: error.message });
  }
};

const toggleSave = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const foodItem = await foodModel.findById(id);

    if (!foodItem) {
      return res.status(404).json({ message: "Food item not found" });
    }

    const hasSaved = foodItem.savedBy.includes(userId);

    if (hasSaved) {
      // Unsave: remove user from savedBy array and decrement saved
      foodItem.savedBy = foodItem.savedBy.filter(
        (id) => id.toString() !== userId.toString()
      );
      foodItem.saved = Math.max(0, foodItem.saved - 1);
    } else {
      // Save: add user to savedBy array and increment saved
      foodItem.savedBy.push(userId);
      foodItem.saved += 1;
    }

    await foodItem.save();

    res.status(200).json({
      message: hasSaved ? "Unsaved successfully" : "Saved successfully",
      saved: foodItem.saved,
      isSaved: !hasSaved,
    });
  } catch (error) {
    res.status(500).json({ message: "Error toggling save", error: error.message });
  }
};
const addComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { text } = req.body;
    const userId = req.user._id;

    if (!text) {
      return res.status(400).json({ message: "Comment text is required" });
    }

    const foodItem = await foodModel.findById(id);
    if (!foodItem) {
      return res.status(404).json({ message: "Food item not found" });
    }

    const newComment = {
      user: userId,
      userName: req.user.fullName,
      text,
      createdAt: new Date(),
    };

    foodItem.comments.push(newComment);
    await foodItem.save();

    res.status(201).json({ 
      message: "Comment added successfully", 
      comment: newComment,
      totalComments: foodItem.comments.length 
    });
  } catch (error) {
    res.status(500).json({ message: "Error adding comment", error: error.message });
  }
};

module.exports = { createFood, getFoodItems, toggleLike, toggleSave, addComment };
