const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const foodPartnerModel = require("../models/foodpartner.model");

const registerUser = async (req, res) => {
  const { fullName, email, password, contactName } = req.body;

  const isUserAlreadyExists = await userModel.findOne({ email });

  if (isUserAlreadyExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    fullName,
    email,
    password: hashedPassword,
  });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  res.cookie("token", token);

  res.status(201).json({
    message: "User created successfully",
    user: { _id: user._id, fullName: user.fullName || user.name, email: user.email },
  });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: "email or password is incorrect" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(400).json({ message: "email or password is incorrect" });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  res.cookie("token", token);

  res.status(200).json({
    message: "user logged in successfully",
    user: { _id: user._id, fullName: user.fullName, email: user.email },
  });
};

const logoutUser = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "User logged out successfully" });
};

const registerFoodPartner = async (req, res) => {
  const { name, contactName, phone, address, email, password } = req.body;

  const isFoodPartnerAlreadyExists = await foodPartnerModel.findOne({ email });

  if (isFoodPartnerAlreadyExists) {
    return res.status(400).json({ message: "user already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const foodPartner = await foodPartnerModel.create({
    name,
    contactName,
    phone,
    address,
    email,
    password: hashedPassword,
  });

  const token = jwt.sign({ id: foodPartner._id }, process.env.JWT_SECRET);

  res.cookie("token", token);

  res.status(201).json({
    message: "food partner created successfully",
    foodPartner: {
      _id: foodPartner._id,
      name: foodPartner.name,
      contactName: foodPartner.contactName,
      phone: foodPartner.phone,
      address: foodPartner.address,
      email: foodPartner.email,
    },
  });
};

const loginFoodPartner = async (req, res) => {
  const { email, password } = req.body;

  const user = await foodPartnerModel.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: "email or password is incorrect" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(400).json({ message: "email or password is incorrect" });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  res.cookie("token", token);

  res.status(200).json({
    message: "user logged in successfully",
    user: { _id: user._id, fullName: user.fullName, email: user.email },
  });
};

const logoutFoodPartner = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "User logged out successfully" });
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  registerFoodPartner,
  loginFoodPartner,
  logoutFoodPartner,
};
