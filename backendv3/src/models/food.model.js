const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  video: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  likedBy: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "user",
    default: [],
  },
  comments: {
    type: Array,
    default: [],
  },
  saved: {
    type: Number,
    default: 0,
  },
  savedBy: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "user",
    default: [],
  },
  shares: {
    type: Number,
    default: 0,
  },
  description: {
    type: String,
  },
  foodPartner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "foodpartner",
  },
});

const foodModel = mongoose.model("food", foodSchema);

module.exports = foodModel;
